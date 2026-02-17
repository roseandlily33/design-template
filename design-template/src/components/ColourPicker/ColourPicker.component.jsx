"use client";
import React, { useState } from "react";
import AccessibilityChartModal from "./AccessibilityChartModal";
import styles from "./ColourPicker.module.css";
import RenderPalette from "./RenderPalette.component";
import TertiaryButton from "../../app/buttons/TertiaryButton/TertiaryButton.component";
import SecondaryButton from "../../app/buttons/SecondaryButton/SecondaryButton.component";
import CopyPalette from "./CopyPalette.component";
import PasteInColourPalette from "./PasteInColourPalette.component";

const ColourPicker = ({
  palette1,
  palette2,
  palette3,
  setPalette1,
  setPalette2,
  setPalette3,
  onApply,
  // selected,
  // setSelected,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selected1, setSelected1] = useState(null);
  const [hexInput1, setHexInput1] = useState("");
  const [selected2, setSelected2] = useState(null);
  const [hexInput2, setHexInput2] = useState("");
  const [selected3, setSelected3] = useState(null);
  const [hexInput3, setHexInput3] = useState("");
  // Tab state: 0 = Palette 1, 1 = Palette 2, 2 = Palette 3
  const [activeTab, setActiveTab] = useState(0);

  const getSelectedPaletteCss = () => {
    const palettes = [palette1, palette2, palette3];
    const palette = palettes[activeTab];
    let css = ":root {\n";
    palette.forEach((row) => {
      row.colors.forEach((color, cIdx) => {
        if (color) {
          css += `  --palette${activeTab + 1}-${row.label?.toLowerCase() || "row"}-${cIdx + 1}: ${color};\n`;
        }
      });
    });
    css += "}\n";
    return css;
  };

  const [cssCopied, setCssCopied] = useState(false);

  return (
    <div className={styles.pickerRoot}>
      <PasteInColourPalette onApply={onApply} />
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        {[0, 1, 2].map((idx) => (
          <TertiaryButton
            functionName={() => setActiveTab(idx)}
            span={`Palette ${idx + 1}`}
            key={idx}
          />
        ))}
        <SecondaryButton
          span="Accessibility Chart"
          functionName={() => setShowModal(true)}
        />
        <SecondaryButton
          span={cssCopied ? "Copied CSS!" : "Copy CSS"}
          functionName={() => {
            navigator.clipboard.writeText(getSelectedPaletteCss());
            setCssCopied(true);
            setTimeout(() => setCssCopied(false), 1200);
          }}
        />
      </div>
      <CopyPalette
        palettes={[palette1, palette2, palette3]}
        setPalettes={[setPalette1, setPalette2, setPalette3]}
      />
      {activeTab === 0 && (
        <RenderPalette
          palette={palette1}
          setPalette={setPalette1}
          selected={selected1}
          setSelected={setSelected1}
          hexInput={hexInput1}
          setHexInput={setHexInput1}
          label="Palette 1"
        />
      )}
      {activeTab === 1 && (
        <RenderPalette
          palette={palette2}
          setPalette={setPalette2}
          selected={selected2}
          setSelected={setSelected2}
          hexInput={hexInput2}
          setHexInput={setHexInput2}
          label="Palette 2"
        />
      )}
      {activeTab === 2 && (
        <RenderPalette
          palette={palette3}
          setPalette={setPalette3}
          selected={selected3}
          setSelected={setSelected3}
          hexInput={hexInput3}
          setHexInput={setHexInput3}
          label="Palette 3"
        />
      )}
      <AccessibilityChartModal
        open={showModal}
        onClose={() => setShowModal(false)}
        palettes={[palette1, palette2, palette3]}
        initialIdx={activeTab}
      />
    </div>
  );
};

export default ColourPicker;
