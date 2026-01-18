import React from "react";

import LP1 from "./LP1.component";
import LP2 from "./LP2.component";
import LP3 from "./LP3.component";
import LP4 from "./LP4.component";
import LP5 from "./LP5.component";
import LP6 from "./LP6.component";

const LandingPages = ({
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
      <LP1
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
      <LP2
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
      <LP3
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
      <LP4
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
      <LP5
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
      <LP6
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

export default LandingPages;
