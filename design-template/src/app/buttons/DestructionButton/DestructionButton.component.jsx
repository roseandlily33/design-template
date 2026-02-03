import React from "react";
import { destructionButtonStyle } from "./DestructionButton.styles.jsx";

const DestructionButton = ({ functionName, span }) => {
    return (
        <button style={destructionButtonStyle} onClick={functionName}>
            {span}
        </button>
    );
};

export default DestructionButton;