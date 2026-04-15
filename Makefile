lint:
	ruff check --select E,F,W,B,C4,I --ignore E402,E501,E712,B904,B905,I001 --exclude=CTFd/uploads CTFd/ migrations/ tests/
	isort --profile=black --check-only --skip=CTFd/uploads --skip-glob **/node_modules CTFd/ tests/
	yarn --cwd CTFd/themes/admin lint
	black --check --diff --exclude=CTFd/uploads --exclude=node_modules .
	prettier --check 'CTFd/themes/*/assets/**/*'
	prettier --check '**/*.md'

SEED_USERS ?= 120
SEED_TEAMS ?= 60
SEED_MEMBERS_PER_TEAM ?= 2
SEED_PREFIX ?= pagination-demo
SEED_PYTHON ?= ./.venv/bin/python
DEV_PYTHON ?= ./.venv/bin/python
DEV_PORT ?= 4000
DEV_UPLOAD_FOLDER ?= $(CURDIR)/.data/CTFd/uploads
DEV_LOG_FOLDER ?= $(CURDIR)/.data/CTFd/logs
DEV_DATABASE_URL ?= mysql+pymysql://ctfd:ctfd@127.0.0.1:3306/ctfd
DEV_REDIS_URL ?= redis://127.0.0.1:6379

format:
	isort --profile=black --skip=CTFd/uploads --skip-glob **/node_modules CTFd/ tests/
	black --exclude=CTFd/uploads --exclude=node_modules .
	prettier --write 'CTFd/themes/**/assets/**/*'
	prettier --write '**/*.md'

test:
	pytest -rf --cov=CTFd --cov-context=test --cov-report=xml \
		--ignore-glob="**/node_modules/" \
		--ignore=node_modules/ \
		-W ignore::sqlalchemy.exc.SADeprecationWarning \
		-W ignore::sqlalchemy.exc.SAWarning \
		-n auto
	bandit -r CTFd -x CTFd/uploads --skip B105,B322
	pipdeptree

coverage:
	coverage html --show-contexts

serve:
	python serve.py

local-prepare:
	mkdir -p "$(DEV_UPLOAD_FOLDER)" "$(DEV_LOG_FOLDER)"

local-serve: local-prepare
	env \
		UPLOAD_FOLDER="$(DEV_UPLOAD_FOLDER)" \
		LOG_FOLDER="$(DEV_LOG_FOLDER)" \
		"$(DEV_PYTHON)" serve.py --port "$(DEV_PORT)" --disable-gevent

local-infra:
	docker compose up -d db cache

local-serve-docker: local-prepare
	env \
		DATABASE_URL="$(DEV_DATABASE_URL)" \
		REDIS_URL="$(DEV_REDIS_URL)" \
		UPLOAD_FOLDER="$(DEV_UPLOAD_FOLDER)" \
		LOG_FOLDER="$(DEV_LOG_FOLDER)" \
		"$(DEV_PYTHON)" serve.py --port "$(DEV_PORT)"

theme-dev-core:
	yarn --cwd CTFd/themes/core dev

theme-dev-swiss:
	yarn --cwd CTFd/themes/swiss dev

shell:
	python manage.py shell

seed-pagination:
	$(SEED_PYTHON) scripts/seed_pagination_data.py --users $(SEED_USERS) --teams $(SEED_TEAMS) --members-per-team $(SEED_MEMBERS_PER_TEAM) --prefix $(SEED_PREFIX)

seed-pagination-teams:
	$(SEED_PYTHON) scripts/seed_pagination_data.py --users $(SEED_USERS) --teams $(SEED_TEAMS) --members-per-team $(SEED_MEMBERS_PER_TEAM) --prefix $(SEED_PREFIX) --ensure-team-mode

translations-init:
	# make translations-init lang=af
	pybabel init -i messages.pot -d CTFd/translations -l $(lang)

translations-extract:
	pybabel extract -F babel.cfg -k lazy_gettext -k _l -o messages.pot .

translations-update:
	pybabel update --ignore-obsolete -i messages.pot -d CTFd/translations

translations-compile:
	pybabel compile -f -d CTFd/translations

translations-lint:
	dennis-cmd lint CTFd/translations
