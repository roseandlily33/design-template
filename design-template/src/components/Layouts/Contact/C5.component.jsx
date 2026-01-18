import React from "react";

const C5 = ({ colours, fonts, borderRadius, spacingBase, spacingUnit }) => {
  // Palette
  const greyBg =
    colours?.find((r) => r.label === "Grey")?.colors[1] || "#f5f6fa";
  const greyLight =
    colours?.find((r) => r.label === "Grey")?.colors[2] || "#f0f1f4";
  const greyMid =
    colours?.find((r) => r.label === "Grey")?.colors[3] || "#e0e3e8";
  const greyDark =
    colours?.find((r) => r.label === "Grey")?.colors[7] || "#888";
  const accent =
    colours?.find((r) => r.label !== "Grey")?.colors[2] || "#bada55";
  const pad = spacingBase ? spacingBase * 2 + spacingUnit : "2.5rem";
  const rad = borderRadius || 16;
  return (
    <div
      style={{
        background: greyBg,
        padding: pad,
        minWidth: 900,
        maxWidth: 1200,
        minHeight: 520,
        fontFamily: fonts?.main || "inherit",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "flex-start",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Playful accent shape (diagonal) */}
      <div
        style={{
          position: "absolute",
          left: -80,
          top: -60,
          width: 300,
          height: 300,
          background: accent,
          opacity: 0.12,
          borderRadius: "40% 60% 60% 40%/60% 40% 60% 40%",
          transform: "rotate(-18deg)",
          zIndex: 0,
        }}
      />
      {/* Info bar (left) */}
      <div
        style={{
          flex: 0.7,
          background: accent,
          borderRadius: rad,
          minWidth: 180,
          maxWidth: 220,
          marginRight: 48,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 38,
          padding: "48px 0",
          zIndex: 1,
          boxShadow: "0 2px 16px #0001",
        }}
      >
        {/* Address */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: greyLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            <span style={{ fontSize: 22, color: greyDark }}>🏠</span>
          </div>
          <div style={{ fontWeight: 700, color: greyDark, fontSize: 16 }}>
            Address
          </div>
          <div
            style={{
              width: 110,
              height: 16,
              background: greyBg,
              borderRadius: 5,
              marginTop: 2,
            }}
          />
        </div>
        {/* Phone */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: greyLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            <span style={{ fontSize: 22, color: greyDark }}>📞</span>
          </div>
          <div style={{ fontWeight: 700, color: greyDark, fontSize: 16 }}>
            Phone
          </div>
          <div
            style={{
              width: 90,
              height: 16,
              background: greyBg,
              borderRadius: 5,
              marginTop: 2,
            }}
          />
        </div>
        {/* Email */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: greyLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            <span style={{ fontSize: 22, color: greyDark }}>✉️</span>
          </div>
          <div style={{ fontWeight: 700, color: greyDark, fontSize: 16 }}>
            Email
          </div>
          <div
            style={{
              width: 120,
              height: 16,
              background: greyBg,
              borderRadius: 5,
              marginTop: 2,
            }}
          />
        </div>
      </div>
      {/* Form area (right) */}
      <div
        style={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          zIndex: 1,
          minWidth: 340,
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 900,
            color: greyDark,
            marginBottom: 8,
          }}
        >
          Let's Connect
        </div>
        <div
          style={{
            fontSize: 16,
            color: greyDark,
            opacity: 0.7,
            marginBottom: 28,
            maxWidth: 420,
          }}
        >
          Reach out to us using the form below. We're here to answer your
          questions and help you get started.
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: 40,
              borderRadius: 8,
              background: greyLight,
            }}
          />{" "}
          {/* Name */}
          <div
            style={{
              width: "100%",
              height: 40,
              borderRadius: 8,
              background: greyLight,
            }}
          />{" "}
          {/* Email */}
          <div
            style={{
              width: "100%",
              height: 40,
              borderRadius: 8,
              background: greyLight,
            }}
          />{" "}
          {/* Subject */}
          <div
            style={{
              width: "100%",
              height: 80,
              borderRadius: 8,
              background: greyLight,
            }}
          />{" "}
          {/* Message */}
          <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
            <div
              style={{
                width: 130,
                height: 44,
                borderRadius: 22,
                background: accent,
              }}
            />{" "}
            {/* CTA */}
            <div
              style={{
                width: 100,
                height: 32,
                borderRadius: 16,
                background: greyMid,
              }}
            />{" "}
            {/* Secondary CTA */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default C5;
