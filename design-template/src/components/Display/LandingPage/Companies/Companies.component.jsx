import React, { useState, useMemo } from "react";
import styles from "./Companies.module.css";
import EditableWithColor from "../../Modal/EditableElement.component";

const defaultCompanies = [
  { name: "Alvardo", color: "#6883a1", textColor: "#ffffff" }, // primary
  { name: "Hayfield", color: "#e5c2c2", textColor: "#ffffff" }, // secondary
  { name: "Muskova", color: "#a4a4a4ff", textColor: "#ffffff" }, // tertiary
  { name: "Emerson", color: "#b3b3b3", textColor: "#ffffff" }, // light variation of tertiary
  { name: "Pine", color: "#85a0be", textColor: "#ffffff" }, // badge text white
];

const Companies = ({
  mainFontClass,
  colours = [],
  spacingChart,
  overrides = {},
  onColorChange,
}) => {
  const [trustedText, setTrustedText] = useState("Trusted by 10+ companies");
  const [editingTrusted, setEditingTrusted] = useState(false);
  // Use overrides if present, else palette defaults
  // Helper to get palette color by label and index

  // Helper to get palette color by label and index
  const getPaletteColor = React.useCallback(
    (label, idx = 0) => {
      const row = Array.isArray(colours)
        ? colours.find(
          (r) => r.label && r.label.toLowerCase() === label.toLowerCase()
        )
        : null;
      return row && Array.isArray(row.colors) && row.colors[idx]
        ? row.colors[idx]
        : undefined;
    },
    [colours]
  );

  // Title color for the section
  const titleDefaultColor =
    getPaletteColor("Main", 6) || getPaletteColor("Main", 5) || "#222";

  const companies = useMemo(() => {
    const paletteBadgeColors = [
      getPaletteColor("Main", 3) || defaultCompanies[0].color,
      getPaletteColor("Accent", 2) || defaultCompanies[1].color,
      getPaletteColor("Grey", 2) || defaultCompanies[2].color,
      getPaletteColor("Accent", 0) || defaultCompanies[3].color,
      getPaletteColor("Main", 1) || defaultCompanies[4].color,
    ];
    const paletteBadgeTextColors = [
      getPaletteColor("Grey", 0) || getPaletteColor("Grey", 1) || "#fff",
      getPaletteColor("Main", 5) || getPaletteColor("Main", 6) || "#fff",
      getPaletteColor("Accent", 6) || getPaletteColor("Accent", 5) || "#fff",
      getPaletteColor("Grey", 6) || getPaletteColor("Grey", 5) || "#fff",
      getPaletteColor("Accent", 2) || getPaletteColor("Accent", 1) || "#fff",
    ];

    return defaultCompanies.map((c, i) => ({
      ...c,
      color: overrides[`badge:${i}`] ?? paletteBadgeColors[i],
      textColor: overrides[`badgeText:${i}`] ?? paletteBadgeTextColors[i],
    }));
  }, [overrides, getPaletteColor]);

  const handleTrustedClick = () => setEditingTrusted(true);
  const handleTrustedChange = (e) => setTrustedText(e.target.value);
  const handleTrustedBlur = () => setEditingTrusted(false);
  const handleTrustedKeyDown = (e) => {
    if (e.key === "Enter") setEditingTrusted(false);
  };

  const handleCompanyColorPick = (idx, color) => {
    if (onColorChange) onColorChange(`badge:${idx}`, color);
  };
  const handleCompanyTextColorPick = (idx, color) => {
    if (onColorChange) onColorChange(`badgeText:${idx}`, color);
  };

  // optional inline fallback using spacingChart (Display already injects CSS vars)
  const sectionStyle = spacingChart
    ? { margin: `${spacingChart.l.css} 0 ${spacingChart.m.css} 0` }
    : undefined;
  const rowStyle = spacingChart ? { gap: spacingChart.l.css } : undefined;

  return (
    <section className={styles.companiesSection} style={sectionStyle}>
      <EditableWithColor
        palettes={colours}
        initialColor={undefined}
        defaultColor={titleDefaultColor}
      >
        {editingTrusted ? (
          <input
            className={mainFontClass + " " + styles.trustedTitle}
            value={trustedText}
            onChange={handleTrustedChange}
            onBlur={handleTrustedBlur}
            onKeyDown={handleTrustedKeyDown}
            autoFocus
            style={{
              textAlign: "center",
              fontWeight: 800,
              fontSize: "1.1rem",
              width: "100%",
              background: "transparent",
              border: "none",
            }}
          />
        ) : (
          <h4
            className={mainFontClass + " " + styles.trustedTitle}
            onClick={handleTrustedClick}
            style={{ cursor: "pointer", color: titleDefaultColor }}
          >
            {trustedText}
          </h4>
        )}
      </EditableWithColor>

      <div className={styles.companiesRow} style={rowStyle}>
        {companies.map((company, idx) => (
          <EditableWithColor
            key={company.name + idx}
            palettes={colours}
            initialColor={company.color}
            defaultColor={company.color}
            applyTo="background"
            onSelect={(c) => handleCompanyColorPick(idx, c)}
          >
            <EditableWithColor
              palettes={colours}
              initialColor={company.textColor}
              defaultColor={company.textColor}
              onSelect={(c) => handleCompanyTextColorPick(idx, c)}
            >
              <span
                className={styles.companyBadge + " " + mainFontClass}
                style={{
                  background: company.color,
                  color: company.textColor || "#fff",
                  cursor: "default",
                }}
                title={company.name}
              >
                {company.name}
              </span>
            </EditableWithColor>
          </EditableWithColor>
        ))}
      </div>
    </section>
  );
};

export default Companies;
