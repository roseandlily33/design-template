import React, { useState } from "react";
import styles from "./Companies.module.css";

const defaultCompanies = [
  { name: "Acme Corp", color: "#6883a1" }, // primary
  { name: "Globex", color: "#e5c2c2" }, // secondary
  { name: "Initech", color: "#a4a4a4ff" }, // tertiary
  { name: "Umbrella", color: "#b3b3b3" }, // light variation of tertiary
  { name: "Hooli", color: "#85a0be" }, // white
];

const Companies = ({ mainFontClass }) => {
  const [trustedText, setTrustedText] = useState("Trusted by 10+ companies");
  const [editingTrusted, setEditingTrusted] = useState(false);
  const [companies, setCompanies] = useState(defaultCompanies);
  const [editingCompany, setEditingCompany] = useState({}); // { idx: true }

  const handleTrustedClick = () => setEditingTrusted(true);
  const handleTrustedChange = (e) => setTrustedText(e.target.value);
  const handleTrustedBlur = () => setEditingTrusted(false);
  const handleTrustedKeyDown = (e) => {
    if (e.key === "Enter") setEditingTrusted(false);
  };

  const handleCompanyClick = (idx) =>
    setEditingCompany((prev) => ({ ...prev, [idx]: true }));
  const handleCompanyChange = (idx, value) => {
    setCompanies((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, name: value } : c))
    );
  };
  const handleCompanyBlur = (idx) =>
    setEditingCompany((prev) => ({ ...prev, [idx]: false }));
  const handleCompanyKeyDown = (e, idx) => {
    if (e.key === "Enter") handleCompanyBlur(idx);
  };

  return (
    <section className={styles.companiesSection}>
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
      <div className={styles.companiesRow}>
        {companies.map((company, idx) => (
          <span
            key={company.name + idx}
            className={styles.companyBadge + " " + mainFontClass}
            style={{ background: company.color }}
            title={company.name}
            onClick={() => handleCompanyClick(idx)}
          >
            {editingCompany[idx] ? (
              <input
                value={company.name}
                className={mainFontClass}
                onChange={(e) => handleCompanyChange(idx, e.target.value)}
                onBlur={() => handleCompanyBlur(idx)}
                onKeyDown={(e) => handleCompanyKeyDown(e, idx)}
                autoFocus
                style={{
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  width: "100%",
                  background: "transparent",
                  color: "#fff",
                  border: "none",
                  borderRadius: "18px",
                  padding: "0 12px",
                }}
              />
            ) : (
              company.name
            )}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Companies;
