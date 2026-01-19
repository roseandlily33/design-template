import React from "react";

const DB1 = ({ colours, fonts, borderRadius, spacingBase, spacingUnit }) => {
  // Palette and sizing logic (reuse from C3)
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
        alignItems: "stretch",
        justifyContent: "flex-start",
        position: "relative",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          width: "100%",
          height: 56,
          background: accent,
          borderRadius: `${rad}px ${rad}px 0 0`,
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          color: "#fff",
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: 0.5,
        }}
      >
        <span>Dashboard Navbar</span>
      </div>
      {/* Main content: sidebar + cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 32,
          alignItems: "flex-start",
          width: "100%",
          minHeight: 400,
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            minWidth: 160,
            background: greyLight,
            borderRadius: `${rad}px`,
            padding: "32px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            fontWeight: 600,
            color: greyDark,
          }}
        >
          <div>Overview</div>
          <div>Profile</div>
          <div>Settings</div>
          <div>Logout</div>
        </div>
        {/* Cards area (single column) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              background: "#fff",
              borderRadius: `${rad}px`,
              boxShadow: "0 2px 8px #0001",
              padding: "28px 32px",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 20,
                color: greyDark,
                marginBottom: 8,
              }}
            >
              Welcome, User!
            </div>
            <div style={{ color: greyDark, fontSize: 15 }}>
              Here's a summary of your account activity.
            </div>
          </div>
          {/* Card 2 */}
          <div
            style={{
              background: "#fff",
              borderRadius: `${rad}px`,
              boxShadow: "0 2px 8px #0001",
              padding: "24px 32px",
              display: "flex",
              flexDirection: "row",
              gap: 32,
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 16, color: greyDark }}>
                Recent Activity
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  color: greyDark,
                  fontSize: 14,
                }}
              >
                <li>Logged in 2 hours ago</li>
                <li>Updated profile yesterday</li>
                <li>Completed onboarding</li>
              </ul>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 16, color: greyDark }}>
                Quick Stats
              </div>
              <div style={{ display: "flex", gap: 18, marginTop: 8 }}>
                <div
                  style={{
                    background: greyLight,
                    borderRadius: 8,
                    padding: "12px 18px",
                    minWidth: 70,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 18 }}>12</div>
                  <div style={{ fontSize: 13, color: greyDark }}>Projects</div>
                </div>
                <div
                  style={{
                    background: greyLight,
                    borderRadius: 8,
                    padding: "12px 18px",
                    minWidth: 70,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 18 }}>4</div>
                  <div style={{ fontSize: 13, color: greyDark }}>Teams</div>
                </div>
                <div
                  style={{
                    background: greyLight,
                    borderRadius: 8,
                    padding: "12px 18px",
                    minWidth: 70,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 18 }}>98</div>
                  <div style={{ fontSize: 13, color: greyDark }}>Tasks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DB1;
