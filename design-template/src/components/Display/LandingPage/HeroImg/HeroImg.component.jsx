import Image from "next/image";
import React, { useRef, useState } from "react";
import styles from "./HeroImg.module.css";

const HeroImage = ({
  primaryButton,
  headerFontClass,
  mainFontClass,
  colours = [],
  spacingChart,
  heroImgUrl = "/Picture.jpg",
  heroTitle,
  setHeroTitle,
  heroSubtitle,
  setHeroSubtitle,
  fontScale = {},
  breakpoint = "Desktop",
}) => {

  const [editingTitle, setEditingTitle] = useState(false);
  const [editingSubtitle, setEditingSubtitle] = useState(false);

  const titleColor = fontScale?.h1?.[breakpoint]?.color || "#222";
  const subtitleColor = fontScale?.p?.[breakpoint]?.color || "#444";

  const containerStyle = spacingChart
    ? {
      padding: `${spacingChart.xl.css} ${spacingChart.m.css}`,
      gap: spacingChart.m.css,
    }
    : { padding: "2rem 1rem", gap: "1rem" };

  const h1Ref = useRef(null);

  return (
    <div
      className={styles.heroImage}
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
        <div>{primaryButton}</div>
      </div>
    </div>
  );
};

export default HeroImage;
