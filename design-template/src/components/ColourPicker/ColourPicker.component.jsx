"use client";
import React, { useState } from "react";
import { useRef } from "react";
import AccessibilityChartModal from "./AccessibilityChartModal";
import styles from "./ColourPicker.module.css";

const MAX_COLORS = 8;

const ColourPicker = ({
  palette1,
  palette2,
  palette3,
  selected,
  setSelected,
  setPalette1,
  setPalette2,
  setPalette3,
}) => {
  console.log("Selected", selected);
  const [paletteIdx, setPaletteIdx] = useState(0);

  const [hexInput, setHexInput] = useState("");
  const [copied, setCopied] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Pick which palette to show/edit
  const palettes = [palette1, palette2, palette3];
  const setPalettes = [setPalette1, setPalette2, setPalette3];
  const rows = palettes[paletteIdx];
  const setRows = setPalettes[paletteIdx];

  const handleAddColor = (rowIdx) => {
    setRows((prevRows) =>
      prevRows.map((row, idx) => {
        if (idx === rowIdx && row.colors.length < MAX_COLORS) {
          return { ...row, colors: [...row.colors, null] };
        }
        return row;
      })
    );
  };

  const handleCircleClick = (rowIdx, colorIdx) => {
    setSelected({ rowIdx, colorIdx });
    setHexInput(rows[rowIdx].colors[colorIdx] || "");
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setHexInput(newColor);
    if (selected) {
      setRows((prevRows) =>
        prevRows.map((row, rIdx) => {
          if (rIdx === selected.rowIdx) {
            return {
              ...row,
              colors: row.colors.map((c, cIdx) =>
                cIdx === selected.colorIdx ? newColor : c
              ),
            };
          }
          return row;
        })
      );
    }
  };

  const handleHexInputChange = (e) => {
    setHexInput(e.target.value);
  };

  const handleHexInputBlur = () => {
    if (selected && /^#([0-9A-Fa-f]{3}){1,2}$/.test(hexInput)) {
      setRows((prevRows) =>
        prevRows.map((row, rIdx) => {
          if (rIdx === selected.rowIdx) {
            return {
              ...row,
              colors: row.colors.map((c, cIdx) =>
                cIdx === selected.colorIdx ? hexInput : c
              ),
            };
          }
          return row;
        })
      );
    }
  };

  // Copy hex code to clipboard
  const handleCopyHex = (hex, rowIdx, colorIdx) => {
    if (!hex) return;
    navigator.clipboard.writeText(hex);
    setCopied({ rowIdx, colorIdx });
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className={styles.pickerRoot}>
      <div className={styles.pickerTitle}>Colour Picker</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            style={{
              padding: "6px 16px",
              fontSize: 15,
              borderRadius: 6,
              background: paletteIdx === idx ? "#6883a1" : "#f0f0f0",
              color: paletteIdx === idx ? "#fff" : "#333",
              border:
                paletteIdx === idx ? "2px solid #6883a1" : "1px solid #ccc",
              fontWeight: paletteIdx === idx ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onClick={() => {
              setPaletteIdx(idx);
              setSelected(idx < 3 ? palette1 : idx === 3 ? palette2 : palette3);
              setHexInput("");
            }}
            aria-pressed={paletteIdx === idx}
          >
            {`Palette ${idx + 1}`}
          </button>
        ))}
        <button
          style={{
            marginLeft: 16,
            padding: "6px 16px",
            fontSize: 15,
            borderRadius: 6,
            background: "#eee",
            color: "#333",
            border: "1px solid #ccc",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onClick={() => setShowModal(true)}
        >
          Accessibility Chart
        </button>
      </div>
      {rows.map((row, rowIdx) => (
        <div key={row.label} className={styles.row}>
          <div className={styles.rowLabel}>{row.label}</div>
          <div className={styles.colorGroup}>
            {row.colors.map((color, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <span
                  className={styles.circle}
                  style={{
                    background: color || undefined,
                    border:
                      selected &&
                      selected.rowIdx === rowIdx &&
                      selected.colorIdx === idx
                        ? "2px solid #6883a1"
                        : undefined,
                  }}
                  onClick={() => handleCircleClick(rowIdx, idx)}
                />
                {/* Delete button */}
                <button
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    border: "none",
                    background: "#fff",
                    color: "#d00",
                    fontWeight: "bold",
                    fontSize: 14,
                    cursor: "pointer",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    zIndex: 1,
                  }}
                  title="Delete color"
                  onClick={() => {
                    setRows((prevRows) =>
                      prevRows.map((row, rIdx) => {
                        if (rIdx === rowIdx) {
                          const newColors = row.colors.filter(
                            (_, cIdx) => cIdx !== idx
                          );
                          return { ...row, colors: newColors };
                        }
                        return row;
                      })
                    );
                    // Deselect if deleted
                    // if (
                    //   selected &&
                    //   selected.rowIdx === rowIdx &&
                    //   selected.colorIdx === idx
                    // ) {
                    //   setSelected(null);
                    // }
                  }}
                >
                  ×
                </button>
                <span
                  style={{
                    fontSize: 13,
                    color: color ? "#333" : "#bbb",
                    marginTop: 4,
                    cursor: color ? "pointer" : "default",
                    userSelect: "all",
                  }}
                  onClick={() => color && handleCopyHex(color, rowIdx, idx)}
                  title={color ? "Click to copy" : ""}
                >
                  {color
                    ? copied &&
                      copied.rowIdx === rowIdx &&
                      copied.colorIdx === idx
                      ? "Copied!"
                      : color
                    : "#ffffff"}
                </span>
              </div>
            ))}
            {row.colors.length < MAX_COLORS && (
              <span
                className={styles.plus}
                onClick={() => handleAddColor(rowIdx)}
                title="Add color"
              >
                +
              </span>
            )}
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
                onChange={handleColorChange}
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
                onChange={handleHexInputChange}
                onBlur={handleHexInputBlur}
                placeholder="#hex"
                style={{ width: 80, padding: "6px 8px", fontSize: 16 }}
              />
            </div>
          )}
        </div>
      ))}
      <AccessibilityChartModal
        open={showModal}
        onClose={() => setShowModal(false)}
        palettes={[palette1, palette2, palette3]}
        initialIdx={paletteIdx}
      />
    </div>
  );
};

export default ColourPicker;
