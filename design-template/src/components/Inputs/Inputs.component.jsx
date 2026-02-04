import React from "react";
import styles from "./Inputs.module.css";

const Inputs = ({ font, colors, borderRadius, styleConfig, onStyleChange }) => {
  // Palette
  const colorRows = Array.isArray(colors) ? colors : colors?.rows || [];
  const grey = colorRows.find((r) => r.label === "Grey")?.colors || [
    "#eee",
    "#ccc",
    "#888",
    "#222",
  ];
  const accent =
    colorRows.find((r) => r.label !== "Grey")?.colors?.[2] || "#6883a1";
  const mainFont = font || "inherit";

  // Use styleConfig for styles, fallback to defaults
  const inputStyle = styleConfig?.input || {
    width: "100%",
    padding: "10px 14px",
    fontSize: 16,
    borderRadius: borderRadius,
    border: `1.5px solid ${accent}`,
    outline: "none",
    marginBottom: 0,
    background: "#f7f8fa",
    color: grey[4],
    fontFamily: mainFont,
    boxSizing: "border-box",
    transition: "border 0.2s",
  };
  const textareaStyle = styleConfig?.textarea || {
    ...inputStyle,
    minHeight: 60,
    resize: "vertical",
  };
  const checkboxStyle = styleConfig?.checkbox || {
    accentColor: accent,
    width: 18,
    height: 18,
    borderRadius: borderRadius,
    marginRight: 4,
  };

  return (
    <div className={styles.inputsRoot}>
      <h3 className={styles.inputsTitle}>Inputs</h3>
      <div className={styles.styleEditorSection}>
        <h4 className={styles.styleEditorTitle}>Edit Input Styles</h4>
        <div className={styles.styleEditorRow}>
          <div className={styles.styleEditorField}>
            <label>Border Radius:</label>
            <input
              type="number"
              value={inputStyle.borderRadius}
              min={0}
              max={32}
              onChange={e => {
                const val = parseInt(e.target.value, 10);
                onStyleChange && onStyleChange({
                  ...styleConfig,
                  input: { ...inputStyle, borderRadius: val },
                  textarea: { ...textareaStyle, borderRadius: val },
                  checkbox: { ...checkboxStyle, borderRadius: val },
                });
              }}
              className={styles.styleEditorInput}
            />
          </div>
          <div className={styles.styleEditorField}>
            <label>Border Color:</label>
            <input
              type="color"
              value={inputStyle.border.split(" ").pop()}
              onChange={e => {
                const color = e.target.value;
                onStyleChange && onStyleChange({
                  ...styleConfig,
                  input: { ...inputStyle, border: `1.5px solid ${color}` },
                  textarea: { ...textareaStyle, border: `1.5px solid ${color}` },
                  checkbox: { ...checkboxStyle, accentColor: color },
                });
              }}
              className={styles.styleEditorInput}
            />
          </div>
          <div className={styles.styleEditorField}>
            <label>Font Size:</label>
            <input
              type="number"
              value={inputStyle.fontSize}
              min={10}
              max={32}
              onChange={e => {
                const val = parseInt(e.target.value, 10);
                onStyleChange && onStyleChange({
                  ...styleConfig,
                  input: { ...inputStyle, fontSize: val },
                  textarea: { ...textareaStyle, fontSize: val },
                });
              }}
              className={styles.styleEditorInput}
            />
          </div>
        </div>
      </div>
      <div className={styles.inputsRow}>
        <div className={styles.inputField}>
          <div className={styles.inputLabel}>Email</div>
          <input
            type="email"
            style={inputStyle}
            placeholder="Enter your email"
            disabled={false}
            className={styles.inputElement}
          />
        </div>
      </div>
      <div className={styles.checkboxRow}>
        <div className={styles.inputLabel}>Checkmark Example</div>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={true}
            readOnly
            style={checkboxStyle}
            className={styles.checkboxElement}
          />
          <span style={{ color: accent, fontWeight: 600 }}>Yes</span>
        </label>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={false}
            readOnly
            style={{ ...checkboxStyle, accentColor: grey[5] }}
            className={styles.checkboxElement}
          />
          <span style={{ color: grey[5] }}>No</span>
        </label>
      </div>
      <div className={styles.inputsRow}>
        <div className={styles.inputField}>
          <div className={styles.inputLabel}>Message</div>
          <textarea
            style={textareaStyle}
            placeholder="Enter your message"
            className={styles.textareaElement}
          />
        </div>
      </div>
    </div>
  );
};
export default Inputs;
