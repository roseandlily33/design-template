import React from "react";
import { secondaryButtonStyle } from "./SecondaryButton.styles.jsx";

const SecondaryButton = ({ span, functionName }) => {
    return (
        <button style={secondaryButtonStyle} onClick={functionName}>
            {span}
        </button>
    );
};

export default SecondaryButton;