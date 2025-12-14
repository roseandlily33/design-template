import React, { useState } from "react";
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
  spacingBase,
  spacingUnit,
}) => {
  const [trustedText, setTrustedText] = useState("Trusted by 10+ companies");
  const [editingTrusted, setEditingTrusted] = useState(false);
  const [companies, setCompanies] = useState(defaultCompanies);

  const handleTrustedClick = () => setEditingTrusted(true);
  const handleTrustedChange = (e) => setTrustedText(e.target.value);
  const handleTrustedBlur = () => setEditingTrusted(false);
  const handleTrustedKeyDown = (e) => {
    if (e.key === "Enter") setEditingTrusted(false);
  };

  const handleCompanyColorPick = (idx, color) => {
    setCompanies((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, color } : c))
    );
  };

  return (
    <section className={styles.companiesSection}>
      <EditableWithColor
        palettes={colours}
        initialColor={undefined}
        defaultColor="#fff"
        onSelect={(c) => {
          /* trusted title color change (if needed) */
        }}
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
              fontWeight: 600,
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
            style={{ cursor: "pointer" }}
          >
            {trustedText}
          </h4>
        )}
      </EditableWithColor>

      <div className={styles.companiesRow}>
        {companies.map((company, idx) => (
          <EditableWithColor
            key={company.name + idx}
            palettes={colours}
            initialColor={company.color}
            defaultColor={company.color}
            applyTo="background"
            onSelect={(c) => handleCompanyColorPick(idx, c)}
          >
            {/* badge text is not editable — always display white text */}
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
        ))}
      </div>
    </section>
  );
};

export default Companies;
