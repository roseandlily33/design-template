import Image from "next/image";
const PC4 = ({
  colours,
  fonts,
  borderRadius,
  heroImgUrl,
  spacingBase,
  spacingUnit,
  primaryButtonProps,
}) => {
  const padding = spacingBase ? `${spacingBase * 1.3}${spacingUnit}` : "22px";
  const margin = spacingBase ? `${spacingBase * 1.2}${spacingUnit}` : "18px";
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: borderRadius || 16,
        fontFamily: fonts?.main || "inherit",
        boxShadow: "0 2px 16px #0002",
        margin,
        width: 340,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", position: "relative" }}>
        <Image
          src={heroImgUrl}
          alt="Product"
          width={340}
          height={120}
          style={{
            width: "100%",
            height: 120,
            objectFit: "cover",
            borderTopLeftRadius: borderRadius || 16,
            borderTopRightRadius: borderRadius || 16,
            display: "block",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background:
              colours?.find((r) => r.label === "Accent")?.colors[7] ||
              "#ff9800",
            color:
              colours?.find((r) => r.label === "Grey")?.colors[0] || "#fff",
            fontSize: "0.92rem",
            fontWeight: 600,
            borderRadius: 8,
            padding: "3px 12px",
            letterSpacing: 0.5,
            boxShadow: "0 1px 4px #0001",
          }}
        >
          Featured
        </span>
      </div>
      <div
        style={{
          padding,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            color:
              colours?.find((r) => r.label === "Main")?.colors[7] || "#222",
            fontFamily: fonts?.head || "inherit",
            fontSize: "1.15rem",
            fontWeight: 700,
            margin: "10px 0 0 0",
            textAlign: "center",
          }}
        >
          PC4 Product
        </h3>
        <p
          style={{
            color:
              colours?.find((r) => r.label === "Grey")?.colors[7] || "#555",
            fontSize: "1rem",
            margin: "10px 0 18px 0",
            textAlign: "center",
          }}
        >
          Centered card with dashed border and a featured badge.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            marginTop: 6,
            width: "100%",
          }}
        >
          <span
            style={{
              color:
                colours?.find((r) => r.label === "Accent")?.colors[6] ||
                "#e67e22",
              fontWeight: 600,
              fontSize: "1.13rem",
              marginRight: 10,
            }}
          >
            $99.99
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
              padding: primaryButtonProps?.padding || "9px 22px",
              textTransform: primaryButtonProps?.textTransform,
              lineHeight: primaryButtonProps?.lineHeight,
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PC4;
