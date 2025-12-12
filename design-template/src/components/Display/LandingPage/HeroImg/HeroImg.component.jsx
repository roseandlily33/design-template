import Image from "next/image";
import styles from "./HeroImg.module.css";
import React, { useState, useRef, useEffect } from "react";
import Modal, { EditButton } from "../../Modal/Modal.component";

const HeroImage = ({
  primaryButton,
  headerFontClass,
  mainFontClass,
  colours = [],
  onColorChange, // optional callback, pass from parent if you want persistence
}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingSubtitle, setEditingSubtitle] = useState(false);
  const [title, setTitle] = useState("ABC Company");
  const [subtitle, setSubtitle] = useState("Your success is our priority");
  const [showTitleTooltip, setShowTitleTooltip] = useState(false);
  const [showSubtitleTooltip, setShowSubtitleTooltip] = useState(false);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // hover + modal + color state for title / subtitle
  const [hoverTitle, setHoverTitle] = useState(false);
  const [hoverSubtitle, setHoverSubtitle] = useState(false);
  const [modalOpenTitle, setModalOpenTitle] = useState(false);
  const [modalOpenSubtitle, setModalOpenSubtitle] = useState(false);
  const [titleColor, setTitleColor] = useState("#222");
  const [subtitleColor, setSubtitleColor] = useState("#444");

  // pick sensible fallback color from palettes
  const pickFirstAvailable = (palettesArr = []) => {
    const order = ["main", "accent", "grey", "extra"];
    for (const name of order) {
      const p = palettesArr.find(
        (x) => x && x.label && x.label.toLowerCase() === name
      );
      if (p && Array.isArray(p.colors)) {
        const c = p.colors.find(Boolean);
        if (c) return c;
      }
    }
    if (palettesArr && palettesArr.length) {
      for (const p of palettesArr) {
        if (p && Array.isArray(p.colors)) {
          const c = p.colors.find(Boolean);
          if (c) return c;
        }
      }
    }
    return "#222";
  };

  // sync colors when palettes change (only set defaults if still using defaults)
  useEffect(() => {
    setTitleColor((prev) =>
      prev === "#222" ? pickFirstAvailable(colours) : prev
    );
    setSubtitleColor((prev) =>
      prev === "#444" ? pickFirstAvailable(colours) : prev
    );
  }, [colours]);

  // safe handlers that call parent callback only if present
  const handleTitleColorPick = (c) => {
    setTitleColor(c);
    setModalOpenTitle(false);
    if (typeof onColorChange === "function") onColorChange("heroTitle", c);
  };
  const handleSubtitleColorPick = (c) => {
    setSubtitleColor(c);
    setModalOpenSubtitle(false);
    if (typeof onColorChange === "function") onColorChange("heroSubtitle", c);
  };

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
              color: titleColor,
            }}
          />
        ) : (
          <div
            style={{
              position: "relative",
              display: "inline-block",
              width: "100%",
            }}
            onMouseEnter={() => {
              setShowTitleTooltip(true);
              setHoverTitle(true);
            }}
            onMouseLeave={() => {
              setShowTitleTooltip(false);
              setHoverTitle(false);
            }}
          >
            <h1
              className={headerFontClass}
              onClick={handleTitleClick}
              style={{ cursor: "pointer", color: titleColor }}
              ref={titleRef}
            >
              {title}
            </h1>

            {/* EditButton visible only on hover (same pattern as NavbarLink) */}
            <div style={{ position: "absolute", right: 8, top: 4 }}>
              <EditButton
                visible={hoverTitle}
                onClick={() => setModalOpenTitle(true)}
              />
            </div>

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
            style={{
              fontSize: "1.25rem",
              textAlign: "center",
              width: "100%",
              color: subtitleColor,
            }}
          />
        ) : (
          <div
            style={{
              position: "relative",
              display: "inline-block",
              width: "100%",
            }}
            onMouseEnter={() => {
              setShowSubtitleTooltip(true);
              setHoverSubtitle(true);
            }}
            onMouseLeave={() => {
              setShowSubtitleTooltip(false);
              setHoverSubtitle(false);
            }}
          >
            <p
              className={mainFontClass}
              onClick={handleSubtitleClick}
              style={{ cursor: "pointer", color: subtitleColor }}
              ref={subtitleRef}
            >
              {subtitle}
            </p>

            <div style={{ position: "absolute", right: 8, top: 2 }}>
              <EditButton
                visible={hoverSubtitle}
                onClick={() => setModalOpenSubtitle(true)}
              />
            </div>

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

        {/* Reuse the same Modal component as NavbarLink */}
        <Modal
          open={modalOpenTitle}
          onClose={() => setModalOpenTitle(false)}
          palettes={colours}
          initialColor={titleColor}
          onSelect={handleTitleColorPick}
          title={`Pick color for "${title}"`}
        />
        <Modal
          open={modalOpenSubtitle}
          onClose={() => setModalOpenSubtitle(false)}
          palettes={colours}
          initialColor={subtitleColor}
          onSelect={handleSubtitleColorPick}
          title={`Pick color for subtitle`}
        />
      </div>
    </div>
  );
};

export default HeroImage;
