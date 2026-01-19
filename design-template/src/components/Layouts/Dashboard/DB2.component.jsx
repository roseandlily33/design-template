import React from "react";

const DB2 = ({ colours, fonts, borderRadius, spacingBase, spacingUnit }) => {
    // Palette and sizing logic (reuse from C3)
    const greyBg = colours?.find((r) => r.label === "Grey")?.colors[1] || "#f5f6fa";
    const greyLight = colours?.find((r) => r.label === "Grey")?.colors[2] || "#f0f1f4";
    const greyDark = colours?.find((r) => r.label === "Grey")?.colors[7] || "#888";
    const accent = colours?.find((r) => r.label !== "Grey")?.colors[4] || "#bada55";
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
            <div style={{
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
            }}>
                <span>Dashboard Navbar</span>
            </div>
            {/* Main content: sidebar + double-column cards */}
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: 32,
                alignItems: "flex-start",
                width: "100%",
                minHeight: 400,
            }}>
                {/* Sidebar */}
                <div style={{
                    minWidth: 160,
                    background: greyLight,
                    borderRadius: `${rad}px`,
                    padding: "32px 18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 18,
                    fontWeight: 600,
                    color: greyDark,
                }}>
                    <div>Dashboard</div>
                    <div>Analytics</div>
                    <div>Notifications</div>
                    <div>Logout</div>
                </div>
                {/* Cards area (double column) */}
                <div style={{
                    flex: 1,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 24,
                }}>
                    {/* Card 1 */}
                    <div style={{
                        background: "#fff",
                        borderRadius: `${rad}px`,
                        boxShadow: "0 2px 8px #0001",
                        padding: "28px 32px",
                        minHeight: 120,
                    }}>
                        <div style={{ fontWeight: 700, fontSize: 18, color: greyDark, marginBottom: 8 }}>Account Balance</div>
                        <div style={{ color: accent, fontSize: 28, fontWeight: 800 }}>$2,450.00</div>
                    </div>
                    {/* Card 2 */}
                    <div style={{
                        background: "#fff",
                        borderRadius: `${rad}px`,
                        boxShadow: "0 2px 8px #0001",
                        padding: "28px 32px",
                        minHeight: 120,
                    }}>
                        <div style={{ fontWeight: 700, fontSize: 18, color: greyDark, marginBottom: 8 }}>Tasks Due</div>
                        <div style={{ color: greyDark, fontSize: 28, fontWeight: 800 }}>7</div>
                    </div>
                    {/* Card 3 */}
                    <div style={{
                        background: "#fff",
                        borderRadius: `${rad}px`,
                        boxShadow: "0 2px 8px #0001",
                        padding: "24px 32px",
                        minHeight: 120,
                        gridColumn: "span 2",
                    }}>
                        <div style={{ fontWeight: 700, fontSize: 18, color: greyDark, marginBottom: 8 }}>Recent Messages</div>
                        <ul style={{ margin: 0, padding: 0, listStyle: "none", color: greyDark, fontSize: 15 }}>
                            <li>"Welcome to your dashboard!"</li>
                            <li>"Your report is ready to view."</li>
                            <li>"Team meeting at 3pm."</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DB2;
