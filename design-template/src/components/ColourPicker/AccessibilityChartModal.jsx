import React, { useState } from "react";
import { createPortal } from "react-dom";

// Helper: contrast ratio (WCAG)
function hexToRgb(hex) {
  let c = hex?.replace("#", "");
  if (!c || c.length < 3) return [255, 255, 255];
  if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  const num = parseInt(c, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}
function luminance([r, g, b]) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}
function contrast(hex1, hex2) {
  if (!hex1 || !hex2) return 1;
  try {
    const l1 = luminance(hexToRgb(hex1));
    const l2 = luminance(hexToRgb(hex2));
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  } catch {
    return 1;
  }
}

const AccessibilityChartModal = ({
  open,
  onClose,
  palettes,
  initialIdx = 0,
}) => {
  const [paletteIdx, setPaletteIdx] = useState(initialIdx);
  const rows = palettes[paletteIdx];
  const allColors = rows.flatMap((row) => row.colors);

  if (!open) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.25)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 24px rgba(0,0,0,0.18)",
          padding: 32,
          minWidth: 400,
          maxWidth: "90vw",
          maxHeight: "80vh",
          overflow: "auto",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "#eee",
            border: "none",
            borderRadius: 6,
            padding: "4px 10px",
            fontSize: 18,
            cursor: "pointer",
            fontWeight: 600,
          }}
          onClick={onClose}
        >
          ×
        </button>
        <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 18 }}>
          Accessibility Chart
        </div>
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
              onClick={() => setPaletteIdx(idx)}
              aria-pressed={paletteIdx === idx}
            >
              {`Palette ${idx + 1}`}
            </button>
          ))}
        </div>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ background: "#f7f7f7", padding: 8 }}></th>
              {allColors.map((color, idx) => (
                <th
                  key={idx}
                  style={{
                    background: color || "#f7f7f7",
                    color: color ? "#fff" : "#333",
                    padding: 8,
                    fontSize: 14,
                  }}
                >
                  {color || "-"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allColors.map((rowColor, rIdx, arr) => (
              <tr key={rIdx}>
                <th
                  style={{
                    background: rowColor || "#f7f7f7",
                    color: rowColor ? "#fff" : "#333",
                    padding: 8,
                    fontSize: 14,
                  }}
                >
                  {rowColor || "-"}
                </th>
                {arr.map((colColor, cIdx) => {
                  const ratio = contrast(rowColor, colColor);
                  const isGood = ratio >= 4.5;
                  return (
                    <td
                      key={cIdx}
                      style={{
                        background: isGood ? "#c6f7d0" : "#f7f7f7",
                        color: "#333",
                        textAlign: "center",
                        padding: 8,
                        fontWeight: isGood ? 600 : 400,
                        border: "1px solid #eee",
                      }}
                    >
                      {rowColor && colColor ? ratio.toFixed(2) : "-"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 16, fontSize: 14, color: "#555" }}>
          Green = passes WCAG AA (contrast ≥ 4.5)
        </div>
      </div>
    </div>,
    typeof window !== "undefined" ? document.body : undefined
  );
};

export default AccessibilityChartModal;
