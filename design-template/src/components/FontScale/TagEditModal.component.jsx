import React, { useState } from "react";

const TagEditModal = ({
  tag,
  bp,
  styleObj = {},
  onClose,
  handleStyleChange,
  applyUpdatesToAll,
}) => {
  const [form, setForm] = useState({
    fontSize: styleObj.fontSize ?? 1,
    fontWeight: styleObj.fontWeight ?? 400,
    color: styleObj.color ?? "#000000",
    letterSpacing: styleObj.letterSpacing ?? "normal",
    lineHeight: styleObj.lineHeight ?? 1.2,
    textTransform: styleObj.textTransform ?? "none",
    border: styleObj.border ?? "none",
  });

  // const setField = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  // const saveCurrent = () => {
  //   // apply each field via handleStyleChange, for this bp only
  //   Object.entries(form).forEach(([k, v]) => {
  //     if (typeof handleStyleChange === "function")
  //       handleStyleChange(tag, bp, k, v);
  //   });
  //   onClose();
  // };

  // const saveToAll = () => {
  //   if (typeof applyUpdatesToAll === "function") {
  //     applyUpdatesToAll(tag, { ...form });
  //   } else {
  //     // fallback: apply to current bp then close
  //     saveCurrent();
  //   }
  // };

  return (
    <>
      {modal &&
        createPortal(
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
          >
            <div
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
                  value={stylesState[modal.tag][modal.bp].fontSize}
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
                  value={stylesState[modal.tag][modal.bp].fontWeight}
                  onChange={(e) =>
                    handleStyleChange(
                      modal.tag,
                      modal.bp,
                      "fontWeight",
                      parseInt(e.target.value)
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
                  value={stylesState[modal.tag][modal.bp].textTransform}
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
                  value={stylesState[modal.tag][modal.bp].lineHeight}
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
                  value={stylesState[modal.tag][modal.bp].letterSpacing}
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
                <label style={{ fontWeight: "bold", marginRight: 8 }}>
                  Color:
                </label>
                <input
                  type="color"
                  value={stylesState[modal.tag][modal.bp].color}
                  onChange={(e) =>
                    handleStyleChange(
                      modal.tag,
                      modal.bp,
                      "color",
                      e.target.value
                    )
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
                <label style={{ fontWeight: "bold", marginRight: 8 }}>
                  Border:
                </label>
                <input
                  type="text"
                  value={stylesState[modal.tag][modal.bp].border}
                  onChange={(e) =>
                    handleStyleChange(
                      modal.tag,
                      modal.bp,
                      "border",
                      e.target.value
                    )
                  }
                  style={{ width: 120, marginRight: 16 }}
                  placeholder="e.g. 1px solid #0070f3"
                />
              </div>
              {/* Only show cascade button when editing Desktop */}
              {modal.bp === "Desktop" && (
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
          typeof window !== "undefined" ? document.body : undefined
        )}
    </>
  );
};

export default TagEditModal;
