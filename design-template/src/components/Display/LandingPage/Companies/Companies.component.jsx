import React, { useState, useMemo } from "react";
import styles from "./Companies.module.css";

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
  companiesTrustedText,
  fontScale = {},
  breakpoint = "Desktop",
}) => {

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

  const titleDefaultColor =
    fontScale?.h4?.[breakpoint]?.color ||
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


  const sectionStyle = spacingChart
    ? { margin: `${spacingChart.l.css} 0 ${spacingChart.m.css} 0` }
    : undefined;
  const rowStyle = spacingChart ? { gap: spacingChart.l.css } : undefined;

  return (
    <section className={styles.companiesSection} style={sectionStyle}>
      <h4
        className={mainFontClass + " " + styles.trustedTitle}
        style={{ color: titleDefaultColor, textAlign: "center", fontWeight: 800, fontSize: "1.1rem", width: "100%" }}
      >
        {companiesTrustedText}
      </h4>

      <div className={styles.companiesRow} style={rowStyle}>
        {companies.map((company, idx) => {
          const badgeTextColor = fontScale?.p?.[breakpoint]?.color || company.textColor || "#fff";
          return (
            <span
              key={company.name + idx}
              className={styles.companyBadge + " " + mainFontClass}
              style={{
                background: company.color,
                color: badgeTextColor,
                cursor: "default",
              }}
              title={company.name}
            >
              {company.name}
            </span>
          );
        })}
      </div>
    </section>
  );
};

export default Companies;
