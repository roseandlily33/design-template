export const TAGS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "small",
  "blockquote",
  "a",
];
export const BREAKPOINTS = ["Desktop", "Tablet", "Mobile"];

export function getFontType(tag) {
  if (["h1", "h2", "h3"].includes(tag)) return "head";
  if (["h4", "h5", "h6", "blockquote", "p"].includes(tag)) return "main";
  return "extra";
}

export const defaultFontSizes = {
  h1: 3,
  h2: 2.25,
  h3: 1.75,
  h4: 1.5,
  h5: 1.25,
  h6: 1,
  p: 1,
  small: 0.875,
  blockquote: 1.25,
  a: 1,
};

export function buildDefaultStyles() {
  const ds = {};
  TAGS.forEach((tag) => {
    const base = defaultFontSizes[tag] || 1;
    ds[tag] = {
      Desktop: {
        fontSize: parseFloat(base.toFixed(3)),
        fontWeight: 400,
        textTransform: "none",
        lineHeight: 1.2,
        letterSpacing: 0,
        color: "#222",
        border: "none",
      },
      Tablet: {
        fontSize: parseFloat((base * 0.92).toFixed(3)),
        fontWeight: 400,
        textTransform: "none",
        lineHeight: 1.3,
        letterSpacing: 0,
        color: "#222",
        border: "none",
      },
      Mobile: {
        fontSize: parseFloat((base * 0.85).toFixed(3)),
        fontWeight: 400,
        textTransform: "none",
        lineHeight: 1.4,
        letterSpacing: 0,
        color: "#222",
        border: "none",
      },
    };
  });
  return ds;
}

export const TYPE_SCALES = [
  { name: "Minor Third", ratio: 1.2 },
  { name: "Major Third", ratio: 1.25 },
  { name: "Perfect Fourth", ratio: 1.333 },
  { name: "Custom", ratio: null },
];

// compute full styles for a chosen type scale (pure)
export function computeTypeScaleStyles(scaleIdx, prevStyles) {
  const scale = TYPE_SCALES[scaleIdx];
  const newStyles = { ...(prevStyles || buildDefaultStyles()) };

  if (scale?.name === "Custom" || !scale?.ratio) {
    // custom: reset to defaults (respect prev structure but sizes from defaultFontSizes)
    const defaults = buildDefaultStyles();
    TAGS.forEach((tag) => {
      BREAKPOINTS.forEach((bp) => {
        newStyles[tag] = {
          ...(newStyles[tag] || {}),
          [bp]: {
            ...(newStyles[tag]?.[bp] || {}),
            fontSize: defaults[tag][bp].fontSize,
          },
        };
      });
    });
    return newStyles;
  }

  const ratio = scale.ratio;
  const tags = [...TAGS].reverse(); // same approach as original
  const base = 1;
  BREAKPOINTS.forEach((bp) => {
    tags.forEach((tag, i) => {
      let fontSize = base * Math.pow(ratio, i);
      if (bp === "Tablet") fontSize *= 0.82;
      if (bp === "Mobile") fontSize *= 0.68;
      newStyles[tag] = {
        ...(newStyles[tag] || {}),
        [bp]: {
          ...(newStyles[tag]?.[bp] || {}),
          fontSize: parseFloat(fontSize.toFixed(3)),
        },
      };
    });
  });

  return newStyles;
}

// pure cascade helper: returns new styles where Desktop styles are copied to Tablet & Mobile for a tag
export function cascadeDesktopToAllForTag(prevStyles, tag) {
  const next = { ...(prevStyles || {}) };
  const desktop = { ...(next[tag]?.Desktop || {}) };
  next[tag] = {
    ...(next[tag] || {}),
    Tablet: { ...(next[tag]?.Tablet || {}), ...desktop },
    Mobile: { ...(next[tag]?.Mobile || {}), ...desktop },
  };
  return next;
}

// pure CSS export generator
export function generateCSSFromStyles(stylesState) {
  let css = "";
  // Desktop
  css += "/* Desktop styles */\n";
  TAGS.forEach((tag) => {
    const s = stylesState[tag].Desktop;
    css += `${tag} {\n`;
    css += `  font-size: ${s.fontSize}rem;\n`;
    css += `  font-weight: ${s.fontWeight};\n`;
    css += `  text-transform: ${s.textTransform};\n`;
    css += `  line-height: ${s.lineHeight};\n`;
    css += `  letter-spacing: ${s.letterSpacing}rem;\n`;
    css += `  color: ${s.color};\n`;
    if (s.border && s.border !== "none") css += `  border: ${s.border};\n`;
    css += "}\n\n";
  });
  // Tablet
  css += "/* Tablet styles */\n@media (max-width: 900px) {\n";
  TAGS.forEach((tag) => {
    const s = stylesState[tag].Tablet;
    css += `  ${tag} {\n`;
    css += `    font-size: ${s.fontSize}rem;\n`;
    css += `    font-weight: ${s.fontWeight};\n`;
    css += `    text-transform: ${s.textTransform};\n`;
    css += `    line-height: ${s.lineHeight};\n`;
    css += `    letter-spacing: ${s.letterSpacing}rem;\n`;
    css += `    color: ${s.color};\n`;
    if (s.border && s.border !== "none") css += `    border: ${s.border};\n`;
    css += `  }\n\n`;
  });
  css += "}\n\n";
  // Mobile
  css += "/* Mobile styles */\n@media (max-width: 600px) {\n";
  TAGS.forEach((tag) => {
    const s = stylesState[tag].Mobile;
    css += `  ${tag} {\n`;
    css += `    font-size: ${s.fontSize}rem;\n`;
    css += `    font-weight: ${s.fontWeight};\n`;
    css += `    text-transform: ${s.textTransform};\n`;
    css += `    line-height: ${s.lineHeight};\n`;
    css += `    letter-spacing: ${s.letterSpacing}rem;\n`;
    css += `    color: ${s.color};\n`;
    if (s.border && s.border !== "none") css += `    border: ${s.border};\n`;
    css += `  }\n\n`;
  });
  css += "}\n";
  return css;
}
