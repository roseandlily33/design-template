import React from "react";
import { primaryButtonStyle } from "./PrimaryButton.styles.jsx";

const PrimaryButton = ({ span, functionName }) => {
  return (
    <button style={primaryButtonStyle} onClick={functionName}>
      {span}
    </button>
  );
};

export default PrimaryButton;
