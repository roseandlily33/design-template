import React, { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import Modal, { EditButton } from "../../Modal/Modal.component";

const NavbarLink = ({
  label,
  idx,
  mainFontClass,
  fontSize,
  palettes = [],
  initialColor,
  onColorChange,
}) => {
  const [editing, setEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState(label);
  const [color, setColor] = useState(initialColor || "#222");
  const [hover, setHover] = useState(false);
  const wrapRef = useRef();

  // choose a sensible initial/fallback color from palettes
  const pickFirstAvailable = () => {
    if (initialColor) return initialColor;
    const order = ["main", "accent", "grey", "extra"];
    for (const name of order) {
      const p = palettes.find(
        (x) => x && x.label && x.label.toLowerCase() === name
      );
      if (p && Array.isArray(p.colors)) {
        const c = p.colors.find(Boolean);
        if (c) return c;
      }
    }
    if (palettes && palettes.length) {
      for (const p of palettes) {
        if (p && Array.isArray(p.colors)) {
          const c = p.colors.find(Boolean);
          if (c) return c;
        }
      }
    }
    return "#222"; // final fallback
  };

  useEffect(() => setValue(label), [label]);

  useEffect(() => {
    setColor(initialColor || pickFirstAvailable());
  }, [initialColor, palettes]);

  // when modal opens, clear hover so EditButton hides reliably
  useEffect(() => {
    if (modalOpen) setHover(false);
  }, [modalOpen]);

  const handlePickColor = (colorVal) => {
    setColor(colorVal);
    if (onColorChange) onColorChange(idx, colorVal);
    setModalOpen(false);
  };

  return (
    <div
      className={styles.linkWrap}
      ref={wrapRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {editing ? (
        <input
          className={`${styles.link} ${mainFontClass}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => e.key === "Enter" && setEditing(false)}
          style={{ color, fontSize }}
          autoFocus
        />
      ) : (
        <>
          <a
            href="#"
            className={`${styles.link} ${mainFontClass}`}
            onClick={(e) => {
              e.preventDefault();
              setEditing(true);
            }}
            style={{ color, fontSize }}
          >
            {value}
          </a>

          {/* Edit icon rendered here (visible only when hovered and not when modal open) */}
          <EditButton
            visible={hover && !modalOpen}
            onClick={() => setModalOpen(true)}
          />

          {/* reusable colour modal */}
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            palettes={palettes}
            initialColor={color}
            onSelect={(c) => handlePickColor(c)}
            title={`Pick a color for "${value}"`}
          />
        </>
      )}
    </div>
  );
};

export default NavbarLink;
