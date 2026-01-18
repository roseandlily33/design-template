import React from "react";

const L4 = ({ colours, fonts, borderRadius, spacingBase, spacingUnit }) => {
    // Side-by-side login and signup forms
    const grey = colours?.find(r => r.label === "Grey")?.colors || ["#fff", "#eee", "#ccc", "#888"];
    const accent = colours?.find(r => r.label !== "Grey")?.colors[5] || "#ff9800";
    const rad = borderRadius || 12;
    const pad = spacingBase ? spacingBase * 1.5 + spacingUnit : "1.5rem";
    return (
        <div style={{
            background: grey[0],
            borderRadius: rad,
            boxShadow: "0 2px 12px #0002",
            width: 600,
            padding: pad,
            fontFamily: fonts?.main || "inherit",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 0,
        }}>
            {/* Login */}
            <div style={{ flex: 1, padding: 18, display: "flex", flexDirection: "column", alignItems: "center", borderRight: `1.5px solid ${grey[1]}` }}>
                <div style={{ fontWeight: 700, fontSize: 20, color: accent, marginBottom: 8 }}>Login</div>
                <label style={{ color: grey[3], fontSize: 14 }}>Email</label>
                <div style={{ height: 34, borderRadius: 7, background: grey[1], width: "100%" }} />
                <label style={{ color: grey[3], fontSize: 14, marginTop: 8 }}>Password</label>
                <div style={{ height: 34, borderRadius: 7, background: grey[1], width: "100%", marginBottom: 2 }} />
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <input type="checkbox" style={{ accentColor: accent }} />
                    <span style={{ color: grey[2], fontSize: 13 }}>Show password</span>
                </div>
                <button style={{ background: accent, color: "#fff", borderRadius: 7, height: 36, fontWeight: 600, border: "none", marginTop: 6, cursor: "pointer", width: "100%" }}>Login</button>
            </div>
            {/* Signup */}
            <div style={{ flex: 1, padding: 18, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 20, color: accent, marginBottom: 8 }}>Sign Up</div>
                <label style={{ color: grey[3], fontSize: 14 }}>Email</label>
                <div style={{ height: 34, borderRadius: 7, background: grey[1], width: "100%" }} />
                <label style={{ color: grey[3], fontSize: 14, marginTop: 8 }}>Password</label>
                <div style={{ height: 34, borderRadius: 7, background: grey[1], width: "100%" }} />
                <label style={{ color: grey[3], fontSize: 14, marginTop: 8 }}>Confirm Password</label>
                <div style={{ height: 34, borderRadius: 7, background: grey[1], width: "100%" }} />
                <button style={{ background: accent, color: "#fff", borderRadius: 7, height: 36, fontWeight: 600, border: "none", marginTop: 6, cursor: "pointer", width: "100%" }}>Sign Up</button>
            </div>
        </div>
    );
};

export default L4;
