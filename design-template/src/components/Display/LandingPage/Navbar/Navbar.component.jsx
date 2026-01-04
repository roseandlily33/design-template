import React, { useState } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";
import EditableElement from "../../Modal/EditableElement.component";
// import NavbarLink from "./NavbarLink.component.jsx";

const Navbar = ({
  logo,
  logoWidth = 150,
  logoHeight = 150,
  headerFontClass,
  mainFontClass,
  secondaryButton,
  colours = [],
  overrides = {},
  onColorChange,
  spacingChart,
}) => {
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

  const defaultBg =
    getPaletteColor("Grey", 0) || getPaletteColor("Grey", 0) || "#fff";
  const defaultLogoColor =
    getPaletteColor("Main", 1) || getPaletteColor("Main", 0) || "#222";
  const defaultLinkColor =
    getPaletteColor("Grey", 5) || getPaletteColor("Accent", 6) || "#fff";

  const navStyle = {
    background: defaultBg,
    ...(spacingChart
      ? { padding: `${spacingChart.m.css} ${spacingChart.l.css}` }
      : {}),
  };
  const links = ["Home", "About", "Contact"];

  // Compute linkColors from overrides and palette defaults
  const linkColors = {
    0: overrides["link:0"] ?? defaultLinkColor,
    1: overrides["link:1"] ?? defaultLinkColor,
    2: overrides["link:2"] ?? defaultLinkColor,
  };

  // Callback for color picking
  const handleLinkColorPick = (idx, color) => {
    if (onColorChange) onColorChange(`link:${idx}`, color);
  };

  return (
    <nav className={styles.navbar} style={navStyle}>
      <div
        className={styles.logo + " " + headerFontClass}
        style={{ color: defaultLogoColor }}
      >
        {logo ? (
          <Image
            src={logo}
            alt="Logo Preview"
            width={logoWidth}
            height={logoHeight}
          />
        ) : (
          "Logo"
        )}
      </div>

      <div className={styles.navRight}>
        <div className={styles.navLinks}>
          {links?.map((label, idx) => (
            <EditableElement
              key={idx + 1}
              palettes={colours}
              initialColor={linkColors[idx]}
              onSelect={(c) => handleLinkColorPick(idx, c)}
            >
              <a
                className={`${styles.link} ${mainFontClass} ${styles.navStyle}`}
                href="#"
                style={{ color: linkColors[idx], cursor: "pointer" }}
              >
                {label}
              </a>
            </EditableElement>
          ))}
        </div>

        <div className={styles.cta}>{secondaryButton}</div>
      </div>
    </nav>
  );
};

export default Navbar;
