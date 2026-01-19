"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import SaveAndTabs from "../components/Header/SaveAndTabs";
// ...import other components as needed

export default function SharedProjectPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Comments state (must be before any early return)
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/shared-project/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load project");
        setProject(data);
      } catch (err) {
        setError(err.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!project) return <div>Project not found.</div>;

  // Simple in-memory comment section (not persisted)
  const handleAddComment = () => {
    if (!commentText.trim()) return;
    setComments((prev) => [...prev, { text: commentText, date: new Date() }]);
    setCommentText("");
  };

  return (
    <div>
      <SaveAndTabs
        activeTab={0}
        setActiveTab={() => {}}
        projectTitle={project.title}
        setProjectTitle={() => {}}
        backendUrl={process.env.NEXT_PUBLIC_BE_URL}
        logoUrl={project.logo}
        radius={project.borderRadius}
        primaryProps={project.primaryButton}
        secondaryProps={project.secondaryButton}
        tertiaryProps={project.tertiaryButton}
        fontSets={[
          project.fontPicker1,
          project.fontPicker2,
          project.fontPicker3,
        ]}
        palette1={project.colourPicker1?.rows}
        palette2={project.colourPicker2?.rows}
        palette3={project.colourPicker3?.rows}
        spacingBase={project.spacingScale?.base}
        spacingUnit={project.spacingScale?.unit}
        projectId={project._id}
        setProjectId={() => {}}
        isReadOnly={true}
        shared={true}
      />
      {/* Render the rest of the project UI in read-only mode here */}
      <div
        style={{
          maxWidth: 600,
          margin: "32px auto",
          background: "#f7fafd",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 2px 8px #0070f322",
        }}
      >
        <h3>Comments</h3>
        <div style={{ marginBottom: 16 }}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            style={{
              width: "100%",
              borderRadius: 8,
              border: "1px solid #ccc",
              padding: 8,
            }}
            disabled={false}
          />
          <button
            onClick={handleAddComment}
            style={{
              marginTop: 8,
              padding: "6px 18px",
              borderRadius: 6,
              background: "#6883a1",
              color: "#fff",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Add Comment
          </button>
        </div>
        <div>
          {comments.length === 0 ? (
            <div style={{ color: "#888" }}>No comments yet.</div>
          ) : (
            comments.map((c, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 12,
                  padding: 12,
                  background: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 1px 4px #0070f322",
                }}
              >
                <div style={{ fontSize: 15 }}>{c.text}</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                  {c.date.toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
