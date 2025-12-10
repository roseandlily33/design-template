import React, { useState } from "react";
import styles from "./Buttons.module.css";
import PrimaryButton from "./PrimaryButton.component";
import SecondaryButton from "./SecondaryButton.component";
import TertiaryButton from "./TertiaryButton.component";

const Buttons = ({
    font,
    fontMap,
    colors,
    primaryProps,
    secondaryProps,
    tertiaryProps,
}) => {
    const fontClass = fontMap[font] || "";

    return (
        <div className={styles.buttonsRoot}>
            <div className={styles.buttonsTitle}>
                Buttons Font: <b>{font}</b>
            </div>
            {/* Primary Button */}
            <div className={styles.buttonGroup}>
                <PrimaryButton
                    fontClass={fontClass}
                    colors={colors}
                    edit={true}
                    primaryProps={primaryProps}
                />
            </div>
            {/* Secondary Button */}
            <div className={styles.buttonGroup}>
                <SecondaryButton
                    fontClass={fontClass}
                    colors={colors}
                    edit={true}
                    secondaryProps={secondaryProps}
                />
            </div>
            {/* Tertiary Button */}
            <div className={styles.buttonGroup}>
                <TertiaryButton
                    fontClass={fontClass}
                    colors={colors}
                    edit={true}
                    tertiaryProps={tertiaryProps}
                />
            </div>
        </div>
    );
};

export default Buttons;
