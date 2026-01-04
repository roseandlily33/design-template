export const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  return [
    parseInt(h.length === 3 ? h[0] + h[0] : h.slice(0, 2), 16),
    parseInt(h.length === 3 ? h[1] + h[1] : h.slice(2, 4), 16),
    parseInt(h.length === 3 ? h[2] + h[2] : h.slice(4, 6), 16),
  ];
};

export const rgbToHex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map((c) => {
      const s = Math.max(0, Math.min(255, Math.round(c))).toString(16);
      return s.length === 1 ? "0" + s : s;
    })
    .join("");

// percent: positive -> lighten toward white, negative -> darken toward black (0.2 = +20%)
export const shade = (hex, percent) => {
  const [r, g, b] = hexToRgb(hex || "#000000");
  if (percent >= 0) {
    return rgbToHex(
      r + (255 - r) * percent,
      g + (255 - g) * percent,
      b + (255 - b) * percent
    );
  } else {
    const p = 1 + percent; // percent is negative
    return rgbToHex(r * p, g * p, b * p);
  }
};

// quick complement (invert) — simple, reliable, good for palettes
export const complement = (hex) => {
  const [r, g, b] = hexToRgb(hex || "#000000");
  return rgbToHex(255 - r, 255 - g, 255 - b);
};