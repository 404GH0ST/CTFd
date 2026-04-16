import { mergeObjects } from "../../objects";
import { getThemeChartColors } from "../theme-palette";
import { getThemeSeriesColor } from "../theme-palette";

export function getOption(solves, optionMerge) {
  const colors = getThemeChartColors();
  let option = {
    tooltip: {
      trigger: "item",
      backgroundColor: colors.surfaceBright,
      borderColor: colors.outline,
      borderWidth: 1,
      textStyle: {
        color: colors.text,
        fontFamily: colors.fontBody,
      },
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      top: "middle",
      right: 0,
      data: [],
      textStyle: {
        color: colors.textMuted,
        fontFamily: colors.fontBody,
      },
      pageIconColor: colors.primary,
      pageIconInactiveColor: colors.outline,
      pageTextStyle: {
        color: colors.textMuted,
        fontFamily: colors.fontBody,
      },
    },
    series: [
      {
        name: "Category Breakdown",
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
                return `${data.percent}% (${data.value})`;
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
            color: colors.text,
            fontFamily: colors.fontBody,
          },
        },
        labelLine: {
          show: false,
        },
        data: [],
      },
    ],
  };
  const categories = [];

  for (let i = 0; i < solves.length; i++) {
    categories.push(solves[i].challenge.category);
  }

  const keys = categories.filter((elem, pos) => {
    return categories.indexOf(elem) == pos;
  });

  const counts = [];
  for (let i = 0; i < keys.length; i++) {
    let count = 0;
    for (let x = 0; x < categories.length; x++) {
      if (categories[x] == keys[i]) {
        count++;
      }
    }
    counts.push(count);
  }

  keys.forEach((category, index) => {
    option.legend.data.push(category);
    option.series[0].data.push({
      value: counts[index],
      name: category,
      itemStyle: { color: getThemeSeriesColor(index) },
    });
  });

  if (optionMerge) {
    option = mergeObjects(option, optionMerge);
  }
  return option;
}
