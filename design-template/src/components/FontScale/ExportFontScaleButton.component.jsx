import React, { useState, useMemo } from "react";
import { generateCSSFromStyles } from "./fontscale.helpers.js";

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
      <button
        className={styles?.scaleExportBtn}
        onClick={handleCopy}
        style={{
          padding: "8px 12px",
          background: "#6883a1",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        {copied ? "Copied" : "Copy Styles"}
      </button>

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
