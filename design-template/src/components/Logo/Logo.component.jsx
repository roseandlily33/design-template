import React, { useRef } from "react";
import Image from "next/image";
import styles from "./Logo.module.css";

const Logo = ({ logoUrl, setLogoUrl }) => {
  const fileInputRef = useRef();

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
        <button
          className={styles.logoUploadBtn}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          Upload Logo Image
        </button>
        {logoUrl && (
          <Image
            src={logoUrl}
            alt="Logo Preview"
            width={150}
            height={150}
            className={styles.logoPreview}
            unoptimized
          />
          // />
          //   </div>
        )}
      </div>
    </div>
  );
};

export default Logo;
