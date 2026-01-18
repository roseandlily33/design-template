import React from "react";

const C4 = ({ colours, fonts, borderRadius, spacingBase, spacingUnit }) => {
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
    colours?.find((r) => r.label !== "Grey")?.colors[3] || "#bada55";
  const pad = spacingBase ? spacingBase * 2 + spacingUnit : "2.5rem";
  const rad = borderRadius || 16;
  return (
    <div
      style={{
        background: greyBg,
        padding: pad,
        minWidth: 760,
        maxWidth: 1100,
        minHeight: 520,
        fontFamily: fonts?.main || "inherit",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Large accent circle in background */}
      <div
        style={{
          position: "absolute",
          right: -120,
          top: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: accent,
          opacity: 0.13,
          zIndex: 0,
        }}
      />
      {/* Left: Heading, subheading, and form */}
      <div
        style={{
          flex: 1.3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          zIndex: 1,
          minWidth: 340,
          paddingRight: 32,
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: greyDark,
            marginBottom: 6,
          }}
        >
          Contact Us
        </div>
        <div
          style={{
            fontSize: 17,
            color: greyDark,
            opacity: 0.7,
            marginBottom: 28,
            maxWidth: 340,
          }}
        >
          We'd love to hear from you. Fill out the form and our team will get
          back to you soon.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
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
      {/* Right: Info panel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 32,
          minWidth: 220,
          background: "#fff",
          borderRadius: rad,
          boxShadow: "0 4px 24px #0001",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 40,
          zIndex: 1,
          marginLeft: 16,
        }}
      >
        {/* Address */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: greyMid,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 20, color: greyDark }}>🏢</span>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: greyDark, fontSize: 18 }}>
              Address
            </div>
            <div
              style={{
                width: 180,
                height: 18,
                background: greyLight,
                borderRadius: 6,
                marginTop: 4,
              }}
            />
            {/* Address marker */}
          </div>
        </div>
        {/* Phone */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: greyMid,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 20, color: greyDark }}>📱</span>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: greyDark, fontSize: 18 }}>
              Phone
            </div>
            <div
              style={{
                width: 120,
                height: 18,
                background: greyLight,
                borderRadius: 6,
                marginTop: 4,
              }}
            />
            {/* Phone marker */}
          </div>
        </div>
        {/* Email */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: greyMid,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 20, color: greyDark }}>✉️</span>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: greyDark, fontSize: 18 }}>
              Email
            </div>
            <div
              style={{
                width: 160,
                height: 18,
                background: greyLight,
                borderRadius: 6,
                marginTop: 4,
              }}
            />
            {/* Email marker */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default C4;
{
  /* Large accent circle in background */
}
