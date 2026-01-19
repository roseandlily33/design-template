import React from "react";
import Image from "next/image";

const C1 = ({
  colours,
  fonts,
  borderRadius,
  spacingBase,
  spacingUnit,
  heroImgUrl,
}) => {
  // Greys from palette, fallback to #eee/#ccc/#888
  const greyBg =
    colours?.find((r) => r.label === "Grey")?.colors[1] || "#f5f6fa";
  const greyLight =
    colours?.find((r) => r.label === "Grey")?.colors[2] || "#f0f1f4";
  const greyMid =
    colours?.find((r) => r.label === "Grey")?.colors[3] || "#e0e3e8";
  const greyMid2 =
    colours?.find((r) => r.label === "Grey")?.colors[5] || "#cfd4db";
  const greyDark =
    colours?.find((r) => r.label === "Grey")?.colors[7] || "#888";
  const pad = spacingBase ? spacingBase * 1.5 + spacingUnit : "1.5rem";
  const rad = borderRadius || 14;
  return (
    <div
      style={{
        background: `linear-gradient(120deg, ${greyBg} 70%, ${greyLight} 100%)`,
        borderRadius: rad,
        padding: pad,
        minWidth: 640,
        maxWidth: 900,
        minHeight: 420,
        fontFamily: fonts?.main || "inherit",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        boxShadow: "0 2px 12px #0001",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
      }}
    >
      {/* Header with hero image on left, title and slogan on right */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 18,
          gap: 20,
        }}
      >
        <div
          style={{
            flex: "0 0 120px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {heroImgUrl ? (
            <Image
              src={heroImgUrl}
              alt="hero"
              style={{
                width: 110,
                height: 110,
                borderRadius: rad,
                objectFit: "cover",
                marginBottom: 4,
                boxShadow: "0 2px 6px #0002",
              }}
            />
          ) : (
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: rad,
                background: greyMid,
                marginBottom: 4,
              }}
            />
          )}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: greyDark,
              fontWeight: 800,
              fontSize: 26,
              marginBottom: 2,
              letterSpacing: 0.2,
            }}
          >
            Contact Us
          </div>
          <div
            style={{
              width: 60,
              height: 3,
              background: greyMid2,
              borderRadius: 2,
              margin: "6px 0 8px 0",
            }}
          />
          <div
            style={{
              color: greyDark,
              fontWeight: 400,
              fontSize: 15,
              opacity: 0.8,
              letterSpacing: 0.1,
              marginBottom: 2,
            }}
          >
            We&apos;d love to hear from you!
          </div>
        </div>
      </div>
      {/* Main content: form and contact info side by side */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: 18,
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        {/* Contact form */}
        <div
          style={{
            flex: 1.2,
            background: greyLight,
            borderRadius: rad,
            padding: 18,
            boxShadow: "0 1px 3px #0001",
            minWidth: 180,
          }}
        >
          <div
            style={{
              color: greyDark,
              fontWeight: 600,
              fontSize: 15,
              marginBottom: 10,
            }}
          >
            Send us a message
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                width: "100%",
                height: 32,
                borderRadius: 7,
                background: greyMid2,
              }}
            />{" "}
            {/* Name */}
            <div
              style={{
                width: "100%",
                height: 32,
                borderRadius: 7,
                background: greyMid2,
              }}
            />{" "}
            {/* Email */}
            <div
              style={{
                width: "100%",
                height: 32,
                borderRadius: 7,
                background: greyMid2,
              }}
            />{" "}
            {/* Phone */}
            <div
              style={{
                width: "100%",
                height: 60,
                borderRadius: 7,
                background: greyMid2,
              }}
            />{" "}
            {/* Message */}
            <div
              style={{
                width: 110,
                height: 36,
                borderRadius: 18,
                background: greyDark,
                alignSelf: "flex-end",
              }}
            />{" "}
            {/* CTA */}
          </div>
        </div>
        {/* Contact info */}
        <div
          style={{
            flex: 1,
            background: greyBg,
            borderRadius: rad,
            padding: 18,
            boxShadow: "0 1px 3px #0001",
            minWidth: 120,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              color: greyDark,
              fontWeight: 600,
              fontSize: 14,
              marginBottom: 4,
            }}
          >
            Contact Info
          </div>
          <div
            style={{
              width: "90%",
              height: 16,
              borderRadius: 6,
              background: greyMid,
              marginBottom: 4,
            }}
          />{" "}
          {/* Address */}
          <div
            style={{
              width: "70%",
              height: 16,
              borderRadius: 6,
              background: greyMid,
              marginBottom: 4,
            }}
          />{" "}
          {/* Phone */}
          <div
            style={{
              width: "70%",
              height: 16,
              borderRadius: 6,
              background: greyMid,
              marginBottom: 4,
            }}
          />{" "}
          {/* Email */}
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: greyMid2,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default C1;
