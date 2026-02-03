import React from "react";
import styles from "./ColourPicker.module.css";

const ButtonsForColours = ({
  idx,
  color,
  rowIdx,
  setRows,
  rows,
  selected,
  setSelected,
  setHexInput,
  hexInput,
  copied,
  setCopied,
  label,
}) => {
  return (
    <>
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
              prevRows?.map((row, rIdx) => {
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
                  prevRows?.map((row, rIdx) => {
                    if (rIdx === rowIdx) {
                      const newColors = [...row.colors];
                      [newColors[idx - 1], newColors[idx]] = [
                        newColors[idx],
                        newColors[idx - 1],
                      ];
                      return { ...row, colors: newColors };
                    }
                    return row;
                  }),
                );
              }}
            >
              ←
            </button>
          )}
          {idx < rows?.colors?.length - 1 && (
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
                  prevRows?.map((row, rIdx) => {
                    if (rIdx === rowIdx) {
                      const newColors = [...row.colors];
                      [newColors[idx], newColors[idx + 1]] = [
                        newColors[idx + 1],
                        newColors[idx],
                      ];
                      return { ...row, colors: newColors };
                    }
                    return row;
                  }),
                );
              }}
            >
              →
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ButtonsForColours;
