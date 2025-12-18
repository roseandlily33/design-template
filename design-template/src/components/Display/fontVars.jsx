export const buildFontVarsCSS = (fontScale = {}) => {
  // fontScale expected shape: { h1: { Desktop: {...}, Tablet: {...}, Mobile: {...} }, ... }
  let css = ":root {\n";
  Object.entries(fontScale).forEach(([tag, bps]) => {
    const d = bps?.Desktop;
    if (d) {
      css += `  --font-${tag}-size: ${d.fontSize}rem;\n`;
      css += `  --font-${tag}-weight: ${d.fontWeight};\n`;
      css += `  --font-${tag}-line-height: ${d.lineHeight};\n`;
      css += `  --font-${tag}-color: ${d.color};\n`;
    }
  });
  css += "}\n";

  css += "@media (max-width: 900px) {\n:root {\n";
  Object.entries(fontScale).forEach(([tag, bps]) => {
    const t = bps?.Tablet;
    if (t) {
      css += `  --font-${tag}-size: ${t.fontSize}rem;\n`;
      css += `  --font-${tag}-weight: ${t.fontWeight};\n`;
      css += `  --font-${tag}-line-height: ${t.lineHeight};\n`;
      css += `  --font-${tag}-color: ${t.color};\n`;
    }
  });
  css += "}\n}\n";

  css += "@media (max-width: 600px) {\n:root {\n";
  Object.entries(fontScale).forEach(([tag, bps]) => {
    const m = bps?.Mobile;
    if (m) {
      css += `  --font-${tag}-size: ${m.fontSize}rem;\n`;
      css += `  --font-${tag}-weight: ${m.fontWeight};\n`;
      css += `  --font-${tag}-line-height: ${m.lineHeight};\n`;
      css += `  --font-${tag}-color: ${m.color};\n`;
    }
  });
  css += "}\n}\n";

  return css;
};
