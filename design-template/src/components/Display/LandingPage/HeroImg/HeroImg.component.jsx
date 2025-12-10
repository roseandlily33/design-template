import Image from "next/image";
import styles from "./HeroImg.module.css";
import React, { useState } from "react";

const HeroImage = ({ primaryButton, headerFontClass, mainFontClass }) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingSubtitle, setEditingSubtitle] = useState(false);
  const [title, setTitle] = useState("ABC Company");
  const [subtitle, setSubtitle] = useState("Your success is our priority");

  const handleTitleClick = () => setEditingTitle(true);
  const handleSubtitleClick = () => setEditingSubtitle(true);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleSubtitleChange = (e) => setSubtitle(e.target.value);

  const handleTitleBlur = () => setEditingTitle(false);
  const handleSubtitleBlur = () => setEditingSubtitle(false);

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") setEditingTitle(false);
  };
  const handleSubtitleKeyDown = (e) => {
    if (e.key === "Enter") setEditingSubtitle(false);
  };

  return (
    <div className={styles.heroImage}>
      <Image
        src="/Picture.jpg"
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
      />
      <div>
        {editingTitle ? (
          <input
            className={headerFontClass}
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            autoFocus
            style={{
              fontSize: "2.8rem",
              fontWeight: 700,
              textAlign: "center",
              width: "100%",
            }}
          />
        ) : (
          <h1
            className={headerFontClass}
            onClick={handleTitleClick}
            style={{ cursor: "pointer" }}
          >
            {title}
          </h1>
        )}
        {editingSubtitle ? (
          <input
            className={mainFontClass}
            value={subtitle}
            onChange={handleSubtitleChange}
            onBlur={handleSubtitleBlur}
            onKeyDown={handleSubtitleKeyDown}
            autoFocus
            style={{ fontSize: "1.25rem", textAlign: "center", width: "100%" }}
          />
        ) : (
          <p
            className={mainFontClass}
            onClick={handleSubtitleClick}
            style={{ cursor: "pointer" }}
          >
            {subtitle}
          </p>
        )}
        <div>{primaryButton}</div>
      </div>
    </div>
  );
};

export default HeroImage;
