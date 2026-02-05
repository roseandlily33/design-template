import React from "react";
import styles from "./FontPicker.module.css";
import SelectButton from "@/app/buttons/SelectButton/SelectButton.component";
import SecondaryButton from "@/app/buttons/SecondaryButton/SecondaryButton.component";
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
              <SelectButton
                options={fontLists[0].map((font) => ({
                  value: font,
                  label: font,
                }))}
                value={set.head}
                onChange={(e) => onFontSetChange(idx, "head", e.target.value)}
                label="Head:"
              />
              <SelectButton
                options={fontLists[1].map((font) => ({
                  value: font,
                  label: font,
                }))}
                value={set.main}
                onChange={(e) => onFontSetChange(idx, "main", e.target.value)}
                label="Main:"
              />
              <SelectButton
                options={fontLists[2].map((font) => ({
                  value: font,
                  label: font,
                }))}
                value={set.extra}
                onChange={(e) => onFontSetChange(idx, "extra", e.target.value)}
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
