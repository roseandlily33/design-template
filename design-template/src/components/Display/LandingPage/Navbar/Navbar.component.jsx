import React from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";

const Navbar = ({
  logo,
  logoWidth = 150,
  logoHeight = 150,
  headerFontClass,
  mainFontClass,
  secondaryButton,
  colours = [],
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

  const navStyle = {
    background: defaultBg,
    ...(spacingChart
      ? { padding: `${spacingChart.m.css} ${spacingChart.l.css}` }
      : {}),
  };
  const links = ["Home", "About", "Contact"];



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
