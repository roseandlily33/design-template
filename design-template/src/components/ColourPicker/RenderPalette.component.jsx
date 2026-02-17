import React, { useState } from "react";
import GenerateColours from "./GenerateColours.component";
import styles from "./ColourPicker.module.css";
import ButtonsForColours from "./Buttons";

const RenderPalette = ({
  palette,
  setPalette,
  selected,
  setSelected,
  hexInput,
  setHexInput,
  label,
}) => {
  const MAX_COLORS = 8;
  const [copied, setCopied] = useState(null);

  return (
    <div className={styles.paletteSection}>
      <GenerateColours rows={palette} setRows={setPalette} label={label} />
      <div className={styles.paletteHeaderWrapper}>
        <div className={styles.paletteHeader}>{label}</div>
      </div>
      {palette?.map((row, rowIdx) => (
        <div key={row.label} className={styles.row}>
          <div className={styles.rowLabel}>{row.label}</div>
          <div className={styles.colorGroupScroll}>
            <div className={styles.colorGroup}>
              {row?.colors?.map((color, idx) => (
                <ButtonsForColours
                  color={color}
                  idx={idx}
                  rowIdx={rowIdx}
                  key={idx}
                  setRows={setPalette}
                  rows={palette}
                  selected={selected}
                  setSelected={setSelected}
                  setHexInput={setHexInput}
                  hexInput={hexInput}
                  copied={copied}
                  setCopied={setCopied}
                />
              ))}
              {palette?.colors?.length < MAX_COLORS && (
                <span
                  className={styles.plus}
                  onClick={() => {
                    setPalette((prevPalette) =>
                      prevPalette?.map((row, idx) =>
                        idx === rowIdx && row.colors.length < MAX_COLORS
                          ? { ...row, colors: [...row.colors, null] }
                          : row,
                      ),
                    );
                  }}
                  title="Add color"
                >
                  +
                </span>
              )}
            </div>
          </div>
          {/* Show color picker and hex input if a circle in this row is selected */}
          {selected && selected.rowIdx === rowIdx && (
            <div
              style={{
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <input
                type="color"
                value={hexInput || "#ffffff"}
                onChange={(e) => {
                  const newColor = e.target.value;
                  setHexInput(newColor);
                  setPalette((prevPalette) =>
                    prevPalette?.map((row, rIdx) => {
                      if (rIdx === selected.rowIdx) {
                        return {
                          ...row,
                          colors: row.colors.map((c, cIdx) =>
                            cIdx === selected.colorIdx ? newColor : c,
                          ),
                        };
                      }
                      return row;
                    }),
                  );
                }}
                style={{
                  width: 40,
                  height: 40,
                  border: "none",
                  background: "none",
                }}
              />
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                onBlur={() => {
                  if (selected && /^#([0-9A-Fa-f]{3}){1,2}$/.test(hexInput)) {
                    setPalette((prevPalette) =>
                      prevPalette?.map((row, rIdx) => {
                        if (rIdx === selected.rowIdx) {
                          return {
                            ...row,
                            colors: row.colors.map((c, cIdx) =>
                              cIdx === selected.colorIdx ? hexInput : c,
                            ),
                          };
                        }
                        return row;
                      }),
                    );
                  }
                }}
                placeholder="#hex"
                style={{ width: 80, padding: "6px 8px", fontSize: 16 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default RenderPalette;
