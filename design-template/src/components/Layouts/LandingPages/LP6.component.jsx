import React from "react";

const LP6 = ({ colours, fonts, borderRadius, spacingBase, spacingUnit }) => {
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
			{/* Navbar (icons only) */}
			<div
				style={{
					width: "100%",
					background: greyDark,
					padding: "16px 0 12px 0",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					borderTopLeftRadius: rad,
					borderTopRightRadius: rad,
					gap: 0,
					position: "relative",
				}}
			>
				<div style={{
					position: "absolute",
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					pointerEvents: "none",
					color: "#fff",
					fontWeight: 600,
					fontSize: 18,
					letterSpacing: 1,
					zIndex: 1,
				}}>
					Navbar
				</div>
				<div style={{ marginLeft: 18, width: 32, height: 32, borderRadius: "50%", background: greyMid2, zIndex: 2 }} />
				<div style={{ display: "flex", gap: 12, zIndex: 2 }}>
					{[1, 2, 3].map((i) => (
						<div key={i} style={{ width: 18, height: 18, borderRadius: "50%", background: greyMid2 }} />
					))}
				</div>
				<div style={{ marginRight: 18, width: 32, height: 32, borderRadius: "50%", background: greyMid2, zIndex: 2 }} />
			</div>

			{/* Hero section */}
			<div
				style={{
					width: "100%",
					background: greyLight,
					padding: "40px 0 32px 0",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 18,
					position: "relative",
				}}
			>
				<div style={{
					position: "absolute",
					top: 12,
					left: 0,
					right: 0,
					display: "flex",
					justifyContent: "center",
					color: greyDark,
					fontWeight: 500,
					fontSize: 16,
					pointerEvents: "none",
				}}>
					Hero Section
				</div>
				<div style={{ width: 110, height: 110, borderRadius: "50%", background: greyMid, boxShadow: "0 2px 8px #0001", marginTop: 24 }} />
				{/* Texture block */}
				<div style={{ width: "60%", height: 36, borderRadius: 12, background: `repeating-linear-gradient(135deg, ${greyMid2}, ${greyMid2} 8px, ${greyLight} 8px, ${greyLight} 16px)` }} />
				{/* Icon row */}
				<div style={{ display: "flex", gap: 16, marginTop: 10 }}>
					{[1, 2, 3, 4].map((i) => (
						<div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: greyMid2 }} />
					))}
				</div>
			</div>

			{/* Features section */}
			<div
				style={{
					width: "100%",
					background: greyBg,
					padding: "36px 0 32px 0",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 18,
					position: "relative",
				}}
			>
				<div style={{
					position: "absolute",
					top: 8,
					left: 0,
					right: 0,
					display: "flex",
					justifyContent: "center",
					color: greyDark,
					fontWeight: 500,
					fontSize: 16,
					pointerEvents: "none",
				}}>
					Features
				</div>
				<div style={{ width: "80%", height: 38, borderRadius: 10, background: greyMid, marginBottom: 10, marginTop: 24 }} />
				<div style={{ width: "80%", height: 18, borderRadius: 8, background: greyMid2, marginBottom: 8 }} />
				{/* Texture row */}
				<div style={{ width: "60%", height: 18, borderRadius: 8, background: `repeating-linear-gradient(90deg, ${greyMid2}, ${greyMid2} 6px, ${greyLight} 6px, ${greyLight} 12px)` }} />
				{/* Icon avatars */}
				<div style={{ display: "flex", gap: 18, marginTop: 18 }}>
					{[1, 2, 3].map((i) => (
						<div key={i} style={{ width: 38, height: 38, borderRadius: "50%", background: greyMid2, boxShadow: "0 1px 4px #0001" }} />
					))}
				</div>
			</div>

			{/* Description section (split) */}
			<div
				style={{
					width: "100%",
					background: greyLight,
					padding: "32px 0 32px 0",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "stretch",
					gap: 18,
					position: "relative",
				}}
			>
				<div style={{
					position: "absolute",
					top: 8,
					left: 0,
					right: 0,
					display: "flex",
					justifyContent: "center",
					color: greyDark,
					fontWeight: 500,
					fontSize: 16,
					pointerEvents: "none",
				}}>
					Description
				</div>
				<div style={{ width: "38%", minWidth: 80, height: 110, borderRadius: 14, background: greyMid, marginRight: 8, marginTop: 24 }} />
				<div style={{ display: "flex", flexDirection: "column", gap: 10, width: "38%", minWidth: 80, marginTop: 24 }}>
					<div style={{ width: "100%", height: 28, borderRadius: 8, background: greyMid2 }} />
					<div style={{ width: "100%", height: 18, borderRadius: 8, background: greyMid2 }} />
					<div style={{ width: "60%", height: 18, borderRadius: 8, background: greyMid2 }} />
				</div>
			</div>

			{/* Call to Action section */}
			<div
				style={{
					width: "100%",
					background: greyBg,
					padding: "32px 0 28px 0",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 16,
					position: "relative",
				}}
			>
				<div style={{
					position: "absolute",
					top: 8,
					left: 0,
					right: 0,
					display: "flex",
					justifyContent: "center",
					color: greyDark,
					fontWeight: 500,
					fontSize: 16,
					pointerEvents: "none",
				}}>
					Call to Action
				</div>
				<div style={{ width: 48, height: 48, borderRadius: "50%", background: greyDark, marginBottom: 8, marginTop: 24 }} />
				<div style={{ width: 120, height: 18, borderRadius: 8, background: `repeating-linear-gradient(135deg, ${greyMid2}, ${greyMid2} 8px, ${greyLight} 8px, ${greyLight} 16px)` }} />
				<div style={{ width: 120, height: 32, borderRadius: 16, background: greyMid }} />
			</div>

			{/* Footer */}
			<div
				style={{
					width: "100%",
					background: greyFooter,
					padding: "16px 0 12px 0",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					borderBottomLeftRadius: rad,
					borderBottomRightRadius: rad,
					gap: 18,
					position: "relative",
				}}
			>
				<div style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					color: "#fff",
					fontWeight: 600,
					fontSize: 16,
					letterSpacing: 1,
					pointerEvents: "none",
				}}>
					Footer
				</div>
				{[1, 2, 3].map((i) => (
					<div key={i} style={{ width: 22, height: 22, borderRadius: "50%", background: greyMid2, zIndex: 2 }} />
				))}
			</div>
		</div>
	);
};

export default LP6;
