import React from "react";
import styles from "./SelectButton.module.css";

const SelectButton = ({ options, value, onChange, label }) => {
  return (
    <div className={styles.selectButtonRoot}>
      {label && <span>{label}</span>}
      <select value={value} onChange={onChange}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectButton;
