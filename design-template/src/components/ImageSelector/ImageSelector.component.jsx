import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "./ImageSelector.module.css";

const staticImages = [
  "Picture.jpg",
  "White.jpg",
  "Stairs.jpg",
  "Space.jpg",
  "Orange.jpg",
  "Kitchen.jpg",
  "Glass.jpg",
  "Beach.jpg",
  "BlueSmoke.jpg",
  "GoldGlitter.jpg",
  "PinkWaves.jpg",
  "Safety.jpg",
  "TripleColour.jpg",
  "WetColours.jpg",
  "Baking.jpg",
  "Cars.jpg",
  "Event.jpg",
  "Horses.jpg",
  "WildHorses.jpg",
  "Music.jpg",
  "Science.jpg",
  "Pets.jpg",
  "Sports.jpg",
  "Office.jpg",
  "Garden.jpg",
  "StoreFront.jpg",
  "Travel.jpg",
];

export default function ImageSelector({ value, onChange }) {
  const fileInputRef = useRef();
  // Track error state for each static image (by filename)
  const [imgErrors, setImgErrors] = useState({});
  // Used to force reload on retry
  const [reloadKey, setReloadKey] = useState({});

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

  const handleImageError = (img) => {
    setImgErrors((prev) => ({ ...prev, [img]: true }));
  };
  const handleRetry = (img) => {
    setImgErrors((prev) => ({ ...prev, [img]: false }));
    setReloadKey((prev) => ({ ...prev, [img]: (prev[img] || 0) + 1 }));
  };

  return (
    <div className={styles.selectorRoot}>
      <div className={styles.selectorTitle}>Hero Image</div>
      <div className={styles.imageGrid}>
        {staticImages.map((img) => (
          <button
            key={img}
            className={
              value === "/" + img
                ? styles.imageBtn + " " + styles.selected
                : styles.imageBtn
            }
            onClick={() => !imgErrors[img] && handleStaticSelect(img)}
            type="button"
            style={{ position: "relative" }}
          >
            {!imgErrors[img] ? (
              <Image
                key={reloadKey[img] || 0}
                src={`/${img}`}
                alt={img}
                width={48}
                height={48}
                className={styles.imageThumb}
                onError={() => handleImageError(img)}
              />
            ) : (
              <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <span style={{ color: "#b00", fontSize: 12, marginBottom: 2 }}>Failed</span>
                <button
                  type="button"
                  style={{ fontSize: 12, padding: "2px 8px", borderRadius: 4, border: "1px solid #6883a1", background: "#fff", color: "#6883a1", cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRetry(img);
                  }}
                >
                  Retry
                </button>
              </div>
            )}
          </button>
        ))}
        <button
          className={
            value && value.startsWith("blob:")
              ? styles.imageBtn + " " + styles.selected
              : styles.imageBtn
          }
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          type="button"
        >
          <span className={styles.uploadIcon}>+</span>
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
        <div className={styles.selectedImagePreview}>
          <Image
            src={value}
            alt="Selected Hero"
            width={120}
            height={80}
            className={styles.selectedImage}
            unoptimized={value.startsWith("blob:")}
          />
        </div>
      )}
    </div>
  );
}
