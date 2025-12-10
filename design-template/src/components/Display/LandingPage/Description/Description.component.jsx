import React, { useState } from "react";
import styles from "./Description.module.css";

const Description = ({ tertiaryButton, headerFontClass, mainFontClass }) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [title, setTitle] = useState("About Our Company");
  const [desc, setDesc] = useState(
    "We are dedicated to delivering innovative solutions and exceptional service to help your business thrive in a dynamic world."
  );

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

  return (
    <section className={styles.descriptionSection}>
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
          }}
        />
      ) : (
        <h2
          className={headerFontClass + " " + styles.title}
          onClick={handleTitleClick}
          style={{ cursor: "pointer" }}
        >
          {title}
        </h2>
      )}
      {editingDesc ? (
        <input
          className={mainFontClass + " " + styles.text}
          value={desc}
          onChange={handleDescChange}
          onBlur={handleDescBlur}
          onKeyDown={handleDescKeyDown}
          autoFocus
          style={{ fontSize: "1.15rem", textAlign: "center", width: "100%" }}
        />
      ) : (
        <p
          className={mainFontClass + " " + styles.text}
          onClick={handleDescClick}
          style={{ cursor: "pointer" }}
        >
          {desc}
        </p>
      )}
      <div className={styles.buttonRow}>{tertiaryButton}</div>
    </section>
  );
};

export default Description;
