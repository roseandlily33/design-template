import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
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
  //overrides = {},
  //onColorChange,
  heroImgUrl = "/Picture.jpg",
  heroTitle,
  setHeroTitle,
  heroSubtitle,
  setHeroSubtitle,
  fontScale = {},
  breakpoint = "Desktop",
}) => {
  // // Helper to get palette color by label and index
  // const getPaletteColor = (label, idx = 0) => {
  //   const row = Array.isArray(colours)
  //     ? colours.find(
  //       (r) => r.label && r.label.toLowerCase() === label.toLowerCase(),
  //     )
  //     : null;
  //   return row && Array.isArray(row.colors) && row.colors[idx]
  //     ? row.colors[idx]
  //     : undefined;
  // };

  // // Palette defaults
  // const defaultTitleColor =
  //   getPaletteColor("Main", 7) || getPaletteColor("Main", 6) || "#222";
  // const defaultSubtitleColor =
  //   getPaletteColor("Accent", 5) || getPaletteColor("Accent", 6) || "#444";
  // const defaultBg =
  //   getPaletteColor("Grey", 3) || getPaletteColor("Grey", 0) || undefined;

  // content state is now lifted to parent
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingSubtitle, setEditingSubtitle] = useState(false);

  // Use fontScaleStyles color for h1 and p, based on breakpoint
  const titleColor = fontScale?.h1?.[breakpoint]?.color || "#222";
  const subtitleColor = fontScale?.p?.[breakpoint]?.color || "#444";
  // const titleColor = overrides.title ?? defaultTitleColor;
  // const subtitleColor = overrides.subtitle ?? defaultSubtitleColor;

  const containerStyle = spacingChart
    ? {
      padding: `${spacingChart.xl.css} ${spacingChart.m.css}`,
      gap: spacingChart.m.css,
    }
    : { padding: "2rem 1rem", gap: "1rem" };

  const h1Ref = useRef(null);

  useEffect(() => {
    if (h1Ref.current) {
      const computed = window.getComputedStyle(h1Ref.current);
      console.log("Computed h1 font-size:", computed.fontSize);
    }
  }, [fontScale, breakpoint, heroTitle]);

  return (
    <div
      className={styles.heroImage}
    // style={defaultBg ? { background: defaultBg } : {}}
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
            className={headerFontClass}
            value={heroTitle}
            onChange={(e) => setHeroTitle && setHeroTitle(e.target.value)}
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
            ref={h1Ref}
            className={headerFontClass}
            onClick={() => setEditingTitle(true)}
            style={{ cursor: "pointer", color: titleColor }}
          >
            {heroTitle}
            <p>
              H1{" "}
              {fontScale?.h1?.[breakpoint]?.fontSize && (
                <span style={{ fontSize: 14, color: "#888", marginTop: 4 }}>
                  Font size: {fontScale.h1[breakpoint].fontSize}rem
                </span>
              )}
            </p>
          </h1>
        )}
        {/*</EditableWithColor>*/}

        {/*
        <EditableWithColor
          palettes={colours}
          initialColor={subtitleColor}
          onSelect={(c) => {
            if (onColorChange) onColorChange("subtitle", c);
          }}
        >
        */}
        {editingSubtitle ? (
          <input
            className={mainFontClass}
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle && setHeroSubtitle(e.target.value)}
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
            {heroSubtitle}
          </p>
        )}
        {/*</EditableWithColor>*/}

        <div>{primaryButton}</div>
      </div>
    </div>
  );
};

export default HeroImage;
