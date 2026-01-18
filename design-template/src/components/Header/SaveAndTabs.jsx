import React, { useState, useEffect, useRef } from "react";

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
  onProjectLoad, // callback to load a project into the app
  projectId,
  setProjectId,
}) => {
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [autosaveMessage, setAutosaveMessage] = useState("");
  const autosaveTimeout = useRef(null);

  // Save project function (shared by manual and autosave)
  const saveProject = async (isAutosave = false) => {
    if (!projectTitle.trim()) return;
    if (!backendUrl) return;
    if (!isAutosave) {
      setSaveMessage("");
      setSaving(true);
    }
    try {
      // fontScale: try to get from props or window if available, fallback to empty
      let fontScale = {};
      if (typeof window !== "undefined" && window.__fontScaleStyles) {
        fontScale = window.__fontScaleStyles;
      } else if (typeof fontScaleStyles !== "undefined") {
        fontScale = fontScaleStyles;
      }
      const project = {
        _id: projectId || undefined,
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
        fontScale,
      };

      const res = await fetch(`${backendUrl}/api/project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ project }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      // If a new project was created, update the projectId in parent
      if (data.project && data.project._id && setProjectId) {
        setProjectId(data.project._id);
      }
      if (isAutosave) {
        setAutosaveMessage("Autosaved");
        setTimeout(() => setAutosaveMessage(""), 2000);
      } else {
        setSaveMessage("Project saved");
      }
    } catch (err) {
      if (isAutosave) {
        setAutosaveMessage("Autosave failed");
      } else {
        setSaveMessage(err.message || "Save failed");
      }
    } finally {
      if (!isAutosave) setSaving(false);
    }
  };

  // Autosave effect (debounced)
  useEffect(() => {
    if (!projectTitle.trim()) return;
    if (autosaveTimeout.current) clearTimeout(autosaveTimeout.current);
    autosaveTimeout.current = setTimeout(() => {
      saveProject(true);
    }, 2000); // 2s debounce
    return () => {
      if (autosaveTimeout.current) clearTimeout(autosaveTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    projectTitle,
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
  ]);

  // Manual save button disables if no title
  const canSave = !!projectTitle.trim();

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "12px 32px",
        position: "relative",
      }}
    >
      {/* Visual indicator for current project name */}
      <div
        style={{
          position: "absolute",
          left: 32,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          fontWeight: 600,
          fontSize: 18,
          color: "#6883a1",
          letterSpacing: 0.5,
          background: "#f7fafd",
          borderRadius: 8,
          padding: "6px 18px",
          minWidth: 180,
          boxShadow: "0 1px 4px #0070f322",
        }}
        title="Current Project"
      >
        {projectTitle || "Untitled Project"}
      </div>
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
        onClick={() => saveProject(false)}
        disabled={saving || !canSave}
        style={{
          padding: "8px 14px",
          borderRadius: 8,
          background: canSave ? "#6883a1" : "#b0b8c1",
          color: "#fff",
          border: "none",
          cursor: canSave ? "pointer" : "not-allowed",
        }}
      >
        {saving ? "Saving..." : "Save Project"}
      </button>
      {saveMessage && (
        <div style={{ marginLeft: 12, color: "#222" }}>{saveMessage}</div>
      )}
      {autosaveMessage && !saveMessage && (
        <div style={{ marginLeft: 12, color: "#666", fontStyle: "italic" }}>
          {autosaveMessage}
        </div>
      )}
    </div>
  );
};

export default SaveAndTabs;
