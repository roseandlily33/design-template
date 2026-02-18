import React from "react";
import styles from "./FontPicker.module.css";
import SecondaryButton from "@/app/buttons/SecondaryButton/SecondaryButton.component";
import FontDropdown from "./FontDropdown.jsx";
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
              <FontDropdown
                value={set.head}
                options={fontLists[0]}
                onChange={font => onFontSetChange(idx, "head", font)}
                fontMap={fontMap}
                label="Head:"
              />
              <FontDropdown
                value={set.main}
                options={fontLists[1]}
                onChange={font => onFontSetChange(idx, "main", font)}
                fontMap={fontMap}
                label="Main:"
              />
              <FontDropdown
                value={set.extra}
                options={fontLists[2]}
                onChange={font => onFontSetChange(idx, "extra", font)}
                fontMap={fontMap}
                label="Extra:"
              />
              <SecondaryButton
                span={selectedFontSetIdx === idx ? "Selected" : "Select"}
                functionName={() => onSelectFontSet(idx)}
              />
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
