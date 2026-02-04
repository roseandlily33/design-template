import React from "react";
import styles from "./BorderRadius.module.css";

const BORDER_RADII = [0, 2, 4, 6, 8, 12, 16, 24, 32, 50];

const BorderRadius = ({ radius, setRadius }) => {
  return (
    <div className={styles.radiusRoot}>
      <div className={styles.radiusTitle}>Border Radius</div>
      <div className={styles.radiusOptionsRow}>
        {BORDER_RADII.map((radi) => (
          <label key={radi} className={styles.radiusOptionLabel}>
            <input
              type="radio"
              name="border-radius"
              value={radi}
              checked={Number(radius) === Number(radi)}
              onChange={() => setRadius(radi)}
              className={styles.radiusRadio}
            />
            <span
              className={styles.radiusSwatch}
              style={{ borderRadius: radi }}
            />
            <span className={styles.radiusValue}>
              {radi === 0 ? "None" : radi === 50 ? "Pill" : radi + "px"}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default BorderRadius;
