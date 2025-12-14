import Image from "next/image";
import React, { useState } from "react";
import styles from "./HeroImg.module.css";
import EditableWithColor from "../../Modal/EditableElement.component";

const HeroImage = ({
  primaryButton,
  headerFontClass,
  mainFontClass,
  colours = [],
  spacingChart,
  onColorChange, // optional callback, pass from parent if you want persistence
}) => {
  // content state stays in the parent (this component)
  const [title, setTitle] = useState("ABC Company");
  const [subtitle, setSubtitle] = useState("Your success is our priority");

  const [titleColor, setTitleColor] = useState("#ffffff");
  const [subtitleColor, setSubtitleColor] = useState("#ffffff");

  const [editingTitle, setEditingTitle] = useState(false);
  const [editingSubtitle, setEditingSubtitle] = useState(false);

  const containerStyle = spacingChart
    ? {
        padding: `${spacingChart.xl.css} ${spacingChart.m.css}`,
        gap: spacingChart.m.css,
      }
    : { padding: "2rem 1rem", gap: "1rem" };

  return (
    <div className={styles.heroImage}>
      <Image
        src="/Picture.jpg"
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ...containerStyle,
        }}
      >
        <EditableWithColor
          palettes={colours}
          initialColor={titleColor}
          onSelect={(c) => {
            setTitleColor(c);
            onColorChange?.("heroTitle", c);
          }}
        >
          {editingTitle ? (
            <input
              className={headerFontClass}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
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
              onClick={() => setEditingTitle(true)}
              style={{ cursor: "pointer" }}
            >
              {title}
            </h1>
          )}
        </EditableWithColor>

        <EditableWithColor
          palettes={colours}
          initialColor={subtitleColor}
          onSelect={(c) => {
            setSubtitleColor(c);
            onColorChange?.("heroSubtitle", c);
          }}
        >
          {editingSubtitle ? (
            <input
              className={mainFontClass}
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              onBlur={() => setEditingSubtitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingSubtitle(false)}
              autoFocus
              style={{
                fontSize: "1.25rem",
                textAlign: "center",
                width: "100%",
              }}
            />
          ) : (
            <p
              className={mainFontClass}
              onClick={() => setEditingSubtitle(true)}
              style={{ cursor: "pointer" }}
            >
              {subtitle}
            </p>
          )}
        </EditableWithColor>

        <div>{primaryButton}</div>
      </div>
    </div>
  );
};

export default HeroImage;
