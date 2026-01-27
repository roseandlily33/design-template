import React, { useState } from "react";
import styles from "./Buttons.module.css";
import ButtonOptionsModal from "./ButtonOptionsModal";
import { getButtonCss, copyCss } from "./buttonCssUtils";

const TabButton = ({ fontClass, colors, edit = false, tabProps: t }) => {
    console.log("TabButton render", t, colors);
    const [showModal, setShowModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const hexOptions = Array.isArray(colors)
        ? colors
            .flatMap((group) => (Array.isArray(group.colors) ? group.colors : []))
            .filter((c) => typeof c === "string" && c.startsWith("#"))
        : [];

    const baseStyle = {
        background: t.color,
        color: t.textColor,
        borderRadius: t.radius,
        border: t.border,
        padding: t.padding,
        fontSize: t.fontSize,
        fontWeight: t.fontWeight,
        letterSpacing: t.letterSpacing,
        textTransform: t.textTransform,
        boxShadow: t.boxShadow,
        lineHeight: t.lineHeight,
        transition: "background 0.18s, color 0.18s, border 0.18s",
        outline: "none",
    };
    const hoverStyle = isHovered
        ? {
            background: t.hoverBg || t.color,
            color: t.hoverText || t.textColor,
            border: t.hoverBorder || t.border,
        }
        : {};

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <button
                    className={`${fontClass} ${styles.button} tab-button`}
                    style={{ ...baseStyle, ...hoverStyle }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Tab
                </button>
                {edit && (
                    <>
                        <button
                            style={{
                                marginLeft: 12,
                                padding: "6px 14px",
                                fontSize: 15,
                                borderRadius: 6,
                                background: "#eee",
                                color: "#222",
                                border: "none",
                                cursor: "pointer",
                            }}
                            onClick={() => setShowModal(true)}
                        >
                            Edit Options
                        </button>
                        <ButtonOptionsModal
                            show={showModal}
                            onClose={() => setShowModal(false)}
                            label="Tab"
                            hexOptions={hexOptions}
                            color={t.color}
                            setColor={t.setColor}
                            radius={t.radius}
                            setRadius={t.setRadius}
                            border={t.border}
                            setBorder={t.setBorder}
                            fontWeight={t.fontWeight}
                            setFontWeight={t.setFontWeight}
                            fontSize={t.fontSize}
                            setFontSize={t.setFontSize}
                            letterSpacing={t.letterSpacing}
                            setLetterSpacing={t.setLetterSpacing}
                            boxShadow={t.boxShadow}
                            setBoxShadow={t.setBoxShadow}
                            padding={t.padding}
                            setPadding={t.setPadding}
                            textTransform={t.textTransform}
                            setTextTransform={t.setTextTransform}
                            textColor={t.textColor}
                            setTextColor={t.setTextColor}
                            hoverBg={t.hoverBg}
                            setHoverBg={t.setHoverBg}
                            hoverText={t.hoverText}
                            setHoverText={t.setHoverText}
                            hoverBorder={t.hoverBorder}
                            setHoverBorder={t.setHoverBorder}
                            lineHeight={t.lineHeight}
                            setLineHeight={t.setLineHeight}
                            onCopyCss={() => {
                                copyCss(
                                    getButtonCss({
                                        label: "tab",
                                        color: t.color,
                                        radius: t.radius,
                                        border: t.border,
                                        fontWeight: t.fontWeight,
                                        fontSize: t.fontSize,
                                        letterSpacing: t.letterSpacing,
                                        boxShadow: t.boxShadow,
                                        padding: t.padding,
                                        textColor: t.textColor,
                                        textTransform: t.textTransform,
                                        hoverBg: t.hoverBg,
                                        hoverText: t.hoverText,
                                        hoverBorder: t.hoverBorder,
                                        font: fontClass,
                                        lineHeight: t.lineHeight,
                                    })
                                );
                                setCopied(true);
                                setTimeout(() => setCopied(false), 1500);
                            }}
                            copied={copied}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default TabButton;
