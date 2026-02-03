import React from "react";
import styles from "./SecondaryButton.module.css";

const SecondaryButton = ({ span, functionName }) => {
    return (
        <button className={styles.secondaryButtonStyle} onClick={functionName}>
            {span}
        </button>
    );
};

export default SecondaryButton;