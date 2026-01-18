import React from "react";

const LP5 = ({ colours, fonts, borderRadius, spacingBase, spacingUnit }) => {
    // Greys from palette, fallback to #eee/#ccc/#888
    const greyBg = colours?.find((r) => r.label === "Grey")?.colors[1] || "#f5f6fa";
    const greyLight = colours?.find((r) => r.label === "Grey")?.colors[2] || "#f0f1f4";
    const greyMid = colours?.find((r) => r.label === "Grey")?.colors[3] || "#e0e3e8";
    const greyMid2 = colours?.find((r) => r.label === "Grey")?.colors[5] || "#cfd4db";
    const greyDark = colours?.find((r) => r.label === "Grey")?.colors[7] || "#888";
    const greyFooter = colours?.find((r) => r.label === "Grey")?.colors[8] || "#222";
    const pad = spacingBase ? spacingBase * 2 + spacingUnit : "2.5rem";
    const rad = borderRadius || 16;
    return (
        <div
            style={{
                background: greyBg,
                borderRadius: rad,
                padding: pad,
                minWidth: 340,
                minHeight: 700,
                fontFamily: fonts?.main || "inherit",
                display: "flex",
                flexDirection: "column",
                gap: 0,
                boxShadow: "0 2px 16px #0001",
                alignItems: "center",
                justifyContent: "flex-start",
                overflow: "hidden",
            }}
        >
            {/* Navbar */}
            <div
                style={{
                    width: "100%",
                    background: greyDark,
                    color: "#fff",
                    padding: "18px 0",
                    textAlign: "center",
                    fontWeight: 600,
                    letterSpacing: 1,
                    fontSize: 18,
                    borderTopLeftRadius: rad,
                    borderTopRightRadius: rad,
                }}
            >
                Navbar
            </div>
            {/* Hero section */}
            <div
                style={{
                    width: "100%",
                    background: greyLight,
                    padding: "36px 0 28px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 18,
                }}
            >
                <div
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: greyMid,
                        marginBottom: 8,
                    }}
                />
                <div
                    style={{
                        width: "60%",
                        height: 32,
                        borderRadius: 12,
                        background: greyMid,
                        marginBottom: 8,
                    }}
                />
                <div
                    style={{
                        width: "40%",
                        height: 18,
                        borderRadius: 8,
                        background: greyMid,
                    }}
                />
                <div
                    style={{
                        color: greyDark,
                        fontWeight: 500,
                        fontSize: 16,
                        marginTop: 8,
                    }}
                >
                    Hero Section
                </div>
            </div>
            {/* Stats section (unique block) */}
            <div
                style={{
                    width: "100%",
                    background: greyBg,
                    padding: "28px 0 18px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        color: greyDark,
                        fontWeight: 500,
                        fontSize: 16,
                        marginBottom: 18,
                    }}
                >
                    Stats
                </div>
                <div style={{ display: "flex", gap: 18, width: "100%", justifyContent: "center" }}>
                    {[1, 2, 3].map((i) => (
                        <div key={i} style={{ width: 60, height: 38, borderRadius: 10, background: greyMid2 }} />
                    ))}
                </div>
            </div>
            {/* Features section */}
            <div
                style={{
                    width: "100%",
                    background: greyLight,
                    padding: "28px 0 18px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        color: greyDark,
                        fontWeight: 500,
                        fontSize: 16,
                        marginBottom: 18,
                    }}
                >
                    Features
                </div>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        gap: 18,
                        justifyContent: "center",
                    }}
                >
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 8,
                            }}
                        >
                            <div
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: "50%",
                                    background: greyMid,
                                }}
                            />
                            <div
                                style={{
                                    width: 60,
                                    height: 12,
                                    borderRadius: 6,
                                    background: greyMid,
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Reviews section (unique block) */}
            <div
                style={{
                    width: "100%",
                    background: greyBg,
                    padding: "28px 0 18px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        color: greyDark,
                        fontWeight: 500,
                        fontSize: 16,
                        marginBottom: 18,
                    }}
                >
                    Reviews
                </div>
                <div style={{ display: "flex", gap: 18, width: "100%", justifyContent: "center" }}>
                    {[1, 2].map((i) => (
                        <div key={i} style={{ width: 60, height: 38, borderRadius: 10, background: greyMid2 }} />
                    ))}
                </div>
            </div>
            {/* Call to Action section */}
            <div
                style={{
                    width: "100%",
                    background: greyLight,
                    padding: "28px 0 18px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        color: greyDark,
                        fontWeight: 500,
                        fontSize: 16,
                        marginBottom: 18,
                    }}
                >
                    Call to Action
                </div>
                <div
                    style={{
                        width: 120,
                        height: 32,
                        borderRadius: 16,
                        background: greyDark,
                        marginBottom: 8,
                    }}
                />
                <div
                    style={{
                        width: 120,
                        height: 32,
                        borderRadius: 16,
                        background: greyMid,
                    }}
                />
            </div>
            {/* Footer */}
            <div
                style={{
                    width: "100%",
                    background: greyFooter,
                    color: "#fff",
                    padding: "18px 0",
                    textAlign: "center",
                    fontWeight: 600,
                    letterSpacing: 1,
                    fontSize: 16,
                    borderBottomLeftRadius: rad,
                    borderBottomRightRadius: rad,
                }}
            >
                Footer
            </div>
        </div>
    );
};

export default LP5;
