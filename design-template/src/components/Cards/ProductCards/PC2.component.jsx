import Image from "next/image";
const PC2 = ({
  colours,
  fonts,
  borderRadius,
  heroImgUrl,
  spacingBase,
  spacingUnit,
  primaryButtonProps,
}) => {
  const padding = spacingBase ? `${spacingBase * 1.5}${spacingUnit}` : "24px";
  const margin = spacingBase ? `${spacingBase * 1.2}${spacingUnit}` : "18px";
  const cardHeight = 220;
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: borderRadius || 12,
        fontFamily: fonts?.main || "inherit",
        boxShadow: "0 2px 12px #0002",
        margin,
        width: 440,
        minHeight: cardHeight,
        height: cardHeight,
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
      }}
    >
      <div
        style={{ height: "100%", width: 180, flexShrink: 0, display: "flex" }}
      >
        <Image
          src={heroImgUrl}
          alt="Product"
          width={180}
          height={180}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
            display: "block",
          }}
        />
      </div>
      <div
        style={{
          padding,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div>
          <h3
            style={{
              color:
                colours?.find((r) => r.label === "Main")?.colors[6] || "#111",
              fontFamily: fonts?.head || "inherit",
              fontSize: "1.2rem",
              fontWeight: 700,
              margin: "0 0 6px 0",
            }}
          >
            PC2 Product Name
          </h3>
          <p
            style={{
              color:
                colours?.find((r) => r.label === "Grey")?.colors[7] || "#666",
              fontSize: "1rem",
              margin: "0 0 18px 0",
            }}
          >
            Horizontal card with image left, info right, and a strong call to
            action.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginTop: 8,
          }}
        >
          <span
            style={{
              color:
                colours?.find((r) => r.label === "Accent")?.colors[6] ||
                "#e67e22",
              fontWeight: 600,
              fontSize: "1.2rem",
              marginRight: 12,
            }}
          >
            $89.99
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
              padding: primaryButtonProps?.padding || "10px 26px",
              textTransform: primaryButtonProps?.textTransform,
              lineHeight: primaryButtonProps?.lineHeight,
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PC2;
