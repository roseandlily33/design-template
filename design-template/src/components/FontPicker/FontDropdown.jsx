import React, { useState, useRef, useEffect } from "react";
import styles from "./FontPicker.module.css";

const FontDropdown = ({ value, options, onChange, fontMap, label }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        if (open) document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    const selectedFont = options.find((f) => f === value);

    return (
        <div className={styles.fontDropdownRoot} ref={ref}>
            {label && <label className={styles.fontDropdownLabel}>{label}</label>}
            <button
                type="button"
                className={styles.fontDropdownButton}
                style={{ fontFamily: fontMap[selectedFont] || "inherit" }}
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                {selectedFont}
                <span className={styles.fontDropdownArrow}>{open ? "▲" : "▼"}</span>
            </button>
            {open && (
                <ul className={styles.fontDropdownList} role="listbox">
                    {options.map((font) => (
                        <li
                            key={font}
                            className={
                                styles.fontDropdownOption +
                                (font === value ? " " + styles.fontDropdownOptionSelected : "")
                            }
                            style={{ fontFamily: fontMap[font] || "inherit" }}
                            role="option"
                            aria-selected={font === value}
                            tabIndex={0}
                            onClick={() => {
                                onChange(font);
                                setOpen(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    onChange(font);
                                    setOpen(false);
                                }
                            }}
                        >
                            {font}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FontDropdown;
