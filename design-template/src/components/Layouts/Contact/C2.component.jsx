import React from "react";

const C2 = ({ colours, fonts, borderRadius, spacingBase, spacingUnit }) => {
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
        minWidth: 800,
        maxWidth: 1100,
        minHeight: 520,
        fontFamily: fonts?.main || "inherit",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Playful accent shape */}
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 60,
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: accent,
          opacity: 0.13,
          zIndex: 0,
        }}
      />
      {/* Heading, subheading, accent line */}
      <div style={{ width: "100%", marginBottom: 18, zIndex: 1 }}>
        <div
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: greyDark,
            marginBottom: 2,
          }}
        >
          Contact Us
        </div>
        <div
          style={{
            fontSize: 16,
            color: greyDark,
            opacity: 0.7,
            marginBottom: 8,
          }}
        >
          We'd love to hear from you. Fill out the form and our team will get
          back to you soon.
        </div>
        <div
          style={{
            width: 70,
            height: 4,
            background: accent,
            borderRadius: 2,
            marginBottom: 8,
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
          zIndex: 1,
        }}
      >
        {/* Info column (left) */}
        <div
          style={{
            flex: 1,
            minWidth: 200,
            maxWidth: 240,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 24,
            }}
          >
            {/* Address */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: greyLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 18, color: greyDark }}>🏠</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: greyDark, fontSize: 16 }}>
                  Address
                </div>
                <div
                  style={{
                    width: 110,
                    height: 16,
                    background: greyMid,
                    borderRadius: 5,
                    marginTop: 2,
                  }}
                />
              </div>
            </div>
            {/* Phone */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: greyLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 18, color: greyDark }}>📞</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: greyDark, fontSize: 16 }}>
                  Phone
                </div>
                <div
                  style={{
                    width: 90,
                    height: 16,
                    background: greyMid,
                    borderRadius: 5,
                    marginTop: 2,
                  }}
                />
              </div>
            </div>
            {/* Email */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: greyLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 18, color: greyDark }}>✉️</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: greyDark, fontSize: 16 }}>
                  Email
                </div>
                <div
                  style={{
                    width: 120,
                    height: 16,
                    background: greyMid,
                    borderRadius: 5,
                    marginTop: 2,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Vertical accent line */}
        <div
          style={{
            width: 5,
            background: accent,
            borderRadius: 3,
            margin: "0 36px",
            minHeight: 340,
            alignSelf: "center",
            opacity: 0.18,
          }}
        />
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
              fontWeight: 800,
              color: greyDark,
              fontSize: 22,
              marginBottom: 8,
            }}
          >
            Send us a message
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
    </div>
  );
};

export default C2;
