
import React, { useRef } from "react";
import Image from "next/image";

const staticImages = [
    "Picture.jpg",
    "White.jpg",
    "Stairs.jpg",
    "Space.jpg",
    "Orange.jpg",
    "Kitchen.jpg",
    "Glass.jpg",
];

export default function ImageSelector({ value, onChange }) {
    const fileInputRef = useRef();

    const handleStaticSelect = (filename) => {
        onChange(`/` + filename);
    };

    const handleUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            onChange(url);
        }
    };

    return (
        <div style={{ marginBottom: 18 }}>
            <div style={{ fontWeight: 500, marginBottom: 6 }}>Hero Image</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                {staticImages.map((img) => (
                    <button
                        key={img}
                        style={{
                            border: value === "/" + img ? "2px solid #6883a1" : "1px solid #ccc",
                            borderRadius: 6,
                            padding: 0,
                            background: "none",
                            cursor: "pointer",
                        }}
                        onClick={() => handleStaticSelect(img)}
                        type="button"
                    >
                        <Image
                            src={`/${img}`}
                            alt={img}
                            width={48}
                            height={48}
                            style={{ objectFit: "cover", borderRadius: 6 }}
                        />
                    </button>
                ))}
                <button
                    style={{
                        border: value && value.startsWith("blob:") ? "2px solid #6883a1" : "1px solid #ccc",
                        borderRadius: 6,
                        padding: 0,
                        background: "none",
                        cursor: "pointer",
                        width: 48,
                        height: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                    }}
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    type="button"
                >
                    +
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleUpload}
                    />
                </button>
            </div>
            {value && (
                <div style={{ marginTop: 8 }}>
                    <Image
                        src={value}
                        alt="Selected Hero"
                        width={120}
                        height={80}
                        style={{ objectFit: "cover", borderRadius: 8, border: "1px solid #ccc" }}
                    />
                </div>
            )}
        </div>
    );
}
