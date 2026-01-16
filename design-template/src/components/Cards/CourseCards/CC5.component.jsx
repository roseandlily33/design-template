const CC5 = ({
    colours,
    fonts,
    borderRadius,
    heroImgUrl,
    spacingBase,
    spacingUnit,
    primaryButtonProps,
}) => {
    const padding = spacingBase ? `${spacingBase * 1.2}${spacingUnit}` : "18px";
    const margin = spacingBase ? `${spacingBase * 1.2}${spacingUnit}` : "18px";
    const progress = 65; // Example progress
    return (
        <div
            style={{
                background: "#fff",
                borderRadius: borderRadius ? borderRadius * 1.5 : 32,
                fontFamily: fonts?.main || "inherit",
                boxShadow: "0 4px 24px #0001",
                margin,
                width: 340,
                overflow: "visible",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: `3px solid ${colours?.find((r) => r.label === "Accent")?.colors[5] || '#ffb347'}`,
            }}
        >
            {/* In Progress badge */}
            <span
                style={{
                    position: "absolute",
                    top: -18,
                    right: 18,
                    background: colours?.find((r) => r.label === "Accent")?.colors[6] || '#2196f3',
                    color: colours?.find((r) => r.label === "Grey")?.colors[0] || '#fff',
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    borderRadius: 20,
                    padding: "6px 18px",
                    boxShadow: "0 2px 8px #0002",
                    zIndex: 2,
                }}
            >
                In Progress
            </span>
            <img
                src={heroImgUrl}
                alt="Course Hero"
                style={{
                    width: 120,
                    height: 120,
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginTop: 32,
                    boxShadow: `0 2px 12px ${colours?.find((r) => r.label === "Accent")?.colors[2] || '#ffe5b4'}`,
                }}
            />
            <div style={{ padding, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h3
                    style={{
                        color: colours?.find((r) => r.label === "Main")?.colors[7] || "#222",
                        fontFamily: fonts?.head || "inherit",
                        fontSize: "1.18rem",
                        fontWeight: 700,
                        margin: "18px 0 0 0",
                        textAlign: "center",
                    }}
                >
                    Fun with Physics
                </h3>
                <p
                    style={{
                        color: colours?.find((r) => r.label === "Grey")?.colors[7] || "#555",
                        fontSize: "1rem",
                        margin: "10px 0 10px 0",
                        textAlign: "center",
                    }}
                >
                    Discover the laws of motion with interactive lessons.
                </p>
                {/* Progress bar */}
                <div style={{ width: "100%", margin: "10px 0 16px 0" }}>
                    <div style={{
                        background: colours?.find((r) => r.label === "Grey")?.colors[2] || '#eee',
                        borderRadius: 8,
                        height: 8,
                        width: "100%",
                        overflow: "hidden",
                    }}>
                        <div style={{
                            width: `${progress}%`,
                            height: "100%",
                            background: colours?.find((r) => r.label === "Accent")?.colors[6] || '#2196f3',
                            borderRadius: 8,
                            transition: "width 0.3s",
                        }} />
                    </div>
                    <div style={{ fontSize: "0.95rem", color: colours?.find((r) => r.label === "Accent")?.colors[6] || '#2196f3', marginTop: 4, textAlign: "right" }}>{progress}% Complete</div>
                </div>
                <button
                    style={{
                        background: primaryButtonProps?.color || colours?.find((r) => r.label === "Accent")?.colors[6] || "#2196f3",
                        color: primaryButtonProps?.textColor || colours?.find((r) => r.label === "Grey")?.colors[0] || "#fff",
                        borderRadius: primaryButtonProps?.radius || (borderRadius ? borderRadius : 20),
                        fontFamily: fonts?.main || "inherit",
                        fontWeight: primaryButtonProps?.fontWeight || 600,
                        fontSize: primaryButtonProps?.fontSize || "1rem",
                        letterSpacing: primaryButtonProps?.letterSpacing,
                        boxShadow: primaryButtonProps?.boxShadow,
                        padding: primaryButtonProps?.padding || "10px 26px",
                        textTransform: primaryButtonProps?.textTransform,
                        lineHeight: primaryButtonProps?.lineHeight,
                        border: "none",
                        cursor: "pointer",
                        transition: "background 0.2s",
                    }}
                >
                    Continue Course
                </button>
            </div>
        </div>
    );
};

export default CC5;
