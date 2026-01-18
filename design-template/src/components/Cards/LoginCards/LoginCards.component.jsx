import React from "react";
import L1 from "./L1.component";
import L2 from "./L2.component";
import L3 from "./L3.component";
import L4 from "./L4.component";
import L5 from "./L5.component";
import L6 from "./L6.component";

const LoginCards = ({
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
    <div>
      <L1
        colours={colours}
        fonts={fonts}
        borderRadius={borderRadius}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        primaryButtonProps={primaryButtonProps}
        secondaryButtonProps={secondaryButtonProps}
        tertiaryButtonProps={tertiaryButtonProps}
      />
      <L2
        colours={colours}
        fonts={fonts}
        borderRadius={borderRadius}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        primaryButtonProps={primaryButtonProps}
        secondaryButtonProps={secondaryButtonProps}
        tertiaryButtonProps={tertiaryButtonProps}
      />
      <L3
        colours={colours}
        fonts={fonts}
        borderRadius={borderRadius}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        primaryButtonProps={primaryButtonProps}
        secondaryButtonProps={secondaryButtonProps}
        tertiaryButtonProps={tertiaryButtonProps}
      />
      <L4
        colours={colours}
        fonts={fonts}
        borderRadius={borderRadius}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        primaryButtonProps={primaryButtonProps}
        secondaryButtonProps={secondaryButtonProps}
        tertiaryButtonProps={tertiaryButtonProps}
      />
      <L5
        colours={colours}
        fonts={fonts}
        borderRadius={borderRadius}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        primaryButtonProps={primaryButtonProps}
        secondaryButtonProps={secondaryButtonProps}
        tertiaryButtonProps={tertiaryButtonProps}
      />
      <L6
        colours={colours}
        fonts={fonts}
        borderRadius={borderRadius}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        primaryButtonProps={primaryButtonProps}
        secondaryButtonProps={secondaryButtonProps}
        tertiaryButtonProps={tertiaryButtonProps}
      />
    </div>
  );
};

export default LoginCards;
