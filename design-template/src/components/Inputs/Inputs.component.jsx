import React from "react";

const Inputs = ({ font, colors, borderRadius }) => {
  // Palette
  const colorRows = Array.isArray(colors) ? colors : colors?.rows || [];
  const grey = colorRows.find((r) => r.label === "Grey")?.colors || [
    "#eee",
    "#ccc",
    "#888",
    "#222",
  ];
  const accent =
    colorRows.find((r) => r.label !== "Grey")?.colors?.[2] || "#6883a1";
  const mainFont = font || "inherit";

  // Input style
  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    fontSize: 16,
    borderRadius: borderRadius,
    border: `1.5px solid ${accent}`,
    outline: "none",
    marginBottom: 0,
    background: "#f7f8fa",
    color: grey[4],
    fontFamily: mainFont,
    boxSizing: "border-box",
    transition: "border 0.2s",
  };
  const inputActiveStyle = {
    ...inputStyle,
    border: `2.5px solid ${accent}`,
    background: "#fff",
    color: grey[3],
  };
  const textareaStyle = {
    ...inputStyle,
    minHeight: 60,
    resize: "vertical",
  };
  const textareaActiveStyle = {
    ...textareaStyle,
    border: `2.5px solid ${accent}`,
    background: "#fff",
    color: grey[3],
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 36,
        fontFamily: mainFont,
      }}
    >
      <h3>Inputs</h3>
      {/* Email input row */}
      <div style={{ display: "flex", gap: 32, alignItems: "flex-end" }}>
        {/* Email label above, empty input */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: grey[5],
              fontSize: 15,
              fontWeight: 500,
              marginBottom: 6,
            }}
          >
            Email
          </div>
          <input
            type="email"
            style={inputStyle}
            placeholder=""
            disabled={false}
          />
        </div>
        {/* Email label above, active input with example */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: grey[5],
              fontSize: 15,
              fontWeight: 500,
              marginBottom: 6,
            }}
          >
            Email
          </div>
          <input
            type="email"
            style={inputActiveStyle}
            value="jane.doe@email.com"
            readOnly
          />
        </div>
      </div>

      {/* Checkbox Yes/No */}
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        <div
          style={{
            color: grey[5],
            fontSize: 15,
            fontWeight: 500,
            marginBottom: 6,
          }}
        >
          Checkmark Example
        </div>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 15,
            fontFamily: mainFont,
          }}
        >
          <input
            type="checkbox"
            checked={true}
            readOnly
            style={{
              accentColor: accent,
              width: 18,
              height: 18,
              borderRadius: borderRadius,
              marginRight: 4,
            }}
          />
          <span style={{ color: accent, fontWeight: 600 }}>Yes</span>
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 15,
            fontFamily: mainFont,
          }}
        >
          <input
            type="checkbox"
            checked={false}
            readOnly
            style={{
              accentColor: grey[5],
              width: 18,
              height: 18,
              borderRadius: borderRadius,
              marginRight: 4,
            }}
          />
          <span style={{ color: grey[5] }}>No</span>
        </label>
      </div>

      {/* Textarea row */}
      <div style={{ display: "flex", gap: 32, alignItems: "flex-end" }}>
        {/* Textarea label above, empty */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: grey[5],
              fontSize: 15,
              fontWeight: 500,
              marginBottom: 6,
            }}
          >
            Message
          </div>
          <textarea style={textareaStyle} placeholder="" disabled={false} />
        </div>
        {/* Textarea label above, active with example */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: grey[5],
              fontSize: 15,
              fontWeight: 500,
              marginBottom: 6,
            }}
          >
            Message
          </div>
          <textarea
            style={textareaActiveStyle}
            value="This is an example message."
            readOnly
          />
        </div>
      </div>
    </div>
  );
};
export default Inputs;
