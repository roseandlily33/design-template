import React from "react";
import styles from "./FontPicker.module.css";
const FontPicker = ({
  fontLists,
  fontMap,
  fontSets,
  selectedFontSetIdx,
  onFontSetChange,
  onSelectFontSet,
}) => {
  // fontSets, selectedFontSetIdx, onFontSetChange, onSelectFontSet are now props from page.js

  return (
    <div className={styles.pickerRoot}>
      <div className={styles.pickerTitle}>Font Picker</div>
      <div className={styles.fontCardRow}>
        {fontSets.map((set, idx) => (
          <div
            key={idx}
            className={
              styles.fontCard +
              (selectedFontSetIdx === idx ? " " + styles.fontCardSelected : "")
            }
          >
            <div className={styles.fontCardControls}>
              <span className={styles.fontCardLabel}>Head:</span>
              <select
                value={set.head}
                onChange={(e) => onFontSetChange(idx, "head", e.target.value)}
                style={{ fontFamily: set.head, marginRight: 8 }}
              >
                {fontLists[0].map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
              <span className={styles.fontCardLabel}>Main:</span>
              <select
                value={set.main}
                onChange={(e) => onFontSetChange(idx, "main", e.target.value)}
                style={{ fontFamily: set.main, marginRight: 8 }}
              >
                {fontLists[1].map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
              <span className={styles.fontCardLabel}>Extra:</span>
              <select
                value={set.extra}
                onChange={(e) => onFontSetChange(idx, "extra", e.target.value)}
                style={{ fontFamily: set.extra }}
              >
                {fontLists[2].map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
              <button
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: selectedFontSetIdx === idx ? "#6883a1" : "#eee",
                  color: selectedFontSetIdx === idx ? "#fff" : "#222",
                  border: "none",
                  borderRadius: 6,
                  padding: "4px 12px",
                  cursor: "pointer",
                  fontWeight: 500,
                  boxShadow:
                    selectedFontSetIdx === idx ? "0 2px 8px #6883a1" : "none",
                }}
                onClick={() => onSelectFontSet(idx)}
              >
                {selectedFontSetIdx === idx ? "Selected" : "Select"}
              </button>
            </div>
            <div className={styles.fontCardPreview}>
              <div
                className={fontMap[set.head]}
                style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}
              >
                Title Example
              </div>
              <div
                className={fontMap[set.extra]}
                style={{ fontSize: 15, color: "#888", marginBottom: 8 }}
              >
                Dec 9, 2025
              </div>
              <div
                className={fontMap[set.main]}
                style={{ fontSize: 16, lineHeight: 1.7 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque euismod, nisi eu consectetur.
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FontPicker;
