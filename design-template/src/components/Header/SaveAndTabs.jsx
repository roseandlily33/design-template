import React, { useState } from "react";

const SaveAndTabs = ({
  activeTab,
  setActiveTab,
  projectTitle,
  setProjectTitle,
  backendUrl,
  logoUrl,
  radius,
  primaryProps,
  secondaryProps,
  tertiaryProps,
  fontSets,
  palette1,
  palette2,
  palette3,
  spacingBase,
  spacingUnit,
}) => {
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "12px 32px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "12px 32px 0 32px",
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setActiveTab(0)}
            style={{
              padding: "6px 18px",
              borderRadius: 6,
              border: activeTab === 0 ? "2px solid #6883a1" : "1px solid #ccc",
              background: activeTab === 0 ? "#f7fafd" : "#fff",
              fontWeight: activeTab === 0 ? 700 : 400,
              cursor: "pointer",
            }}
          >
            Template 1
          </button>
          <button
            onClick={() => setActiveTab(1)}
            style={{
              padding: "6px 18px",
              borderRadius: 6,
              border: activeTab === 1 ? "2px solid #1976d2" : "1px solid #ccc",
              background: activeTab === 1 ? "#f7fafd" : "#fff",
              fontWeight: activeTab === 1 ? 700 : 400,
              cursor: "pointer",
            }}
          >
            Template 2
          </button>
          <button
            onClick={() => setActiveTab(2)}
            style={{
              padding: "6px 18px",
              borderRadius: 6,
              border: activeTab === 2 ? "2px solid #ff9800" : "1px solid #ccc",
              background: activeTab === 2 ? "#f7fafd" : "#fff",
              fontWeight: activeTab === 2 ? 700 : 400,
              cursor: "pointer",
            }}
          >
            Template 3
          </button>
        </div>
      </div>
      <input
        aria-label="Project title"
        placeholder="Project title"
        value={projectTitle}
        onChange={(e) => setProjectTitle(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #ddd",
          minWidth: 220,
        }}
      />
      <button
        onClick={async () => {
          setSaveMessage("");
          setSaving(true);
          try {
            const project = {
              title: projectTitle || `Untitled ${new Date().toISOString()}`,
              borderRadius: radius,
              logo: logoUrl || null,
              primaryButton: { ...primaryProps },
              secondaryButton: { ...secondaryProps },
              tertiaryButton: { ...tertiaryProps },
              fontPicker1: {
                head: fontSets[0]?.head,
                main: fontSets[0]?.main,
                extra: fontSets[0]?.extra,
              },
              fontPicker2: {
                head: fontSets[1]?.head,
                main: fontSets[1]?.main,
                extra: fontSets[1]?.extra,
              },
              fontPicker3: {
                head: fontSets[2]?.head,
                main: fontSets[2]?.main,
                extra: fontSets[2]?.extra,
              },
              colourPicker1: { rows: palette1 },
              colourPicker2: { rows: palette2 },
              colourPicker3: { rows: palette3 },
              spacingScale: { base: spacingBase, unit: spacingUnit },
              fontScale: {},
            };

            const res = await fetch(`${backendUrl}/api/project`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ project }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Save failed");
            setSaveMessage("Project saved");
          } catch (err) {
            console.error("Save error", err);
            setSaveMessage(err.message || "Save failed");
          } finally {
            setSaving(false);
          }
        }}
        disabled={saving}
        style={{
          padding: "8px 14px",
          borderRadius: 8,
          background: "#6883a1",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {saving ? "Saving..." : "Save Project"}
      </button>
      {saveMessage && (
        <div style={{ marginLeft: 12, color: "#222" }}>{saveMessage}</div>
      )}
    </div>
  );
};

export default SaveAndTabs;
