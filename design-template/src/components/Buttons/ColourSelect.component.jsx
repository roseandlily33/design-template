import React, { useEffect, useState, useRef } from "react";
// Custom color select with swatch in dropdown
export const ColorSelect = ({ value, onChange, options, customValue, ...props }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);
  const selected = options.find((c) => c === value) ? value : customValue;
  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        minWidth: 120,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <button
        type="button"
        style={{
          width: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1.5px solid #6883a1",
          borderRadius: 8,
          background: "#f7f8fa",
          color: "#222",
          padding: "7px 14px",
          cursor: "pointer",
          height: 36,
          fontSize: 15,
          fontFamily: "inherit",
          outline: "none",
          transition: "border 0.18s",
          boxShadow: open ? "0 0 0 2px #6883a133" : undefined,
        }}
        onClick={() => setOpen((o) => !o)}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              background: selected,
              border: "1px solid #bbb",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: 15 }}>{selected}</span>
        </span>
        <span style={{ fontSize: 13, color: "#888" }}>▼</span>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 0,
            zIndex: 10,
            background: "#f7f8fa",
            border: "1.5px solid #6883a1",
            borderRadius: 8,
            boxShadow: "0 2px 8px #0002",
            minWidth: 140,
            maxHeight: 220,
            overflowY: "auto",
          }}
        >
          {options.map((c, idx) => (
            <div
              key={c + idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 14px",
                cursor: "pointer",
                background: c === value ? "#e3e7ee" : "#f7f8fa",
                fontSize: 15,
              }}
              onClick={() => {
                onChange(c);
                setOpen(false);
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  background: c,
                  border: "1px solid #bbb",
                  display: "inline-block",
                }}
              />
              <span>{c}</span>
            </div>
          ))}
          {customValue && !options.includes(customValue) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 14px",
                cursor: "pointer",
                background: customValue === value ? "#e3e7ee" : "#f7f8fa",
                fontSize: 15,
              }}
              onClick={() => {
                onChange(customValue);
                setOpen(false);
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  background: customValue,
                  border: "1px solid #bbb",
                  display: "inline-block",
                }}
              />
              <span>{customValue} (Custom)</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};