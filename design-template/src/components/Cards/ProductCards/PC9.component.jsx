const PC9 = ({
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
    return (
        <div
            style={{
                background: "#fff",
                borderRadius: borderRadius || 18,
                fontFamily: fonts?.main || "inherit",
                boxShadow: "0 2px 16px #0002",
                margin,
                width: 320,
                overflow: "visible",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
            }}
        >
            {/* Overlapping image */}
            <div style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
                <img
                    src={heroImgUrl}
                    alt="Innovative Product"
                    style={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: "50%",
                        boxShadow: `0 2px 12px ${colours?.find((r) => r.label === "Accent")?.colors[2] || '#ffe5b4'}`,
                        border: `3px solid ${colours?.find((r) => r.label === "Accent")?.colors[6] || '#e67e22'}`,
                    }}
                />
            </div>
            <div style={{ paddingTop: 48, padding, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h3
                    style={{
                        color: colours?.find((r) => r.label === "Main")?.colors[7] || "#222",
                        fontFamily: fonts?.head || "inherit",
                        fontSize: "1.13rem",
                        fontWeight: 700,
                        margin: "8px 0 0 0",
                        textAlign: "center",
                    }}
                >
                    Innovative Product
                </h3>
                <p
                    style={{
                        color: colours?.find((r) => r.label === "Grey")?.colors[7] || "#555",
                        fontSize: "0.98rem",
                        margin: "8px 0 16px 0",
                        textAlign: "center",
                    }}
                >
                    Creative layout with overlapping image and modern accents.
                </p>
                {/* Creative accent */}
                <div style={{ width: 40, height: 6, borderRadius: 3, background: colours?.find((r) => r.label === "Accent")?.colors[6] || '#e67e22', margin: "0 0 18px 0" }} />
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 18,
                        marginTop: 6,
                        width: "100%",
                    }}
                >
                    <span
                        style={{
                            color: colours?.find((r) => r.label === "Accent")?.colors[7] || "#ff9800",
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            marginRight: 10,
                        }}
                    >
                        $59.99
                    </span>
                    <button
                        style={{
                            background: primaryButtonProps?.color || colours?.find((r) => r.label === "Accent")?.colors[7] || "#ff9800",
                            color: primaryButtonProps?.textColor || colours?.find((r) => r.label === "Grey")?.colors[0] || "#fff",
                            borderRadius: primaryButtonProps?.radius || (borderRadius ? borderRadius / 2 : 8),
                            fontFamily: fonts?.main || "inherit",
                            fontWeight: primaryButtonProps?.fontWeight || 500,
                            fontSize: primaryButtonProps?.fontSize || "1rem",
                            letterSpacing: primaryButtonProps?.letterSpacing,
                            boxShadow: primaryButtonProps?.boxShadow,
                            padding: primaryButtonProps?.padding || "8px 18px",
                            textTransform: primaryButtonProps?.textTransform,
                            lineHeight: primaryButtonProps?.lineHeight,
                            border: "none",
                            cursor: "pointer",
                            transition: "background 0.2s",
                        }}
                    >
                        Discover
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PC9;
