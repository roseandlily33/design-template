export const spacingRatios = {
  xxxs: 0.15,
  xxs: 0.25,
  xs: 0.5,
  s: 0.75,
  m: 1,
  l: 1.5,
  xl: 2,
  xxl: 3,
  xxxl: 4,
  xxxxl: 6,
  xxxxxl: 8,
  xxxxxxl: 12,
  xxxxxxxl: 16,
  xxxxxxxxl: 24,
};

export function formatValue(val, unit) {
  if (unit === "rem") return `${parseFloat(val.toFixed(3))}rem`;
  return `${Math.round(val)}px`;
}

export function buildSpacingVars(base, unit) {
  const vars = {};
  Object.entries(spacingRatios).forEach(([label, ratio]) => {
    vars[`--spacing-${label}`] = formatValue(base * ratio, unit);
  });
  return vars;
}

// small convenience object for passing to children (numbers/strings)
export function buildSpacingChart(base, unit) {
  const chart = {};
  Object.entries(spacingRatios).forEach(([label, ratio]) => {
    chart[label] = {
      value: base * ratio,
      css: formatValue(base * ratio, unit),
    };
  });
  return chart;
}
