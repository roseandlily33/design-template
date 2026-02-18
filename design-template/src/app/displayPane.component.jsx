import React from "react";
import styles from "./page.module.css";
import Display from "@/components/Display/Display.component";
import PrimaryButton from "../components/Buttons/PrimaryButton.component";
import SecondaryButton from "../components/Buttons/SecondaryButton.component";
import TertiaryButton from "../components/Buttons/TertiaryButton.component";
import { fontMap } from "@/utils/fonts";
import { initialRowsPalette1 } from "@/utils/colourPalettes";

const DisplayPane = ({
  selectedFontSet,
  selected,
  displayButtons,
  displayText,
  displayOverrides,
  primaryProps,
  secondaryProps,
  tertiaryProps,
  logoUrl,
  logoWidth,
  logoHeight,
  radius,
  fontScaleStyles,
  base,
  unit,
  heroImgUrl,
  threeIcons,
  inputStyles,
  backgrounds,
  handleBackgroundChange,
}) => {
  console.log("Primary Props in DisplayPane:", primaryProps);
  return (
    <div className={styles.rightPane}>
      <Display
        {...displayButtons}
        {...displayText}
        {...displayOverrides}
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
        threeIcons={threeIcons}
        inputStyles={inputStyles}
        backgrounds={backgrounds}
        handleBackgroundChange={handleBackgroundChange}
      />
    </div>
  );
};

export default DisplayPane;
