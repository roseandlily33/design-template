import React, { useState } from "react";
import SecondaryButton from "../../app/buttons/SecondaryButton/SecondaryButton.component";
import SelectButton from "@/app/buttons/SelectButton/SelectButton.component";

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
      <div style={{ fontWeight: 600, marginBottom: 10 }}>Copy Palette</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 10,
        }}
      >
        <SelectButton
          options={[
            { value: 0, label: "Palette 1" },
            { value: 1, label: "Palette 2" },
            { value: 2, label: "Palette 3" },
          ]}
          value={sourceIdx}
          onChange={(e) => setSourceIdx(Number(e.target.value))}
          label="From:"
        />
        <SelectButton
          options={[
            { value: 0, label: "Palette 1" },
            { value: 1, label: "Palette 2" },
            { value: 2, label: "Palette 3" },
          ]}
          value={targetIdx}
          onChange={(e) => setTargetIdx(Number(e.target.value))}
          label="To:"
        />
        <SecondaryButton span="Copy All Rows" functionName={handleCopyAll} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <SelectButton
          options={rowLabels.map((l) => ({
            value: l,
            label: l.charAt(0).toUpperCase() + l.slice(1),
          }))}
          value={rowLabel}
          onChange={(e) => setRowLabel(e.target.value)}
          label="Row:"
        />
        <SecondaryButton span="Copy Row" functionName={handleCopyRow} />
      </div>
    </div>
  );
};

export default CopyPalette;
