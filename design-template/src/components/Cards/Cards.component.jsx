import React, { useState } from "react";
import ProductCards from "./ProductCards/ProductCards";
import styles from "./Cards.module.css";
import CourseCards from "./CourseCards/CourseCards.component";
import LoginCards from "./LoginCards/LoginCards.component";

const CARD_TABS = [
  { label: "Product Cards", key: "product" },
  { label: "User Cards", key: "user" },
  { label: "Course Cards", key: "course" },
  { label: "Login/Signup Cards", key: "login" },
];

const Cards = ({
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
  const [activeTab, setActiveTab] = useState("product");

  return (
    <div>
      <div className={styles.tabsRow}>
        {CARD_TABS.map((tab) => (
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
      <div className={styles.cardsGrid}>
        {activeTab === "product" && (
          <>
            <ProductCards
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
          </>
        )}
        {activeTab === "course" && (
          <>
            <CourseCards
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
          </>
        )}
        {activeTab === "login" && (
          <>
            <LoginCards
              colours={colours}
              fonts={fonts}
              borderRadius={borderRadius}
              spacingBase={spacingBase}
              spacingUnit={spacingUnit}
              primaryButtonProps={primaryButtonProps}
              secondaryButtonProps={secondaryButtonProps}
              tertiaryButtonProps={tertiaryButtonProps}
            />
          </>
        )}
        {/* Future: Add UserCard1, UserCard2, etc. for other tabs */}
      </div>
    </div>
  );
};

export default Cards;
