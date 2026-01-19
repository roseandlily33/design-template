import Image from "next/image";
const PC6 = ({
  colours,
  fonts,
  borderRadius,
  heroImgUrl,
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
        borderRadius: borderRadius || 18,
        fontFamily: fonts?.main || "inherit",
        boxShadow: "0 2px 16px #0002",
        margin,
        width: 320,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: `1.5px solid ${colours?.find((r) => r.label === "Grey")?.colors[3] || "#ddd"}`,
      }}
    >
      <div style={{ position: "relative", width: "100%" }}>
        <Image
          src={heroImgUrl}
          alt="Fashion Product"
          width={320}
          height={160}
          style={{
            width: "100%",
            height: 160,
            objectFit: "cover",
            borderTopLeftRadius: borderRadius || 18,
            borderTopRightRadius: borderRadius || 18,
            display: "block",
          }}
        />
        {/* Tag badge */}
        <span
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            background:
              colours?.find((r) => r.label === "Accent")?.colors[6] ||
              "#e67e22",
            color:
              colours?.find((r) => r.label === "Grey")?.colors[0] || "#fff",
            fontWeight: 600,
            fontSize: "0.92rem",
            borderRadius: 6,
            padding: "4px 14px",
            letterSpacing: 0.5,
            boxShadow: "0 1px 4px #0001",
          }}
        >
          New Arrival
        </span>
      </div>
      <div
        style={{
          padding,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h3
          style={{
            color:
              colours?.find((r) => r.label === "Main")?.colors[7] || "#222",
            fontFamily: fonts?.head || "inherit",
            fontSize: "1.13rem",
            fontWeight: 700,
            margin: "8px 0 0 0",
          }}
        >
          Fashion Item
        </h3>
        <p
          style={{
            color:
              colours?.find((r) => r.label === "Grey")?.colors[7] || "#555",
            fontSize: "0.98rem",
            margin: "8px 0 16px 0",
          }}
        >
          Modern, elegant, and perfect for your next look.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            gap: 10,
          }}
        >
          <span
            style={{
              color:
                colours?.find((r) => r.label === "Accent")?.colors[7] ||
                "#ff9800",
              fontWeight: 600,
              fontSize: "1.1rem",
            }}
          >
            $79.00
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
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PC6;
