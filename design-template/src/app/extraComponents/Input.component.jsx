import React from "react";
import styles from "./Input.module.css";

const Input = ({ value, onChange, label, type = "text", placeholder, min, max, step, ...props }) => {
    return (
        <div className={styles.inputRoot}>
            {label && <span>{label}</span>}
            <input
                className={styles.inputField}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
                {...props}
            />
        </div>
    );
};

export default Input;
