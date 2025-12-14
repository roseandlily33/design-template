"use client";
import React from "react";
import styles from "./page.module.css";
import {
  Inter,
  Roboto,
  Montserrat,
  Lora,
  Oswald,
  Poppins,
  Merriweather,
  Open_Sans,
  Playfair_Display,
  Lobster,
  Lobster_Two,
  Raleway,
  DM_Sans,
  Quicksand,
  Bebas_Neue,
  Libre_Baskerville,
  Abril_Fatface,
  Prata,
} from "next/font/google";
import ColourPicker from "@/components/ColourPicker/ColourPicker.component";
import FontPicker from "@/components/FontPicker/FontPicker.component";
import FontScale from "@/components/FontScale/FontScale.component";
import PrimaryButton from "@/components/Buttons/PrimaryButton.component";
import SecondaryButton from "@/components/Buttons/SecondaryButton.component";
import TertiaryButton from "@/components/Buttons/TertiaryButton.component";
import SpacingChart from "@/components/SpacingChart/SpacingChart.component";
import Display from "@/components/Display/Display.component";
import Header from "@/components/Header/Header.component";
import Buttons from "@/components/Buttons/Buttons.component";
import Logo from "@/components/Logo/Logo.component";
import BorderRadius from "@/components/BorderRadius/BorderRadius.component";

import { useState, useEffect } from "react";
// ColourPicker initial state

// Organize fonts by type
const displayFonts = [
  "Lobster",
  "Lobster Two",
  "Bebas Neue",
  "Oswald",
  "Abril Fatface",
  "Playfair Display",
  "Prata",
];
const bodyFonts = [
  "Inter",
  "Roboto",
  "Montserrat",
  "Lora",
  "Poppins",
  "Merriweather",
  "Open Sans",
  "Raleway",
  "DM Sans",
  "Quicksand",
  "Libre Baskerville",
];
const allFonts = [...displayFonts, ...bodyFonts];

// Google font instances
const inter = Inter({ subsets: ["latin"], weight: "400" });
const roboto = Roboto({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });
const lora = Lora({ subsets: ["latin"], weight: "400" });
const oswald = Oswald({ subsets: ["latin"], weight: "400" });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });
const merriweather = Merriweather({ subsets: ["latin"], weight: "400" });
const openSans = Open_Sans({ subsets: ["latin"], weight: "400" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: "400" });
const lobster = Lobster({ subsets: ["latin"], weight: "400" });
const lobsterTwo = Lobster_Two({ subsets: ["latin"], weight: "400" });
const raleway = Raleway({ subsets: ["latin"], weight: "400" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: "400" });
const quicksand = Quicksand({ subsets: ["latin"], weight: "400" });
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: "400",
});
const abrilFatface = Abril_Fatface({ subsets: ["latin"], weight: "400" });
const prata = Prata({ subsets: ["latin"], weight: "400" });

// Map font names to classNames
const fontMap = {
  Inter: inter.className,
  Roboto: roboto.className,
  Montserrat: montserrat.className,
  Lora: lora.className,
  Oswald: oswald.className,
  Poppins: poppins.className,
  Merriweather: merriweather.className,
  "Open Sans": openSans.className,
  "Playfair Display": playfairDisplay.className,
  Lobster: lobster.className,
  "Lobster Two": lobsterTwo.className,
  Raleway: raleway.className,
  "DM Sans": dmSans.className,
  Quicksand: quicksand.className,
  "Bebas Neue": bebasNeue.className,
  "Libre Baskerville": libreBaskerville.className,
  "Abril Fatface": abrilFatface.className,
  Prata: prata.className,
};

