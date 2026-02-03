import React, { useState } from "react";
import ButtonOptionsModal from "./ButtonOptionsModal";
import styles from "./Buttons.module.css";
import { getButtonCss, copyCss } from "./buttonCssUtils";

const SecondaryButton = ({
  fontClass,
  colors,
  edit = false,
  secondaryProps: s,
}) => {
  // Flatten all hex codes from colors prop
  const hexOptions = Array.isArray(colors)
    ? colors
        .flatMap((group) => (Array.isArray(group.colors) ? group.colors : []))
        .filter((c) => typeof c === "string" && c.startsWith("#"))
    : [];

  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    background: s?.color,
    color: s?.textColor,
    borderRadius: s?.radius,
    border: s?.border,
    padding: s?.padding,
    fontSize: s?.fontSize,
    fontWeight: s?.fontWeight,
    letterSpacing: s?.letterSpacing,
    textTransform: s?.textTransform,
    boxShadow: s?.boxShadow,
    lineHeight: s?.lineHeight,
    transition: "background 0.18s, color 0.18s, border 0.18s",
    outline: "none",
  };
  const hoverStyle = isHovered
    ? {
        background: s?.hoverBg || s?.color,
        color: s?.hoverText || s?.textColor,
        border: s?.hoverBorder || s?.border,
      }
    : {};

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <button
        className={`${fontClass} ${styles.button} secondary-button`}
        style={{ ...baseStyle, ...hoverStyle }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Secondary
      </button>
      {edit === true && (
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
            label="Secondary"
            hexOptions={hexOptions}
            color={s.color}
            setColor={s.setColor}
            radius={s.radius}
            setRadius={s.setRadius}
            border={s.border}
            setBorder={s.setBorder}
            fontWeight={s.fontWeight}
            setFontWeight={s.setFontWeight}
            fontSize={s.fontSize}
            setFontSize={s.setFontSize}
            letterSpacing={s.letterSpacing}
            setLetterSpacing={s.setLetterSpacing}
            boxShadow={s.boxShadow}
            setBoxShadow={s.setBoxShadow}
            padding={s.padding}
            setPadding={s.setPadding}
            textTransform={s.textTransform}
            setTextTransform={s.setTextTransform}
            textColor={s.textColor}
            setTextColor={s.setTextColor}
            hoverBg={s.hoverBg}
            setHoverBg={s.setHoverBg}
            hoverText={s.hoverText}
            setHoverText={s.setHoverText}
            hoverBorder={s.hoverBorder}
            setHoverBorder={s.setHoverBorder}
            lineHeight={s.lineHeight}
            setLineHeight={s.setLineHeight}
            onCopyCss={() => {
              copyCss(
                getButtonCss({
                  label: "secondary",
                  color: s.color,
                  radius: s.radius,
                  border: s.border,
                  fontWeight: s.fontWeight,
                  fontSize: s.fontSize,
                  letterSpacing: s.letterSpacing,
                  boxShadow: s.boxShadow,
                  padding: s.padding,
                  textColor: s.textColor,
                  textTransform: s.textTransform,
                  hoverBg: s.hoverBg,
                  hoverText: s.hoverText,
                  hoverBorder: s.hoverBorder,
                  font: fontClass,
                  lineHeight: s.lineHeight,
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
  );
};
export default SecondaryButton;
