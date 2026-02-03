import React, { useState } from "react";
import SecondaryButton from "../../app/buttons/SecondaryButton/SecondaryButton.component";

const CopyPalette = ({ palettes, setPalettes }) => {
  const [sourceIdx, setSourceIdx] = useState(0);
  const [targetIdx, setTargetIdx] = useState(1);
  const [rowLabel, setRowLabel] = useState(
    palettes[0]?.[0]?.label?.toLowerCase() || "main",
  );

  // Get row labels from source palette
  const rowLabels =
    palettes[sourceIdx]?.map((row) => row.label.toLowerCase()) || [];

  // Copy all rows from source to target (overwrite all rows by label)
  const handleCopyAll = () => {
    setPalettes[targetIdx]((prev) => {
      // Overwrite each row in target with matching row from source (by label)
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
    setPalettes[targetIdx]((prev) => {
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
        padding: 16,
        marginBottom: 18,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 10 }}>
        Copy Palette 
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 10,
        }}
      >
        <span>From:</span>
        <select
          value={sourceIdx}
          onChange={(e) => setSourceIdx(Number(e.target.value))}
        >
          <option value={0}>Palette 1</option>
          <option value={1}>Palette 2</option>
          <option value={2}>Palette 3</option>
        </select>
        <span>To:</span>
        <select
          value={targetIdx}
          onChange={(e) => setTargetIdx(Number(e.target.value))}
        >
          <option value={0}>Palette 1</option>
          <option value={1}>Palette 2</option>
          <option value={2}>Palette 3</option>
        </select>
        <SecondaryButton span="Copy All Rows" functionName={handleCopyAll} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span>Row:</span>
        <select value={rowLabel} onChange={(e) => setRowLabel(e.target.value)}>
          {rowLabels.map((l) => (
            <option key={l} value={l}>
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </option>
          ))}
        </select>
        <SecondaryButton span="Copy Row" functionName={handleCopyRow} />
      </div>
    </div>
  );
};

export default CopyPalette;
