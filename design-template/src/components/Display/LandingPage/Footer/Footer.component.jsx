import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css";

const Footer = ({
  logo,
  logoWidth = 100,
  logoHeight = 100,
  headerFontClass,
  mainFontClass,
  colours = [],
  spacingChart,
  footerCopyright,
  footerLinks,
  background,
}) => {
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

  const defaultLogoColor =
    getPaletteColor("Main", 5) || getPaletteColor("Main", 7) || "#222";

  const footerStyle = spacingChart
    ? { padding: `${spacingChart.xl.css} 0 ${spacingChart.m.css} 0` }
    : undefined;
  const footerContentStyle = spacingChart
    ? {
        margin: `0 auto ${spacingChart.s.css} auto`,
        padding: `0 ${spacingChart.l.css}`,
      }
    : undefined;

  return (
    <footer
      className={styles.footer}
      style={{ ...footerStyle, ...(background ? { background } : {}) }}
    >
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
        <span>{footerCopyright}</span>
      </div>
    </footer>
  );
};

export default Footer;
