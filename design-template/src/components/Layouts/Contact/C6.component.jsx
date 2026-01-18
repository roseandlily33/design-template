import React from "react";

const C6 = ({ colours, fonts, borderRadius, spacingBase, spacingUnit }) => {
  // Palette
  const greyBg =
    colours?.find((r) => r.label === "Grey")?.colors[1] || "#f5f6fa";
  const greyLight =
    colours?.find((r) => r.label === "Grey")?.colors[2] || "#f0f1f4";
  const greyMid =
    colours?.find((r) => r.label === "Grey")?.colors[3] || "#e0e3e8";
  const greyDark =
    colours?.find((r) => r.label === "Grey")?.colors[7] || "#888";
  const accent1 =
    colours?.find((r) => r.label !== "Grey")?.colors[1] || "#bada55";
  const accent2 =
    colours?.find((r) => r.label !== "Grey")?.colors[2] || "#aabbcc";
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
      {/* Small accent circle (accent1) */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 60,
          width: 60,
          height: 60,
          borderRadius: "50%",
          opacity: 0.18,
          background: accent1,
          zIndex: 0,
        }}
      />
      {/* Info column (left) */}
      <div
        style={{
          flex: 0.9,
          minWidth: 200,
          maxWidth: 240,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 32,
          zIndex: 1,
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
        {/* Social/contact icons row */}
        <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: accent2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 3px #0001",
            }}
          >
            <span style={{ fontSize: 15, color: greyDark }}>🌐</span>
          </div>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: accent2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 3px #0001",
            }}
          >
            <span style={{ fontSize: 15, color: greyDark }}>🐦</span>
          </div>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: accent2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 3px #0001",
            }}
          >
            <span style={{ fontSize: 15, color: greyDark }}>💼</span>
          </div>
        </div>
      </div>
      {/* Vertical accent line (accent1) */}
      <div
        style={{
          width: 5,
          borderRadius: 3,
          margin: "0 36px",
          minHeight: 340,
          alignSelf: "center",
          opacity: 0.32,
          background: accent1,
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
        {/* Get in Touch label */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: accent1,
            letterSpacing: 1,
            marginBottom: 2,
            textTransform: "uppercase",
          }}
        >
          Get in Touch
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 900,
            color: greyDark,
            marginBottom: 8,
          }}
        >
          Contact Us
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
          Fill out the form and our team will get back to you soon.
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
                background: accent1,
                opacity: 0.9,
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

export default C6;
