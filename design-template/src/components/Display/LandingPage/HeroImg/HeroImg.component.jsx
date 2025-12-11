import Image from "next/image";
import styles from "./HeroImg.module.css";
import React, { useState, useRef } from "react";

const HeroImage = ({ primaryButton, headerFontClass, mainFontClass }) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingSubtitle, setEditingSubtitle] = useState(false);
  const [title, setTitle] = useState("ABC Company");
  const [subtitle, setSubtitle] = useState("Your success is our priority");
  const [showTitleTooltip, setShowTitleTooltip] = useState(false);
  const [showSubtitleTooltip, setShowSubtitleTooltip] = useState(false);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

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

  // Helper to get computed styles as a string
  function getStyleString(el, tag) {
    if (!el) return "";
    const style = window.getComputedStyle(el);
    return `${tag} | font-size: ${style.fontSize} | font-weight: ${style.fontWeight} | margin: ${style.margin} | font-family: ${style.fontFamily} | padding: ${style.padding} | color: ${style.color}`;
  }

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
          <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
            <h1
              className={headerFontClass}
              onClick={handleTitleClick}
              style={{ cursor: "pointer" }}
              ref={titleRef}
              onMouseEnter={() => setShowTitleTooltip(true)}
              onMouseLeave={() => setShowTitleTooltip(false)}
            >
              {title}
            </h1>
            {showTitleTooltip && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "100%",
                  transform: "translateX(-50%)",
                  background: "rgba(40,40,40,0.97)",
                  color: "#fff",
                  fontSize: "0.95rem",
                  padding: "8px 14px",
                  borderRadius: 7,
                  boxShadow: "0 2px 12px #0002",
                  whiteSpace: "pre",
                  marginTop: 8,
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              >
                {getStyleString(titleRef.current, "h1")}
              </div>
            )}
          </div>
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
          <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
            <p
              className={mainFontClass}
              onClick={handleSubtitleClick}
              style={{ cursor: "pointer" }}
              ref={subtitleRef}
              onMouseEnter={() => setShowSubtitleTooltip(true)}
              onMouseLeave={() => setShowSubtitleTooltip(false)}
            >
              {subtitle}
            </p>
            {showSubtitleTooltip && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "100%",
                  transform: "translateX(-50%)",
                  background: "rgba(40,40,40,0.97)",
                  color: "#fff",
                  fontSize: "0.95rem",
                  padding: "8px 14px",
                  borderRadius: 7,
                  boxShadow: "0 2px 12px #0002",
                  whiteSpace: "pre",
                  marginTop: 8,
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              >
                {getStyleString(subtitleRef.current, "p")}
              </div>
            )}
          </div>
        )}
        <div>{primaryButton}</div>
      </div>
    </div>
  );
};

export default HeroImage;
