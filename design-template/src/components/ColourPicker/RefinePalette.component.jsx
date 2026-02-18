import React, { useState, useEffect } from "react";
import chroma from "chroma-js";

const RefinePalette = ({ palette, setPalette }) => {
    const [open, setOpen] = useState(false);
    const [rowLabel, setRowLabel] = useState(palette[0]?.label?.toLowerCase() || "main");
    const [locked, setLocked] = useState(() => (palette[0]?.colors || []).map(() => false));
    const [error, setError] = useState("");
    const [beforeColors, setBeforeColors] = useState([]);
    const [afterColors, setAfterColors] = useState([]);
    const [iteration, setIteration] = useState(0);

    useEffect(() => {
        const row = palette.find((r) => r.label.toLowerCase() === rowLabel);
        setLocked((row?.colors || []).map(() => false));
        setBeforeColors(row?.colors || []);
        setAfterColors(row?.colors || []);
        setIteration(0);
        setError("");
    }, [rowLabel, palette]);

    const rowLabels = palette.map((row) => row.label.toLowerCase());
    const row = palette.find((r) => r.label.toLowerCase() === rowLabel) || palette[0];

    // Toggle lock for a color in after row
    const toggleLock = (idx) => {
        setLocked((prev) => prev.map((l, i) => (i === idx ? !l : l)));
    };

    // Refine colors and update afterColors
    const refineColors = (colors, lockedArr) => {
        if (!colors || colors.length < 2) return colors;
        const lockedIdxs = lockedArr
            .map((l, i) => (l ? i : null))
            .filter((v) => v !== null);
        if (lockedIdxs.length < 2) return colors;
        let newColors = [...colors];
        for (let i = 0; i < lockedIdxs.length - 1; ++i) {
            const startIdx = lockedIdxs[i];
            const endIdx = lockedIdxs[i + 1];
            const startColor = colors[startIdx];
            const endColor = colors[endIdx];
            const n = endIdx - startIdx;
            if (n > 1) {
                const scale = chroma.scale([startColor, endColor]).mode("lab").colors(n + 1);
                for (let j = 1; j < n; ++j) {
                    if (!lockedArr[startIdx + j]) {
                        newColors[startIdx + j] = scale[j];
                    }
                }
            }
        }
        return newColors;
    };

    // Handle refine (first or iterative)
    const handleRefine = () => {
        setError("");
        if (!afterColors || afterColors.length < 2) return;
        const lockedIdxs = locked
            .map((l, i) => (l ? i : null))
            .filter((v) => v !== null);
        if (lockedIdxs.length < 2) {
            setError("Lock at least two colors to interpolate between.");
            return;
        }
        const newColors = refineColors(afterColors, locked);
        setAfterColors(newColors);
        setIteration((it) => it + 1);
    };

    // Apply afterColors to palette and sync afterColors with new palette row
    const handleApply = () => {
        setPalette((prev) =>
            prev.map((r) =>
                r.label.toLowerCase() === rowLabel ? { ...r, colors: afterColors } : r
            )
        );
        // After palette updates, sync afterColors and beforeColors with new palette row
        setTimeout(() => {
            const updatedRow = palette.find((r) => r.label.toLowerCase() === rowLabel);
            if (updatedRow) {
                setBeforeColors(updatedRow.colors);
                setAfterColors(updatedRow.colors);
                setLocked((updatedRow.colors || []).map(() => false));
            }
            setIteration(0);
            setError("");
        }, 0);
    };

    // Reset to original
    const handleReset = () => {
        setAfterColors(row.colors);
        setLocked((row?.colors || []).map(() => false));
        setIteration(0);
        setError("");
    };

    return (
        <div
            style={{
                border: "1px solid #eee",
                borderRadius: 8,
                padding: 0,
                background: "#fafbfc",
                marginBottom: 18,
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
                Refine Palette
                <span style={{ fontSize: 18, marginLeft: 8 }}>{open ? "▲" : "▼"}</span>
            </div>
            {open && (
                <div style={{ padding: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
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
                    </div>
                    {/* Before row */}
                    <div style={{ fontWeight: 500, marginBottom: 6 }}>Before:</div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
                        {beforeColors.map((color, idx) => (
                            <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <span
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: "50%",
                                        background: color,
                                        border: "1.5px solid #bbb",
                                        boxShadow: "0 1px 4px #0001",
                                        marginBottom: 4,
                                    }}
                                    title={color}
                                />
                                <span style={{ fontSize: 13, color: "#333", fontFamily: "monospace" }}>{color}</span>
                            </div>
                        ))}
                    </div>
                    {/* After row */}
                    <div style={{ fontWeight: 500, marginBottom: 6 }}>After{iteration > 0 ? ` (Iteration ${iteration})` : ""}:</div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
                        {afterColors.map((color, idx) => (
                            <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <span
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: "50%",
                                        background: color,
                                        border: locked[idx] ? "2.5px solid #1976d2" : "1.5px solid #bbb",
                                        boxShadow: "0 1px 4px #0001",
                                        cursor: "pointer",
                                        marginBottom: 4,
                                        transition: "border 0.2s"
                                    }}
                                    title={color + (locked[idx] ? " (locked)" : "")}
                                    onClick={() => toggleLock(idx)}
                                />
                                <span style={{ fontSize: 13, color: "#333", fontFamily: "monospace" }}>{color}</span>
                                <button
                                    type="button"
                                    onClick={() => toggleLock(idx)}
                                    style={{
                                        fontSize: 12,
                                        padding: "2px 8px",
                                        borderRadius: 6,
                                        border: "1px solid #aaa",
                                        background: locked[idx] ? "#e3fbe3" : "#f7f8fa",
                                        color: "#222",
                                        cursor: "pointer",
                                        marginTop: 2,
                                    }}
                                >
                                    {locked[idx] ? "Locked" : "Lock"}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                        <button
                            type="button"
                            onClick={handleRefine}
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
                            Iterate Again
                        </button>
                        <button
                            type="button"
                            onClick={handleApply}
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
                            Apply to Palette
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            style={{
                                padding: "7px 18px",
                                borderRadius: 6,
                                border: "1.5px solid #bbb",
                                background: "#fff",
                                color: "#222",
                                fontWeight: 500,
                                cursor: "pointer",
                            }}
                        >
                            Reset
                        </button>
                    </div>
                    {error && <span style={{ color: "#b00", fontWeight: 500, marginLeft: 10 }}>{error}</span>}
                    <div style={{ fontSize: 13, color: "#888", marginTop: 8 }}>
                        Click a color in the after row to lock it. Lock at least two colors to rebalance the rest. Iterate as many times as you want before applying.
                    </div>
                </div>
            )}
        </div>
    );
};

export default RefinePalette;
