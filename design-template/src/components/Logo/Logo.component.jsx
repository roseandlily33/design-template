import React, { useRef } from "react";
import Image from "next/image";
import styles from "./Logo.module.css";
import Input from "@/app/extraComponents/Input.component";
import PrimaryButton from "@/app/buttons/PrimaryButton/PrimaryButton.component";

const Logo = ({
  logoUrl,
  setLogoUrl,
  logoWidth,
  setLogoWidth,
  logoHeight,
  setLogoHeight,
}) => {
  const fileInputRef = useRef();
  const width = logoWidth;
  const height = logoHeight;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
    }
  };

  return (
    <div className={styles.logoRoot}>
      <div className={styles.logoHeader}>
        <div className={styles.logoTitle}>Logo</div>
      </div>
      <div className={styles.logoUploadSection}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <PrimaryButton
          span="Upload Logo Image"
          functionName={() =>
            fileInputRef.current && fileInputRef.current.click()
          }
        />

        <div className={styles.logoPreviewWrapper}>
          <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
            <Input
              type="number"
              min={24}
              max={600}
              value={width}
              onChange={(e) => setLogoWidth(Number(e.target.value))}
              label="Width:"
              style={{ width: 80 }}
            />
            <span>px</span>
            <Input
              type="number"
              min={24}
              max={600}
              value={height}
              onChange={(e) => setLogoHeight(Number(e.target.value))}
              label="Height:"
              style={{ width: 80 }}
            />
            <span>px</span>
          </div>
          {logoUrl && (
            <Image
              src={logoUrl}
              alt="Logo Preview"
              width={width}
              height={height}
              className={styles.logoPreview}
              unoptimized
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Logo;
