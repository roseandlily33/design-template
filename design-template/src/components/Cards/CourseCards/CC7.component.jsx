import Image from "next/image";

const CC7 = ({
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
  const rating = 4.5;

  const accentPalette = colours?.find((r) => r.label === "Accent");
  const greyPalette = colours?.find((r) => r.label === "Grey");
  const mainPalette = colours?.find((r) => r.label === "Main");

  const accentColor = accentPalette?.colors?.[7] || "#ff9800";
  const accentBorderColor = accentPalette?.colors?.[4] || "#ffd700";
  const grey0 = greyPalette?.colors?.[0] || "#fff";
  const grey3 = greyPalette?.colors?.[3] || "#ccc";
  const grey6 = greyPalette?.colors?.[6] || "#888";
  const main7 = mainPalette?.colors?.[7] || "#222";

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: borderRadius || 18,
        fontFamily: fonts?.main || "inherit",
        boxShadow: "0 2px 16px #0002",
        margin,
        width: 340,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        border: "2px solid " + accentBorderColor,
      }}
    >
      {/* Top Rated badge */}
      <span
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          background: accentColor,
          color: grey0,
          fontWeight: 700,
          fontSize: "0.92rem",
          borderRadius: 8,
          padding: "4px 14px",
          letterSpacing: 0.5,
          boxShadow: "0 1px 4px #0001",
        }}
      >
        Top Rated
      </span>
      <div
        style={{
          overflow: "hidden",
          borderTopLeftRadius: borderRadius || 18,
          borderTopRightRadius: borderRadius || 18,
        }}
      >
        <Image
          src={heroImgUrl}
          alt="Course Hero"
          width={340}
          height={120}
          style={{
            width: "100%",
            height: 120,
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      <div style={{ padding }}>
        <h3
          style={{
            color: main7,
            fontFamily: fonts?.head || "inherit",
            fontSize: "1.15rem",
            fontWeight: 700,
            margin: "10px 0 0 0",
          }}
        >
          Creative Writing Masterclass
        </h3>
        <p
          style={{
            color: greyPalette?.colors?.[7] || "#555",
            fontSize: "1rem",
            margin: "10px 0 10px 0",
          }}
        >
          Unlock your creativity with expert guidance and exercises.
        </p>
        {/* Rating stars */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "8px 0 12px 0",
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              style={{
                color: i < Math.floor(rating) ? accentColor : grey3,
                fontSize: 18,
                marginRight: 2,
              }}
            >
              ★
            </span>
          ))}
          <span style={{ color: grey6, fontSize: "0.95rem", marginLeft: 6 }}>
            {rating}
          </span>
        </div>
        <button
          style={{
            background: primaryButtonProps?.color || accentColor,
            color: primaryButtonProps?.textColor || grey0,
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

export default CC7;
