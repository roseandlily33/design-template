import React from "react";
import { createPortal } from "react-dom";

/*
  FontScaleModal now receives all required props from the parent.
  It returns null when modal is falsy, otherwise it renders itself
  into document.body via createPortal (keeps parent simple).
*/
const FontScaleModal = ({
  modal,
  setModal,
  fontScaleStyles = {},
  handleStyleChange,
  cascadeDesktopToAll,
}) => {
  if (!modal) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.18)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => setModal(null)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 32,
          minWidth: 340,
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        }}
      >
        <h4>
          Edit {modal.tag} ({modal.bp})
        </h4>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontWeight: "bold", marginRight: 8 }}>
            Font Size (rem):
          </label>
          <input
            type="number"
            step="0.01"
            min="0.5"
            max="5"
            value={fontScaleStyles?.[modal.tag]?.[modal.bp]?.fontSize ?? 1}
            onChange={(e) =>
              handleStyleChange(
                modal.tag,
                modal.bp,
                "fontSize",
                parseFloat(e.target.value)
              )
            }
            style={{ width: 80, marginRight: 16 }}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontWeight: "bold", marginRight: 8 }}>
            Font Weight:
          </label>
          <select
            value={fontScaleStyles?.[modal.tag]?.[modal.bp]?.fontWeight ?? 400}
            onChange={(e) =>
              handleStyleChange(
                modal.tag,
                modal.bp,
                "fontWeight",
                parseInt(e.target.value, 10)
              )
            }
            style={{ width: 90, marginRight: 16 }}
          >
            <option value={400}>400 (Regular)</option>
            <option value={500}>500 (Medium)</option>
            <option value={700}>700 (Bold)</option>
          </select>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontWeight: "bold", marginRight: 8 }}>
            Text Transform:
          </label>
          <select
            value={
              fontScaleStyles?.[modal.tag]?.[modal.bp]?.textTransform ?? "none"
            }
            onChange={(e) =>
              handleStyleChange(
                modal.tag,
                modal.bp,
                "textTransform",
                e.target.value
              )
            }
            style={{ width: 120, marginRight: 16 }}
          >
            <option value="none">None</option>
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="capitalize">Capitalize</option>
          </select>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontWeight: "bold", marginRight: 8 }}>
            Line Height:
          </label>
          <input
            type="number"
            step="0.05"
            min="1"
            max="2"
            value={fontScaleStyles?.[modal.tag]?.[modal.bp]?.lineHeight ?? 1.2}
            onChange={(e) =>
              handleStyleChange(
                modal.tag,
                modal.bp,
                "lineHeight",
                parseFloat(e.target.value)
              )
            }
            style={{ width: 80, marginRight: 16 }}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontWeight: "bold", marginRight: 8 }}>
            Letter Spacing:
          </label>
          <input
            type="number"
            step="0.1"
            min="-2"
            max="5"
            value={fontScaleStyles?.[modal.tag]?.[modal.bp]?.letterSpacing ?? 0}
            onChange={(e) =>
              handleStyleChange(
                modal.tag,
                modal.bp,
                "letterSpacing",
                parseFloat(e.target.value)
              )
            }
            style={{ width: 80, marginRight: 16 }}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontWeight: "bold", marginRight: 8 }}>Color:</label>
          <input
            type="color"
            value={fontScaleStyles?.[modal.tag]?.[modal.bp]?.color ?? "#222"}
            onChange={(e) =>
              handleStyleChange(modal.tag, modal.bp, "color", e.target.value)
            }
            style={{
              width: 40,
              height: 40,
              border: "none",
              background: "none",
              verticalAlign: "middle",
            }}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontWeight: "bold", marginRight: 8 }}>Border:</label>
          <input
            type="text"
            value={fontScaleStyles?.[modal.tag]?.[modal.bp]?.border ?? "none"}
            onChange={(e) =>
              handleStyleChange(modal.tag, modal.bp, "border", e.target.value)
            }
            style={{ width: 120, marginRight: 16 }}
            placeholder="e.g. 1px solid #0070f3"
          />
        </div>

        {/* Only show cascade button when editing Desktop */}
        {modal.bp === "Desktop" &&
          typeof cascadeDesktopToAll === "function" && (
            <button
              style={{
                marginTop: 10,
                marginBottom: 10,
                padding: "8px 18px",
                fontSize: 15,
                borderRadius: 6,
                background: "#0070f3",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                display: "block",
              }}
              onClick={() => cascadeDesktopToAll(modal.tag)}
            >
              Apply all Desktop styles to Tablet & Mobile
            </button>
          )}

        <button
          style={{
            marginTop: 18,
            padding: "8px 18px",
            fontSize: 16,
            borderRadius: 6,
            background: "#0070f3",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setModal(null)}
        >
          Close
        </button>
      </div>
    </div>,
    typeof window !== "undefined"
      ? document.body
      : document.createElement("div")
  );
};

export default FontScaleModal;
