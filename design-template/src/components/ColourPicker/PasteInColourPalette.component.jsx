import React, { useState } from "react";
import chroma from "chroma-js";

// Utility: parse CSS custom properties or hex values from pasted text
function parseColors(text) {
    // Accept lines like --name: #hex; or just #hex
    const lines = text.split(/\n|;/).map(l => l.trim()).filter(Boolean);
    const colors = [];
    for (let line of lines) {
        let color = "";
        // Try to extract from --var: #hex;
        const match = line.match(/:([^;#]*)(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\))/);
        if (match) {
            color = match[2].trim();
        } else {
            // Or just a hex/rgb value
            color = line.split(":").pop().trim();
        }
        if (chroma.valid(color)) colors.push(color);
    }
    return colors;
}


// Utility: sort colors from lightest to darkest
function sortByLuminance(arr) {
    return arr.slice().sort((a, b) => chroma(a).luminance() - chroma(b).luminance());
}


// Utility: build rows from four arrays
function buildRows(grey, main, accent, extra) {
    return [
        { label: "Grey", colors: sortByLuminance(grey).slice(0, 8) },
        { label: "Main", colors: sortByLuminance(main).slice(0, 8) },
        { label: "Accent", colors: sortByLuminance(accent).slice(0, 8) },
        { label: "Extra", colors: sortByLuminance(extra).slice(0, 8) },
    ];
}



const PasteInColourPalette = ({ onApply }) => {
    const [greyInput, setGreyInput] = useState("");
    const [mainInput, setMainInput] = useState("");
    const [accentInput, setAccentInput] = useState("");
    const [extraInput, setExtraInput] = useState("");
    const [parsed, setParsed] = useState([]);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [paletteIdx, setPaletteIdx] = useState(0);

    const handleParse = () => {
        try {
            const grey = parseColors(greyInput);
            const main = parseColors(mainInput);
            const accent = parseColors(accentInput);
            const extra = parseColors(extraInput);
            if (!grey.length && !main.length && !accent.length && !extra.length) {
                setParsed([]);
                setError("No valid colors found in any section.");
                return;
            }
            const rows = buildRows(grey, main, accent, extra);
            setParsed(rows);
            setError("");
        } catch (e) {
            setParsed([]);
            setError("Error parsing colors.");
        }
    };

    const handleApply = () => {
        if (onApply && parsed.length) {
            onApply(parsed, paletteIdx);
        }
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
                Paste CSS Palette
                <span style={{ fontSize: 18, marginLeft: 8 }}>{open ? "▲" : "▼"}</span>
            </div>
            {open && (
                <div style={{ padding: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
                        <label style={{ fontWeight: 500 }}>Palette:</label>
                        <select
                            value={paletteIdx}
                            onChange={e => setPaletteIdx(Number(e.target.value))}
                            style={{ fontSize: 15, padding: "6px 14px", borderRadius: 6, border: "1.5px solid #6883a1", background: "#f7f8fa", color: "#222" }}
                        >
                            <option value={0}>Palette 1</option>
                            <option value={1}>Palette 2</option>
                            <option value={2}>Palette 3</option>
                        </select>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 12 }}>
                        <div>
                            <div style={{ fontWeight: 500, marginBottom: 4 }}>Grey</div>
                            <textarea
                                value={greyInput}
                                onChange={e => setGreyInput(e.target.value)}
                                placeholder={"Paste 1 per line or CSS vars"}
                                rows={4}
                                style={{ width: "100%", fontSize: 15, padding: 8, borderRadius: 6, border: "1.5px solid #e3e7ee", fontFamily: "monospace" }}
                            />
                        </div>
                        <div>
                            <div style={{ fontWeight: 500, marginBottom: 4 }}>Main</div>
                            <textarea
                                value={mainInput}
                                onChange={e => setMainInput(e.target.value)}
                                placeholder={"Paste 1 per line or CSS vars"}
                                rows={4}
                                style={{ width: "100%", fontSize: 15, padding: 8, borderRadius: 6, border: "1.5px solid #e3e7ee", fontFamily: "monospace" }}
                            />
                        </div>
                        <div>
                            <div style={{ fontWeight: 500, marginBottom: 4 }}>Accent</div>
                            <textarea
                                value={accentInput}
                                onChange={e => setAccentInput(e.target.value)}
                                placeholder={"Paste 1 per line or CSS vars"}
                                rows={4}
                                style={{ width: "100%", fontSize: 15, padding: 8, borderRadius: 6, border: "1.5px solid #e3e7ee", fontFamily: "monospace" }}
                            />
                        </div>
                        <div>
                            <div style={{ fontWeight: 500, marginBottom: 4 }}>Extra</div>
                            <textarea
                                value={extraInput}
                                onChange={e => setExtraInput(e.target.value)}
                                placeholder={"Paste 1 per line or CSS vars"}
                                rows={4}
                                style={{ width: "100%", fontSize: 15, padding: 8, borderRadius: 6, border: "1.5px solid #e3e7ee", fontFamily: "monospace" }}
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "center",
                            marginBottom: 10,
                        }}
                    >
                        <button
                            type="button"
                            onClick={handleParse}
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
                            Parse
                        </button>
                        {parsed.length > 0 && (
                            <button
                                type="button"
                                onClick={handleApply}
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
                                Apply to Palette
                            </button>
                        )}
                        {error && (
                            <span style={{ color: "#b00", fontWeight: 500 }}>{error}</span>
                        )}
                    </div>
                    {parsed.length > 0 && (
                        <div style={{ marginTop: 8 }}>
                            <div style={{ fontWeight: 500, marginBottom: 6 }}>Preview:</div>
                            {parsed.map((row) => (
                                <div key={row.label} style={{ marginBottom: 8 }}>
                                    <span style={{ fontWeight: 600 }}>{row.label}:</span>
                                    <span style={{ marginLeft: 8, display: "inline-flex", gap: 6 }}>
                                        {row?.colors.map((c, i) => (
                                            <span
                                                key={c + i}
                                                style={{
                                                    display: "inline-block",
                                                    width: 28,
                                                    height: 28,
                                                    borderRadius: 6,
                                                    background: c,
                                                    border: "1.5px solid #bbb",
                                                    marginRight: 2,
                                                }}
                                                title={c}
                                            ></span>
                                        ))}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PasteInColourPalette;
