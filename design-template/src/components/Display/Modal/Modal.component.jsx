import React, { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.css";

// small edit icon
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
      fill="currentColor"
    />
    <path
      d="M20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
      fill="currentColor"
    />
  </svg>
);

export const EditButton = ({
  onClick,
  title = "Edit label / pick color",
  visible = false,
  style = {},
}) => {
  return (
    <button
      type="button"
      className={styles.editBtn}
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity .12s ease",
        ...style,
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
      aria-label="Edit link"
      title={title}
    >
      <EditIcon />
    </button>
  );
};

const Modal = ({
  open,
  onClose,
  palettes = [],
  initialColor,
  onSelect,
  title = "Pick a color",
}) => {
  const [color, setColor] = useState(initialColor || "#222");
  const overlayRef = useRef();

  useEffect(() => {
    setColor(initialColor || "#222");
  }, [initialColor, open]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handlePick = (c) => {
    setColor(c);
    if (onSelect) onSelect(c);
    onClose();
  };

  return (
    <div
      className={styles.modalOverlay}
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <strong>{title}</strong>
          <button
            type="button"
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          {(palettes && palettes.length
            ? palettes
            : [{ label: "Default", colors: ["#222", "#444", "#666", "#999"] }]
          ).map((pal, pi) => (
            <div key={pi} className={styles.paletteRow}>
              <div className={styles.paletteLabel}>{pal.label}</div>
              <div className={styles.paletteColors}>
                {(Array.isArray(pal.colors) ? pal.colors : []).map((c, ci) => {
                  const colorVal = c || "#eee";
                  return (
                    <button
                      key={ci}
                      className={styles.colorBlock}
                      style={{ background: colorVal }}
                      onClick={() => handlePick(colorVal)}
                      title={colorVal}
                      aria-label={`Pick ${colorVal}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          <div className={styles.customRow}>
            <label className={styles.customLabel}>Custom</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              aria-label="Custom color"
            />
            <button
              type="button"
              className={styles.applyBtn}
              onClick={() => handlePick(color)}
            >
              Use color
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
