import React, { useState } from "react";
// chroma-js for color manipulation
import chroma from "chroma-js";

const GenerateColours = ({ rows, setRows }) => {
    // Collapsible state
    const [showRowGen, setShowRowGen] = useState(false);
    const [showSingleGen, setShowSingleGen] = useState(false);
    // Row generator state
    const [rowBase, setRowBase] = useState("#f17496");
    const [rowPreview, setRowPreview] = useState([]);
    // Single color generator state
    const [singleBase1, setSingleBase1] = useState("#f17496");
    const [singleBase2, setSingleBase2] = useState("");
    const [singleMode, setSingleMode] = useState("lighter");
    const [singleAmount, setSingleAmount] = useState(20);
    const [singlePreview, setSinglePreview] = useState("");
    const [replaceRow, setReplaceRow] = useState("main");
    const [replaceIdx, setReplaceIdx] = useState(0);

    // Generate row preview
    const handleRowGen = () => {
        try {
            const scale = chroma
                .scale([
                    chroma(rowBase).brighten(2),
                    rowBase,
                    chroma(rowBase).darken(2),
                ])
                .mode("lab")
                .colors(8);
            setRowPreview(scale);
        } catch (e) {
            setRowPreview([]);
        }
    };

    // Generate single color preview
    const handleSingleGen = () => {
        try {
            let c;
            if (singleMode === "blend" && singleBase2) {
                const amt = Math.max(0, Math.min(1, singleAmount / 100));
                c = chroma.mix(singleBase1, singleBase2, amt, "lab").hex();
            } else {
                const amt = Math.abs(singleAmount) / 100;
                if (singleMode === "lighter") {
                    c = chroma(singleBase1).brighten(amt * 2).hex();
                } else {
                    c = chroma(singleBase1).darken(amt * 2).hex();
                }
            }
            setSinglePreview(c);
        } catch (e) {
            setSinglePreview("");
        }
    };

    // Replace row with generated row
    const doReplaceRow = () => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.label.toLowerCase() === replaceRow
                    ? { ...row, colors: rowPreview }
                    : row
            )
        );
    };

    // Insert/replace single color
    const doInsertSingle = () => {
        setRows((prevRows) =>
            prevRows.map((row) => {
                if (row.label.toLowerCase() === replaceRow) {
                    const colors = [...row.colors];
                    colors[replaceIdx] = singlePreview;
                    return { ...row, colors };
                }
                return row;
            })
        );
    };

    // Row labels for dropdowns
    const rowLabels = rows.map((row) => row.label.toLowerCase());

    return (
        <div style={{ marginBottom: 18 }}>
            {/* Generate Colour Row Section */}
            <div style={{ marginBottom: 10 }}>
                <button
                    style={{
                        fontWeight: 600,
                        marginBottom: 4,
                        fontSize: 15,
                        background: "#f5f5f5",
                        border: "1px solid #ccc",
                        borderRadius: 6,
                        padding: "4px 12px",
                        cursor: "pointer",
                    }}
                    onClick={() => setShowRowGen((v) => !v)}
                >
                    {showRowGen ? "Hide" : "View"} Generate Colour Row
                </button>
                {showRowGen && (
                    <div
                        style={{
                            background: "#fafbfc",
                            border: "1px solid #eee",
                            borderRadius: 8,
                            padding: 14,
                            marginTop: 4,
                            marginBottom: 8,
                        }}
                    >
                        <div style={{ fontWeight: 500, marginBottom: 6 }}>
                            Generate a palette row from a base color
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 8,
                            }}
                        >
                            <input
                                type="color"
                                value={rowBase}
                                onChange={(e) => {
                                    setRowBase(e.target.value);
                                }}
                                style={{ width: 36, height: 36, border: "none" }}
                            />
                            <input
                                type="text"
                                value={rowBase}
                                onChange={(e) => setRowBase(e.target.value)}
                                style={{ width: 90, fontSize: 15, padding: "4px 8px" }}
                            />
                            <button
                                onClick={handleRowGen}
                                style={{
                                    marginLeft: 8,
                                    padding: "4px 12px",
                                    borderRadius: 6,
                                    border: "1px solid #6883a1",
                                    background: "#fff",
                                    color: "#6883a1",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                Preview
                            </button>
                        </div>
                        {rowPreview.length === 8 && (
                            <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                                {rowPreview.map((c, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: "50%",
                                            background: c,
                                            border: "1.5px solid #a4a4a4",
                                            display: "inline-block",
                                            boxShadow: "0 1px 4px #0001",
                                        }}
                                        title={c}
                                    ></span>
                                ))}
                            </div>
                        )}
                        {rowPreview.length === 8 && (
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span>Replace row:</span>
                                <select
                                    value={replaceRow}
                                    onChange={(e) => setReplaceRow(e.target.value)}
                                    style={{ fontSize: 15, padding: "2px 8px" }}
                                >
                                    {rowLabels.map((l) => (
                                        <option key={l} value={l}>
                                            {l.charAt(0).toUpperCase() + l.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={doReplaceRow}
                                    style={{
                                        padding: "4px 12px",
                                        borderRadius: 6,
                                        border: "1px solid #6883a1",
                                        background: "#6883a1",
                                        color: "#fff",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                    }}
                                >
                                    Replace
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {/* Generate Single Colour Section */}
            <div style={{ marginBottom: 18 }}>
                <button
                    style={{
                        fontWeight: 600,
                        marginBottom: 4,
                        fontSize: 15,
                        background: "#f5f5f5",
                        border: "1px solid #ccc",
                        borderRadius: 6,
                        padding: "4px 12px",
                        cursor: "pointer",
                    }}
                    onClick={() => setShowSingleGen((v) => !v)}
                >
                    {showSingleGen ? "Hide" : "View"} Generate Single Colour
                </button>
                {showSingleGen && (
                    <div
                        style={{
                            background: "#fafbfc",
                            border: "1px solid #eee",
                            borderRadius: 8,
                            padding: 14,
                            marginTop: 4,
                            marginBottom: 8,
                        }}
                    >
                        <div style={{ fontWeight: 500, marginBottom: 6 }}>
                            Generate a single color from 1 or 2 colors
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 8,
                            }}
                        >
                            <input
                                type="color"
                                value={singleBase1}
                                onChange={(e) => setSingleBase1(e.target.value)}
                                style={{ width: 36, height: 36, border: "none" }}
                            />
                            <input
                                type="text"
                                value={singleBase1}
                                onChange={(e) => setSingleBase1(e.target.value)}
                                style={{ width: 90, fontSize: 15, padding: "4px 8px" }}
                            />
                            <span>and/or</span>
                            <input
                                type="color"
                                value={singleBase2 || "#ffffff"}
                                onChange={(e) => setSingleBase2(e.target.value)}
                                style={{ width: 36, height: 36, border: "none" }}
                            />
                            <input
                                type="text"
                                value={singleBase2}
                                onChange={(e) => setSingleBase2(e.target.value)}
                                style={{ width: 90, fontSize: 15, padding: "4px 8px" }}
                                placeholder="#hex (optional)"
                            />
                            <select
                                value={singleMode}
                                onChange={(e) => setSingleMode(e.target.value)}
                                style={{ fontSize: 15, padding: "2px 8px" }}
                            >
                                <option value="lighter">Lighter</option>
                                <option value="darker">Darker</option>
                                <option value="blend">Blend</option>
                            </select>
                            <input
                                type="number"
                                value={singleAmount}
                                onChange={(e) => setSingleAmount(Number(e.target.value))}
                                style={{ width: 60, fontSize: 15, padding: "4px 8px" }}
                                min={0}
                                max={100}
                            />
                            <span>%</span>
                            <button
                                onClick={handleSingleGen}
                                style={{
                                    marginLeft: 8,
                                    padding: "4px 12px",
                                    borderRadius: 6,
                                    border: "1px solid #6883a1",
                                    background: "#fff",
                                    color: "#6883a1",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                Preview
                            </button>
                        </div>
                        {singlePreview && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    marginBottom: 8,
                                }}
                            >
                                <span
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: "50%",
                                        background: singlePreview,
                                        border: "1.5px solid #a4a4a4",
                                        display: "inline-block",
                                        boxShadow: "0 1px 4px #0001",
                                    }}
                                    title={singlePreview}
                                ></span>
                                <span>{singlePreview}</span>
                            </div>
                        )}
                        {singlePreview && (
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span>Target row:</span>
                                <select
                                    value={replaceRow}
                                    onChange={(e) => setReplaceRow(e.target.value)}
                                    style={{ fontSize: 15, padding: "2px 8px" }}
                                >
                                    {rowLabels.map((l) => (
                                        <option key={l} value={l}>
                                            {l.charAt(0).toUpperCase() + l.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                <span>Position:</span>
                                <input
                                    type="number"
                                    value={replaceIdx}
                                    min={0}
                                    max={7}
                                    onChange={(e) => setReplaceIdx(Number(e.target.value))}
                                    style={{ width: 40, fontSize: 15, padding: "4px 8px" }}
                                />
                                <button
                                    onClick={doInsertSingle}
                                    style={{
                                        padding: "4px 12px",
                                        borderRadius: 6,
                                        border: "1px solid #6883a1",
                                        background: "#6883a1",
                                        color: "#fff",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                    }}
                                >
                                    Insert/Replace
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenerateColours;
