import React from "react";

const L5 = ({ colours, fonts, borderRadius, spacingBase, spacingUnit }) => {
    // Login card with password strength meter and remember me
    const grey = colours?.find(r => r.label === "Grey")?.colors || ["#fff", "#eee", "#ccc", "#888"];
    const accent = colours?.find(r => r.label !== "Grey")?.colors[6] || "#00b894";
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
            <div style={{ fontSize: 32, color: accent, marginBottom: 4 }}>🔑</div>
            <div style={{ fontWeight: 700, fontSize: 22, color: grey[3], marginBottom: 2 }}>Login</div>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
                <label style={{ color: grey[3], fontSize: 14 }}>Email</label>
                <div style={{ height: 36, borderRadius: 7, background: grey[1] }} />
                <label style={{ color: grey[3], fontSize: 14, marginTop: 8 }}>Password</label>
                <div style={{ height: 36, borderRadius: 7, background: grey[1], marginBottom: 2 }} />
                {/* Password strength meter */}
                <div style={{ height: 8, borderRadius: 4, background: grey[2], margin: "6px 0 2px 0", width: "100%", position: "relative" }}>
                    <div style={{ width: "60%", height: "100%", background: accent, borderRadius: 4, position: "absolute", left: 0, top: 0 }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <input type="checkbox" style={{ accentColor: accent }} />
                    <span style={{ color: grey[2], fontSize: 13 }}>Remember me</span>
                </div>
                <button style={{ background: accent, color: "#fff", borderRadius: 7, height: 38, fontWeight: 600, border: "none", marginTop: 6, cursor: "pointer" }}>Login</button>
            </div>
            <div style={{ fontSize: 13, color: grey[2], marginTop: 8 }}>
                Don&apos;t have an account? <span style={{ color: accent, fontWeight: 600, cursor: "pointer" }}>Sign up</span>
            </div>
        </div>
    );
};

export default L5;
