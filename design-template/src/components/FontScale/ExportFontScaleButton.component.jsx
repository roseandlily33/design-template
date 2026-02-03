import React, { useState, useMemo } from "react";
import { generateCSSFromStyles } from "./fontscale.helpers.js";
import PrimaryButton from "@/app/buttons/PrimaryButton/PrimaryButton.component.jsx";

const ExportFontScale = ({ stylesState, styles }) => {
  const [copied, setCopied] = useState(false);

  const cssForExport = useMemo(
    () => generateCSSFromStyles(stylesState || {}),
    [stylesState]
  );

  const handleCopy = async () => {
    if (!cssForExport) return;
    try {
      await navigator.clipboard.writeText(cssForExport);
      setCopied(true);
      setTimeout(() => setCopied(false), 700);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = cssForExport;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 700);
      } catch {
        // ignore
      }
      document.body.removeChild(ta);
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <PrimaryButton
        span={copied ? "Copied" : "Copy Styles"}
        functionName={handleCopy}
      />
      {copied && (
        <div
          role="status"
          style={{
            position: "absolute",
            top: "-40px",
            right: 0,
            background: "#111",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: 6,
            fontSize: 13,
            boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
            transform: "translateY(0)",
          }}
        >
          Copied!
        </div>
      )}
    </div>
  );
};

export default ExportFontScale;
