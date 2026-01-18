import React from "react";

const L3 = ({ colours, fonts, borderRadius, spacingBase, spacingUnit }) => {
  // Tabbed login/signup card
  const grey = colours?.find((r) => r.label === "Grey")?.colors || [
    "#fff",
    "#eee",
    "#ccc",
    "#888",
  ];
  const accent =
    colours?.find((r) => r.label !== "Grey")?.colors[4] || "#e67e22";
  const rad = borderRadius || 12;
  const pad = spacingBase ? spacingBase * 1.5 + spacingUnit : "1.5rem";
  return (
    <div
      style={{
        background: grey[0],
        borderRadius: rad,
        boxShadow: "0 2px 12px #0002",
        width: 370,
        padding: pad,
        fontFamily: fonts?.main || "inherit",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", width: "100%", marginBottom: 10 }}>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontWeight: 700,
            color: accent,
            borderBottom: `2px solid ${accent}`,
            padding: 8,
          }}
        >
          Login
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontWeight: 700,
            color: grey[2],
            borderBottom: `2px solid ${grey[1]}`,
            padding: 8,
          }}
        >
          Sign Up
        </div>
      </div>
      {/* Login form (active) */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginTop: 6,
        }}
      >
        <label style={{ color: grey[3], fontSize: 14 }}>Email</label>
        <div style={{ height: 36, borderRadius: 7, background: grey[1] }} />
        <label style={{ color: grey[3], fontSize: 14, marginTop: 8 }}>
          Password
        </label>
        <div
          style={{
            height: 36,
            borderRadius: 7,
            background: grey[1],
            marginBottom: 2,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 8,
          }}
        >
          <input type="checkbox" style={{ accentColor: accent }} />
          <span style={{ color: grey[2], fontSize: 13 }}>Show password</span>
        </div>
        <button
          style={{
            background: accent,
            color: "#fff",
            borderRadius: 7,
            height: 38,
            fontWeight: 600,
            border: "none",
            marginTop: 6,
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
      <div style={{ fontSize: 13, color: grey[2], marginTop: 8 }}>
        Don&apos;t have an account?{" "}
        <span style={{ color: accent, fontWeight: 600, cursor: "pointer" }}>
          Sign up
        </span>
      </div>
    </div>
  );
};

export default L3;
