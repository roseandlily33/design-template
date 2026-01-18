import React from "react";
import C1 from "./C1.component";
import C2 from "./C2.component";
import C3 from "./C3.component";
import C4 from "./C4.component";
import C5 from "./C5.component";
import C6 from "./C6.component";

const ContactPages = ({
  colours,
  fonts,
  borderRadius,
  heroImgUrl,
  spacingBase,
  spacingUnit,
  primaryButtonProps,
  secondaryButtonProps,
  tertiaryButtonProps,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      <C1
        colours={colours}
        fonts={fonts}
        borderRadius={borderRadius}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        heroImgUrl={heroImgUrl}
        primaryButtonProps={primaryButtonProps}
        secondaryButtonProps={secondaryButtonProps}
        tertiaryButtonProps={tertiaryButtonProps}
      />
      <C2
        colours={colours}
        fonts={fonts}
        borderRadius={borderRadius}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        heroImgUrl={heroImgUrl}
        primaryButtonProps={primaryButtonProps}
        secondaryButtonProps={secondaryButtonProps}
        tertiaryButtonProps={tertiaryButtonProps}
      />
      <C3
        colours={colours}
        fonts={fonts}
        borderRadius={borderRadius}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        heroImgUrl={heroImgUrl}
        primaryButtonProps={primaryButtonProps}
        secondaryButtonProps={secondaryButtonProps}
        tertiaryButtonProps={tertiaryButtonProps}
      />
      <C4
        colours={colours}
        fonts={fonts}
        borderRadius={borderRadius}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        heroImgUrl={heroImgUrl}
        primaryButtonProps={primaryButtonProps}
        secondaryButtonProps={secondaryButtonProps}
        tertiaryButtonProps={tertiaryButtonProps}
      />
      <C5
        colours={colours}
        fonts={fonts}
        borderRadius={borderRadius}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        heroImgUrl={heroImgUrl}
        primaryButtonProps={primaryButtonProps}
        secondaryButtonProps={secondaryButtonProps}
        tertiaryButtonProps={tertiaryButtonProps}
      />
      <C6
        colours={colours}
        fonts={fonts}
        borderRadius={borderRadius}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        heroImgUrl={heroImgUrl}
        primaryButtonProps={primaryButtonProps}
        secondaryButtonProps={secondaryButtonProps}
        tertiaryButtonProps={tertiaryButtonProps}
      />
    </div>
  );
};

export default ContactPages;
