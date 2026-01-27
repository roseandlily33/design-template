"use client";
import React, { useState } from "react";
import { useRef } from "react";
import AccessibilityChartModal from "./AccessibilityChartModal";
import styles from "./ColourPicker.module.css";
import GenerateColours from "./GenerateColours.component";

const MAX_COLORS = 8;

const ColourPicker = ({
  palette1,
  palette2,
  palette3,
  setPalette1,
  setPalette2,
  setPalette3,
}) => {
  const [copied, setCopied] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // For each palette, track its own selected color and hex input
  const [selected1, setSelected1] = useState(null);
  const [hexInput1, setHexInput1] = useState("");
  const [selected2, setSelected2] = useState(null);
  const [hexInput2, setHexInput2] = useState("");
  const [selected3, setSelected3] = useState(null);
  const [hexInput3, setHexInput3] = useState("");
  // Tab state: 0 = Palette 1, 1 = Palette 2, 2 = Palette 3
  const [activeTab, setActiveTab] = useState(0);

  // Helper to render a palette section
  const renderPalette = (
    rows,
    setRows,
    selected,
    setSelected,
    hexInput,
    setHexInput,
    label,
  ) => (
    <div className={styles.paletteSection}>
      <div className={styles.pickerTitle}>{label}</div>
      <GenerateColours
        rows={rows}
        setRows={setRows}
      />
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
                  onClick={() => {
                    setSelected({ rowIdx, colorIdx: idx });
                    setHexInput(row.colors[idx] || "");
                  }}
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
                            (_, cIdx) => cIdx !== idx,
                          );
                          return { ...row, colors: newColors };
                        }
                        return row;
                      }),
                    );
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
                    display: "inline-block",
                    minWidth: 70,
                    textAlign: "center",
                  }}
                  onClick={() => {
                    if (!color) return;
                    navigator.clipboard.writeText(color);
                    setCopied({ rowIdx, colorIdx: idx, label });
                    setTimeout(() => setCopied(null), 1200);
                  }}
                  title={color ? "Click to copy" : ""}
                >
                  {color
                    ? copied &&
                      copied.rowIdx === rowIdx &&
                      copied.colorIdx === idx &&
                      copied.label === label
                      ? "Copied!"
                      : color
                    : "#ffffff"}
                </span>
                {/* Move arrows below the circle */}
                <div style={{ display: "flex", gap: 2, marginTop: 6 }}>
                  {idx > 0 && (
                    <button
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        border: "none",
                        background: "#fff",
                        color: "#333",
                        fontWeight: "bold",
                        fontSize: 14,
                        cursor: "pointer",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                        zIndex: 1,
                      }}
                      title="Move left"
                      onClick={() => {
                        setRows((prevRows) =>
                          prevRows.map((row, rIdx) => {
                            if (rIdx === rowIdx) {
                              const newColors = [...row.colors];
                              [newColors[idx - 1], newColors[idx]] = [newColors[idx], newColors[idx - 1]];
                              return { ...row, colors: newColors };
                            }
                            return row;
                          })
                        );
                      }}
                    >
                      ←
                    </button>
                  )}
                  {idx < row.colors.length - 1 && (
                    <button
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        border: "none",
                        background: "#fff",
                        color: "#333",
                        fontWeight: "bold",
                        fontSize: 14,
                        cursor: "pointer",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                        zIndex: 1,
                      }}
                      title="Move right"
                      onClick={() => {
                        setRows((prevRows) =>
                          prevRows.map((row, rIdx) => {
                            if (rIdx === rowIdx) {
                              const newColors = [...row.colors];
                              [newColors[idx], newColors[idx + 1]] = [newColors[idx + 1], newColors[idx]];
                              return { ...row, colors: newColors };
                            }
                            return row;
                          })
                        );
                      }}
                    >
                      →
                    </button>
                  )}
                </div>
              </div>
            ))}
            {row.colors.length < MAX_COLORS && (
              <span
                className={styles.plus}
                onClick={() => {
                  setRows((prevRows) =>
                    prevRows.map((row, idx) =>
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
                  setRows((prevRows) =>
                    prevRows.map((row, rIdx) => {
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
                    setRows((prevRows) =>
                      prevRows.map((row, rIdx) => {
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

  // Helper to generate CSS variables for the selected palette only
  const getSelectedPaletteCss = () => {
    const palettes = [palette1, palette2, palette3];
    const palette = palettes[activeTab];
    let css = ':root {\n';
    palette.forEach((row) => {
      row.colors.forEach((color, cIdx) => {
        if (color) {
          css += `  --palette${activeTab + 1}-${row.label?.toLowerCase() || 'row'}-${cIdx + 1}: ${color};\n`;
        }
      });
    });
    css += '}\n';
    return css;
  };

  const [cssCopied, setCssCopied] = useState(false);

  return (
    <div className={styles.pickerRoot}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            style={{
              padding: "6px 16px",
              fontSize: 15,
              borderRadius: 6,
              background: activeTab === idx ? "#6883a1" : "#f0f0f0",
              color: activeTab === idx ? "#fff" : "#333",
              border:
                activeTab === idx ? "2px solid #6883a1" : "1px solid #ccc",
              fontWeight: activeTab === idx ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onClick={() => setActiveTab(idx)}
            aria-pressed={activeTab === idx}
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
        <button
          style={{
            marginLeft: 16,
            padding: "6px 16px",
            fontSize: 15,
            borderRadius: 6,
            background: cssCopied ? "#6883a1" : "#eee",
            color: cssCopied ? "#fff" : "#333",
            border: "1px solid #ccc",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onClick={() => {
            navigator.clipboard.writeText(getSelectedPaletteCss());
            setCssCopied(true);
            setTimeout(() => setCssCopied(false), 1200);
          }}
          title="Copy this palette's colors as CSS variables"
        >
          {cssCopied ? "Copied CSS!" : "Copy CSS"}
        </button>
      </div>
      {activeTab === 0 &&
        renderPalette(
          palette1,
          setPalette1,
          selected1,
          setSelected1,
          hexInput1,
          setHexInput1,
          "Palette 1",
        )}
      {activeTab === 1 &&
        renderPalette(
          palette2,
          setPalette2,
          selected2,
          setSelected2,
          hexInput2,
          setHexInput2,
          "Palette 2",
        )}
      {activeTab === 2 &&
        renderPalette(
          palette3,
          setPalette3,
          selected3,
          setSelected3,
          hexInput3,
          setHexInput3,
          "Palette 3",
        )}
      <AccessibilityChartModal
        open={showModal}
        onClose={() => setShowModal(false)}
        palettes={[palette1, palette2, palette3]}
        initialIdx={activeTab}
      />
    </div>
  );
};

export default ColourPicker;
