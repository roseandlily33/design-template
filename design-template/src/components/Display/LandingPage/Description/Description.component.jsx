import React, { useState } from "react";
import styles from "./Description.module.css";
import EditableWithColor from "../../Modal/EditableElement.component";

const Description = ({
  tertiaryButton,
  headerFontClass,
  mainFontClass,
  colours,
  spacingChart,
}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [title, setTitle] = useState("About Our Company");
  const [desc, setDesc] = useState(
    "We are dedicated to delivering innovative solutions and exceptional service to help your business thrive in a dynamic world."
  );

  // local color state for title / desc (EditableWithColor will control UI)
  const [titleColor, setTitleColor] = useState("#222");
  const [descColor, setDescColor] = useState("#444");

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
        onSelect={(c) => setTitleColor(c)}
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
        onSelect={(c) => setDescColor(c)}
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
