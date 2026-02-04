import React from "react";

// Minimal card that opens the editing modal.
const EachTag = ({
  tag,
  className,
  styleObj,
  isModified,
  bp,
  // handleStyleChange,
  // cascadeDesktopToAll,
  setModal,
}) => {
  const current = styleObj?.fontSize ?? 1;

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 18,
          position: "relative",
        }}
      >
        <span
          className={className}
          style={{
            fontSize: `${current}rem`,
            fontWeight: styleObj.fontWeight,
            textTransform: styleObj.textTransform,
            lineHeight: styleObj.lineHeight,
            letterSpacing: styleObj.letterSpacing,
            color: styleObj.color,
            border: styleObj.border,
            padding: "2px 0",
            background: isModified ? "#f9f5e7" : "none",
            transition: "background 0.2s",
          }}
        >
          {tag === "blockquote"
            ? "“Sample blockquote”"
            : tag === "small"
              ? "Small text"
              : tag === "a"
                ? "Sample link"
                : `Sample ${tag}`}
        </span>

        <div style={{ display: "flex", alignItems: "center", marginLeft: 10 }}>
          <button
            onClick={() =>
              typeof setModal === "function" ? setModal({ tag, bp }) : null
            }
            title="Edit style"
            style={{
              padding: "6px 8px",
              borderRadius: 6,
              border: "1px solid #ccc",
              background: "#fff",
              cursor: "pointer",
              fontSize: 12,
              marginRight: 8,
            }}
          >
            Edit
          </button>

          {isModified && (
            <span style={{ color: "#f5a623", marginLeft: 4 }} title="Modified">
              ★
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default EachTag;
