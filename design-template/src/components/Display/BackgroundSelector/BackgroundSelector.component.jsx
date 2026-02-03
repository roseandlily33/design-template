import React, { useState } from "react";
import styles from "./BackgroundSelector.module.css";

// Helper to get all unique palette colors as flat array
function getPaletteColors(colours) {
    if (!Array.isArray(colours)) return [];
    return colours.flatMap(row => Array.isArray(row.colors) ? row.colors : []).filter(Boolean);
}

const sectionTitles = [
    { key: "navbar", label: "Navbar" },
    { key: "hero", label: "Hero" },
    { key: "description", label: "Description" },
    { key: "threeicons", label: "Three Icons" },
    { key: "companies", label: "Companies" },
    { key: "testimonial", label: "Testimonial" },
    { key: "contact", label: "Contact" },
    { key: "footer", label: "Footer" },
];

const defaultBg = "#fff";

const BackgroundSelector = ({ colours, onChange, visible, setVisible, backgrounds }) => {
    const paletteColors = getPaletteColors(colours);

    return (
        <div className={styles.selectorRoot}>
            <button
                className={styles.toggleBtn}
                onClick={() => setVisible(v => !v)}
                style={{ marginBottom: 8 }}
            >
                {visible ? "Hide" : "Show"} Background Chart
            </button>
            {visible && (
                <div className={styles.chartPanel}>
                    {sectionTitles.map(({ key, label }) => (
                        <div key={key} className={styles.sectionRow}>
                            <span className={styles.sectionTitle}>{label}</span>
                            <div className={styles.colorOptions}>
                                <label>
                                    <input
                                        type="radio"
                                        name={key + "-bg"}
                                        value={defaultBg}
                                        checked={backgrounds[key] === defaultBg}
                                        onChange={() => onChange(key, defaultBg)}
                                    />
                                    <span className={styles.colorSwatch} style={{ background: defaultBg, border: "1px solid #ccc" }} />
                                    White
                                </label>
                                {paletteColors.map((color, idx) => (
                                    <label key={color + idx}>
                                        <input
                                            type="radio"
                                            name={key + "-bg"}
                                            value={color}
                                            checked={backgrounds[key] === color}
                                            onChange={() => onChange(key, color)}
                                        />
                                        <span className={styles.colorSwatch} style={{ background: color }} />
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BackgroundSelector;
