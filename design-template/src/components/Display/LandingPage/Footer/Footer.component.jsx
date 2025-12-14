import React, { useState } from "react";
import Image from "next/image";
import styles from "./Footer.module.css";
import EditableWithColor from "../../Modal/EditableElement.component";

const defaultLinks = [
  "Home",
  "About",
  "Contact",
  "Privacy Policy",
  "Terms & Conditions",
];

const Footer = ({
  logo,
  headerFontClass,
  mainFontClass,
  colours = [],
  spacingChart,
  spacingBase,
  spacingUnit,
}) => {
  const [links, setLinks] = useState(defaultLinks);
  const [editingLink, setEditingLink] = useState({}); // { idx: true }
  const [linkColors, setLinkColors] = useState({
    0: "#fff",
    1: "#fff",
    2: "#fff",
    3: "#fff",
    4: "#fff",
  }); // { idx: '#hex' }

  const [copyright, setCopyright] = useState(
    `© ${new Date().getFullYear()} Your Company. All rights reserved.`
  );
  const [editingCopyright, setEditingCopyright] = useState(false);
  const [copyrightColor, setCopyrightColor] = useState(undefined);

  const handleLinkClick = (idx) =>
    setEditingLink((prev) => ({ ...prev, [idx]: true }));
  const handleLinkChange = (idx, value) => {
    setLinks((prev) => prev.map((l, i) => (i === idx ? value : l)));
  };
  const handleLinkBlur = (idx) =>
    setEditingLink((prev) => ({ ...prev, [idx]: false }));
  const handleLinkKeyDown = (e, idx) => {
    if (e.key === "Enter") handleLinkBlur(idx);
  };

  const handleLinkColorPick = (idx, color) => {
    setLinkColors((prev) => ({ ...prev, [idx]: color }));
  };

  const handleCopyrightClick = () => setEditingCopyright(true);
  const handleCopyrightChange = (e) => setCopyright(e.target.value);
  const handleCopyrightBlur = () => setEditingCopyright(false);
  const handleCopyrightKeyDown = (e) => {
    if (e.key === "Enter") setEditingCopyright(false);
  };
  const handleCopyrightColorPick = (c) => setCopyrightColor(c);

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
  const linksRowStyle = spacingChart ? { gap: spacingChart.l.css } : undefined;

  return (
    <footer className={styles.footer} style={footerStyle}>
      <div className={styles.footerContent} style={footerContentStyle}>
        <div className={styles.logoSection + " " + headerFontClass}>
          {logo ? (
            <Image src={logo} alt="Logo Preview" width={100} height={100} />
          ) : (
            "Logo"
          )}
        </div>

        <nav className={styles.linksSection} style={linksRowStyle}>
          {links.map((label, idx) => (
            <EditableWithColor
              key={label + idx}
              palettes={colours}
              initialColor={linkColors[idx]}
              defaultColor="#ffffff" // ensure fallback is white
              applyTo="color" // explicitly apply to text color
              onSelect={(c) => handleLinkColorPick(idx, c)}
            >
              {editingLink[idx] ? (
                <input
                  value={label}
                  className={mainFontClass + " " + styles.link}
                  onChange={(e) => handleLinkChange(idx, e.target.value)}
                  onBlur={() => handleLinkBlur(idx)}
                  onKeyDown={(e) => handleLinkKeyDown(e, idx)}
                  autoFocus
                  style={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    textAlign: "center",
                    width: "110px",
                    /* remove direct color here; wrapper will set color */
                  }}
                />
              ) : (
                <a
                  key={label + idx}
                  href="#"
                  className={mainFontClass + " " + styles.link}
                  onClick={() => handleLinkClick(idx)}
                  style={{
                    cursor: "pointer",
                    /* wrapper will set colour via inline style */
                  }}
                >
                  {label}
                </a>
              )}
            </EditableWithColor>
          ))}
        </nav>
      </div>

      <div className={styles.copyright + " " + mainFontClass}>
        <EditableWithColor
          palettes={colours}
          initialColor={copyrightColor}
          onSelect={handleCopyrightColorPick}
        >
          {editingCopyright ? (
            <input
              value={copyright}
              className={mainFontClass}
              onChange={handleCopyrightChange}
              onBlur={handleCopyrightBlur}
              onKeyDown={handleCopyrightKeyDown}
              autoFocus
              style={{
                fontSize: "0.95rem",
                textAlign: "center",
                width: "100%",
                color: copyrightColor || undefined,
              }}
            />
          ) : (
            <span
              onClick={handleCopyrightClick}
              style={{ cursor: "pointer", color: copyrightColor || undefined }}
            >
              {copyright}
            </span>
          )}
        </EditableWithColor>
      </div>
    </footer>
  );
};

export default Footer;
