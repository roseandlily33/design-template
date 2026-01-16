const CC12 = ({
  colours,
  fonts,
  borderRadius,
  spacingBase,
  spacingUnit,
  primaryButtonProps,
}) => {
  const padding = spacingBase ? `${spacingBase * 1.2}${spacingUnit}` : "18px";
  const margin = spacingBase ? `${spacingBase * 1.2}${spacingUnit}` : "18px";
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: borderRadius || 12,
        fontFamily: fonts?.main || "inherit",
        boxShadow: "0 2px 12px #0002",
        margin,
        width: 340,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: `1.5px solid ${
          colours?.find((r) => r.label === "Grey")?.colors[3] || "#ccc"
        }`,
        position: "relative",
      }}
    >
      {/* New badge */}
      <span
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          background:
            colours?.find((r) => r.label === "Accent")?.colors[7] || "#ff9800",
          color: colours?.find((r) => r.label === "Grey")?.colors[0] || "#fff",
          fontWeight: 600,
          fontSize: "0.92rem",
          borderRadius: 8,
          padding: "4px 14px",
          letterSpacing: 0.5,
          boxShadow: "0 1px 4px #0001",
        }}
      >
        New
      </span>
      <div style={{ padding }}>
        <h3
          style={{
            color:
              colours?.find((r) => r.label === "Main")?.colors[7] || "#222",
            fontFamily: fonts?.head || "inherit",
            fontSize: "1.12rem",
            fontWeight: 700,
            margin: "8px 0 0 0",
          }}
        >
          Minimalist Coding
        </h3>
        <p
          style={{
            color:
              colours?.find((r) => r.label === "Grey")?.colors[7] || "#555",
            fontSize: "0.98rem",
            margin: "8px 0 10px 0",
          }}
        >
          Learn to code with a focus on simplicity and clarity.
        </p>
        <button
          style={{
            background:
              primaryButtonProps?.color ||
              colours?.find((r) => r.label === "Accent")?.colors[7] ||
              "#ff9800",
            color:
              primaryButtonProps?.textColor ||
              colours?.find((r) => r.label === "Grey")?.colors[0] ||
              "#fff",
            borderRadius:
              primaryButtonProps?.radius ||
              (borderRadius ? borderRadius / 2 : 8),
            fontFamily: fonts?.main || "inherit",
            fontWeight: primaryButtonProps?.fontWeight || 500,
            fontSize: primaryButtonProps?.fontSize || "1rem",
            letterSpacing: primaryButtonProps?.letterSpacing,
            boxShadow: primaryButtonProps?.boxShadow,
            padding: primaryButtonProps?.padding || "8px 18px",
            textTransform: primaryButtonProps?.textTransform,
            lineHeight: primaryButtonProps?.lineHeight,
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CC12;
