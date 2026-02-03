import React from "react";
import { tertiaryButtonStyle } from "./TertiaryButton.styles";

const TertiaryButton = ({span, functionName}) => {
    return (  
        <button style={tertiaryButtonStyle} onClick={functionName}>
           {span}
        </button>
    );
}
 
export default TertiaryButton;