import React from "react";
import styles from "./DestructionButton.module.css";

const DestructionButton = ({ functionName, span }) => {
    return (
        <button className={styles.destructionButton} onClick={functionName}>
            {span}
        </button>
    );
};

export default DestructionButton;