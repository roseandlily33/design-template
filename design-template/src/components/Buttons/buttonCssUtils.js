// Utility functions for button CSS export

export function darken(hex, amt = 0.18) {
  if (!hex || !hex.startsWith("#")) return "#222";
  let c = hex.replace("#", "");
  if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  let num = parseInt(c, 16);
  let r = Math.max(0, ((num >> 16) & 0xff) - Math.round(255 * amt));
  let g = Math.max(0, ((num >> 8) & 0xff) - Math.round(255 * amt));
  let b = Math.max(0, (num & 0xff) - Math.round(255 * amt));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export function getButtonCss({
  label,
  color,
  radius,
  border,
  fontWeight,
  fontSize,
  letterSpacing,
  boxShadow,
  padding,
  textColor,
  textTransform,
  hoverBg,
  hoverText,
  hoverBorder,
  font,
  lineHeight,
}) {
  const outlineColor = darken(color);
  let css = `.${label}-button {\n`;
  css += `  background: ${color};\n`;
  css += `  color: ${textColor};\n`;
  css += `  border-radius: ${radius}px;\n`;
  css += `  border: ${border};\n`;
  css += `  padding: ${padding};\n`;
  css += `  font-size: ${fontSize}px;\n`;
  css += `  font-weight: ${fontWeight};\n`;
  css += `  font-family: '${font}', sans-serif;\n`;
  css += `  letter-spacing: ${letterSpacing}px;\n`;
  css += `  text-transform: ${textTransform};\n`;
  css += `  box-shadow: ${boxShadow || "none"};\n`;
  css += `  cursor: pointer;\n`;
  css += `  transition: background 0.2s;\n`;
  css += `  outline: 2px solid ${outlineColor};\n`;
  css += `  line-height: ${lineHeight};\n`;
  css += `}\n`;
  // Hover
  if (hoverBg || hoverText || hoverBorder) {
    css += `.${label}-button:hover {\n`;
    if (hoverBg) css += `  background: ${hoverBg};\n`;
    if (hoverText) css += `  color: ${hoverText};\n`;
    if (hoverBorder) css += `  border: ${hoverBorder};\n`;
    css += `}\n`;
  }
  return css;
}

export function copyCss(css) {
  if (navigator && navigator.clipboard) {
    navigator.clipboard.writeText(css);
  }
}
