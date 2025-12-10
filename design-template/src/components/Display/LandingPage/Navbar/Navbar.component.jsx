import React, { useState } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";

const defaultLinks = ["Home", "About", "Contact"];

const Navbar = ({ logo, headerFontClass, mainFontClass, secondaryButton }) => {
  const [links, setLinks] = useState(defaultLinks);
  const [editingLink, setEditingLink] = useState({}); // { idx: true }

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

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo + " " + headerFontClass}>
        {logo ? (
          <Image src={logo} alt="Logo Preview" width={150} height={150} />
        ) : (
          "Logo"
        )}
      </div>
      <div className={styles.navRight}>
        <div className={styles.navLinks}>
          {links.map((label, idx) =>
            editingLink[idx] ? (
              <input
                key={label + idx}
                value={label}
                className={styles.link + " " + mainFontClass}
                onChange={(e) => handleLinkChange(idx, e.target.value)}
                onBlur={() => handleLinkBlur(idx)}
                onKeyDown={(e) => handleLinkKeyDown(e, idx)}
                autoFocus
                style={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  textAlign: "center",
                  width: "90px",
                }}
              />
            ) : (
              <a
                key={label + idx}
                href="#"
                className={styles.link + " " + mainFontClass}
                onClick={() => handleLinkClick(idx)}
                style={{ cursor: "pointer" }}
              >
                {label}
              </a>
            )
          )}
        </div>
        <div className={styles.cta}>{secondaryButton}</div>
      </div>
    </nav>
  );
};

export default Navbar;
