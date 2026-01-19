import React from "react";
import DB1 from "./DB1.component";
import DB2 from "./DB2.component";
import DB3 from "./DB3.component";
import DB4 from "./DB4.component";
import DB5 from "./DB5.component";
import DB6 from "./DB6.component";

const Dashboard = ({
  colours,
  fonts,
  borderRadius,
  spacingBase,
  spacingUnit,
  primaryButtonProps,
  secondaryButtonProps,
  tertiaryButtonProps,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "48px",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <DB1
        colours={colours}
        fonts={fonts}
        borderRadius={borderRadius}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        primaryButtonProps={primaryButtonProps}
        secondaryButtonProps={secondaryButtonProps}
        tertiaryButtonProps={tertiaryButtonProps}
      />
      <DB2
        colours={colours}
        fonts={fonts}
        borderRadius={borderRadius}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        primaryButtonProps={primaryButtonProps}
        secondaryButtonProps={secondaryButtonProps}
        tertiaryButtonProps={tertiaryButtonProps}
      />
      <DB3
        colours={colours}
        fonts={fonts}
        borderRadius={borderRadius}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        primaryButtonProps={primaryButtonProps}
        secondaryButtonProps={secondaryButtonProps}
        tertiaryButtonProps={tertiaryButtonProps}
      />
      <DB4
        colours={colours}
        fonts={fonts}
        borderRadius={borderRadius}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        primaryButtonProps={primaryButtonProps}
        secondaryButtonProps={secondaryButtonProps}
        tertiaryButtonProps={tertiaryButtonProps}
      />
      <DB5
        colours={colours}
        fonts={fonts}
        borderRadius={borderRadius}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        primaryButtonProps={primaryButtonProps}
        secondaryButtonProps={secondaryButtonProps}
        tertiaryButtonProps={tertiaryButtonProps}
      />
      <DB6
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

export default Dashboard;
