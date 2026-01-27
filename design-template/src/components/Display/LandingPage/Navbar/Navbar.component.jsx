import React, { useState } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";
// import EditableElement from "../../Modal/EditableElement.component";
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

  // No color picking: display-only

  // Use fontScale for link color if set, else palette/override fallback
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
          {links?.map((label, idx) => {
            // Use fontScale.p color for link if set, else palette/override
            // const linkColor = (typeof fontScale?.p?.color === 'string' ? fontScale.p.color : undefined) || linkColors[idx] || "#fff";
            return (
              <a
                key={idx + 1}
                className={`${styles.link} ${mainFontClass} ${styles.navStyle}`}
                href="#"
                style={{ cursor: "default" }}
              >
                {label}
              </a>
            );
          })}
        </div>

        <div className={styles.cta}>{secondaryButton}</div>
      </div>
    </nav>
  );
};

export default Navbar;
