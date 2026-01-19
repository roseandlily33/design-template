"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import SaveAndTabs from "../../../components/Header/SaveAndTabs";
import Cards from "../../../components/Cards/Cards.component";
import Layouts from "../../../components/Layouts/Layouts.component";
import Display from "../../../components/Display/Display.component";
import PrimaryButton from "../../../components/Buttons/PrimaryButton.component";
import SecondaryButton from "../../../components/Buttons/SecondaryButton.component";
import TertiaryButton from "../../../components/Buttons/TertiaryButton.component";
import Logo from "../../../components/Logo/Logo.component";
import styles from "../../page.module.css";
import { fontMap } from "../../../utils/fonts";

export default function SharedProjectPage() {
  const params = useParams();
  const { id } = params;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Tab state for shared view
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!id) return;
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BE_URL}/api/shared-project/${id}`,
        );
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

  // Defensive: convert numeric string props to valid CSS values
  const getCssValue = (val, unit = "px") => {
    if (val === undefined || val === null) return undefined;
    if (
      typeof val === "number" ||
      (typeof val === "string" && /^\d+(\.\d+)?$/.test(val))
    ) {
      return val + unit;
    }
    return val;
  };

  const fontSets = [
    project.fontPicker1,
    project.fontPicker2,
    project.fontPicker3,
  ];
  const palettes = [
    project.colourPicker1?.rows,
    project.colourPicker2?.rows,
    project.colourPicker3?.rows,
  ];
  const selectedFontSet = fontSets[activeTab] || {
    head: "",
    main: "",
    extra: "",
  };
  const selected = palettes[activeTab] || [];

  // Fix borderRadius for Display and ThreeIcons
  const radius = getCssValue(project.borderRadius, "px") || 0;
  const logoUrl = project.logo || null;
  const logoWidth = 150;
  const logoHeight = 150;
  const spacingBase = project.spacingScale?.base || 1;
  const spacingUnit = project.spacingScale?.unit || "rem";
  const fontScaleStyles = project.fontScale || {};

  // Defensive: fix button props for shared view
  const fixButtonProps = (btn) => {
    if (!btn) return {};
    return {
      ...btn,
      radius: getCssValue(btn.radius, "px"),
      fontSize: getCssValue(btn.fontSize),
      fontWeight: btn.fontWeight,
      letterSpacing: getCssValue(btn.letterSpacing, "px"),
      lineHeight:
        typeof btn.lineHeight === "number" ||
        (typeof btn.lineHeight === "string" &&
          /^\d+(\.\d+)?$/.test(btn.lineHeight))
          ? String(btn.lineHeight)
          : btn.lineHeight,
    };
  };
  const primaryProps = fixButtonProps(project.primaryButton);
  const secondaryProps = fixButtonProps(project.secondaryButton);
  const tertiaryProps = fixButtonProps(project.tertiaryButton);

  return (
    <div>
      <SaveAndTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        projectTitle={project.title}
        setProjectTitle={() => {}}
        backendUrl={process.env.NEXT_PUBLIC_BE_URL}
        logoUrl={logoUrl}
        radius={radius}
        primaryProps={project.primaryButton}
        secondaryProps={project.secondaryButton}
        tertiaryProps={project.tertiaryButton}
        fontSets={fontSets}
        palette1={project.colourPicker1?.rows}
        palette2={project.colourPicker2?.rows}
        palette3={project.colourPicker3?.rows}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        projectId={project._id}
        setProjectId={() => {}}
        isReadOnly={true}
        shared={true}
      />
      <main className={styles.displayRoot}>
        <div className={styles.rightPane}>
          <Display
            primaryButton={
              <PrimaryButton
                fontClass={selectedFontSet.main}
                colors={selected}
                edit={false}
                primaryProps={primaryProps}
              />
            }
            secondaryButton={
              <SecondaryButton
                fontClass={selectedFontSet.main}
                colors={selected}
                edit={false}
                secondaryProps={secondaryProps}
              />
            }
            tertiaryButton={
              <TertiaryButton
                fontClass={selectedFontSet.main}
                colors={selected}
                edit={false}
                tertiaryProps={tertiaryProps}
              />
            }
            logo={logoUrl}
            logoWidth={logoWidth}
            logoHeight={logoHeight}
            borderRadius={radius}
            colours={selected}
            fonts={selectedFontSet}
            fontMap={fontMap}
            fontScale={fontScaleStyles}
            base={spacingBase}
            unit={spacingUnit}
            heroImgUrl={project.heroImgUrl || "/Picture.jpg"}
            navbarOverrides={{}}
            onNavbarColorChange={() => {}}
            threeIconsOverrides={{}}
            onThreeIconsColorChange={() => {}}
            companiesOverrides={{}}
            onCompaniesColorChange={() => {}}
            descriptionOverrides={{}}
            onDescriptionColorChange={() => {}}
            heroImgOverrides={{}}
            onHeroImgColorChange={() => {}}
            testimonialOverrides={{}}
            onTestimonialColorChange={() => {}}
            footerOverrides={{}}
            onFooterColorChange={() => {}}
          />
        </div>
      </main>
      {/* <div
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
      </div> */}
    </div>
  );
}
