import React from "react";
import styles from "./PrimaryButton.module.css";

const PrimaryButton = ({ span, functionName }) => {
  return (
    <button className={styles.primaryButtonStyle} onClick={functionName}>
      {span}
    </button>
  );
};

export default PrimaryButton;
