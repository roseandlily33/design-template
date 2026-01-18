import React from "react";

const L6 = ({ colours, fonts, borderRadius, spacingBase, spacingUnit }) => {
    // Minimal login card with icon, login, and social login below
    const grey = colours?.find(r => r.label === "Grey")?.colors || ["#fff", "#eee", "#ccc", "#888"];
    const accent = colours?.find(r => r.label !== "Grey")?.colors[7] || "#0984e3";
    const rad = borderRadius || 12;
    const pad = spacingBase ? spacingBase * 1.5 + spacingUnit : "1.5rem";
    return (
        <div style={{
            background: grey[0],
            borderRadius: rad,
            boxShadow: "0 2px 12px #0002",
            width: 320,
            padding: pad,
            fontFamily: fonts?.main || "inherit",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
        }}>
            <div style={{ fontSize: 32, color: accent, marginBottom: 4 }}>👤</div>
            <div style={{ fontWeight: 700, fontSize: 22, color: grey[3], marginBottom: 2 }}>Login</div>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
                <label style={{ color: grey[3], fontSize: 14 }}>Email</label>
                <div style={{ height: 36, borderRadius: 7, background: grey[1] }} />
                <label style={{ color: grey[3], fontSize: 14, marginTop: 8 }}>Password</label>
                <div style={{ height: 36, borderRadius: 7, background: grey[1], marginBottom: 2 }} />
                <button style={{ background: accent, color: "#fff", borderRadius: 7, height: 38, fontWeight: 600, border: "none", marginTop: 6, cursor: "pointer" }}>Login</button>
            </div>
            <div style={{ fontSize: 13, color: grey[2], marginTop: 8 }}>or</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 2 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: grey[1], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>G</div>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: grey[1], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>f</div>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: grey[1], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>A</div>
            </div>
            <div style={{ fontSize: 13, color: grey[2], marginTop: 8 }}>
                Don&apos;t have an account? <span style={{ color: accent, fontWeight: 600, cursor: "pointer" }}>Sign up</span>
            </div>
        </div>
    );
};

export default L6;
