import React, { useState } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";
import EditableElement from "../../Modal/EditableElement.component";
// import NavbarLink from "./NavbarLink.component.jsx";

const Navbar = ({
  logo,
  headerFontClass,
  mainFontClass,
  mainFontSize,
  secondaryButton,
  colours = [],
  onColorChange,
  spacingChart,
}) => {
  // optional inline fallback from spacingChart (used only if CSS vars are not set)
  const navStyle = spacingChart
    ? { padding: `${spacingChart.m.css} ${spacingChart.l.css}` }
    : undefined;
  const links = ["Home", "About", "Contact"];
  const [overrides, setOverrides] = useState({});

  return (
    <nav className={styles.navbar} style={navStyle}>
      <div className={styles.logo + " " + headerFontClass}>
        {logo ? (
          <Image src={logo} alt="Logo Preview" width={150} height={150} />
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
              initialColor={overrides[idx]}
              onSelect={(c) => {
                setOverrides((p) => ({ ...p, [idx]: c }));
                onColorChange?.(`navLink:${idx}`, c);
              }}
            >
              <a
                className={`${styles.link} ${mainFontClass} ${styles.navStyle}`}
                href="#"
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
