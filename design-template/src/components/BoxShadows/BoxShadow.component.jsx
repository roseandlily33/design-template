import React, { useState } from "react";
import styles from "./BoxShadow.module.css";
import inputStyles from "../Inputs/Inputs.module.css";
import { ColorSelect } from "../Buttons/ColourSelect.component";
import PrimaryButton from "@/app/buttons/PrimaryButton/PrimaryButton.component";

const recommendedPresets = [
    { name: "Soft", x: 0, y: 2, blur: 8, spread: 0, alpha: 0.18 },
    { name: "Medium", x: 0, y: 4, blur: 16, spread: 0, alpha: 0.22 },
    { name: "Strong", x: 0, y: 8, blur: 32, spread: 0, alpha: 0.28 },
    { name: "Inset", x: 0, y: 2, blur: 8, spread: 0, alpha: 0.18, inset: true },
];

const BoxShadow = ({
    boxShadow,
    setBoxShadow,
    borderRadius,
    paletteColors,
}) => {
    // Local state for editing presets
    const [editingPreset, setEditingPreset] = useState(null);
    const [presets, setPresets] = useState(recommendedPresets);

    // Helper to get color options from palette
    const colorOptions = paletteColors
        ?.flatMap((row) => row.colors.filter(Boolean))
        ?.filter((c) => c && c !== "#fff" && c !== "#ffffff") || ["#222"];
    // Provide defaults to avoid undefined errors
    const safeBoxShadow = {
        x: boxShadow?.x ?? 0,
        y: boxShadow?.y ?? 2,
        blur: boxShadow?.blur ?? 8,
        spread: boxShadow?.spread ?? 0,
        color: boxShadow?.color ?? (colorOptions[0] || "#222"),
        alpha: boxShadow?.alpha ?? 0.18,
        inset: boxShadow?.inset ?? false,
    };
    // Live preview style
    const shadowColor =
        safeBoxShadow.color +
        (safeBoxShadow.alpha !== undefined
            ? Math.round(safeBoxShadow.alpha * 255)
                .toString(16)
                .padStart(2, "0")
            : "");
    const boxShadowValue = `${safeBoxShadow.inset ? "inset " : ""}${safeBoxShadow.x}px ${safeBoxShadow.y}px ${safeBoxShadow.blur}px ${safeBoxShadow.spread}px ${shadowColor}`;

    // CSS string for copying
    const cssString = `box-shadow: ${boxShadowValue};`;
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(cssString);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    // Handlers
    const handlePresetApply = (preset) => {
        setBoxShadow({
            x: preset.x,
            y: preset.y,
            blur: preset.blur,
            spread: preset.spread,
            color: safeBoxShadow.color || colorOptions[0],
            alpha: preset.alpha,
            inset: !!preset.inset,
        });
    };
    const handlePresetEdit = (idx) => {
        setEditingPreset(idx);
    };
    const handlePresetSave = (idx, preset) => {
        setPresets((prev) => prev.map((p, i) => (i === idx ? preset : p)));
        setEditingPreset(null);
    };

    return (
        <div className={styles.boxShadowRoot}>
            <div className={inputStyles.inputsRoot}>
                {/* Header */}
                <div className={styles.headerRow}>
                    <h3 className={styles.heading}>Box Shadows</h3>
                    <PrimaryButton span={copied ? "Copied!" : "Copy CSS"} functionName={handleCopy} />
                </div>

                {/* Preview */}
                <div
                    className={styles.cardPreview}
                    style={{ boxShadow: boxShadowValue, borderRadius: borderRadius }}
                >
                    Card Preview
                </div>

                {/* Controls */}
                <div className={styles.controlsRow}>
                    <div className={styles.controlsFieldsWrap}>
                        <div className={inputStyles.inputField}>
                            <label className={inputStyles.inputLabel}>X</label>
                            <input
                                type="number"
                                value={safeBoxShadow.x}
                                onChange={(e) =>
                                    setBoxShadow({ ...safeBoxShadow, x: Number(e.target.value) })
                                }
                                className={inputStyles.inputElement}
                            />
                        </div>
                        <div className={inputStyles.inputField}>
                            <label className={inputStyles.inputLabel}>Y</label>
                            <input
                                type="number"
                                value={safeBoxShadow.y}
                                onChange={(e) =>
                                    setBoxShadow({ ...safeBoxShadow, y: Number(e.target.value) })
                                }
                                className={inputStyles.inputElement}
                            />
                        </div>
                        <div className={inputStyles.inputField}>
                            <label className={inputStyles.inputLabel}>Blur</label>
                            <input
                                type="number"
                                value={safeBoxShadow.blur}
                                onChange={(e) =>
                                    setBoxShadow({ ...safeBoxShadow, blur: Number(e.target.value) })
                                }
                                className={inputStyles.inputElement}
                            />
                        </div>
                        <div className={inputStyles.inputField}>
                            <label className={inputStyles.inputLabel}>Spread</label>
                            <input
                                type="number"
                                value={safeBoxShadow.spread}
                                onChange={(e) =>
                                    setBoxShadow({ ...safeBoxShadow, spread: Number(e.target.value) })
                                }
                                className={inputStyles.inputElement}
                            />
                        </div>
                        <div className={inputStyles.inputField}>
                            <label className={inputStyles.inputLabel}>Color</label>
                            <ColorSelect
                                value={safeBoxShadow.color}
                                onChange={(v) => setBoxShadow({ ...safeBoxShadow, color: v })}
                                options={colorOptions}
                                customValue={safeBoxShadow.color}
                            />
                        </div>
                        <div className={inputStyles.inputField}>
                            <label className={inputStyles.inputLabel}>Alpha</label>
                            <input
                                type="number"
                                min={0}
                                max={1}
                                step={0.01}
                                value={safeBoxShadow.alpha}
                                onChange={(e) =>
                                    setBoxShadow({ ...safeBoxShadow, alpha: Number(e.target.value) })
                                }
                                className={inputStyles.inputElement}
                            />
                        </div>
                        <div className={inputStyles.inputField}>
                            <label className={inputStyles.inputLabel}>Inset</label>
                            <input
                                type="checkbox"
                                checked={!!safeBoxShadow.inset}
                                onChange={(e) =>
                                    setBoxShadow({ ...safeBoxShadow, inset: e.target.checked })
                                }
                                className={inputStyles.checkboxElement}
                            />
                        </div>
                    </div>
                </div>

                {/* Presets */}
                <div className={styles.presetsSection}>
                    <div className={styles.presetsTitle}>Recommended Presets</div>
                    <div className={styles.presetsRow}>
                        {presets.map((preset, idx) => (
                            <div key={preset.name + idx} className={styles.presetCard}>
                                {editingPreset === idx ? (
                                    <div className={styles.presetEditCol}>
                                        <input
                                            type="text"
                                            value={preset.name}
                                            onChange={(e) =>
                                                setPresets((prev) =>
                                                    prev.map((p, i) =>
                                                        i === idx ? { ...p, name: e.target.value } : p,
                                                    ),
                                                )
                                            }
                                            className={styles.presetNameInput}
                                        />
                                        <label className={inputStyles.inputLabel}>
                                            X
                                            <input
                                                type="number"
                                                value={preset.x}
                                                onChange={(e) =>
                                                    setPresets((prev) =>
                                                        prev.map((p, i) =>
                                                            i === idx ? { ...p, x: Number(e.target.value) } : p,
                                                        ),
                                                    )
                                                }
                                                className={styles.presetInput}
                                            />
                                        </label>
                                        <label className={inputStyles.inputLabel}>
                                            Y
                                            <input
                                                type="number"
                                                value={preset.y}
                                                onChange={(e) =>
                                                    setPresets((prev) =>
                                                        prev.map((p, i) =>
                                                            i === idx ? { ...p, y: Number(e.target.value) } : p,
                                                        ),
                                                    )
                                                }
                                                className={styles.presetInput}
                                            />
                                        </label>
                                        <label className={inputStyles.inputLabel}>
                                            Blur
                                            <input
                                                type="number"
                                                value={preset.blur}
                                                onChange={(e) =>
                                                    setPresets((prev) =>
                                                        prev.map((p, i) =>
                                                            i === idx
                                                                ? { ...p, blur: Number(e.target.value) }
                                                                : p,
                                                        ),
                                                    )
                                                }
                                                className={styles.presetInput}
                                            />
                                        </label>
                                        <label className={inputStyles.inputLabel}>
                                            Spread
                                            <input
                                                type="number"
                                                value={preset.spread}
                                                onChange={(e) =>
                                                    setPresets((prev) =>
                                                        prev.map((p, i) =>
                                                            i === idx
                                                                ? { ...p, spread: Number(e.target.value) }
                                                                : p,
                                                        ),
                                                    )
                                                }
                                                className={styles.presetInput}
                                            />
                                        </label>
                                        <label className={inputStyles.inputLabel}>
                                            Alpha
                                            <input
                                                type="number"
                                                min={0}
                                                max={1}
                                                step={0.01}
                                                value={preset.alpha}
                                                onChange={(e) =>
                                                    setPresets((prev) =>
                                                        prev.map((p, i) =>
                                                            i === idx
                                                                ? { ...p, alpha: Number(e.target.value) }
                                                                : p,
                                                        ),
                                                    )
                                                }
                                                className={styles.presetInput}
                                            />
                                        </label>
                                        <label className={inputStyles.inputLabel}>
                                            Inset
                                            <input
                                                type="checkbox"
                                                checked={!!preset.inset}
                                                onChange={(e) =>
                                                    setPresets((prev) =>
                                                        prev.map((p, i) =>
                                                            i === idx ? { ...p, inset: e.target.checked } : p,
                                                        ),
                                                    )
                                                }
                                            />
                                        </label>
                                        <button
                                            onClick={() => handlePresetSave(idx, preset)}
                                            className={styles.saveBtn}
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className={styles.presetName}>{preset.name}</div>
                                        <div
                                            className={styles.presetDesc}
                                        >{`${preset.x}px ${preset.y}px ${preset.blur}px ${preset.spread}px, α=${preset.alpha}${preset.inset ? ", inset" : ""}`}</div>
                                        <div className={styles.presetBtnRow}>
                                            <button
                                                onClick={() => handlePresetApply(preset)}
                                                className={styles.applyBtn}
                                            >
                                                Apply
                                            </button>
                                            <button
                                                onClick={() => handlePresetEdit(idx)}
                                                className={styles.editBtn}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CSS String */}
                <div className={styles.cssString}>{cssString}</div>
            </div>
        </div>
    );
};

export default BoxShadow;
