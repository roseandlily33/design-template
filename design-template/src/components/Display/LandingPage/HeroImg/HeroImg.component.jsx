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
  // spacingBase,
  // spacingUnit,
  overrides = {},
  onColorChange,
  heroImgUrl = "/Picture.jpg",
}) => {

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
  const defaultTitleColor =
    getPaletteColor("Main", 7) || getPaletteColor("Main", 6) || "#222";
  const defaultSubtitleColor =
    getPaletteColor("Accent", 5) || getPaletteColor("Accent", 6) || "#444";
  const defaultBg =
    getPaletteColor("Grey", 3) || getPaletteColor("Grey", 0) || undefined;

  // content state stays in the parent (this component)
  const [title, setTitle] = useState("ABC Company");
  const [subtitle, setSubtitle] = useState("Your success is our priority");

  // Compute colors directly from overrides and palette
  const titleColor = overrides.title ?? defaultTitleColor;
  const subtitleColor = overrides.subtitle ?? defaultSubtitleColor;

  const [editingTitle, setEditingTitle] = useState(false);
  const [editingSubtitle, setEditingSubtitle] = useState(false);

  const containerStyle = spacingChart
    ? {
      padding: `${spacingChart.xl.css} ${spacingChart.m.css}`,
      gap: spacingChart.m.css,
    }
    : { padding: "2rem 1rem", gap: "1rem" };

  return (
    <div
      className={styles.heroImage}
      style={defaultBg ? { background: defaultBg } : {}}
    >
      <Image
        src={heroImgUrl}
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
        priority
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
            if (onColorChange) onColorChange("title", c);
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
                color: titleColor,
              }}
            />
          ) : (
            <h1
              className={headerFontClass}
              onClick={() => setEditingTitle(true)}
              style={{ cursor: "pointer", color: titleColor }}
            >
              {title}
            </h1>
          )}
        </EditableWithColor>

        <EditableWithColor
          palettes={colours}
          initialColor={subtitleColor}
          onSelect={(c) => {
            if (onColorChange) onColorChange("subtitle", c);
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
                color: subtitleColor,
              }}
            />
          ) : (
            <p
              className={mainFontClass}
              onClick={() => setEditingSubtitle(true)}
              style={{ cursor: "pointer", color: subtitleColor }}
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
