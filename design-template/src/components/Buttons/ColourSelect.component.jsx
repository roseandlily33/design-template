import React, { useEffect, useState, useRef } from "react";
// Custom color select with swatch in dropdown
export const ColorSelect = ({ value, onChange, options, customValue, ...props }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);
  const selected = options.find((c) => c === value) ? value : customValue;
  return (
    <div ref={ref} style={{ position: "relative", minWidth: 120 }}>
      <button
        type="button"
        style={{
          width: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #ccc",
          borderRadius: 4,
          background: "#fff",
          padding: "2px 8px",
          cursor: "pointer",
          height: 28,
        }}
        onClick={() => setOpen((o) => !o)}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
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
          <span style={{ fontSize: 13 }}>{selected}</span>
        </span>
        <span style={{ fontSize: 12, color: "#888" }}>▼</span>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 0,
            zIndex: 10,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 6,
            boxShadow: "0 2px 8px #0002",
            minWidth: 120,
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
                padding: "4px 10px",
                cursor: "pointer",
                background: c === value ? "#e3e7ee" : "#fff",
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
              <span style={{ fontSize: 13 }}>{c}</span>
            </div>
          ))}
          {customValue && !options.includes(customValue) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 10px",
                cursor: "pointer",
                background: customValue === value ? "#e3e7ee" : "#fff",
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
              <span style={{ fontSize: 13 }}>{customValue} (Custom)</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};