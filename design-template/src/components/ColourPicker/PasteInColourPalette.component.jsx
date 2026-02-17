import React, { useState } from "react";
import chroma from "chroma-js";

// Utility: parse CSS custom properties from pasted text
function parseCssVars(text) {
  // Match lines like --name: #hex;
  const regex = /--([\w-]+)\s*:\s*([^;]+);/g;
  let match;
  const vars = [];
  while ((match = regex.exec(text))) {
    const name = match[1];
    const value = match[2].trim();
    // Only accept valid hex or rgb(a)
    if (/^#([0-9a-fA-F]{3}){1,2}$/.test(value) || chroma.valid(value)) {
      vars.push({ name, value });
    }
  }
  return vars;
}

// Utility: group by prefix (e.g. cream, grey, pink, orange)
function groupByFamily(vars) {
  const groups = {};
  vars.forEach(({ name, value }) => {
    // Use first part before dash or number as family
    const family = name
      .split("-")[0]
      .replace(/\d+$/, "")
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase();
    if (!groups[family]) groups[family] = [];
    groups[family].push({ name, value });
  });
  return groups;
}

// Utility: sort colors in a group from lightest to darkest
function sortByLuminance(arr) {
  return arr
    .slice()
    .sort((a, b) => chroma(a.value).luminance() - chroma(b.value).luminance());
}

// Utility: convert groups to palette rows
function groupsToPaletteRows(groups) {
  return Object.entries(groups).map(([label, arr]) => ({
    label: label.charAt(0).toUpperCase() + label.slice(1),
    colors: sortByLuminance(arr).map((c) => c.value),
  }));
}

const PasteInColourPalette = ({ onApply }) => {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState([]);
  const [error, setError] = useState("");

  const handleParse = () => {
    try {
      const vars = parseCssVars(input);
      if (!vars.length) {
        setParsed([]);
        setError("No valid CSS variables found.");
        return;
      }
      const groups = groupByFamily(vars);
      const rows = groupsToPaletteRows(groups);
      setParsed(rows);
      setError("");
    } catch (e) {
      setParsed([]);
      setError("Error parsing colors.");
    }
  };

  const handleApply = () => {
    if (onApply && parsed.length) {
      onApply(parsed);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: 8,
        padding: 18,
        marginBottom: 18,
        background: "#fafbfc",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 10 }}>Paste CSS Palette</div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={"Paste CSS variables here (e.g. --cream-1: #fff;)"}
        rows={7}
        style={{
          width: "100%",
          fontSize: 15,
          padding: 10,
          borderRadius: 6,
          border: "1.5px solid #e3e7ee",
          marginBottom: 10,
          fontFamily: "monospace",
        }}
      />
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
  );
};

export default PasteInColourPalette;
