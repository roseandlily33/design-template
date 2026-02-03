import React from "react";
import styles from "./TertiaryButton.module.css";

const TertiaryButton = ({ span, functionName }) => {
  return (
    <button className={styles.tertiaryButtonStyle} onClick={functionName}>
      {span}
    </button>
  );
};

export default TertiaryButton;
