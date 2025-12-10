import React, { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./FontScale.module.css";
const TAGS = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "small", "blockquote"];
const BREAKPOINTS = ["Desktop", "Tablet", "Mobile"];

function getFontType(tag) {
  if (["h1", "h2", "h3"].includes(tag)) return "head";
  if (["h4", "h5", "h6", "blockquote", "p"].includes(tag)) return "main";
  return "extra";
}

const defaultFontSizes = {
  h1: 3,
  h2: 2.25,
  h3: 1.75,
  h4: 1.5,
  h5: 1.25,
  h6: 1,
  p: 1,
  small: 0.875,
  blockquote: 1.25,
};
const defaultStyles = {};
TAGS?.forEach((tag) => {
  defaultStyles[tag] = {
    Desktop: {
      fontSize: defaultFontSizes[tag],
      fontWeight: 400,
      textTransform: "none",
      lineHeight: 1.2,
      letterSpacing: 0,
      color: "#222",
      border: "none",
    },
    Tablet: {
      fontSize: defaultFontSizes[tag] * 0.92,
      fontWeight: 400,
      textTransform: "none",
      lineHeight: 1.3,
      letterSpacing: 0,
      color: "#222",
      border: "none",
    },
    Mobile: {
      fontSize: defaultFontSizes[tag] * 0.85,
      fontWeight: 400,
      textTransform: "none",
      lineHeight: 1.4,
      letterSpacing: 0,
      color: "#222",
      border: "none",
    },
  };
});

// Type scale presets
const TYPE_SCALES = [
  {
    name: "Minor Third",
    ratio: 1.2,
  },
  {
    name: "Major Third",
    ratio: 1.25,
  },
  {
    name: "Perfect Fourth",
    ratio: 1.333,
  },

  {
    name: "Custom",
    ratio: null,
  },
];

