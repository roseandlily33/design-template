import React, { useState } from "react";
import styles from "./Layout.module.css";
import LandingPages from "./LandingPages/LandingPages.component";
import ContactPages from "./Contact/Contact.component";

const LAYOUT_TABS = [
  { label: "Landing Pages", key: "landing" },
  { label: "Dashboard", key: "dashboard" },
  { label: "Contact", key: "contact" },
  // Add more as needed
];

const Layouts = ({
  colours,
  fonts,
  borderRadius,
  heroImgUrl,
  spacingBase,
  spacingUnit,
  primaryButtonProps,
  secondaryButtonProps,
  tertiaryButtonProps,
}) => {
  const [activeTab, setActiveTab] = useState("landing");

  return (
    <div>
      <div className={styles.tabsRow}>
        {LAYOUT_TABS.map((tab) => (
          <button
            key={tab.key}
            className={
              styles.tabBtn +
              (activeTab === tab.key ? " " + styles.activeTab : "")
            }
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.layoutsGrid}>
        {activeTab === "landing" && (
          <LandingPages
            colours={colours}
            fonts={fonts}
            borderRadius={borderRadius}
            heroImgUrl={heroImgUrl}
            spacingBase={spacingBase}
            spacingUnit={spacingUnit}
            primaryButtonProps={primaryButtonProps}
            secondaryButtonProps={secondaryButtonProps}
            tertiaryButtonProps={tertiaryButtonProps}
          />
        )}
        {activeTab === "dashboard" && (
          <div className={styles.layoutPreview}>
            Dashboard layout preview coming soon...
          </div>
        )}
        {activeTab === "contact" && (
          <div className={styles.layoutPreview}>
            <ContactPages
              colours={colours}
              fonts={fonts}
              borderRadius={borderRadius}
              heroImgUrl={heroImgUrl}
              spacingBase={spacingBase}
              spacingUnit={spacingUnit}
              primaryButtonProps={primaryButtonProps}
              secondaryButtonProps={secondaryButtonProps}
              tertiaryButtonProps={tertiaryButtonProps}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layouts;
