import React, { useState, useEffect } from "react";
import styles from "./Description.module.css";
import EditableWithColor from "../../Modal/EditableElement.component";


const Description = ({
  tertiaryButton,
  headerFontClass,
  mainFontClass,
  colours,
  spacingChart,
  //overrides = {},
  //onColorChange,
  descriptionTitle,
  setDescriptionTitle,
  descriptionDesc,
  setDescriptionDesc,
  fontScale = {},
  breakpoint = "Desktop",
}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);

  // Use fontScale color for h2 and p, based on breakpoint
  const titleColor = fontScale?.h2?.[breakpoint]?.color || "#222";
  const descColor = fontScale?.p?.[breakpoint]?.color || "#444";

  const handleTitleClick = () => setEditingTitle(true);
  const handleDescClick = () => setEditingDesc(true);
  const handleTitleChange = (e) => setDescriptionTitle && setDescriptionTitle(e.target.value);
  const handleDescChange = (e) => setDescriptionDesc && setDescriptionDesc(e.target.value);
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
      {/*
      <EditableWithColor
        palettes={colours}
        initialColor={titleColor}
        onSelect={(c) => {
          if (onColorChange) onColorChange("title", c);
        }}
      >
      */}
      {editingTitle ? (
        <input
          className={headerFontClass + " " + styles.title}
          value={descriptionTitle}
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
          {descriptionTitle}
        </h2>
      )}
      {/*</EditableWithColor>*/}

      {/*
      <EditableWithColor
        palettes={colours}
        initialColor={descColor}
        onSelect={(c) => {
          if (onColorChange) onColorChange("desc", c);
        }}
      >
      */}
      {editingDesc ? (
        <input
          className={mainFontClass + " " + styles.text}
          value={descriptionDesc}
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
          {descriptionDesc}
        </p>
      )}
      {/*</EditableWithColor>*/}

      <div className={styles.buttonRow}>{tertiaryButton}</div>
    </section>
  );
};

export default Description;
