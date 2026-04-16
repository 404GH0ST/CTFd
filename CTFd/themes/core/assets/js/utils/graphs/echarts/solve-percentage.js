import { mergeObjects } from "../../objects";
import { getThemeChartColors, getThemeStatColors } from "../theme-palette";

export function getOption(solves, fails, optionMerge) {
  const colors = getThemeStatColors();
  const chartColors = getThemeChartColors();
  let option = {
    tooltip: {
      trigger: "item",
      backgroundColor: chartColors.surfaceBright,
      borderColor: chartColors.outline,
      borderWidth: 1,
      textStyle: {
        color: chartColors.text,
        fontFamily: chartColors.fontBody,
      },
    },
    legend: {
      orient: "vertical",
      top: "middle",
      right: 0,
      data: ["Fails", "Solves"],
      textStyle: {
        color: chartColors.textMuted,
        fontFamily: chartColors.fontBody,
      },
    },
    series: [
      {
        name: "Solve Percentages",
        type: "pie",
        radius: ["30%", "50%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: function (data) {
                return `${data.name} - ${data.value} (${data.percent}%)`;
              },
            },
            labelLine: {
              show: true,
            },
          },
          emphasis: {
            label: {
              show: true,
              position: "center",
              textStyle: {
                fontSize: "14",
                fontWeight: "normal",
              },
            },
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "30",
            fontWeight: "bold",
            color: chartColors.text,
            fontFamily: chartColors.fontBody,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: fails,
            name: "Fails",
            itemStyle: { color: colors.fail },
          },
          {
            value: solves,
            name: "Solves",
            itemStyle: { color: colors.solve },
          },
        ],
      },
    ],
  };

  if (optionMerge) {
    option = mergeObjects(option, optionMerge);
  }
  return option;
}
