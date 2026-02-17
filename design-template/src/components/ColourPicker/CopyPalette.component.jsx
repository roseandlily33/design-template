import React, { useState } from "react";

const CopyPalette = ({ palettes, setPalettes }) => {
  const [sourceIdx, setSourceIdx] = useState(0);
  const [targetIdx, setTargetIdx] = useState(1);
  const [rowLabel, setRowLabel] = useState(
    palettes[0]?.[0]?.label?.toLowerCase() || "main",
  );
  const [open, setOpen] = useState(false);

  // Get row labels from source palette
  const rowLabels =
    palettes[sourceIdx]?.map((row) => row.label.toLowerCase()) || [];

  // Copy all rows from source to target (overwrite all rows by label)
  const handleCopyAll = () => {
    setPalettes(targetIdx, (prev) => {
      return prev.map((row) => {
        const match = palettes[sourceIdx].find(
          (r) => r.label.toLowerCase() === row.label.toLowerCase(),
        );
        return match ? { ...row, colors: [...match.colors] } : row;
      });
    });
  };

  // Copy a single row from source to target (by label)
  const handleCopyRow = () => {
    setPalettes(targetIdx, (prev) => {
      return prev.map((row) =>
        row.label.toLowerCase() === rowLabel
          ? {
              ...row,
              colors:
                palettes[sourceIdx]
                  .find((r) => r.label.toLowerCase() === rowLabel)
                  ?.colors?.slice() || row.colors,
            }
          : row,
      );
    });
  };

  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: 8,
        padding: 0,
        background: "#fafbfc",
      }}
    >
      <div
        style={{
          fontWeight: 600,
          marginBottom: 0,
          padding: "14px 18px",
          borderBottom: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => setOpen((v) => !v)}
      >
        Copy Palette
        <span style={{ fontSize: 18, marginLeft: 8 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ padding: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 18,
            }}
          >
            <label style={{ fontWeight: 500 }}>From:</label>
            <select
              value={sourceIdx}
              onChange={(e) => setSourceIdx(Number(e.target.value))}
              style={{
                fontSize: 15,
                padding: "6px 14px",
                borderRadius: 6,
                border: "1.5px solid #6883a1",
                background: "#f7f8fa",
                color: "#222",
              }}
            >
              <option value={0}>Palette 1</option>
              <option value={1}>Palette 2</option>
              <option value={2}>Palette 3</option>
            </select>
            <label style={{ fontWeight: 500 }}>To:</label>
            <select
              value={targetIdx}
              onChange={(e) => setTargetIdx(Number(e.target.value))}
              style={{
                fontSize: 15,
                padding: "6px 14px",
                borderRadius: 6,
                border: "1.5px solid #6883a1",
                background: "#f7f8fa",
                color: "#222",
              }}
            >
              <option value={0}>Palette 1</option>
              <option value={1}>Palette 2</option>
              <option value={2}>Palette 3</option>
            </select>
            <button
              type="button"
              onClick={handleCopyAll}
              style={{
                padding: "7px 18px",
                borderRadius: 6,
                border: "1.5px solid #6883a1",
                background: "#f7f8fa",
                color: "#222",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Copy All Rows
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <label style={{ fontWeight: 500 }}>Row:</label>
            <select
              value={rowLabel}
              onChange={(e) => setRowLabel(e.target.value)}
              style={{
                fontSize: 15,
                padding: "6px 14px",
                borderRadius: 6,
                border: "1.5px solid #6883a1",
                background: "#f7f8fa",
                color: "#222",
              }}
            >
              {rowLabels.map((l) => (
                <option key={l} value={l}>
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleCopyRow}
              style={{
                padding: "7px 18px",
                borderRadius: 6,
                border: "1.5px solid #6883a1",
                background: "#e3fbe3",
                color: "#222",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Copy Row
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CopyPalette;
