"use client";
import React from "react";
import styles from "./page.module.css";
import {
  initialRowsPalette1,
  initialRowsPalette2,
  initialRowsPalette3,
} from "@/utils/colourPalettes";
import { fontMap, allFonts, displayFonts, bodyFonts } from "@/utils/fonts";
import { buildDefaultStyles } from "../components/FontScale/fontscale.helpers";
import SaveAndTabs from "@/components/Header/SaveAndTabs";
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
import ImageSelector from "@/components/ImageSelector/ImageSelector.component";

import { useState, useEffect } from "react";
import { useTabOverrides } from "@/utils/tabOverrides";
import { defaultButtonState } from "@/utils/buttonState";

export default function Home() {
  // Hero image selection (static or uploaded)
  const [heroImgUrl, setHeroImgUrl] = useState("/Picture.jpg");
  // Per-tab color overrides using custom hook
  const tabCount = 3;
  const [footerOverrides, handleFooterColorChange] = useTabOverrides(tabCount);
  const [testimonialOverrides, handleTestimonialColorChange] =
    useTabOverrides(tabCount);
  const [heroImgOverrides, handleHeroImgColorChange] =
    useTabOverrides(tabCount);
  const [descriptionOverrides, handleDescriptionColorChange] =
    useTabOverrides(tabCount);
  const [companiesOverrides, handleCompaniesColorChange] =
    useTabOverrides(tabCount);
  const [threeIconsOverrides, handleThreeIconsColorChange] =
    useTabOverrides(tabCount);
  const [navbarOverrides, handleNavbarColorChange] = useTabOverrides(tabCount);
  // Tabs for template selection
  const [activeTab, setActiveTab] = useState(0); // 0: palette1, 1: palette2, 2: palette3

  // Color rows state for ColourPicker
  const [selectedFontSetIdx, setSelectedFontSetIdx] = useState(0);
  const [fontSets, setFontSets] = useState([
    { head: displayFonts[0], main: bodyFonts[0], extra: allFonts[0] },
    { head: displayFonts[1], main: bodyFonts[1], extra: allFonts[1] },
    { head: displayFonts[2], main: bodyFonts[2], extra: allFonts[2] },
  ]);
  const [palette1, setPalette1] = useState(initialRowsPalette1);
  const [palette2, setPalette2] = useState(initialRowsPalette2);
  const [palette3, setPalette3] = useState(initialRowsPalette3);

  // Only the current tab's palette is editable
  const palettes = [palette1, palette2, palette3];
  const setPalettes = [setPalette1, setPalette2, setPalette3];
  const selected = palettes[activeTab];
  const setSelected = setPalettes[activeTab];

  const handleFontSetChange = (setIdx, type, value) => {
    setFontSets((prev) =>
      prev.map((set, i) => (i === setIdx ? { ...set, [type]: value } : set))
    );
  };

  const handleSelectFontSet = (setIdx) => {
    setSelectedFontSetIdx(setIdx);
  };

  const selectedFontSet = fontSets[selectedFontSetIdx];

  const [spacingBase, setSpacingBase] = useState(1); // default 1rem
  const [spacingUnit, setSpacingUnit] = useState("rem");

  // Store button state for each palette tab
  const [buttonStates, setButtonStates] = useState([
    defaultButtonState(initialRowsPalette1),
    defaultButtonState(initialRowsPalette2),
    defaultButtonState(initialRowsPalette3),
  ]);

  useEffect(() => {
    setButtonStates((prev) =>
      prev.map((state, idx) => {
        const palette = palettes[idx];
        const def = defaultButtonState(palette);
        return {
          primary: {
            ...state.primary,
            color:
              state.primary.color ===
              defaultButtonState(palettes[idx]).primary.color
                ? def.primary.color
                : state.primary.color,
          },
          secondary: {
            ...state.secondary,
            color:
              state.secondary.color ===
              defaultButtonState(palettes[idx]).secondary.color
                ? def.secondary.color
                : state.secondary.color,
          },
          tertiary: {
            ...state.tertiary,
            color:
              state.tertiary.color ===
              defaultButtonState(palettes[idx]).tertiary.color
                ? def.tertiary.color
                : state.tertiary.color,
          },
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palette1, palette2, palette3]);

  // Generic button property setter
  const setButtonProp = (type, prop, value) => {
    setButtonStates((prev) =>
      prev.map((s, i) =>
        i === activeTab ? { ...s, [type]: { ...s[type], [prop]: value } } : s
      )
    );
  };

  const primaryProps = {
    ...buttonStates[activeTab].primary,
    setColor: (c) => setButtonProp("primary", "color", c),
    setTextColor: (c) => setButtonProp("primary", "textColor", c),
    setRadius: (v) => setButtonProp("primary", "radius", v),
    setBorder: (v) => setButtonProp("primary", "border", v),
    setFontWeight: (v) => setButtonProp("primary", "fontWeight", v),
    setFontSize: (v) => setButtonProp("primary", "fontSize", v),
    setLetterSpacing: (v) => setButtonProp("primary", "letterSpacing", v),
    setBoxShadow: (v) => setButtonProp("primary", "boxShadow", v),
    setPadding: (v) => setButtonProp("primary", "padding", v),
    setTextTransform: (v) => setButtonProp("primary", "textTransform", v),
    setHoverBg: (v) => setButtonProp("primary", "hoverBg", v),
    setHoverText: (v) => setButtonProp("primary", "hoverText", v),
    setHoverBorder: (v) => setButtonProp("primary", "hoverBorder", v),
    setLineHeight: (v) => setButtonProp("primary", "lineHeight", v),
  };
  const secondaryProps = {
    ...buttonStates[activeTab].secondary,
    setColor: (c) => setButtonProp("secondary", "color", c),
    setTextColor: (c) => setButtonProp("secondary", "textColor", c),
    setRadius: (v) => setButtonProp("secondary", "radius", v),
    setBorder: (v) => setButtonProp("secondary", "border", v),
    setFontWeight: (v) => setButtonProp("secondary", "fontWeight", v),
    setFontSize: (v) => setButtonProp("secondary", "fontSize", v),
    setLetterSpacing: (v) => setButtonProp("secondary", "letterSpacing", v),
    setBoxShadow: (v) => setButtonProp("secondary", "boxShadow", v),
    setPadding: (v) => setButtonProp("secondary", "padding", v),
    setTextTransform: (v) => setButtonProp("secondary", "textTransform", v),
    setHoverBg: (v) => setButtonProp("secondary", "hoverBg", v),
    setHoverText: (v) => setButtonProp("secondary", "hoverText", v),
    setHoverBorder: (v) => setButtonProp("secondary", "hoverBorder", v),
    setLineHeight: (v) => setButtonProp("secondary", "lineHeight", v),
  };
  const tertiaryProps = {
    ...buttonStates[activeTab].tertiary,
    setColor: (c) => setButtonProp("tertiary", "color", c),
    setTextColor: (c) => setButtonProp("tertiary", "textColor", c),
    setRadius: (v) => setButtonProp("tertiary", "radius", v),
    setBorder: (v) => setButtonProp("tertiary", "border", v),
    setFontWeight: (v) => setButtonProp("tertiary", "fontWeight", v),
    setFontSize: (v) => setButtonProp("tertiary", "fontSize", v),
    setLetterSpacing: (v) => setButtonProp("tertiary", "letterSpacing", v),
    setBoxShadow: (v) => setButtonProp("tertiary", "boxShadow", v),
    setPadding: (v) => setButtonProp("tertiary", "padding", v),
    setTextTransform: (v) => setButtonProp("tertiary", "textTransform", v),
    setHoverBg: (v) => setButtonProp("tertiary", "hoverBg", v),
    setHoverText: (v) => setButtonProp("tertiary", "hoverText", v),
    setHoverBorder: (v) => setButtonProp("tertiary", "hoverBorder", v),
    setLineHeight: (v) => setButtonProp("tertiary", "lineHeight", v),
  };

  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const [logoUrl, setLogoUrl] = useState(null);
  const [logoWidth, setLogoWidth] = useState(150);
  const [logoHeight, setLogoHeight] = useState(150);
  const [radius, setRadius] = useState(0);
  const [projectTitle, setProjectTitle] = useState("");

  const backendUrl = process.env.NEXT_PUBLIC_BE_URL;
  const [base, setBase] = useState(1); // default 1rem
  const [unit, setUnit] = useState("rem");
  const [fontScaleStyles, setFontScaleStyles] = useState(buildDefaultStyles());

  return (
    <div>
      <Header />
      <SaveAndTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        projectTitle={projectTitle}
        setProjectTitle={setProjectTitle}
        backendUrl={backendUrl}
        logoUrl={logoUrl}
        radius={radius}
        primaryProps={primaryProps}
        secondaryProps={secondaryProps}
        tertiaryProps={tertiaryProps}
        fontSets={fontSets}
        palette1={palette1}
        palette2={palette2}
        palette3={palette3}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
      />

      <main className={styles.displayRoot}>
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
                palette1={palette1}
                setPalette1={activeTab === 0 ? setPalette1 : undefined}
                palette2={palette2}
                setPalette2={activeTab === 1 ? setPalette2 : undefined}
                palette3={palette3}
                setPalette3={activeTab === 2 ? setPalette3 : undefined}
                selected={selected}
                setSelected={setSelected}
              />
              <ImageSelector value={heroImgUrl} onChange={setHeroImgUrl} />
              <FontPicker
                fontLists={[displayFonts, bodyFonts, allFonts]}
                fontMap={fontMap}
                fontSets={fontSets}
                onFontSetChange={handleFontSetChange}
                selectedFontSetIdx={selectedFontSetIdx}
                onSelectFontSet={handleSelectFontSet}
              />
              <FontScale
                fontSet={selectedFontSet}
                fontMap={fontMap}
                fontScaleStyles={fontScaleStyles}
                setFontScaleStyles={setFontScaleStyles}
              />
              <SpacingChart
                colours={selected}
                base={spacingBase}
                setBase={setSpacingBase}
                unit={spacingUnit}
                setUnit={setSpacingUnit}
              />
              <Buttons
                font={selectedFontSet.main}
                fontMap={fontMap}
                colors={selected}
                primaryProps={primaryProps}
                secondaryProps={secondaryProps}
                tertiaryProps={tertiaryProps}
              />
              <Logo
                logoUrl={logoUrl}
                setLogoUrl={setLogoUrl}
                logoWidth={logoWidth}
                setLogoWidth={setLogoWidth}
                logoHeight={logoHeight}
                setLogoHeight={setLogoHeight}
              />
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
            logoWidth={logoWidth}
            logoHeight={logoHeight}
            borderRadius={radius}
            colours={
              Array.isArray(selected)
                ? selected
                : selected && typeof selected === "object" && selected.rows
                ? selected.rows
                : initialRowsPalette1
            }
            fonts={selectedFontSet}
            fontMap={fontMap}
            fontScale={fontScaleStyles}
            base={base}
            unit={unit}
            heroImgUrl={heroImgUrl}
            navbarOverrides={navbarOverrides[activeTab]}
            onNavbarColorChange={handleNavbarColorChange}
            threeIconsOverrides={threeIconsOverrides[activeTab]}
            onThreeIconsColorChange={handleThreeIconsColorChange}
            companiesOverrides={companiesOverrides[activeTab]}
            onCompaniesColorChange={handleCompaniesColorChange}
            descriptionOverrides={descriptionOverrides[activeTab]}
            onDescriptionColorChange={handleDescriptionColorChange}
            heroImgOverrides={heroImgOverrides[activeTab]}
            onHeroImgColorChange={handleHeroImgColorChange}
            testimonialOverrides={testimonialOverrides[activeTab]}
            onTestimonialColorChange={handleTestimonialColorChange}
            footerOverrides={footerOverrides[activeTab]}
            onFooterColorChange={handleFooterColorChange}
          />
        </div>
      </main>
    </div>
  );
}
