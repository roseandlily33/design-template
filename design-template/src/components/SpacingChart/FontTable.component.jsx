import React from "react";
import styles from "./SpacingChart.module.css";

const FontTable = ({ spacingRatios, base, unit }) => {
  function formatValue(val, unit) {
    // Always show up to 2 decimals for rem, no decimals for px
    if (unit === "rem") return `${parseFloat(val.toFixed(3))}rem`;
    return `${Math.round(val)}px`;
  }
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Preview</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(spacingRatios).map(([label, ratio]) => {
          const value = formatValue(base * ratio, unit);
          return (
            <tr key={label}>
              <td className={styles.label}>{label}</td>
              <td className={styles.value}>{value}</td>
              <td>
                <div
                  className={styles.preview}
                  style={{
                    width: value,
                    height: "1.5rem",
                    background: "#e0e0e0",
                    borderRadius: 4,
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default FontTable;
