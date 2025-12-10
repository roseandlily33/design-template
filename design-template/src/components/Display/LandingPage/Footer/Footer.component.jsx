import React, { useState } from "react";
import Image from "next/image";
import styles from "./Footer.module.css";

const defaultLinks = [
  "Home",
  "About",
  "Contact",
  "Privacy Policy",
  "Terms & Conditions",
];

const Footer = ({ logo, headerFontClass, mainFontClass }) => {
  const [links, setLinks] = useState(defaultLinks);
  const [editingLink, setEditingLink] = useState({}); // { idx: true }
  const [copyright, setCopyright] = useState(
    `© ${new Date().getFullYear()} Your Company. All rights reserved.`
  );
  const [editingCopyright, setEditingCopyright] = useState(false);

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

  const handleCopyrightClick = () => setEditingCopyright(true);
  const handleCopyrightChange = (e) => setCopyright(e.target.value);
  const handleCopyrightBlur = () => setEditingCopyright(false);
  const handleCopyrightKeyDown = (e) => {
    if (e.key === "Enter") setEditingCopyright(false);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSection + " " + headerFontClass}>
          {logo ? (
            <Image src={logo} alt="Logo Preview" width={100} height={100} />
          ) : (
            "Logo"
          )}
        </div>
        <nav className={styles.linksSection}>
          {links.map((label, idx) =>
            editingLink[idx] ? (
              <input
                key={label + idx}
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
                }}
              />
            ) : (
              <a
                key={label + idx}
                href="#"
                className={mainFontClass + " " + styles.link}
                onClick={() => handleLinkClick(idx)}
                style={{ cursor: "pointer" }}
              >
                {label}
              </a>
            )
          )}
        </nav>
      </div>
      <div className={styles.copyright + " " + mainFontClass}>
        {editingCopyright ? (
          <input
            value={copyright}
            className={mainFontClass}
            onChange={handleCopyrightChange}
            onBlur={handleCopyrightBlur}
            onKeyDown={handleCopyrightKeyDown}
            autoFocus
            style={{ fontSize: "0.95rem", textAlign: "center", width: "100%" }}
          />
        ) : (
          <span onClick={handleCopyrightClick} style={{ cursor: "pointer" }}>
            {copyright}
          </span>
        )}
      </div>
    </footer>
  );
};

export default Footer;