const FontScale = ({ fontSet, fontMap }) => {
  // Export CSS generator (must be inside component)
  const generateCSS = () => {
    let css = "";
    // Desktop
    css += "/* Desktop styles */\n";
    TAGS.forEach((tag) => {
      const s = stylesState[tag].Desktop;
      css += `${tag} {\n`;
      css += `  font-size: ${s.fontSize}rem;\n`;
      css += `  font-weight: ${s.fontWeight};\n`;
      css += `  text-transform: ${s.textTransform};\n`;
      css += `  line-height: ${s.lineHeight};\n`;
      css += `  letter-spacing: ${s.letterSpacing}rem;\n`;
      css += `  color: ${s.color};\n`;
      if (s.border && s.border !== "none") css += `  border: ${s.border};\n`;
      css += "}\n\n";
    });
    // Tablet
    css += "/* Tablet styles */\n@media (max-width: 900px) {\n";
    TAGS.forEach((tag) => {
      const s = stylesState[tag].Tablet;
      css += `  ${tag} {\n`;
      css += `    font-size: ${s.fontSize}rem;\n`;
      css += `    font-weight: ${s.fontWeight};\n`;
      css += `    text-transform: ${s.textTransform};\n`;
      css += `    line-height: ${s.lineHeight};\n`;
      css += `    letter-spacing: ${s.letterSpacing}rem;\n`;
      css += `    color: ${s.color};\n`;
      if (s.border && s.border !== "none") css += `    border: ${s.border};\n`;
      css += `  }\n\n`;
    });
    css += "}\n\n";
    // Mobile
    css += "/* Mobile styles */\n@media (max-width: 600px) {\n";
    TAGS.forEach((tag) => {
      const s = stylesState[tag].Mobile;
      css += `  ${tag} {\n`;
      css += `    font-size: ${s.fontSize}rem;\n`;
      css += `    font-weight: ${s.fontWeight};\n`;
      css += `    text-transform: ${s.textTransform};\n`;
      css += `    line-height: ${s.lineHeight};\n`;
      css += `    letter-spacing: ${s.letterSpacing}rem;\n`;
      css += `    color: ${s.color};\n`;
      if (s.border && s.border !== "none") css += `    border: ${s.border};\n`;
      css += `  }\n\n`;
    });
    css += "}\n";
    return css;
  };

  const handleExport = () => {
    setCssExport(generateCSS());
    setShowExport(true);
  };
  const [stylesState, setStylesState] = useState(defaultStyles);
  const [modified, setModified] = useState({}); // { tag: { bp: true } }
  const [modal, setModal] = useState(null); // { tag, bp }
  const [selectedScale, setSelectedScale] = useState(0); // single scale for all devices
  // Export CSS state hooks (must be inside component)
  const [showExport, setShowExport] = useState(false);
  const [cssExport, setCssExport] = useState("");

  // Apply type scale preset to all tags for all breakpoints
  const applyTypeScale = (scaleIdx) => {
    const scale = TYPE_SCALES[scaleIdx];
    let newStyles = { ...stylesState };
    if (scale.name === "Custom") {
      // Custom: use defaultFontSizes for each tag
      let tags = [...TAGS];
      BREAKPOINTS.forEach((bp) => {
        tags.forEach((tag) => {
          let baseSize = defaultFontSizes[tag];
          let fontSize = baseSize;
          if (bp === "Tablet") fontSize = baseSize * 0.92;
          if (bp === "Mobile") fontSize = baseSize * 0.85;
          newStyles[tag] = {
            ...newStyles[tag],
            [bp]: {
              ...newStyles[tag][bp],
              fontSize: parseFloat(fontSize.toFixed(3)),
            },
          };
        });
      });
    } else {
      // Ratio-based scales
      let tags = [...TAGS].reverse();
      const base = 1; // 1rem base
      let ratio = scale.ratio;
      BREAKPOINTS.forEach((bp) => {
        tags.forEach((tag, i) => {
          let fontSize = base * Math.pow(ratio, i);
          if (bp === "Desktop") fontSize = fontSize;
          if (bp === "Tablet") fontSize *= 0.82;
          if (bp === "Mobile") fontSize *= 0.68;
          newStyles[tag] = {
            ...newStyles[tag],
            [bp]: {
              ...newStyles[tag][bp],
              fontSize: parseFloat(fontSize.toFixed(3)),
            },
          };
        });
      });
    }
    setStylesState(newStyles);
    setSelectedScale(scaleIdx);
  };

  // Helper: perform the style change for a single field
  const handleStyleChange = (tag, bp, key, value) => {
    setStylesState((prev) => {
      let next = { ...prev };
      if (key === "fontSize" && bp === "Desktop") {
        // If not cascading, still update Tablet/Mobile if not modified
        next[tag] = {
          ...next[tag],
          Desktop: { ...next[tag]["Desktop"], fontSize: value },
          Tablet: modified[tag]?.Tablet
            ? next[tag]["Tablet"]
            : {
                ...next[tag]["Tablet"],
                fontSize: parseFloat((value * 0.92).toFixed(3)),
              },
          Mobile: modified[tag]?.Mobile
            ? next[tag]["Mobile"]
            : {
                ...next[tag]["Mobile"],
                fontSize: parseFloat((value * 0.85).toFixed(3)),
              },
        };
      } else {
        next[tag] = {
          ...next[tag],
          [bp]: { ...next[tag][bp], [key]: value },
        };
      }
      return next;
    });
    setModified((prev) => {
      let next = { ...prev };
      next[tag] = { ...next[tag], [bp]: true };
      return next;
    });
  };

  // Apply all Desktop styles for a tag to Tablet and Mobile
  const cascadeDesktopToAll = (tag) => {
    setStylesState((prev) => {
      let next = { ...prev };
      const desktopStyles = { ...next[tag]["Desktop"] };
      next[tag] = {
        ...next[tag],
        Tablet: { ...next[tag]["Tablet"], ...desktopStyles },
        Mobile: { ...next[tag]["Mobile"], ...desktopStyles },
      };
      return next;
    });
    setModified((prev) => {
      let next = { ...prev };
      next[tag] = { ...next[tag], Tablet: true, Mobile: true };
      return next;
    });
  };

  return (
    <div className={styles.scaleRoot}>
      <div className={styles.scaleHeader}>
        <div className={styles.scaleTitle}>Font Scale Chart</div>
        <button className={styles.scaleExportBtn} onClick={handleExport}>
          Export CSS
        </button>
      </div>
      {showExport && (
        <div
          style={{
            margin: "18px auto",
            maxWidth: 700,
            background: "#f8fafd",
            border: "1px solid #cce",
            borderRadius: 8,
            padding: 18,
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            fontSize: 15,
            color: "#222",
            position: "relative",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              padding: "4px 10px",
              fontSize: 14,
              borderRadius: 5,
              background: "#0070f3",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              navigator.clipboard.writeText(cssExport);
            }}
          >
            Copy
          </button>
          {cssExport}
        </div>
      )}
      <div className={styles.scaleTypeScales}>
        {TYPE_SCALES.map((scale, idx) => (
          <button
            key={scale.name}
            className={
              styles.scaleTypeBtn +
              (selectedScale === idx ? " " + styles.selected : "")
            }
            onClick={() => applyTypeScale(idx)}
          >
            {scale.name}
          </button>
        ))}
        {TYPE_SCALES[selectedScale]?.name === "Custom" && (
          <span
            style={{
              marginLeft: 12,
              color: "#666",
              fontSize: 14,
            }}
          >
            Custom scale uses your default font sizes for each tag.
          </span>
        )}
      </div>
      <div className={styles.breakpointCards}>
        {BREAKPOINTS.map((bp) => (
          <div key={bp} className={styles.breakpointCard}>
            <div className={styles.breakpointTitle}>{bp}</div>
            {TAGS.map((tag) => {
              const fontType = getFontType(tag);
              const fontName = fontSet[fontType];
              const className = fontMap[fontName];
              const styleObj = stylesState[tag][bp];
              const isModified = modified[tag]?.[bp];
              return (
                <div
                  key={tag}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 18,
                    position: "relative",
                  }}
                >
                  <span
                    className={className}
                    style={{
                      fontSize: `${styleObj.fontSize}rem`,
                      fontWeight: styleObj.fontWeight,
                      textTransform: styleObj.textTransform,
                      lineHeight: styleObj.lineHeight,
                      letterSpacing: styleObj.letterSpacing,
                      color: styleObj.color,
                      border: styleObj.border,
                      padding: "2px 0",
                      background: isModified ? "#f9f5e7" : "none",
                      transition: "background 0.2s",
                    }}
                  >
                    {tag === "blockquote"
                      ? "“Sample blockquote”"
                      : tag === "small"
                      ? "Small text"
                      : `Sample ${tag}`}
                  </span>
                  <button
                    style={{
                      marginLeft: 10,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 18,
                      color: "#0070f3",
                    }}
                    title="Edit style"
                    onClick={() => setModal({ tag, bp })}
                  >
                    ✎
                  </button>
                  {isModified && (
                    <span
                      style={{ color: "#f5a623", marginLeft: 6 }}
                      title="Modified"
                    >
                      ★
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {/* Modal for editing styles */}
      {modal &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.18)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 32,
                minWidth: 340,
                boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              }}
            >
              <h4>
                Edit {modal.tag} ({modal.bp})
              </h4>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: "bold", marginRight: 8 }}>
                  Font Size (rem):
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.5"
                  max="5"
                  value={stylesState[modal.tag][modal.bp].fontSize}
                  onChange={(e) =>
                    handleStyleChange(
                      modal.tag,
                      modal.bp,
                      "fontSize",
                      parseFloat(e.target.value)
                    )
                  }
                  style={{ width: 80, marginRight: 16 }}
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: "bold", marginRight: 8 }}>
                  Font Weight:
                </label>
                <select
                  value={stylesState[modal.tag][modal.bp].fontWeight}
                  onChange={(e) =>
                    handleStyleChange(
                      modal.tag,
                      modal.bp,
                      "fontWeight",
                      parseInt(e.target.value)
                    )
                  }
                  style={{ width: 90, marginRight: 16 }}
                >
                  <option value={400}>400 (Regular)</option>
                  <option value={500}>500 (Medium)</option>
                  <option value={700}>700 (Bold)</option>
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: "bold", marginRight: 8 }}>
                  Text Transform:
                </label>
                <select
                  value={stylesState[modal.tag][modal.bp].textTransform}
                  onChange={(e) =>
                    handleStyleChange(
                      modal.tag,
                      modal.bp,
                      "textTransform",
                      e.target.value
                    )
                  }
                  style={{ width: 120, marginRight: 16 }}
                >
                  <option value="none">None</option>
                  <option value="uppercase">Uppercase</option>
                  <option value="lowercase">Lowercase</option>
                  <option value="capitalize">Capitalize</option>
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: "bold", marginRight: 8 }}>
                  Line Height:
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="1"
                  max="2"
                  value={stylesState[modal.tag][modal.bp].lineHeight}
                  onChange={(e) =>
                    handleStyleChange(
                      modal.tag,
                      modal.bp,
                      "lineHeight",
                      parseFloat(e.target.value)
                    )
                  }
                  style={{ width: 80, marginRight: 16 }}
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: "bold", marginRight: 8 }}>
                  Letter Spacing:
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="-2"
                  max="5"
                  value={stylesState[modal.tag][modal.bp].letterSpacing}
                  onChange={(e) =>
                    handleStyleChange(
                      modal.tag,
                      modal.bp,
                      "letterSpacing",
                      parseFloat(e.target.value)
                    )
                  }
                  style={{ width: 80, marginRight: 16 }}
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: "bold", marginRight: 8 }}>
                  Color:
                </label>
                <input
                  type="color"
                  value={stylesState[modal.tag][modal.bp].color}
                  onChange={(e) =>
                    handleStyleChange(
                      modal.tag,
                      modal.bp,
                      "color",
                      e.target.value
                    )
                  }
                  style={{
                    width: 40,
                    height: 40,
                    border: "none",
                    background: "none",
                    verticalAlign: "middle",
                  }}
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: "bold", marginRight: 8 }}>
                  Border:
                </label>
                <input
                  type="text"
                  value={stylesState[modal.tag][modal.bp].border}
                  onChange={(e) =>
                    handleStyleChange(
                      modal.tag,
                      modal.bp,
                      "border",
                      e.target.value
                    )
                  }
                  style={{ width: 120, marginRight: 16 }}
                  placeholder="e.g. 1px solid #0070f3"
                />
              </div>
              {/* Only show cascade button when editing Desktop */}
              {modal.bp === "Desktop" && (
                <button
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    padding: "8px 18px",
                    fontSize: 15,
                    borderRadius: 6,
                    background: "#0070f3",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    display: "block",
                  }}
                  onClick={() => cascadeDesktopToAll(modal.tag)}
                >
                  Apply all Desktop styles to Tablet & Mobile
                </button>
              )}
              <button
                style={{
                  marginTop: 18,
                  padding: "8px 18px",
                  fontSize: 16,
                  borderRadius: 6,
                  background: "#0070f3",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setModal(null)}
              >
                Close
              </button>
            </div>
          </div>,
          typeof window !== "undefined" ? document.body : undefined
        )}
    </div>
  );
};

export default FontScale;
