import React, { useState } from "react";
import styles from "./Description.module.css";

const Description = ({
  tertiaryButton,
  headerFontClass,
  mainFontClass,
  spacingChart,
  descriptionTitle,
  setDescriptionTitle,
  descriptionDesc,
  setDescriptionDesc,
  fontScale = {},
  breakpoint = "Desktop",
  background,
}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);

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

  const sectionStyle = spacingChart
    ? { padding: `${spacingChart.xl.css} ${spacingChart.m.css}` }
    : undefined;

  return (
    <section className={styles.descriptionSection} style={{ ...sectionStyle, ...(background ? { background } : {}) }}>
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
      <div className={styles.buttonRow}>{tertiaryButton}</div>
    </section>
  );
};

export default Description;
