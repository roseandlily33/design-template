import Image from "next/image";

const CC2 = ({
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
        borderRadius: borderRadius ? borderRadius * 1.5 : 32,
        fontFamily: fonts?.main || "inherit",
        boxShadow: "0 4px 24px #0001",
        margin,
        width: 340,
        overflow: "visible",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: `3px solid ${
          colours?.find((r) => r.label === "Accent")?.colors[5] || "#ffb347"
        }`,
      }}
    >
      {/* Expiring badge */}
      <span
        style={{
          position: "absolute",
          top: -18,
          right: 18,
          background:
            colours?.find((r) => r.label === "Accent")?.colors[7] || "#ff9800",
          color: colours?.find((r) => r.label === "Grey")?.colors[0] || "#fff",
          fontWeight: 700,
          fontSize: "0.95rem",
          borderRadius: 20,
          padding: "6px 18px",
          boxShadow: "0 2px 8px #0002",
          zIndex: 2,
        }}
      >
        <Image
          src={heroImgUrl}
          alt="Course Hero"
          width={120}
          height={120}
          priority
          style={{
            objectFit: "cover",
            borderRadius: "50%",
            marginTop: 32,
            boxShadow: `0 2px 12px ${
              colours?.find((r) => r.label === "Accent")?.colors[2] || "#ffe5b4"
            }`,
          }}
        />
      </span>
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
            fontSize: "1.18rem",
            fontWeight: 700,
            margin: "18px 0 0 0",
            textAlign: "center",
          }}
        >
          Fun with Chemistry
        </h3>
        <p
          style={{
            color:
              colours?.find((r) => r.label === "Grey")?.colors[7] || "#555",
            fontSize: "1rem",
            margin: "10px 0 10px 0",
            textAlign: "center",
          }}
        >
          Explore the wonders of science with hands-on experiments.
        </p>
        <div
          style={{
            color:
              colours?.find((r) => r.label === "Accent")?.colors[6] ||
              "#e67e22",
            fontSize: "0.95rem",
            marginBottom: 12,
          }}
        >
          Expires: Jan 20, 2026
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
              primaryButtonProps?.radius || (borderRadius ? borderRadius : 20),
            fontFamily: fonts?.main || "inherit",
            fontWeight: primaryButtonProps?.fontWeight || 600,
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
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CC2;
