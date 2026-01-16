const PC1 = ({
    colours,
    fonts,
    borderRadius,
    heroImgUrl,
    spacingBase,
    spacingUnit,
    primaryButtonProps,
}) => {
    const padding = spacingBase ? `${spacingBase * 1.5}${spacingUnit}` : "20px";
    const margin = spacingBase ? `${spacingBase * 1.2}${spacingUnit}` : "18px";
    return (
        <div
            style={{
                background: "#fff",
                borderRadius: borderRadius || 12,
                fontFamily: fonts?.main || "inherit",
                boxShadow: "0 2px 12px #0002",
                margin,
                width: 320,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <img
                src={heroImgUrl}
                alt="Product"
                style={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    borderTopLeftRadius: borderRadius,
                    borderTopRightRadius: borderRadius,
                }}
            />
            <div style={{ padding }}>
                <h3
                    style={{
                        color: colours?.find(r => r.label === "Main")?.colors[7] || "#222",
                        fontFamily: fonts?.head || "inherit",
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        margin: "0 0 4px 0",
                    }}
                >
                    PC1 Product Name
                </h3>
                <p style={{ color: colours?.find(r => r.label === "Grey")?.colors[6] || "#555", fontSize: "1rem", margin: "0 0 10px 0" }}>
                    A clean vertical card with a big image and bold title.
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                    <span style={{ color: colours?.find(r => r.label === "Accent")?.colors[7] || "#e67e22", fontWeight: 600, fontSize: "1.1rem" }}>
                        $59.99
                    </span>
                    <button
                        style={{
                            background: primaryButtonProps?.color || colours?.find(r => r.label === "Accent")?.colors[7] || "#ff9800",
                            color: primaryButtonProps?.textColor || colours?.find(r => r.label === "Grey")?.colors[0] || "#fff",
                            borderRadius: primaryButtonProps?.radius || (borderRadius ? borderRadius / 2 : 6),
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
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PC1;
