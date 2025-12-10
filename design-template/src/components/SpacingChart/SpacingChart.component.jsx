import React, { useState } from "react";
import styles from "./SpacingChart.module.css";

const spacingRatios = {
  xxxs: 0.15,
  xxs: 0.25,
  xs: 0.5,
  s: 0.75,
  m: 1,
  l: 1.5,
  xl: 2,
  xxl: 3,
  xxxl: 4,
  xxxxl: 6,
  xxxxxl: 8,
  xxxxxxl: 12,
  xxxxxxxl: 16,
  xxxxxxxxl: 24,
};

function formatValue(val, unit) {
  // Always show up to 2 decimals for rem, no decimals for px
  if (unit === "rem") return `${parseFloat(val.toFixed(3))}rem`;
  return `${Math.round(val)}px`;
}

const getSpacingCSS = (base, unit) => {
  let css = ":root {\n";
  Object.entries(spacingRatios).forEach(([label, ratio]) => {
    const value = formatValue(base * ratio, unit);
    css += `  --spacing-${label}: ${value};\n`;
  });
  css += "}\n";
  return css;
};

const baseOptions = [
  { label: "0.5rem", value: 0.5, unit: "rem" },
  { label: "1rem", value: 1, unit: "rem" },
  { label: "2rem", value: 2, unit: "rem" },
  { label: "8px", value: 8, unit: "px" },
  { label: "16px", value: 16, unit: "px" },
  { label: "24px", value: 24, unit: "px" },
];

const SpacingChart = () => {
  const [base, setBase] = useState(1); // default 1rem
  const [unit, setUnit] = useState("rem");
  const [copied, setCopied] = useState(false);

  const handleBaseChange = (e) => {
    const idx = parseInt(e.target.value, 10);
    setBase(baseOptions[idx].value);
    setUnit(baseOptions[idx].unit);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getSpacingCSS(base, unit));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className={styles.chart}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 18,
        }}
      >
        <h2 className={styles.heading}>Spacing Scale</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <label style={{ fontWeight: 500, fontSize: 15, marginRight: 4 }}>
            Base:
          </label>
          <select
            value={baseOptions.findIndex(
              (opt) => opt.value === base && opt.unit === unit
            )}
            onChange={handleBaseChange}
            style={{
              padding: "6px 12px",
              fontSize: 15,
              borderRadius: 5,
              border: "1px solid #ccc",
              background: "#fff",
              fontWeight: 500,
              marginRight: 8,
            }}
          >
            {baseOptions.map((opt, idx) => (
              <option key={opt.label} value={idx}>
                {opt.label}
              </option>
            ))}
          </select>
          <button
            style={{
              padding: "8px 18px",
              fontSize: 16,
              borderRadius: 6,
              background: "#6883a1",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: 500,
            }}
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy CSS"}
          </button>
        </div>
      </div>
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
    </div>
  );
};

export default SpacingChart;
