// Button color helpers from palette
export const getPaletteColor = (palette, label, idx = 0) => {
  if (!Array.isArray(palette)) return undefined;
  const row = palette.find((r) => r.label === label);
  if (!row || !Array.isArray(row.colors)) return undefined;
  // Find first non-null, non-undefined, non-empty string color
  return row.colors.find((c) => typeof c === "string" && c);
};

// Default button state for a palette
export const defaultButtonState = (palette) => ({
  primary: {
    color: getPaletteColor(palette, "Main") || "#6883a1",
    textColor: "#fff",
    radius: 8,
    border: "none",
    fontWeight: 500,
    fontSize: 18,
    letterSpacing: 0,
    boxShadow: "",
    padding: "12px 32px",
    textTransform: "none",
    hoverBg: "",
    hoverText: "",
    hoverBorder: "",
    lineHeight: 1.2,
  },
  secondary: {
    color: getPaletteColor(palette, "Accent") || "#e5c2c2",
    textColor: "#fff",
    radius: 8,
    border: "none",
    fontWeight: 500,
    fontSize: 18,
    letterSpacing: 0,
    boxShadow: "",
    padding: "12px 32px",
    textTransform: "none",
    hoverBg: "",
    hoverText: "",
    hoverBorder: "",
    lineHeight: 1.2,
  },
  tertiary: {
    color: getPaletteColor(palette, "Grey") || "#a4a4a4",
    textColor: "#fff",
    radius: 8,
    border: "none",
    fontWeight: 500,
    fontSize: 18,
    letterSpacing: 0,
    boxShadow: "",
    padding: "12px 32px",
    textTransform: "none",
    hoverBg: "",
    hoverText: "",
    hoverBorder: "",
    lineHeight: 1.2,
  },
});
