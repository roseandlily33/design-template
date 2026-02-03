import React, { useState, useEffect } from "react";
import styles from "./3Icons.module.css";

const defaultIcons = [
  {
    color: "#6883a1",
    label: "Fast Delivery",
    desc: "We ensure quick and reliable delivery for all your needs.",
    labelColor: undefined,
    descColor: undefined,
  },
  {
    color: "#e5c2c2",
    label: "Quality Service",
    desc: "Our team is dedicated to providing top-notch service every time.",
    labelColor: undefined,
    descColor: undefined,
  },
  {
    color: "#a4a4a4ff",
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
  threeIcons,
  setThreeIcons,
  fontScale = {},
  breakpoint = "Desktop",
  background,
}) => {
  const getPaletteColor = React.useCallback(
    (label, idx = 0) => {
      const row = Array.isArray(colours)
        ? colours.find(
          (r) => r.label && r.label.toLowerCase() === label.toLowerCase(),
        )
        : null;
      return row && Array.isArray(row.colors) && row.colors[idx]
        ? row.colors[idx]
        : undefined;
    },
    [colours],
  );

  // Palette defaults for icon backgrounds: Main[0], Accent[0], Grey[0]
  const paletteIconColors = React.useMemo(
    () => [
      getPaletteColor("Main", 0) || defaultIcons[0].color,
      getPaletteColor("Accent", 0) || defaultIcons[1].color,
      getPaletteColor("Grey", 2) || defaultIcons[2].color,
    ],
    [getPaletteColor],
  );

  // Palette defaults for label/desc
  const defaultLabelColors = React.useMemo(
    () => [
      getPaletteColor("Main", 3) || getPaletteColor("Main", 4) || "#222",
      getPaletteColor("Accent", 5) || getPaletteColor("Accent", 4) || "#222",
      getPaletteColor("Grey", 4) || getPaletteColor("Grey", 5) || "#222",
    ],
    [getPaletteColor],
  );
  const defaultDescColors = React.useMemo(
    () => [
      getPaletteColor("Main", 2) || getPaletteColor("Main", 1) || "#444",
      getPaletteColor("Accent", 3) || getPaletteColor("Accent", 4) || "#444",
      getPaletteColor("Grey", 3) || getPaletteColor("Grey", 4) || "#444",
    ],
    [getPaletteColor],
  );

  const [cards, setCards] = [threeIcons, setThreeIcons];

  useEffect(() => {
    setCards(
      defaultIcons.map((c, i) => ({
        ...c,
        color: paletteIconColors[i],
        labelColor: defaultLabelColors[i],
        descColor: defaultDescColors[i],
      })),
    );
  }, [
    defaultLabelColors,
    defaultDescColors,
    paletteIconColors,
    colours,
    setCards,
  ]);

  const [editing, setEditing] = useState({});

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
      prev.map((card, i) => (i === idx ? { ...card, [field]: value } : card)),
    );
    if (onColorChange && ["color", "labelColor", "descColor"].includes(field)) {
      let key = null;
      if (field === "color") key = `icon:${idx}`;
      if (field === "labelColor") key = `label:${idx}`;
      if (field === "descColor") key = `desc:${idx}`;
      if (key) onColorChange(key, value);
    }
  };
  const handleKeyDown = (e, idx, field) => {
    if (e.key === "Enter") handleBlur(idx, field);
  };

  const sectionStyle = spacingChart
    ? { margin: `${spacingChart.xl.css} 0` }
    : undefined;
  const rowStyle = spacingChart ? { gap: spacingChart.xl.css } : undefined;
  const cardPaddingStyle = spacingChart
    ? {
      padding: `${spacingChart.xxl.css} ${spacingChart.m.css} ${spacingChart.m.css} ${spacingChart.m.css}`,
    }
    : undefined;

  const titleStyle = spacingChart
    ? { marginBottom: spacingChart.xs.css }
    : undefined;

  return (
    <section className={styles.iconsSection} style={{ ...sectionStyle, ...(background ? { background } : {}) }}>
      <div className={styles.cardsRow} style={rowStyle}>
        {cards.map((icon, idx) => (
          <div
            key={icon.label + idx}
            className={styles.card}
            style={{ borderRadius: borderRadius, ...cardPaddingStyle }}
          >
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" }}>
              {/* SVG icons for each card, themed in grey 4 */}
              {idx === 0 && (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="12" fill="var(--grey-4)" />
                  <path d="M10 30L30 10" stroke="#fff" strokeWidth="3" />
                  <path d="M10 10L30 30" stroke="#fff" strokeWidth="3" />
                </svg>
              )}
              {idx === 1 && (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="12" fill="var(--grey-4)" />
                  <circle cx="20" cy="20" r="10" stroke="#fff" strokeWidth="3" fill="none" />
                  <path d="M20 10V30" stroke="#fff" strokeWidth="3" />
                </svg>
              )}
              {idx === 2 && (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="12" fill="var(--grey-4)" />
                  <path d="M10 20H30" stroke="#fff" strokeWidth="3" />
                  <path d="M20 10V30" stroke="#fff" strokeWidth="3" />
                </svg>
              )}
            </div>
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
                  width: "100%",
                  color:
                    fontScale?.h3?.[breakpoint]?.color ||
                    icon.labelColor ||
                    "#222",
                  ...titleStyle,
                }}
              />
            ) : (
              <h3
                className={headerFontClass + " " + styles.cardTitle}
                onClick={() => handleEdit(idx, "label")}
                style={{
                  cursor: "pointer",
                  color:
                    fontScale?.h3?.[breakpoint]?.color ||
                    icon.labelColor ||
                    "#222",
                  ...titleStyle,
                }}
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
                style={{
                  textAlign: "center",
                  fontSize: "1rem",
                  width: "100%",
                  color:
                    fontScale?.p?.[breakpoint]?.color ||
                    icon.descColor ||
                    "#444",
                }}
              />
            ) : (
              <p
                className={mainFontClass + " " + styles.cardDesc}
                onClick={() => handleEdit(idx, "desc")}
                style={{
                  cursor: "pointer",
                  color:
                    fontScale?.p?.[breakpoint]?.color ||
                    icon.descColor ||
                    "#444",
                }}
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
