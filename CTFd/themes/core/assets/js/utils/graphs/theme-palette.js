const SERIES_TONE_TOKENS = [
  "--ctfd-chart-tone-1",
  "--ctfd-chart-tone-2",
  "--ctfd-chart-tone-3",
  "--ctfd-chart-tone-4",
  "--ctfd-chart-tone-5",
  "--ctfd-chart-tone-6",
];

const SERIES_TONE_FALLBACKS = [
  "#ff9062",
  "#f4c46d",
  "#b8d67d",
  "#f2a78f",
  "#d6a85a",
  "#89a95f",
];

function getRootStyles() {
  return getComputedStyle(document.documentElement);
}

export function getThemeSeriesPalette() {
  const styles = getRootStyles();

  return SERIES_TONE_TOKENS.map((token, index) => {
    return styles.getPropertyValue(token).trim() || SERIES_TONE_FALLBACKS[index];
  });
}

export function getThemeSeriesColor(index) {
  const palette = getThemeSeriesPalette();
  return palette[index % palette.length];
}
