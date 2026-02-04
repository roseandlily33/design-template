import React, { useRef } from "react";
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
            onClick={() => handleStaticSelect(img)}
            type="button"
          >
            <Image
              src={`/${img}`}
              alt={img}
              width={48}
              height={48}
              className={styles.imageThumb}
            />
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
          />
        </div>
      )}
    </div>
  );
}
