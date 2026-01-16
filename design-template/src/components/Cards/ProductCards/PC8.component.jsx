const PC8 = ({
    colours,
    fonts,
    borderRadius,
    heroImgUrl,
    spacingBase,
    spacingUnit,
    primaryButtonProps,
}) => {
    const padding = spacingBase ? `${spacingBase * 1.1}${spacingUnit}` : "14px";
    const margin = spacingBase ? `${spacingBase * 1.2}${spacingUnit}` : "18px";
    return (
        <div
            style={{
                background: "#fff",
                borderRadius: borderRadius || 10,
                fontFamily: fonts?.serif || fonts?.main || "serif",
                boxShadow: "0 1px 8px #0001",
                margin,
                width: 320,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                border: `1.5px solid ${colours?.find((r) => r.label === "Grey")?.colors[3] || '#ccc'}`,
            }}
        >
            <img
                src={heroImgUrl}
                alt="Classic Product"
                style={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    borderTopLeftRadius: borderRadius || 10,
                    borderTopRightRadius: borderRadius || 10,
                    display: "block",
                }}
            />
            <div style={{ padding, width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <h3
                    style={{
                        color: colours?.find((r) => r.label === "Main")?.colors[7] || "#222",
                        fontFamily: fonts?.serif || fonts?.head || "serif",
                        fontSize: "1.12rem",
                        fontWeight: 700,
                        margin: "8px 0 0 0",
                    }}
                >
                    Classic Product
                </h3>
                <p
                    style={{
                        color: colours?.find((r) => r.label === "Grey")?.colors[7] || "#555",
                        fontSize: "0.98rem",
                        margin: "8px 0 16px 0",
                    }}
                >
                    Timeless, elegant, and always in style.
                </p>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        gap: 10,
                    }}
                >
                    <span
                        style={{
                            color: colours?.find((r) => r.label === "Accent")?.colors[7] || "#ff9800",
                            fontWeight: 600,
                            fontSize: "1.1rem",
                        }}
                    >
                        $49.00
                    </span>
                    <button
                        style={{
                            background: primaryButtonProps?.color || colours?.find((r) => r.label === "Accent")?.colors[7] || "#ff9800",
                            color: primaryButtonProps?.textColor || colours?.find((r) => r.label === "Grey")?.colors[0] || "#fff",
                            borderRadius: primaryButtonProps?.radius || (borderRadius ? borderRadius / 2 : 8),
                            fontFamily: fonts?.serif || fonts?.main || "serif",
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
                        Buy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PC8;
