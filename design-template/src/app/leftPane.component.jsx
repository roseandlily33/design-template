import React from "react";
import ColourPicker from "@/components/ColourPicker/ColourPicker.component";
import FontPicker from "@/components/FontPicker/FontPicker.component";
import FontScale from "@/components/FontScale/FontScale.component";
import SpacingChart from "@/components/SpacingChart/SpacingChart.component";
import Buttons from "@/components/Buttons/Buttons.component";
import Logo from "@/components/Logo/Logo.component";
import BorderRadius from "@/components/BorderRadius/BorderRadius.component";
import ImageSelector from "@/components/ImageSelector/ImageSelector.component";
import Inputs from "@/components/Inputs/Inputs.component";
import BoxShadow from "@/components/BoxShadows/BoxShadow.component";
import styles from "./page.module.css";

const LeftPane = ({
  projectTitle,
  activeTab,
  palette1,
  setPalette1,
  palette2,
  setPalette2,
  palette3,
  setPalette3,
  selected,
  heroImgUrl,
  setHeroImgUrl,
  fontSets,
  handleFontSetChange,
  selectedFontSetIdx,
  handleSelectFontSet,
  selectedFontSet,
  fontMap,
  fontScaleStyles,
  setFontScaleStyles,
  spacingBase,
  setSpacingBase,
  spacingUnit,
  setSpacingUnit,
  primaryProps,
  secondaryProps,
  tertiaryProps,
  tabProps,
  logoUrl,
  setLogoUrl,
  logoWidth,
  setLogoWidth,
  logoHeight,
  setLogoHeight,
  radius,
  setRadius,
  inputStyles,
  setInputStyles,
  boxShadow,
  setBoxShadow,
  displayFonts,
  bodyFonts,
  allFonts,
}) => {
  console.log('Colours', selected);
  return (
    <div
      className={styles.leftPane + " " + styles.leftPaneOpen}
      style={{ zIndex: 15 }}
    >
      <div className={styles.leftPaneContent}>
        <h3>
          {projectTitle} Project - Template {activeTab + 1}
        </h3>
        <ColourPicker
          palette1={palette1}
          setPalette1={setPalette1}
          palette2={palette2}
          setPalette2={setPalette2}
          palette3={palette3}
          setPalette3={setPalette3}
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
          colours={selected}
        />
        <SpacingChart
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
          tabProps={tabProps}
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
        <Inputs
          font={selectedFontSet.main}
          colors={selected}
          borderRadius={radius}
          styleConfig={inputStyles}
          onStyleChange={setInputStyles}
        />
        {/* Box Shadow component goes here */}
        <BoxShadow
          borderRadius={radius}
          boxShadow={boxShadow}
          setBoxShadow={setBoxShadow}
          paletteColors={selected}
        />
      </div>
    </div>
  );
};

export default LeftPane;
