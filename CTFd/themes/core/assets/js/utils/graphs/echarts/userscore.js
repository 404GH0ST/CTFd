import { cumulativeSum } from "../../math";
import { mergeObjects } from "../../objects";
import { getThemeSeriesColor } from "../theme-palette";
import dayjs from "dayjs";

export function getOption(id, name, solves, awards, optionMerge) {
  const seriesColor = getThemeSeriesColor(0);

  let option = {
    title: {
      left: "center",
      text: "Score over Time",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      type: "scroll",
      orient: "horizontal",
      align: "left",
      bottom: 0,
      data: [name],
    },
    grid: {
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: [],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [],
  };

  const times = [];
  const scores = [];
  const total = solves.concat(awards);

  total.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  for (let i = 0; i < total.length; i++) {
    const date = dayjs(total[i].date);
    times.push(date.toDate());
    try {
      scores.push(total[i].challenge.value);
    } catch (e) {
      scores.push(total[i].value);
    }
  }

  times.forEach(time => {
    option.xAxis[0].data.push(time);
  });

  option.series.push({
    name: name,
    type: "line",
    label: {
      normal: {
        show: true,
        position: "top",
      },
    },
    areaStyle: {
      normal: {
        color: seriesColor,
      },
    },
    itemStyle: {
      normal: {
        color: seriesColor,
      },
    },
    data: cumulativeSum(scores),
  });

  if (optionMerge) {
    option = mergeObjects(option, optionMerge);
  }
  return option;
}
