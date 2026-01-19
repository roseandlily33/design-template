import React from "react";

const DB4 = ({ colours, fonts, borderRadius, spacingBase, spacingUnit }) => {
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
      {/* Main content: sidebar + chart card + stacked cards */}
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
          <div>Dashboard</div>
          <div>Reports</div>
          <div>Billing</div>
          <div>Logout</div>
        </div>
        {/* Cards area (2-column grid: chart + stacked) */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 24,
          }}
        >
          {/* Large Chart Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: `${rad}px`,
              boxShadow: "0 2px 8px #0001",
              padding: "32px 36px",
              minHeight: 260,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 20,
                color: greyDark,
                marginBottom: 12,
              }}
            >
              Performance Chart
            </div>
            <div
              style={{
                width: "100%",
                height: 120,
                background: greyMid,
                borderRadius: 12,
                marginBottom: 8,
              }}
            />
            <div style={{ color: greyDark, fontSize: 15 }}>
              This is a placeholder for a chart or graph.
            </div>
          </div>
          {/* Stacked Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Card 1 */}
            <div
              style={{
                background: "#fff",
                borderRadius: `${rad}px`,
                boxShadow: "0 2px 8px #0001",
                padding: "20px 24px",
                minHeight: 80,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  color: greyDark,
                  marginBottom: 6,
                }}
              >
                Recent Files
              </div>
              <div style={{ color: accent, fontSize: 15 }}>
                Proposal.pdf, Invoice.docx
              </div>
            </div>
            {/* Card 2 */}
            <div
              style={{
                background: "#fff",
                borderRadius: `${rad}px`,
                boxShadow: "0 2px 8px #0001",
                padding: "20px 24px",
                minHeight: 80,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  color: greyDark,
                  marginBottom: 6,
                }}
              >
                Support Tickets
              </div>
              <div style={{ color: greyDark, fontSize: 15 }}>
                3 open, 12 closed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DB4;
