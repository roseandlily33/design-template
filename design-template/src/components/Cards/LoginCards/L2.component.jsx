import React from "react";

const L2 = ({ colours, fonts, borderRadius, spacingBase, spacingUnit }) => {
    // Signup card with social login buttons, stacked layout
    const grey = colours?.find(r => r.label === "Grey")?.colors || ["#fff", "#eee", "#ccc", "#888"];
    const accent = colours?.find(r => r.label !== "Grey")?.colors[3] || "#bada55";
    const rad = borderRadius || 12;
    const pad = spacingBase ? spacingBase * 1.5 + spacingUnit : "1.5rem";
    return (
        <div style={{
            background: grey[0],
            borderRadius: rad,
            boxShadow: "0 2px 12px #0002",
            width: 340,
            padding: pad,
            fontFamily: fonts?.main || "inherit",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
        }}>
            <div style={{ fontSize: 32, color: accent, marginBottom: 4 }}>📝</div>
            <div style={{ fontWeight: 700, fontSize: 22, color: grey[3], marginBottom: 2 }}>Sign Up</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: grey[1], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>G</div>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: grey[1], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>f</div>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: grey[1], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>A</div>
            </div>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
                <label style={{ color: grey[3], fontSize: 14 }}>Email</label>
                <div style={{ height: 36, borderRadius: 7, background: grey[1] }} />
                <label style={{ color: grey[3], fontSize: 14, marginTop: 8 }}>Password</label>
                <div style={{ height: 36, borderRadius: 7, background: grey[1] }} />
                <label style={{ color: grey[3], fontSize: 14, marginTop: 8 }}>Confirm Password</label>
                <div style={{ height: 36, borderRadius: 7, background: grey[1] }} />
                <button style={{ background: accent, color: "#fff", borderRadius: 7, height: 38, fontWeight: 600, border: "none", marginTop: 8, cursor: "pointer" }}>Sign Up</button>
            </div>
            <div style={{ fontSize: 13, color: grey[2], marginTop: 8 }}>
                Already have an account? <span style={{ color: accent, fontWeight: 600, cursor: "pointer" }}>Login</span>
            </div>
        </div>
    );
};

export default L2;