export default function Home() {
  // Color rows state for ColourPicker
  const [selectedFontSetIdx, setSelectedFontSetIdx] = useState(0);
  const [fontSets, setFontSets] = useState([
    { head: displayFonts[0], main: bodyFonts[0], extra: allFonts[0] },
    { head: displayFonts[1], main: bodyFonts[1], extra: allFonts[1] },
    { head: displayFonts[2], main: bodyFonts[2], extra: allFonts[2] },
  ]);

  const handleFontSetChange = (setIdx, type, value) => {
    setFontSets((prev) =>
      prev.map((set, i) => (i === setIdx ? { ...set, [type]: value } : set))
    );
  };

  const handleSelectFontSet = (setIdx) => {
    setSelectedFontSetIdx(setIdx);
  };

  // Pass selected font set to other components as needed
  const selectedFontSet = fontSets[selectedFontSetIdx];

  // Spacing scale state (lifted)
  const [spacingBase, setSpacingBase] = useState(1); // default 1rem
  const [spacingUnit, setSpacingUnit] = useState("rem");

  // Button option state for each button type
  // Primary Button
  const [primaryColor, setPrimaryColor] = useState("#6883a1");
  const [primaryRadius, setPrimaryRadius] = useState(8);
  const [primaryBorder, setPrimaryBorder] = useState("none");
  const [primaryFontWeight, setPrimaryFontWeight] = useState(500);
  const [primaryFontSize, setPrimaryFontSize] = useState(18);
  const [primaryLetterSpacing, setPrimaryLetterSpacing] = useState(0);
  const [primaryBoxShadow, setPrimaryBoxShadow] = useState("");
  const [primaryPadding, setPrimaryPadding] = useState("12px 32px");
  const [primaryTextColor, setPrimaryTextColor] = useState("#fff");
  const [primaryTextTransform, setPrimaryTextTransform] = useState("none");
  const [primaryHoverBg, setPrimaryHoverBg] = useState("");
  const [primaryHoverText, setPrimaryHoverText] = useState("");
  const [primaryHoverBorder, setPrimaryHoverBorder] = useState("");
  const [primaryLineHeight, setPrimaryLineHeight] = useState(1.2);

  // Secondary Button
  // "#6d9ed7ff" - do not delete
  const [secondaryColor, setSecondaryColor] = useState("#e5c2c2");
  const [secondaryRadius, setSecondaryRadius] = useState(8);
  const [secondaryBorder, setSecondaryBorder] = useState("none");
  const [secondaryFontWeight, setSecondaryFontWeight] = useState(500);
  const [secondaryFontSize, setSecondaryFontSize] = useState(18);
  const [secondaryLetterSpacing, setSecondaryLetterSpacing] = useState(0);
  const [secondaryBoxShadow, setSecondaryBoxShadow] = useState("");
  const [secondaryPadding, setSecondaryPadding] = useState("12px 32px");
  const [secondaryTextColor, setSecondaryTextColor] = useState("#fff");
  const [secondaryTextTransform, setSecondaryTextTransform] = useState("none");
  const [secondaryHoverBg, setSecondaryHoverBg] = useState("");
  const [secondaryHoverText, setSecondaryHoverText] = useState("");
  const [secondaryHoverBorder, setSecondaryHoverBorder] = useState("");
  const [secondaryLineHeight, setSecondaryLineHeight] = useState(1.2);

  // Tertiary Button
  const [tertiaryColor, setTertiaryColor] = useState("#a4a4a4ff");
  const [tertiaryRadius, setTertiaryRadius] = useState(8);
  const [tertiaryBorder, setTertiaryBorder] = useState("none");
  const [tertiaryFontWeight, setTertiaryFontWeight] = useState(500);
  const [tertiaryFontSize, setTertiaryFontSize] = useState(18);
  const [tertiaryLetterSpacing, setTertiaryLetterSpacing] = useState(0);
  const [tertiaryBoxShadow, setTertiaryBoxShadow] = useState("");
  const [tertiaryPadding, setTertiaryPadding] = useState("12px 32px");
  const [tertiaryTextColor, setTertiaryTextColor] = useState("#fff");
  const [tertiaryTextTransform, setTertiaryTextTransform] = useState("none");
  const [tertiaryHoverBg, setTertiaryHoverBg] = useState("");
  const [tertiaryHoverText, setTertiaryHoverText] = useState("");
  const [tertiaryHoverBorder, setTertiaryHoverBorder] = useState("");
  const [tertiaryLineHeight, setTertiaryLineHeight] = useState(1.2);

  // Prepare props and setters for each button
  const primaryProps = {
    color: primaryColor,
    setColor: setPrimaryColor,
    radius: primaryRadius,
    setRadius: setPrimaryRadius,
    border: primaryBorder,
    setBorder: setPrimaryBorder,
    fontWeight: primaryFontWeight,
    setFontWeight: setPrimaryFontWeight,
    fontSize: primaryFontSize,
    setFontSize: setPrimaryFontSize,
    letterSpacing: primaryLetterSpacing,
    setLetterSpacing: setPrimaryLetterSpacing,
    boxShadow: primaryBoxShadow,
    setBoxShadow: setPrimaryBoxShadow,
    padding: primaryPadding,
    setPadding: setPrimaryPadding,
    textColor: primaryTextColor,
    setTextColor: setPrimaryTextColor,
    textTransform: primaryTextTransform,
    setTextTransform: setPrimaryTextTransform,
    hoverBg: primaryHoverBg,
    setHoverBg: setPrimaryHoverBg,
    hoverText: primaryHoverText,
    setHoverText: setPrimaryHoverText,
    hoverBorder: primaryHoverBorder,
    setHoverBorder: setPrimaryHoverBorder,
    lineHeight: primaryLineHeight,
    setLineHeight: setPrimaryLineHeight,
  };
  const secondaryProps = {
    color: secondaryColor,
    setColor: setSecondaryColor,
    radius: secondaryRadius,
    setRadius: setSecondaryRadius,
    border: secondaryBorder,
    setBorder: setSecondaryBorder,
    fontWeight: secondaryFontWeight,
    setFontWeight: setSecondaryFontWeight,
    fontSize: secondaryFontSize,
    setFontSize: setSecondaryFontSize,
    letterSpacing: secondaryLetterSpacing,
    setLetterSpacing: setSecondaryLetterSpacing,
    boxShadow: secondaryBoxShadow,
    setBoxShadow: setSecondaryBoxShadow,
    padding: secondaryPadding,
    setPadding: setSecondaryPadding,
    textColor: secondaryTextColor,
    setTextColor: setSecondaryTextColor,
    textTransform: secondaryTextTransform,
    setTextTransform: setSecondaryTextTransform,
    hoverBg: secondaryHoverBg,
    setHoverBg: setSecondaryHoverBg,
    hoverText: secondaryHoverText,
    setHoverText: setSecondaryHoverText,
    hoverBorder: secondaryHoverBorder,
    setHoverBorder: setSecondaryHoverBorder,
    lineHeight: secondaryLineHeight,
    setLineHeight: setSecondaryLineHeight,
  };
  const tertiaryProps = {
    color: tertiaryColor,
    setColor: setTertiaryColor,
    radius: tertiaryRadius,
    setRadius: setTertiaryRadius,
    border: tertiaryBorder,
    setBorder: setTertiaryBorder,
    fontWeight: tertiaryFontWeight,
    setFontWeight: setTertiaryFontWeight,
    fontSize: tertiaryFontSize,
    setFontSize: setTertiaryFontSize,
    letterSpacing: tertiaryLetterSpacing,
    setLetterSpacing: setTertiaryLetterSpacing,
    boxShadow: tertiaryBoxShadow,
    setBoxShadow: setTertiaryBoxShadow,
    padding: tertiaryPadding,
    setPadding: setTertiaryPadding,
    textColor: tertiaryTextColor,
    setTextColor: setTertiaryTextColor,
    textTransform: tertiaryTextTransform,
    setTextTransform: setTertiaryTextTransform,
    hoverBg: tertiaryHoverBg,
    setHoverBg: setTertiaryHoverBg,
    hoverText: tertiaryHoverText,
    setHoverText: setTertiaryHoverText,
    hoverBorder: tertiaryHoverBorder,
    setHoverBorder: setTertiaryHoverBorder,
    lineHeight: tertiaryLineHeight,
    setLineHeight: setTertiaryLineHeight,
  };

  const [drawerOpen, setDrawerOpen] = React.useState(true);

  // Simple color helpers (shade and complement)
  const hexToRgb = (hex) => {
    const h = hex.replace("#", "");
    return [
      parseInt(h.length === 3 ? h[0] + h[0] : h.slice(0, 2), 16),
      parseInt(h.length === 3 ? h[1] + h[1] : h.slice(2, 4), 16),
      parseInt(h.length === 3 ? h[2] + h[2] : h.slice(4, 6), 16),
    ];
  };

  const rgbToHex = (r, g, b) =>
    "#" +
    [r, g, b]
      .map((c) => {
        const s = Math.max(0, Math.min(255, Math.round(c))).toString(16);
        return s.length === 1 ? "0" + s : s;
      })
      .join("");

  // percent: positive -> lighten toward white, negative -> darken toward black (0.2 = +20%)
  const shade = (hex, percent) => {
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
  const complement = (hex) => {
    const [r, g, b] = hexToRgb(hex || "#000000");
    return rgbToHex(255 - r, 255 - g, 255 - b);
  };

  // initial palette #1 derived from your button colors
  const initialRowsPalette1 = [
    {
      label: "Grey",
      colors: [
        tertiaryColor || "#a4a4a4",
        shade(tertiaryColor || "#a4a4a4", 0.18),
        shade(tertiaryColor || "#a4a4a4", -0.12),
        shade(tertiaryColor || "#a4a4a4", 0.36),
      ],
    },
    {
      label: "Main",
      colors: [
        primaryColor || "#6883a1",
        shade(primaryColor || "#6883a1", 0.16),
        shade(primaryColor || "#6883a1", -0.14),
        shade(primaryColor || "#6883a1", 0.38),
      ],
    },
    {
      label: "Accent",
      colors: [
        secondaryColor || "#e5c2c2",
        shade(secondaryColor || "#e5c2c2", 0.16),
        shade(secondaryColor || "#e5c2c2", -0.14),
        shade(secondaryColor || "#e5c2c2", 0.38),
      ],
    },
    {
      label: "Extra",
      // complementary picks for the above three; last slot is a neutral white
      colors: [
        complement(primaryColor || "#6883a1"),
        complement(secondaryColor || "#e5c2c2"),
        complement(tertiaryColor || "#a4a4a4"),
        "#ffffff",
      ],
    },
  ];

  const initialRowsPalette2 = [
    { label: "Grey", colors: [null, null, null, null] },
    { label: "Main", colors: [null, null, null, null] },
    { label: "Accent", colors: [null, null, null, null] },
    { label: "Extra", colors: [null, null, null, null] },
  ];
  const initialRowsPalette3 = [
    { label: "Grey", colors: [null, null, null, null] },
    { label: "Main", colors: [null, null, null, null] },
    { label: "Accent", colors: [null, null, null, null] },
    { label: "Extra", colors: [null, null, null, null] },
  ];
  const [palette1, setPalette1] = useState(initialRowsPalette1);
  const [palette2, setPalette2] = useState(initialRowsPalette2);
  const [palette3, setPalette3] = useState(initialRowsPalette3);
  // `selected` mirrors the active palette object so Display/Navbar always get current colors.
  const [selected, setSelected] = useState(palette1);

  // Keep `selected` in sync when palette1 is edited (so Display updates immediately).
  useEffect(() => {
    setSelected(palette1);
  }, [palette1]);

  const [logoUrl, setLogoUrl] = useState(null);
  const [radius, setRadius] = useState(0);
  const [projectTitle, setProjectTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const backendUrl = process.env.NEXT_PUBLIC_BE_URL;
  const [base, setBase] = useState(1); // default 1rem
  const [unit, setUnit] = useState("rem");

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "12px 32px",
        }}
      >
        <input
          aria-label="Project title"
          placeholder="Project title"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
            minWidth: 220,
          }}
        />
        <button
          onClick={async () => {
            setSaveMessage("");
            setSaving(true);
            try {
              const project = {
                title: projectTitle || `Untitled ${new Date().toISOString()}`,
                borderRadius: radius,
                logo: logoUrl || null,
                primaryButton: {
                  color: primaryColor,
                  textColor: primaryTextColor,
                  radius: primaryRadius,
                  border: primaryBorder,
                  padding: primaryPadding,
                  fontSize: primaryFontSize,
                  fontWeight: primaryFontWeight,
                  letterSpacing: primaryLetterSpacing,
                  boxShadow: primaryBoxShadow,
                  lineHeight: primaryLineHeight,
                  hoverBg: primaryHoverBg,
                  hoverText: primaryHoverText,
                  hoverBorder: primaryHoverBorder,
                },
                secondaryButton: {
                  color: secondaryColor,
                  textColor: secondaryTextColor,
                  radius: secondaryRadius,
                  border: secondaryBorder,
                  padding: secondaryPadding,
                  fontSize: secondaryFontSize,
                  fontWeight: secondaryFontWeight,
                  letterSpacing: secondaryLetterSpacing,
                  boxShadow: secondaryBoxShadow,
                  lineHeight: secondaryLineHeight,
                  hoverBg: secondaryHoverBg,
                  hoverText: secondaryHoverText,
                  hoverBorder: secondaryHoverBorder,
                },
                tertiaryButton: {
                  color: tertiaryColor,
                  textColor: tertiaryTextColor,
                  radius: tertiaryRadius,
                  border: tertiaryBorder,
                  padding: tertiaryPadding,
                  fontSize: tertiaryFontSize,
                  fontWeight: tertiaryFontWeight,
                  letterSpacing: tertiaryLetterSpacing,
                  boxShadow: tertiaryBoxShadow,
                  lineHeight: tertiaryLineHeight,
                  hoverBg: tertiaryHoverBg,
                  hoverText: tertiaryHoverText,
                  hoverBorder: tertiaryHoverBorder,
                },
                fontPicker1: {
                  head: fontSets[0]?.head,
                  main: fontSets[0]?.main,
                  extra: fontSets[0]?.extra,
                },
                fontPicker2: {
                  head: fontSets[1]?.head,
                  main: fontSets[1]?.main,
                  extra: fontSets[1]?.extra,
                },
                fontPicker3: {
                  head: fontSets[2]?.head,
                  main: fontSets[2]?.main,
                  extra: fontSets[2]?.extra,
                },
                colourPicker1: { rows: palette1 },
                colourPicker2: { rows: palette2 },
                colourPicker3: { rows: palette3 },
                spacingScale: { base: spacingBase, unit: spacingUnit },
                fontScale: {},
              };

              const res = await fetch(`${backendUrl}/api/project`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ project }),
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data.error || "Save failed");
              setSaveMessage("Project saved");
            } catch (err) {
              console.error("Save error", err);
              setSaveMessage(err.message || "Save failed");
            } finally {
              setSaving(false);
            }
          }}
          disabled={saving}
          style={{
            padding: "8px 14px",
            borderRadius: 8,
            background: "#6883a1",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {saving ? "Saving..." : "Save Project"}
        </button>
        {saveMessage && (
          <div style={{ marginLeft: 12, color: "#222" }}>{saveMessage}</div>
        )}
      </div>
      <main className={styles.displayRoot}>
        {/* Drawer overlay for leftPane */}
        {/* Floating drawer toggle button always visible */}
        <button
          className={styles.drawerToggle}
          onClick={() => setDrawerOpen((open) => !open)}
          aria-label={drawerOpen ? "Close panel" : "Open panel"}
        >
          {drawerOpen ? "←" : "→"}
        </button>
        {/* Left pane only visible when open */}
        {drawerOpen && (
          <div
            className={styles.leftPane + " " + styles.leftPaneOpen}
            style={{ zIndex: 15 }}
          >
            <div className={styles.leftPaneContent}>
              <ColourPicker
                // rows={colorRows}
                // setRows={setColorRows}
                palette1={palette1}
                setPalette1={setPalette1}
                palette2={palette2}
                setPalette2={setPalette2}
                palette3={palette3}
                setPalette3={setPalette3}
                selected={selected}
                setSelected={setSelected}
              />
              <FontPicker
                fontLists={[displayFonts, bodyFonts, allFonts]}
                fontMap={fontMap}
                fontSets={fontSets}
                onFontSetChange={handleFontSetChange}
                selectedFontSetIdx={selectedFontSetIdx}
                onSelectFontSet={handleSelectFontSet}
              />
              <FontScale fontSet={selectedFontSet} fontMap={fontMap} />
              <SpacingChart
                colours={selected}
                base={base}
                setBase={setBase}
                unit={unit}
                setUnit={setUnit}
              />
              <Buttons
                font={selectedFontSet.main}
                fontMap={fontMap}
                colors={selected}
                primaryProps={primaryProps}
                secondaryProps={secondaryProps}
                tertiaryProps={tertiaryProps}
              />
              <Logo logoUrl={logoUrl} setLogoUrl={setLogoUrl} />
              <BorderRadius radius={radius} setRadius={setRadius} />
            </div>
          </div>
        )}
        {/* Right pane always underneath, responsive */}
        <div className={styles.rightPane}>
          <Display
            primaryButton={
              <PrimaryButton
                fontClass={fontMap[selectedFontSet.main]}
                colors={selected}
                edit={false}
                primaryProps={primaryProps}
              />
            }
            secondaryButton={
              <SecondaryButton
                fontClass={fontMap[selectedFontSet.main]}
                colors={selected}
                edit={false}
                secondaryProps={secondaryProps}
              />
            }
            tertiaryButton={
              <TertiaryButton
                fontClass={fontMap[selectedFontSet.main]}
                colors={selected}
                edit={false}
                tertiaryProps={tertiaryProps}
              />
            }
            logo={logoUrl}
            borderRadius={radius}
            colours={selected}
            fonts={selectedFontSet}
            fontMap={fontMap}
            base={base}
            unit={unit}
          />
        </div>
      </main>
    </div>
  );
}
