import { shade, complement } from "./colourHelpers.js";
// rgbToHex, shade, complement, hexToRgb
export const initialRowsPalette1 = [
  {
    label: "Grey",
    colors: [
      "#ffffff", // white
      "#f5f5f5",
      "#e0e0e0",
      "#bdbdbd",
      "#9e9e9e",
      "#757575",
      "#424242",
      "#222222", // very dark grey
    ],
  },
  {
    label: "Main",
    colors: [
      shade("#6883a1", 0.45), // lightest
      shade("#6883a1", 0.3),
      shade("#6883a1", 0.18),
      shade("#6883a1", 0.08),
      "#6883a1", // base
      shade("#6883a1", -0.12),
      shade("#6883a1", -0.22),
      shade("#6883a1", -0.32), // darkest
    ],
  },
  {
    label: "Accent",
    colors: [
      shade("#e5c2c2", 0.45),
      shade("#e5c2c2", 0.3),
      shade("#e5c2c2", 0.18),
      shade("#e5c2c2", 0.08),
      "#e5c2c2",
      shade("#e5c2c2", -0.12),
      shade("#e5c2c2", -0.22),
      shade("#e5c2c2", -0.32),
    ],
  },
  {
    label: "Extra",
    colors: [
      "#b71c1c", // dark red
      "#ef9a9a", // light red
      "#1b5e20", // dark green
      "#a5d6a7", // light green
      "#fbc02d", // yellow
      "#fff59d", // light yellow
      complement("#6883a1"), // bonus 1
      complement("#e5c2c2"), // bonus 2
    ],
  },
];

// Palette 2: blue/green, 8 colors per row, light to dark
export const initialRowsPalette2 = [
  {
    label: "Grey",
    colors: [
      "#ffffff",
      "#e3f2fd",
      "#bbdefb",
      "#90caf9",
      "#64b5f6",
      "#2196f3",
      "#1976d2",
      "#0d47a1",
    ],
  },
  {
    label: "Main",
    colors: [
      "#e3f2fd",
      "#bbdefb",
      "#90caf9",
      "#64b5f6",
      "#2196f3",
      "#1976d2",
      "#1565c0",
      "#0d47a1",
    ],
  },
  {
    label: "Accent",
    colors: [
      "#e0f7fa", // lightest teal
      "#b2ebf2",
      "#80deea",
      "#4dd0e1",
      "#26c6da",
      "#00bcd4",
      "#0097a7",
      "#006064", // darkest teal
    ],
  },
  {
    label: "Extra",
    colors: [
      "#b71c1c", // dark red
      "#ef9a9a", // light red
      "#1b5e20", // dark green
      "#a5d6a7", // light green
      "#fbc02d", // yellow
      "#fff59d", // light yellow
      "#00bcd4", // bonus 1
      "#ff7043", // bonus 2 (orange)
    ],
  },
];

// Palette 3: orange/purple, 8 colors per row, light to dark
export const initialRowsPalette3 = [
  {
    label: "Grey",
    colors: [
      "#ffffff",
      "#f3e5f5",
      "#e1bee7",
      "#ce93d8",
      "#b39ddb",
      "#9575cd",
      "#7e57c2",
      "#4a148c",
    ],
  },
  {
    label: "Main",
    colors: [
      "#fff3e0",
      "#ffe0b2",
      "#ffcc80",
      "#ffb74d",
      "#ff9800",
      "#f57c00",
      "#ef6c00",
      "#e65100",
    ],
  },
  {
    label: "Accent",
    colors: [
      "#f3e5f5",
      "#ce93d8",
      "#ab47bc",
      "#8e24aa",
      "#6a1b9a",
      "#4a148c",
      "#ad1457",
      "#d81b60",
    ],
  },
  {
    label: "Extra",
    colors: [
      "#b71c1c", // dark red
      "#ef9a9a", // light red
      "#1b5e20", // dark green
      "#a5d6a7", // light green
      "#fbc02d", // yellow
      "#fff59d", // light yellow
      "#3949ab", // bonus 1 (blue/purple)
      "#ff7043", // bonus 2 (orange)
    ],
  },
];
