import React, { useState } from "react";
import styles from "./3Icons.module.css";
import EditableWithColor from "../../Modal/EditableElement.component";

const defaultIcons = [
  {
    color: "#6883a1", // primary button color
    label: "Fast Delivery",
    desc: "We ensure quick and reliable delivery for all your needs.",
    labelColor: undefined,
    descColor: undefined,
  },
  {
    color: "#e5c2c2", // secondary button color
    label: "Quality Service",
    desc: "Our team is dedicated to providing top-notch service every time.",
    labelColor: undefined,
    descColor: undefined,
  },
  {
    color: "#a4a4a4ff", // tertiary button color
    label: "Support 24/7",
    desc: "We are here to help you around the clock, whenever you need us.",
    labelColor: undefined,
    descColor: undefined,
  },
];

const ThreeIcons = ({
  headerFontClass,
  mainFontClass,
  borderRadius,
  colours,
  spacingChart,
  spacingBase,
  spacingUnit,
}) => {
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
            {/* icon circle: reuse editable modal to pick a background color.
                onSelect updates the card.color, and the div's background uses that value. */}
            <EditableWithColor
              palettes={colours}
              initialColor={icon.color}
              defaultColor={icon.color}
              onSelect={(c) => handleChange(idx, "color", c)}
            >
              <div
                className={styles.iconCircle}
                style={{ background: icon.color }}
              />
            </EditableWithColor>

            {/* title: keep text edit state in this component, but wrap with EditableWithColor
                so the same color-picker / edit button appear for title text. */}
            <EditableWithColor
              palettes={colours}
              initialColor={icon.labelColor || icon.color}
              defaultColor={icon.labelColor || "#222"}
              onSelect={(c) => handleChange(idx, "labelColor", c)}
            >
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
                    color: icon.labelColor || "#222",
                  }}
                />
              ) : (
                <h3
                  className={headerFontClass + " " + styles.cardTitle}
                  onClick={() => handleEdit(idx, "label")}
                  style={{
                    cursor: "pointer",
                    color: icon.labelColor || "#222",
                  }}
                >
                  {icon.label}
                </h3>
              )}
            </EditableWithColor>

            {/* description: same pattern as title */}
            <EditableWithColor
              palettes={colours}
              initialColor={icon.descColor || "#444"}
              defaultColor={icon.descColor || "#444"}
              onSelect={(c) => handleChange(idx, "descColor", c)}
            >
              {editing[idx]?.desc ? (
                <input
                  className={mainFontClass + " " + styles.cardDesc}
                  value={icon.desc}
                  onChange={(e) => handleChange(idx, "desc", e.target.value)}
                  onBlur={() => handleBlur(idx, "desc")}
                  onKeyDown={(e) => handleKeyDown(e, idx, "desc")}
                  autoFocus
                  style={{
                    textAlign: "center",
                    fontSize: "1rem",
                    width: "100%",
                    color: icon.descColor || "#444",
                  }}
                />
              ) : (
                <p
                  className={mainFontClass + " " + styles.cardDesc}
                  onClick={() => handleEdit(idx, "desc")}
                  style={{ cursor: "pointer", color: icon.descColor || "#444" }}
                >
                  {icon.desc}
                </p>
              )}
            </EditableWithColor>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThreeIcons;
