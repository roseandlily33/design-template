const CC6 = ({
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
      }}
    >
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
          Minimalist Design Course
        </h3>
        <p
          style={{
            color:
              colours?.find((r) => r.label === "Grey")?.colors[7] || "#555",
            fontSize: "0.98rem",
            margin: "8px 0 10px 0",
          }}
        >
          Master the art of simplicity in design.
        </p>
        <div
          style={{
            color:
              colours?.find((r) => r.label === "Accent")?.colors[7] ||
              "#ff9800",
            fontSize: "1.1rem",
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          $39.99
        </div>
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
          Buy Course
        </button>
      </div>
    </div>
  );
};

export default CC6;
