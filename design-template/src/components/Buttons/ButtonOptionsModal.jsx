import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { ColorSelect } from "../Buttons/ColourSelect.component";
import SelectButton from "@/app/buttons/SelectButton/SelectButton.component";
import Input from "@/app/extraComponents/Input.component";

const ButtonOptionsModal = ({
  show,
  onClose,
  label,
  hexOptions,
  color,
  setColor,
  radius,
  setRadius,
  border,
  setBorder,
  fontWeight,
  setFontWeight,
  fontSize,
  setFontSize,
  letterSpacing,
  setLetterSpacing,
  boxShadow,
  setBoxShadow,
  padding,
  setPadding,
  textTransform,
  setTextTransform,
  textColor,
  setTextColor,
  hoverBg,
  setHoverBg,
  hoverText,
  setHoverText,
  hoverBorder,
  setHoverBorder,
  lineHeight,
  setLineHeight,
  onCopyCss,
  copied,
}) => {
  if (!show) return null;
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.25)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 32,
          minWidth: 400,
          boxShadow: "0 2px 16px #0002",
          position: "relative",
        }}
      >
        <button
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "#eee",
            border: "none",
            borderRadius: 6,
            padding: "4px 10px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          Close
        </button>
        <h3 style={{ marginBottom: 18 }}>{label} Button Options</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {label} Color:
            <ColorSelect
              value={color}
              onChange={(v) => setColor(v)}
              options={hexOptions}
              customValue={color}
            />
            {!hexOptions.includes(color) && (
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ marginLeft: 8, width: 40, height: 32, border: "none" }}
              />
            )}
          </label>
          <label>
            Border Radius:
            <Input
              type="number"
              min={0}
              max={32}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              style={{ marginLeft: 8, width: 60 }}
            />
          </label>
          <label>
            Border:
            <Input
              type="text"
              value={border}
              onChange={(e) => setBorder(e.target.value)}
              placeholder="e.g. 2px solid #222"
              style={{ marginLeft: 8, width: 140 }}
            />
          </label>
          <label>
            Font Weight:
            <SelectButton
              options={[
                { value: 100, label: "100" },
                { value: 200, label: "200" },
                { value: 300, label: "300" },
                { value: 400, label: "400" },
                { value: 500, label: "500" },
                { value: 600, label: "600" },
                { value: 700, label: "700" },
                { value: 800, label: "800" },
              ]}
              value={fontWeight}
              onChange={(e) => setFontWeight(Number(e.target.value))}
            />
          </label>
          <label>
            Font Size:
            <Input
              type="number"
              min={10}
              max={48}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              style={{ marginLeft: 8, width: 60 }}
            />
          </label>
          <label>
            Letter Spacing:
            <Input
              type="number"
              step={0.1}
              min={-2}
              max={10}
              value={letterSpacing}
              onChange={(e) => setLetterSpacing(Number(e.target.value))}
              style={{ marginLeft: 8, width: 60 }}
            />
          </label>
          <label>
            Box Shadow:
            <Input
              type="text"
              value={boxShadow}
              onChange={(e) => setBoxShadow(e.target.value)}
              placeholder="e.g. 0 2px 8px #0002"
              style={{ marginLeft: 8, width: 120 }}
            />
          </label>
          <label>
            Padding:
            <Input
              type="text"
              value={padding}
              onChange={(e) => setPadding(e.target.value)}
              placeholder="e.g. 12px 32px"
              style={{ marginLeft: 8, width: 100 }}
            />
          </label>
          <label>
            Text Transform:
            <SelectButton
              options={[
                { value: "none", label: "None" },
                { value: "uppercase", label: "Uppercase" },
                { value: "lowercase", label: "Lowercase" },
                { value: "capitalize", label: "Capitalize" },
              ]}
              value={textTransform}
              onChange={(e) => setTextTransform(e.target.value)}
            />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            Text Color:
            <ColorSelect
              value={textColor}
              onChange={(v) => setTextColor(v)}
              options={hexOptions}
              customValue={textColor}
            />
            {!hexOptions.includes(textColor) && (
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                style={{ marginLeft: 8, width: 40, height: 32, border: "none" }}
              />
            )}
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            Hover BG:
            <ColorSelect
              value={hoverBg}
              onChange={(v) => setHoverBg(v)}
              options={hexOptions}
              customValue={hoverBg}
            />
            {!hexOptions.includes(hoverBg) && (
              <input
                type="color"
                value={hoverBg}
                onChange={(e) => setHoverBg(e.target.value)}
                style={{ marginLeft: 8, width: 40, height: 32, border: "none" }}
              />
            )}
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            Hover Text:
            <ColorSelect
              value={hoverText}
              onChange={(v) => setHoverText(v)}
              options={hexOptions}
              customValue={hoverText}
            />
            {!hexOptions.includes(hoverText) && (
              <input
                type="color"
                value={hoverText}
                onChange={(e) => setHoverText(e.target.value)}
                style={{ marginLeft: 8, width: 40, height: 32, border: "none" }}
              />
            )}
          </label>
          <label>
            Hover Border:
            <Input
              type="text"
              value={hoverBorder}
              onChange={(e) => setHoverBorder(e.target.value)}
              placeholder="e.g. 2px solid #222"
              style={{ marginLeft: 8, width: 120 }}
            />
          </label>
          <label>
            Line Height:
            <Input
              type="number"
              step={0.01}
              min={1}
              max={2}
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              style={{ marginLeft: 8, width: 60 }}
            />
          </label>
          <button
            style={{
              marginTop: 12,
              padding: "6px 14px",
              fontSize: 15,
              borderRadius: 6,
              background: "#007003",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
            onClick={onCopyCss}
          >
            Copy CSS
          </button>
          {copied && (
            <span style={{ marginLeft: 8, color: "#0070f3", fontWeight: 500 }}>
              Copied!
            </span>
          )}
        </div>
      </div>
    </div>,
    typeof window !== "undefined" ? document.body : undefined,
  );
};

export default ButtonOptionsModal;
