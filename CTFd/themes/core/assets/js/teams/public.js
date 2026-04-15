import CTFd from "../index";

import Alpine from "alpinejs";
import { getOption as getUserScoreOption } from "../utils/graphs/echarts/userscore";
import { embed } from "../utils/graphs/echarts";
import { buildCategoryBreakdown, getPercentage } from "../utils/profile-graphs";

window.Alpine = Alpine;

Alpine.data("TeamGraphs", () => ({
  solves: null,
  fails: null,
  awards: null,
  solveCount: 0,
  failCount: 0,
  awardCount: 0,

  getAttemptTotal() {
    return this.solveCount + this.failCount;
  },

  getSolvePercentage() {
    return getPercentage(this.solveCount, this.getAttemptTotal());
  },

  getSolvePercentageValue() {
    return Number(this.getSolvePercentage());
  },

  getFailPercentage() {
    return getPercentage(this.failCount, this.getAttemptTotal());
  },

  getFailPercentageValue() {
    return Number(this.getFailPercentage());
  },

  getCategoryBreakdown() {
    return buildCategoryBreakdown(this.solves.data);
  },

  async init() {
    this.solves = await CTFd.pages.teams.teamSolves(window.TEAM.id);
    this.fails = await CTFd.pages.teams.teamFails(window.TEAM.id);
    this.awards = await CTFd.pages.teams.teamAwards(window.TEAM.id);

    this.solveCount = this.solves.meta.count;
    this.failCount = this.fails.meta.count;
    this.awardCount = this.awards.meta.count;

    let optionMerge = window.teamScoreGraphChartOptions;

    embed(
      this.$refs.scoregraph,
      getUserScoreOption(
        window.TEAM.id,
        window.TEAM.name,
        this.solves.data,
        this.awards.data,
        optionMerge,
      ),
    );
  },
}));

Alpine.start();
