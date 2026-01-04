import React, { useState, useEffect } from "react";
import styles from "./Description.module.css";
import EditableWithColor from "../../Modal/EditableElement.component";

const Description = ({
  tertiaryButton,
  headerFontClass,
  mainFontClass,
  colours,
  spacingChart,
  overrides = {},
  onColorChange,
}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [title, setTitle] = useState("About Our Company");
  const [desc, setDesc] = useState(
    "We are dedicated to delivering innovative solutions and exceptional service to help your business thrive in a dynamic world."
  );


  // Helper to get palette color by label and index
  const getPaletteColor = (label, idx = 0) => {
    const row = Array.isArray(colours)
      ? colours.find(
        (r) => r.label && r.label.toLowerCase() === label.toLowerCase()
      )
      : null;
    return row && Array.isArray(row.colors) && row.colors[idx]
      ? row.colors[idx]
      : undefined;
  };


  // Palette defaults
  const defaultTitleColor = getPaletteColor("Main", 7) || getPaletteColor("Main", 6) || "#222";
  const defaultDescColor = getPaletteColor("Main", 3) || getPaletteColor("Main", 4) || "#444";

  // Compute colors directly from overrides and palette
  const titleColor = overrides.title ?? defaultTitleColor;
  const descColor = overrides.desc ?? defaultDescColor;

  const handleTitleClick = () => setEditingTitle(true);
  const handleDescClick = () => setEditingDesc(true);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescChange = (e) => setDesc(e.target.value);
  const handleTitleBlur = () => setEditingTitle(false);
  const handleDescBlur = () => setEditingDesc(false);
  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") setEditingTitle(false);
  };
  const handleDescKeyDown = (e) => {
    if (e.key === "Enter") setEditingDesc(false);
  };

  // optional inline fallback using spacingChart (Display injects CSS vars already)
  const sectionStyle = spacingChart
    ? { padding: `${spacingChart.xl.css} ${spacingChart.m.css}` }
    : undefined;

  return (
    <section className={styles.descriptionSection} style={sectionStyle}>
      <EditableWithColor
        palettes={colours}
        initialColor={titleColor}
        onSelect={(c) => {
          if (onColorChange) onColorChange("title", c);
        }}
      >
        {editingTitle ? (
          <input
            className={headerFontClass + " " + styles.title}
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            autoFocus
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              textAlign: "center",
              width: "100%",
              color: titleColor,
            }}
          />
        ) : (
          <h2
            className={headerFontClass + " " + styles.title}
            onClick={handleTitleClick}
            style={{ cursor: "pointer", color: titleColor }}
          >
            {title}
          </h2>
        )}
      </EditableWithColor>

      <EditableWithColor
        palettes={colours}
        initialColor={descColor}
        onSelect={(c) => {
          if (onColorChange) onColorChange("desc", c);
        }}
      >
        {editingDesc ? (
          <input
            className={mainFontClass + " " + styles.text}
            value={desc}
            onChange={handleDescChange}
            onBlur={handleDescBlur}
            onKeyDown={handleDescKeyDown}
            autoFocus
            style={{
              fontSize: "1.15rem",
              textAlign: "center",
              width: "100%",
              color: descColor,
            }}
          />
        ) : (
          <p
            className={mainFontClass + " " + styles.text}
            onClick={handleDescClick}
            style={{ cursor: "pointer", color: descColor }}
          >
            {desc}
          </p>
        )}
      </EditableWithColor>

      <div className={styles.buttonRow}>{tertiaryButton}</div>
    </section>
  );
};

export default Description;
