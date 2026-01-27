import React, { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  TAGS,
  BREAKPOINTS,
  getFontType,
  defaultFontSizes,
  TYPE_SCALES,
  cascadeDesktopToAllForTag,
  generateCSSFromStyles,
} from "./fontscale.helpers.js";
import FontScaleModal from "./FontScaleModal.component.jsx";
import styles from "./FontScale.module.css";
import ExportFontScale from "./ExportFontScaleButton.component.jsx";
import EachTag from "./EachTag.component.jsx";

const FontScale = ({
  fontSet,
  fontMap,
  fontScaleStyles,
  setFontScaleStyles,
  colours: selected,
}) => {
  const [modified, setModified] = useState({});
  const [selectedScale, setSelectedScale] = useState(0);
  const [modal, setModal] = useState(null); // { tag, bp } editor portal
  const [showExport, setShowExport] = useState(false);
  const [cssExport, setCssExport] = useState("");
  const colours = Array.isArray(selected)
    ? selected.map((row) => row.colors).flat()
    : [];

  // console.log("Modified", modified);
  // console.log("Current styles state:", fontScaleStyles);

  const applyTypeScale = (scaleIdx) => {
    const scale = TYPE_SCALES[scaleIdx];
    let newStyles = { ...fontScaleStyles };
    if (scale.name === "Custom") {
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
      let tags = [...TAGS].reverse();
      const base = 1;
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
    setFontScaleStyles(newStyles);
    setSelectedScale(scaleIdx);
  };

  const handleStyleChange = (tag, bp, key, value) => {
    setFontScaleStyles((prev) => {
      let next = { ...prev };
      if (key === "fontSize" && bp === "Desktop") {
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

  const cascadeDesktopToAll = (tag) => {
    setFontScaleStyles((prev) => cascadeDesktopToAllForTag(prev, tag));
    setModified((prev) => {
      let next = { ...prev };
      next[tag] = { ...next[tag], Tablet: true, Mobile: true };
      return next;
    });
  };

  const handleExport = () => {
    const css = generateCSSFromStyles(fontScaleStyles || {});
    setCssExport(css);
    setShowExport(true);
  };

  return (
    <div className={styles.scaleRoot}>
      <div className={styles.scaleHeader}>
        <div className={styles.scaleTitle}>Font Scale</div>

        {/* quick copy button (keeps existing ExportFontScale) */}
        <ExportFontScale stylesState={fontScaleStyles} styles={styles} />

        {/* longer export view (from old file) */}
        <button
          className={styles.scaleExportBtn}
          onClick={handleExport}
          style={{ marginLeft: 12 }}
        >
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
              try {
                navigator.clipboard.writeText(cssExport);
              } catch (e) {
                const ta = document.createElement("textarea");
                ta.value = cssExport;
                ta.style.position = "fixed";
                ta.style.left = "-9999px";
                document.body.appendChild(ta);
                ta.select();
                document.execCommand("copy");
                document.body.removeChild(ta);
              }
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
              const styleObj = fontScaleStyles[tag][bp];
              const isModified = modified[tag]?.[bp];
              return (
                <EachTag
                  key={tag}
                  tag={tag}
                  className={className}
                  styleObj={styleObj}
                  isModified={isModified}
                  bp={bp}
                  handleStyleChange={handleStyleChange}
                  cascadeDesktopToAll={cascadeDesktopToAll}
                  setModal={setModal}
                />
              );
            })}
          </div>
        ))}
      </div>

      {modal && (
        <FontScaleModal
          modal={modal}
          setModal={setModal}
          paletteColors={colours}
          fontScaleStyles={fontScaleStyles}
          handleStyleChange={handleStyleChange}
          cascadeDesktopToAll={cascadeDesktopToAll}
        />
      )}
    </div>
  );
};

export default FontScale;
