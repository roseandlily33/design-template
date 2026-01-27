import React, { useState } from "react";
import styles from "./Buttons.module.css";
import ButtonOptionsModal from "./ButtonOptionsModal";
import { getButtonCss, copyCss } from "./buttonCssUtils";

const PrimaryButton = ({
  fontClass,
  colors,
  edit = false,
  primaryProps: p,
}) => {
  // Flatten all hex codes from colors prop
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const hexOptions = Array.isArray(colors)
    ? colors
        .flatMap((group) => (Array.isArray(group.colors) ? group.colors : []))
        .filter((c) => typeof c === "string" && c.startsWith("#"))
    : [];

  // Track hover state for inline dynamic hover styles
  const [isHovered, setIsHovered] = useState(false);

  // Compute dynamic styles
  const baseStyle = {
    background: p.color,
    color: p.textColor,
    borderRadius: p.radius,
    border: p.border,
    padding: p.padding,
    fontSize: p.fontSize,
    fontWeight: p.fontWeight,
    letterSpacing: p.letterSpacing,
    textTransform: p.textTransform,
    boxShadow: p.boxShadow,
    lineHeight: p.lineHeight,
    transition: "background 0.18s, color 0.18s, border 0.18s",
    outline: "none",
  };
  const hoverStyle = isHovered
    ? {
        background: p.hoverBg || p.color,
        color: p.hoverText || p.textColor,
        border: p.hoverBorder || p.border,
      }
    : {};

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <button
          className={`${fontClass} ${styles.button} primary-button`}
          style={{ ...baseStyle, ...hoverStyle }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Primary
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
              label="Primary"
              hexOptions={hexOptions}
              color={p.color}
              setColor={p.setColor}
              radius={p.radius}
              setRadius={p.setRadius}
              border={p.border}
              setBorder={p.setBorder}
              fontWeight={p.fontWeight}
              setFontWeight={p.setFontWeight}
              fontSize={p.fontSize}
              setFontSize={p.setFontSize}
              letterSpacing={p.letterSpacing}
              setLetterSpacing={p.setLetterSpacing}
              boxShadow={p.boxShadow}
              setBoxShadow={p.setBoxShadow}
              padding={p.padding}
              setPadding={p.setPadding}
              textTransform={p.textTransform}
              setTextTransform={p.setTextTransform}
              textColor={p.textColor}
              setTextColor={p.setTextColor}
              hoverBg={p.hoverBg}
              setHoverBg={p.setHoverBg}
              hoverText={p.hoverText}
              setHoverText={p.setHoverText}
              hoverBorder={p.hoverBorder}
              setHoverBorder={p.setHoverBorder}
              lineHeight={p.lineHeight}
              setLineHeight={p.setLineHeight}
              onCopyCss={() => {
                copyCss(
                  getButtonCss({
                    label: "primary",
                    color: p.color,
                    radius: p.radius,
                    border: p.border,
                    fontWeight: p.fontWeight,
                    fontSize: p.fontSize,
                    letterSpacing: p.letterSpacing,
                    boxShadow: p.boxShadow,
                    padding: p.padding,
                    textColor: p.textColor,
                    textTransform: p.textTransform,
                    hoverBg: p.hoverBg,
                    hoverText: p.hoverText,
                    hoverBorder: p.hoverBorder,
                    font: fontClass,
                    lineHeight: p.lineHeight,
                  }),
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

export default PrimaryButton;
