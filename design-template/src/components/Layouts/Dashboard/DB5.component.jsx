import React from "react";

const DB5 = ({ colours, fonts, borderRadius, spacingBase, spacingUnit }) => {
  // Palette and sizing logic (reuse from C3)
  const greyBg =
    colours?.find((r) => r.label === "Grey")?.colors[1] || "#f5f6fa";
  const greyLight =
    colours?.find((r) => r.label === "Grey")?.colors[2] || "#f0f1f4";
  const greyMid =
    colours?.find((r) => r.label === "Grey")?.colors[3] || "#e0e3e8";
  const greyDark =
    colours?.find((r) => r.label === "Grey")?.colors[7] || "#888";
  const accent =
    colours?.find((r) => r.label !== "Grey")?.colors[4] || "#bada55";
  const pad = spacingBase ? spacingBase * 2 + spacingUnit : "2.5rem";
  const rad = borderRadius || 16;

  // Mock Kanban data
  const kanban = [
    {
      title: "To Do",
      tasks: ["Design login page", "Write API docs", "Fix bug #123"],
    },
    {
      title: "In Progress",
      tasks: ["Build dashboard UI", "Integrate payment gateway"],
    },
    {
      title: "Done",
      tasks: ["Set up database", "Deploy to staging"],
    },
  ];

  return (
    <div
      style={{
        background: greyBg,
        padding: pad,
        minWidth: 700,
        maxWidth: 980,
        minHeight: 500,
        fontFamily: fonts?.main || "inherit",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
        position: "relative",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          width: "100%",
          height: 56,
          background: accent,
          borderRadius: `${rad}px ${rad}px 0 0`,
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          padding: "0 32px",
          color: "#fff",
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: 0.5,
        }}
      >
        <span>Dashboard Navbar</span>
      </div>
      {/* Main content: sidebar + Kanban board */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 32,
          alignItems: "flex-start",
          width: "100%",
          minHeight: 400,
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            minWidth: 160,
            background: greyLight,
            borderRadius: `${rad}px`,
            padding: "32px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            fontWeight: 600,
            color: greyDark,
          }}
        >
          <div>Tasks</div>
          <div>Calendar</div>
          <div>Files</div>
          <div>Logout</div>
        </div>
        {/* Kanban board */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 24,
          }}
        >
          {kanban.map((col, idx) => (
            <div
              key={col.title}
              style={{
                background: "#fff",
                borderRadius: `${rad}px`,
                boxShadow: "0 2px 8px #0001",
                padding: "24px 20px",
                minHeight: 260,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 17,
                  color: accent,
                  marginBottom: 10,
                }}
              >
                {col.title}
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  color: greyDark,
                  fontSize: 15,
                  flex: 1,
                }}
              >
                {col.tasks.map((task, i) => (
                  <li
                    key={i}
                    style={{
                      background: greyMid,
                      borderRadius: 8,
                      padding: "10px 12px",
                      marginBottom: 8,
                      fontWeight: 500,
                    }}
                  >
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DB5;
