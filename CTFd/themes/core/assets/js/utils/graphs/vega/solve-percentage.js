function getThemeStatColors() {
  const styles = getComputedStyle(document.documentElement);
  return {
    solve: styles.getPropertyValue("--ctfd-success").trim() || "#00d13f",
    fail: styles.getPropertyValue("--ctfd-danger").trim() || "#cf2600",
  };
}

export function getSpec(description, values) {
  const colors = getThemeStatColors();
  return {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: description,
    data: {
      values: values,
    },
    width: "container",

    layer: [
      {
        params: [
          {
            name: "category",
            select: {
              type: "point",
              fields: ["category"],
            },
            bind: "legend",
          },
        ],
        mark: {
          type: "arc",
          innerRadius: 50,
          outerRadius: 95,
          stroke: "#fff",
        },
        encoding: {
          opacity: {
            condition: {
              param: "category",
              value: 1,
            },
            value: 0.2,
          },
        },
      },
      {
        mark: {
          type: "text",
          radius: 105,
        },
        encoding: {
          text: {
            field: "value",
            type: "quantitative",
          },
        },
      },
    ],
    encoding: {
      theta: {
        field: "value",
        type: "quantitative",
        stack: true,
      },
      color: {
        field: "category",
        type: "nominal",
        scale: {
          domain: ["Solves", "Fails"],
          range: [colors.solve, colors.fail],
        },
        legend: {
          orient: "bottom",
        },
      },
    },
  };
}

export function getValues(solves, fails) {
  return [
    {
      category: "Solves",
      value: solves.meta.count,
    },
    {
      category: "Fails",
      value: fails.meta.count,
    },
  ];
}
