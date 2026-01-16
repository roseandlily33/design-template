const PC3 = ({
  colours,
  fonts,
  borderRadius,
  heroImgUrl,
  spacingBase,
  spacingUnit,
  primaryButtonProps,
}) => {
  const padding = spacingBase ? `${spacingBase * 1.2}${spacingUnit}` : "16px";
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
        
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 0 0 0",
        }}
      >
        <img
          src={heroImgUrl}
          alt="Product"
          style={{
            width: 60,
            height: 60,
            objectFit: "cover",
            borderRadius: borderRadius || 12,
            marginLeft: 16,
          }}
        />
        <div>
          <h3
            style={{
              color:
                colours?.find((r) => r.label === "Main")?.colors[7] || "#222",
              fontFamily: fonts?.head || "inherit",
              fontSize: "1.1rem",
              fontWeight: 700,
              margin: 0,
            }}
          >
            PC3 Product
          </h3>
          <span
            style={{
              color:
                colours?.find((r) => r.label === "Grey")?.colors[7] || "#888",
              fontSize: "0.95rem",
            }}
          >
            Small badge or category
          </span>
        </div>
      </div>
      <div style={{ padding }}>
        <p
          style={{
            color:
              colours?.find((r) => r.label === "Grey")?.colors[6] || "#555",
            fontSize: "1rem",
            margin: "8px 0 10px 0",
          }}
        >
          Compact card with image, badge, and border accent.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <span
            style={{
              color:
                colours?.find((r) => r.label === "Accent")?.colors[7] ||
                "#e67e22",
              fontWeight: 600,
              fontSize: "1.1rem",
            }}
          >
            $39.99
          </span>
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
                (borderRadius ? borderRadius / 2 : 6),
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
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default PC3;
