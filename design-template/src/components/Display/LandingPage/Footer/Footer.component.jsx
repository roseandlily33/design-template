import React, { useState } from "react";
import Image from "next/image";
import styles from "./Footer.module.css";
import EditableWithColor from "../../Modal/EditableElement.component";

// const defaultLinks = [
//   "Home",
//   "About",
//   "Contact",
//   "Privacy Policy",
//   "Terms & Conditions",
// ];

const Footer = ({
  logo,
  logoWidth = 100,
  logoHeight = 100,
  headerFontClass,
  mainFontClass,
  colours = [],
  spacingChart,
  // spacingBase,
  // spacingUnit,
  overrides = {},
  onColorChange,
  footerCopyright,
  setFooterCopyright,
  footerLinks,
  setFooterLinks,
}) => {
  // Helper to get palette color by label and index
  const getPaletteColor = (label, idx = 0) => {
    const row = Array.isArray(colours)
      ? colours.find(
        (r) => r.label && r.label.toLowerCase() === label.toLowerCase(),
      )
      : null;
    return row && Array.isArray(row.colors) && row.colors[idx]
      ? row.colors[idx]
      : undefined;
  };

  // Palette defaults
  const defaultLogoColor =
    getPaletteColor("Main", 5) || getPaletteColor("Main", 7) || "#222";
  const defaultLinkColor =
    getPaletteColor("Accent", 5) || getPaletteColor("Accent", 7) || "#fff";
  const defaultCopyrightColor =
    getPaletteColor("Grey", 4) || getPaletteColor("Grey", 5) || "#fff";

  // No editing state: display-only

  // Compute linkColors directly from palette and overrides
  const linkColors = {
    0: overrides[`link:0`] ?? defaultLinkColor,
    1: overrides[`link:1`] ?? defaultLinkColor,
    2: overrides[`link:2`] ?? defaultLinkColor,
    3: overrides[`link:3`] ?? defaultLinkColor,
    4: overrides[`link:4`] ?? defaultLinkColor,
  };

  // No editing state: display-only

  // Compute copyrightColor directly from palette and overrides
  const copyrightColor = overrides.copyright ?? defaultCopyrightColor;

  // No editing/click handlers: display-only

  // inline fallbacks derived from spacingChart (Display injects CSS vars already)
  const footerStyle = spacingChart
    ? { padding: `${spacingChart.xl.css} 0 ${spacingChart.m.css} 0` }
    : undefined;
  const footerContentStyle = spacingChart
    ? {
      margin: `0 auto ${spacingChart.s.css} auto`,
      padding: `0 ${spacingChart.l.css}`,
    }
    : undefined;

  // Use fontScale for link and copyright color if set, else palette/override fallback
  return (
    <footer className={styles.footer} style={footerStyle}>
      <div className={styles.footerContent} style={footerContentStyle}>
        <div
          className={styles.logoSection + " " + headerFontClass}
          style={{ color: defaultLogoColor }}
        >
          {logo ? (
            <Image
              width={logoWidth}
              height={logoHeight}
              src={logo}
              alt="Logo Preview"
            />
          ) : (
            "Logo"
          )}
        </div>

        <nav className={styles.linksSection}>
          {footerLinks.map((label, idx) => {
            // Use fontScale.p color for link if set, else palette/override
            return (
              <a
                key={label + idx}
                href="#"
                className={mainFontClass + " " + styles.link}
                style={{ cursor: "default" }}
              >
                {label}
              </a>
            );
          })}
        </nav>
      </div>

      <div className={styles.copyright + " " + mainFontClass}>
        <span
        >
          {footerCopyright}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
