import React from "react";

const C3 = ({ colours, fonts, borderRadius, spacingBase, spacingUnit }) => {
  // Greys from palette, fallback to #eee/#ccc/#888
  const greyBg =
    colours?.find((r) => r.label === "Grey")?.colors[1] || "#f5f6fa";
  const greyLight =
    colours?.find((r) => r.label === "Grey")?.colors[2] || "#f0f1f4";
  const greyMid =
    colours?.find((r) => r.label === "Grey")?.colors[3] || "#e0e3e8";
  const greyDark =
    colours?.find((r) => r.label === "Grey")?.colors[7] || "#888";
  const accent =
    colours?.find((r) => r.label !== "Grey")?.colors[4] || "#bada55";
  const pad = spacingBase ? spacingBase * 2 + spacingUnit : "2.5rem";
  const rad = borderRadius || 16;
  return (
    <div
      style={{
        background: greyBg,
        padding: pad,
        minWidth: 700,
        maxWidth: 980,
        minHeight: 500,
        fontFamily: fonts?.main || "inherit",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
      }}
    >
      {/* Heading and line */}
      <div style={{ width: "100%", textAlign: "left", marginBottom: 8 }}>
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: greyDark,
            letterSpacing: 0.5,
            marginBottom: 2,
          }}
        >
          Contact Us
        </div>
        <div
          style={{
            width: 80,
            height: 4,
            background: accent,
            borderRadius: 2,
            marginBottom: 24,
          }}
        />
      </div>
      {/* Main content: info left, form right */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: 48,
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {/* Info section (left) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 28,
            minWidth: 220,
          }}
        >
          {/* Address */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: greyMid,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Icon placeholder */}
              <span style={{ fontSize: 18, color: greyDark }}>🏠</span>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: greyDark, fontSize: 17 }}>
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
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: greyMid,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 18, color: greyDark }}>📞</span>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: greyDark, fontSize: 17 }}>
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
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: greyMid,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 18, color: greyDark }}>✉️</span>
            </div>
            <div>
              <div style={{ fontWeight: 600, color: greyDark, fontSize: 17 }}>
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
        {/* Contact form (right) */}
        <div
          style={{
            flex: 1.2,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            minWidth: 320,
            background: "none",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: greyDark,
              fontSize: 20,
              marginBottom: 8,
            }}
          >
            Send us a message
          </div>
          <div
            style={{
              width: "100%",
              height: 38,
              borderRadius: 8,
              background: greyLight,
            }}
          />{" "}
          {/* Name */}
          <div
            style={{
              width: "100%",
              height: 38,
              borderRadius: 8,
              background: greyLight,
            }}
          />{" "}
          {/* Email */}
          <div
            style={{
              width: "100%",
              height: 38,
              borderRadius: 8,
              background: greyLight,
            }}
          />{" "}
          {/* Subject */}
          <div
            style={{
              width: "100%",
              height: 70,
              borderRadius: 8,
              background: greyLight,
            }}
          />{" "}
          {/* Message */}
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <div
              style={{
                width: 120,
                height: 40,
                borderRadius: 20,
                background: accent,
              }}
            />{" "}
            {/* CTA */}
            <div
              style={{
                width: 90,
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

export default C3;
