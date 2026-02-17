import React from "react";
import styles from "./Inputs.module.css";
import { ColorSelect } from "../Buttons/ColourSelect.component";

const Inputs = ({ font, colors, borderRadius, inputStyles, setInputStyles }) => {
  // Palette
  const colorRows = Array.isArray(colors) ? colors : colors?.rows || [];
  // Gather all unique colors from all rows
  const allColors = colorRows.flatMap(r => r.colors || []).filter(Boolean);
  const grey = colorRows.find((r) => r.label === "Grey")?.colors || [
    "#eee",
    "#ccc",
    "#888",
    "#222",
  ];
  const accent =
    colorRows.find((r) => r.label !== "Grey")?.colors?.[2] || "#6883a1";
  const mainFont = font || "inherit";

  // Use inputStyles for styles, fallback to defaults
  const inputStyle = inputStyles?.input || {
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
  // Parse border thickness and color from border string
  const borderParts = inputStyle.border?.split(" ") || [];
  const borderThickness = borderParts[0]?.replace("px", "") || "1.5";
  const borderColor = borderParts[borderParts.length - 1] || accent;
  const textareaStyle = inputStyles?.textarea || {
    ...inputStyle,
    minHeight: 60,
    resize: "vertical",
  };
  const checkboxStyle = inputStyles?.checkbox || {
    accentColor: accent,
    width: 18,
    height: 18,
    borderRadius: borderRadius,
    marginRight: 4,
  };

  // Helper to convert JS style object to CSS string
  const styleObjToCss = (selector, styleObj) => {
    if (!styleObj) return '';
    const entries = Object.entries(styleObj)
      .map(([k, v]) => `${k.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${v};`)
      .join(' ');
    return `${selector} { ${entries} }`;
  };

  const handleCopyCss = () => {
    const css = [
      styleObjToCss('.inputElement', inputStyle),
      styleObjToCss('.textareaElement', textareaStyle),
      styleObjToCss('.checkboxElement', checkboxStyle),
    ].join('\n\n');
    navigator.clipboard.writeText(css);
  };

  return (
    <div className={styles.inputsRoot}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 className={styles.inputsTitle}>Inputs</h3>
        <button type="button" className={styles.copyCssButton} onClick={handleCopyCss} title="Copy CSS">
          Copy CSS
        </button>
      </div>
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
                setInputStyles && setInputStyles({
                  ...inputStyles,
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
            <ColorSelect
              value={borderColor}
              onChange={color => {
                setInputStyles && setInputStyles({
                  ...inputStyles,
                  input: { ...inputStyle, border: `${borderThickness}px solid ${color}` },
                  textarea: { ...textareaStyle, border: `${borderThickness}px solid ${color}` },
                  checkbox: { ...checkboxStyle, accentColor: color },
                });
              }}
              options={allColors}
              customValue={borderColor}
            />
          </div>
          <div className={styles.styleEditorField}>
            <label>Border Thickness:</label>
            <input
              type="number"
              min={0.5}
              max={8}
              step={0.1}
              value={borderThickness}
              onChange={e => {
                const thickness = e.target.value;
                setInputStyles && setInputStyles({
                  ...inputStyles,
                  input: { ...inputStyle, border: `${thickness}px solid ${borderColor}` },
                  textarea: { ...textareaStyle, border: `${thickness}px solid ${borderColor}` },
                  checkbox: { ...checkboxStyle, accentColor: borderColor },
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
                setInputStyles && setInputStyles({
                  ...inputStyles,
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
