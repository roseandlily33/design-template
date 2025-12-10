import React, { useState } from "react";
import styles from "./3Icons.module.css";

const defaultIcons = [
  {
    color: "#6883a1", // primary button color
    label: "Fast Delivery",
    desc: "We ensure quick and reliable delivery for all your needs.",
  },
  {
    color: "#e5c2c2", // secondary button color
    label: "Quality Service",
    desc: "Our team is dedicated to providing top-notch service every time.",
  },
  {
    color: "#a4a4a4ff", // tertiary button color
    label: "Support 24/7",
    desc: "We are here to help you around the clock, whenever you need us.",
  },
];

const ThreeIcons = ({ headerFontClass, mainFontClass, borderRadius }) => {
  const [cards, setCards] = useState(defaultIcons);
  const [editing, setEditing] = useState({}); // { [cardIdx]: { label: bool, desc: bool } }

  const handleEdit = (idx, field) => {
    setEditing((prev) => ({ ...prev, [idx]: { ...prev[idx], [field]: true } }));
  };
  const handleBlur = (idx, field) => {
    setEditing((prev) => ({
      ...prev,
      [idx]: { ...prev[idx], [field]: false },
    }));
  };
  const handleChange = (idx, field, value) => {
    setCards((prev) =>
      prev.map((card, i) => (i === idx ? { ...card, [field]: value } : card))
    );
  };
  const handleKeyDown = (e, idx, field) => {
    if (e.key === "Enter") handleBlur(idx, field);
  };

  return (
    <section className={styles.iconsSection}>
      <div className={styles.cardsRow}>
        {cards.map((icon, idx) => (
          <div
            key={icon.label + idx}
            className={styles.card}
            style={{ borderRadius: borderRadius }}
          >
            <div
              className={styles.iconCircle}
              style={{ background: icon.color }}
            />
            {editing[idx]?.label ? (
              <input
                className={headerFontClass + " " + styles.cardTitle}
                value={icon.label}
                onChange={(e) => handleChange(idx, "label", e.target.value)}
                onBlur={() => handleBlur(idx, "label")}
                onKeyDown={(e) => handleKeyDown(e, idx, "label")}
                autoFocus
                style={{
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  width: "100%",
                }}
              />
            ) : (
              <h3
                className={headerFontClass + " " + styles.cardTitle}
                onClick={() => handleEdit(idx, "label")}
                style={{ cursor: "pointer" }}
              >
                {icon.label}
              </h3>
            )}
            {editing[idx]?.desc ? (
              <input
                className={mainFontClass + " " + styles.cardDesc}
                value={icon.desc}
                onChange={(e) => handleChange(idx, "desc", e.target.value)}
                onBlur={() => handleBlur(idx, "desc")}
                onKeyDown={(e) => handleKeyDown(e, idx, "desc")}
                autoFocus
                style={{ textAlign: "center", fontSize: "1rem", width: "100%" }}
              />
            ) : (
              <p
                className={mainFontClass + " " + styles.cardDesc}
                onClick={() => handleEdit(idx, "desc")}
                style={{ cursor: "pointer" }}
              >
                {icon.desc}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThreeIcons;
