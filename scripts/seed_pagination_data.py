#!/usr/bin/env python3

import argparse
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from CTFd import create_app
from CTFd.cache import clear_challenges, clear_config, clear_pages, clear_standings
from CTFd.models import Teams, Users, db
from CTFd.utils import get_config, set_config

COUNTRIES = ["US", "SG", "DE", "JP", "ID", "GB", "FR", "CA", "AU", "NL"]


def build_parser():
    parser = argparse.ArgumentParser(
        description="Seed users and teams so directory pages paginate in development."
    )
    parser.add_argument("--users", type=int, default=120)
    parser.add_argument("--teams", type=int, default=60)
    parser.add_argument("--members-per-team", type=int, default=2)
    parser.add_argument("--prefix", default="pagination-demo")
    parser.add_argument(
        "--ensure-team-mode",
        action="store_true",
        help="Set user_mode=teams so the /teams directory is available.",
    )
    return parser


def title_prefix(prefix):
    return prefix.replace("-", " ").replace("_", " ").title()


def team_payload(prefix, index):
    slug = f"{prefix}-team-{index:03d}"
    label = title_prefix(prefix)
    return {
        "name": f"{label} Team {index:03d}",
        "email": f"{slug}@example.test",
        "password": "devpassword",
        "website": f"https://{slug}.example.test",
        "affiliation": f"{label} Org {((index - 1) % 9) + 1}",
        "country": COUNTRIES[(index - 1) % len(COUNTRIES)],
        "hidden": False,
        "banned": False,
    }


def user_payload(prefix, index):
    slug = f"{prefix}-user-{index:03d}"
    label = title_prefix(prefix)
    return {
        "name": f"{label} User {index:03d}",
        "email": f"{slug}@example.test",
        "password": "devpassword",
        "website": f"https://{slug}.example.test",
        "affiliation": f"{label} Org {((index - 1) % 9) + 1}",
        "country": COUNTRIES[(index - 1) % len(COUNTRIES)],
        "verified": True,
        "hidden": False,
        "banned": False,
    }


def ensure_team(index, prefix):
    payload = team_payload(prefix, index)
    team = Teams.query.filter_by(email=payload["email"]).first()
    created = False

    if team is None:
        team = Teams(**payload)
        db.session.add(team)
        db.session.flush()
        created = True
    else:
        for key, value in payload.items():
            if key == "password":
                continue
            setattr(team, key, value)

    return team, created


def ensure_user(index, prefix, team_id=None):
    payload = user_payload(prefix, index)
    user = Users.query.filter_by(email=payload["email"]).first()
    created = False

    if user is None:
        user = Users(**payload)
        db.session.add(user)
        db.session.flush()
        created = True
    else:
        for key, value in payload.items():
            if key == "password":
                continue
            setattr(user, key, value)

    if team_id is not None:
        user.team_id = team_id

    return user, created


def main():
    parser = build_parser()
    args = parser.parse_args()

    if args.users < 1:
        parser.error("--users must be at least 1")
    if args.teams < 1:
        parser.error("--teams must be at least 1")
    if args.members_per_team < 1:
        parser.error("--members-per-team must be at least 1")

    app = create_app()

    with app.app_context():
        if args.ensure_team_mode and get_config("user_mode") != "teams":
            set_config("user_mode", "teams")

        created_teams = 0
        created_users = 0
        seeded_team_ids = []

        for index in range(1, args.teams + 1):
            team, created = ensure_team(index, args.prefix)
            seeded_team_ids.append(team.id)
            if created:
                created_teams += 1

        for index in range(1, args.users + 1):
            team_id = seeded_team_ids[(index - 1) % len(seeded_team_ids)]
            user, created = ensure_user(index, args.prefix, team_id=team_id)
            if created:
                created_users += 1

            team = Teams.query.get(team_id)
            if team.captain_id is None:
                team.captain_id = user.id

        db.session.commit()

        clear_config()
        clear_standings()
        clear_challenges()
        clear_pages()

        print(
            "Seeded pagination data: "
            f"{args.teams} teams ({created_teams} new), "
            f"{args.users} users ({created_users} new)"
        )
        print(f"Users directory: /users?page=2")
        if get_config("user_mode") == "teams":
            print("Teams directory: /teams?page=2")
        else:
            print(
                "Teams directory is hidden because user_mode is not 'teams'. "
                "Use --ensure-team-mode or run `make seed-pagination-teams`."
            )


if __name__ == "__main__":
    main()
