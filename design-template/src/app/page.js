"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import {
  initialRowsPalette1,
  initialRowsPalette2,
  initialRowsPalette3,
} from "@/utils/colourPalettes";
import { allFonts, displayFonts, bodyFonts, fontMap } from "@/utils/fonts";
import { buildDefaultStyles } from "../components/FontScale/fontscale.helpers";
import SaveAndTabs from "@/components/Header/SaveAndTabs";
import PrimaryButton from "@/components/Buttons/PrimaryButton.component";
import SecondaryButton from "@/components/Buttons/SecondaryButton.component";
import TertiaryButton from "@/components/Buttons/TertiaryButton.component";
import Header from "@/components/Header/Header.component";
import { useTabOverrides } from "@/utils/tabOverrides";
import { defaultButtonState } from "@/utils/buttonState";

// All the states for the display
import useHeroImgState from "@/components/Hooks/HeroImg.state";
import useDescriptionState from "@/components/Hooks/Description.state";
import useCompaniesState from "@/components/Hooks/Companies.state";
import useTestimonialState from "@/components/Hooks/Testimonial.state";
import useThreeIconState from "@/components/Hooks/ThreeIcon.state";
import useFooterState from "@/components/Hooks/Footer.state";
import useContactState from "@/components/Hooks/Contact.state";
import ProjectInfo from "@/components/Header/ProjectInfo.component";
import DisplayPane from "./displayPane.component";
import LeftPane from "./leftPane.component";

export default function Home() {
  // State for editable input styles
  const [inputStyles, setInputStyles] = useState({
    input: {
      width: "100%",
      padding: "10px 14px",
      fontSize: 16,
      borderRadius: 0,
      border: "1.5px solid #6883a1",
      outline: "none",
      marginBottom: 0,
      background: "#f7f8fa",
      color: "#222",
      fontFamily: "inherit",
      boxSizing: "border-box",
      transition: "border 0.2s",
    },
    textarea: {
      width: "100%",
      padding: "10px 14px",
      fontSize: 16,
      borderRadius: 0,
      border: "1.5px solid #6883a1",
      outline: "none",
      marginBottom: 0,
      background: "#f7f8fa",
      color: "#222",
      fontFamily: "inherit",
      boxSizing: "border-box",
      minHeight: 60,
      resize: "vertical",
      transition: "border 0.2s",
    },
    checkbox: {
      accentColor: "#6883a1",
      width: 18,
      height: 18,
      borderRadius: 0,
      marginRight: 4,
    },
  });
  const { heroTitle, setHeroTitle, heroSubtitle, setHeroSubtitle } =
    useHeroImgState();
  const {
    descriptionTitle,
    descriptionDesc,
    setDescriptionTitle,
    setDescriptionDesc,
  } = useDescriptionState();
  const { companiesTrustedText, setCompaniesTrustedText } = useCompaniesState();
  const {
    testimonialQuote,
    setTestimonialQuote,
    testimonialAuthor,
    setTestimonialAuthor,
  } = useTestimonialState();
  const { threeIcons, setThreeIcons } = useThreeIconState();
  const { footerCopyright, footerLinks, setFooterCopyright, setFooterLinks } =
    useFooterState();
  const { contact, setContact } = useContactState();

  // Track the current project ID for update vs create
  const [projectId, setProjectId] = useState(null);
  // Modal state for Cards and Layouts preview

  // Hero image selection (static or uploaded)
  const [heroImgUrl, setHeroImgUrl] = useState("/Picture.jpg");
  // Per-tab color overrides using custom hook
  const tabCount = 3;
  const [footerOverrides, handleFooterColorChange] = useTabOverrides(tabCount);
  const [testimonialOverrides, handleTestimonialColorChange] =
    useTabOverrides(tabCount);
  const [heroImgOverrides, handleHeroImgColorChange] =
    useTabOverrides(tabCount);
  const [descriptionOverrides, handleDescriptionColorChange] =
    useTabOverrides(tabCount);
  const [companiesOverrides, handleCompaniesColorChange] =
    useTabOverrides(tabCount);
  const [threeIconsOverrides, handleThreeIconsColorChange] =
    useTabOverrides(tabCount);
  const [navbarOverrides, handleNavbarColorChange] = useTabOverrides(tabCount);
  // Tabs for template selection
  const [activeTab, setActiveTab] = useState(0); // 0: palette1, 1: palette2, 2: palette3

  // Color rows state for ColourPicker
  const [selectedFontSetIdx, setSelectedFontSetIdx] = useState(0);
  const [fontSets, setFontSets] = useState([
    { head: displayFonts[0], main: bodyFonts[0], extra: allFonts[0] },
    { head: displayFonts[1], main: bodyFonts[1], extra: allFonts[1] },
    { head: displayFonts[2], main: bodyFonts[2], extra: allFonts[2] },
  ]);
  const [palette1, setPalette1] = useState(initialRowsPalette1);
  const [palette2, setPalette2] = useState(initialRowsPalette2);
  const [palette3, setPalette3] = useState(initialRowsPalette3);

  // Only the current tab's palette is editable
  const palettes = [palette1, palette2, palette3];
  const setPalettes = [setPalette1, setPalette2, setPalette3];
  const selected = palettes[activeTab];
  const setSelected = setPalettes[activeTab];

  // Per-palette box shadow state
  const defaultBoxShadow = {
    x: 0,
    y: 2,
    blur: 8,
    spread: 0,
    color: "#222",
    alpha: 0.18,
    inset: false,
  };
  const [boxShadows, setBoxShadows] = useState([
    { ...defaultBoxShadow },
    { ...defaultBoxShadow },
    { ...defaultBoxShadow },
  ]);
  const boxShadow = boxShadows[activeTab];
  const setBoxShadow = (newShadow) => {
    setBoxShadows((prev) =>
      prev.map((s, i) => (i === activeTab ? { ...s, ...newShadow } : s)),
    );
  };

  const handleFontSetChange = (setIdx, type, value) => {
    setFontSets((prev) =>
      prev.map((set, i) => (i === setIdx ? { ...set, [type]: value } : set)),
    );
  };

  const handleSelectFontSet = (setIdx) => {
    setSelectedFontSetIdx(setIdx);
  };

  const selectedFontSet = fontSets[selectedFontSetIdx];

  const [spacingBase, setSpacingBase] = useState(1); // default 1rem
  const [spacingUnit, setSpacingUnit] = useState("rem");

  // Store button state for each palette tab
  const [primaryButtonStates, setPrimaryButtonStates] = useState([
    { ...defaultButtonState(initialRowsPalette1).primary },
    { ...defaultButtonState(initialRowsPalette2).primary },
    { ...defaultButtonState(initialRowsPalette3).primary },
  ]);
  const [secondaryButtonStates, setSecondaryButtonStates] = useState([
    { ...defaultButtonState(initialRowsPalette1).secondary },
    { ...defaultButtonState(initialRowsPalette2).secondary },
    { ...defaultButtonState(initialRowsPalette3).secondary },
  ]);
  const [tertiaryButtonStates, setTertiaryButtonStates] = useState([
    { ...defaultButtonState(initialRowsPalette1).tertiary },
    { ...defaultButtonState(initialRowsPalette2).tertiary },
    { ...defaultButtonState(initialRowsPalette3).tertiary },
  ]);
  const [tabButtonStates, setTabButtonStates] = useState([
    { ...defaultButtonState(initialRowsPalette1).tab },
    { ...defaultButtonState(initialRowsPalette2).tab },
    { ...defaultButtonState(initialRowsPalette3).tab },
  ]);

  useEffect(() => {
    setPrimaryButtonStates((prev) =>
      prev.map((state, idx) => {
        const def = defaultButtonState(palettes[idx]).primary;
        return {
          ...state,
          color: state.color === def.color ? def.color : state.color,
        };
      }),
    );
    setSecondaryButtonStates((prev) =>
      prev.map((state, idx) => {
        const def = defaultButtonState(palettes[idx]).secondary;
        return {
          ...state,
          color: state.color === def.color ? def.color : state.color,
        };
      }),
    );
    setTertiaryButtonStates((prev) =>
      prev.map((state, idx) => {
        const def = defaultButtonState(palettes[idx]).tertiary;
        return {
          ...state,
          color: state.color === def.color ? def.color : state.color,
        };
      }),
    );
    setTabButtonStates((prev) =>
      prev.map((state, idx) => {
        const def = defaultButtonState(palettes[idx]).tab;
        return {
          ...state,
          color: state.color === def.color ? def.color : state.color,
          padding:
            state.padding === undefined || state.padding === ""
              ? def.padding
              : state.padding,
        };
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palette1, palette2, palette3]);

  // Generic button property setter
  const setButtonProp = (type, prop, value) => {
    if (type === "primary") {
      setPrimaryButtonStates((prev) => {
        const copy = [...prev];
        copy[activeTab] = { ...copy[activeTab], [prop]: value };
        return copy;
      });
    } else if (type === "secondary") {
      setSecondaryButtonStates((prev) => {
        const copy = [...prev];
        copy[activeTab] = { ...copy[activeTab], [prop]: value };
        return copy;
      });
    } else if (type === "tertiary") {
      setTertiaryButtonStates((prev) => {
        const copy = [...prev];
        copy[activeTab] = { ...copy[activeTab], [prop]: value };
        return copy;
      });
    } else if (type === "tab") {
      setTabButtonStates((prev) => {
        const copy = [...prev];
        copy[activeTab] = { ...copy[activeTab], [prop]: value };
        return copy;
      });
    }
  };
  const tabProps = {
    ...tabButtonStates[activeTab],
    setColor: (c) => setButtonProp("tab", "color", c),
    setTextColor: (c) => setButtonProp("tab", "textColor", c),
    setRadius: (v) => setButtonProp("tab", "radius", v),
    setBorder: (v) => setButtonProp("tab", "border", v),
    setFontWeight: (v) => setButtonProp("tab", "fontWeight", v),
    setFontSize: (v) => setButtonProp("tab", "fontSize", v),
    setLetterSpacing: (v) => setButtonProp("tab", "letterSpacing", v),
    setBoxShadow: (v) => setButtonProp("tab", "boxShadow", v),
    setPadding: (v) => setButtonProp("tab", "padding", v),
    setTextTransform: (v) => setButtonProp("tab", "textTransform", v),
    setHoverBg: (v) => setButtonProp("tab", "hoverBg", v),
    setHoverText: (v) => setButtonProp("tab", "hoverText", v),
    setHoverBorder: (v) => setButtonProp("tab", "hoverBorder", v),
    setLineHeight: (v) => setButtonProp("tab", "lineHeight", v),
  };

  const primaryProps = {
    ...primaryButtonStates[activeTab],
    setColor: (c) => setButtonProp("primary", "color", c),
    setTextColor: (c) => setButtonProp("primary", "textColor", c),
    setRadius: (v) => setButtonProp("primary", "radius", v),
    setBorder: (v) => setButtonProp("primary", "border", v),
    setFontWeight: (v) => setButtonProp("primary", "fontWeight", v),
    setFontSize: (v) => setButtonProp("primary", "fontSize", v),
    setLetterSpacing: (v) => setButtonProp("primary", "letterSpacing", v),
    setBoxShadow: (v) => setButtonProp("primary", "boxShadow", v),
    setPadding: (v) => setButtonProp("primary", "padding", v),
    setTextTransform: (v) => setButtonProp("primary", "textTransform", v),
    setHoverBg: (v) => setButtonProp("primary", "hoverBg", v),
    setHoverText: (v) => setButtonProp("primary", "hoverText", v),
    setHoverBorder: (v) => setButtonProp("primary", "hoverBorder", v),
    setLineHeight: (v) => setButtonProp("primary", "lineHeight", v),
  };
  const secondaryProps = {
    ...secondaryButtonStates[activeTab],
    setColor: (c) => setButtonProp("secondary", "color", c),
    setTextColor: (c) => setButtonProp("secondary", "textColor", c),
    setRadius: (v) => setButtonProp("secondary", "radius", v),
    setBorder: (v) => setButtonProp("secondary", "border", v),
    setFontWeight: (v) => setButtonProp("secondary", "fontWeight", v),
    setFontSize: (v) => setButtonProp("secondary", "fontSize", v),
    setLetterSpacing: (v) => setButtonProp("secondary", "letterSpacing", v),
    setBoxShadow: (v) => setButtonProp("secondary", "boxShadow", v),
    setPadding: (v) => setButtonProp("secondary", "padding", v),
    setTextTransform: (v) => setButtonProp("secondary", "textTransform", v),
    setHoverBg: (v) => setButtonProp("secondary", "hoverBg", v),
    setHoverText: (v) => setButtonProp("secondary", "hoverText", v),
    setHoverBorder: (v) => setButtonProp("secondary", "hoverBorder", v),
    setLineHeight: (v) => setButtonProp("secondary", "lineHeight", v),
  };
  const tertiaryProps = {
    ...tertiaryButtonStates[activeTab],
    setColor: (c) => setButtonProp("tertiary", "color", c),
    setTextColor: (c) => setButtonProp("tertiary", "textColor", c),
    setRadius: (v) => setButtonProp("tertiary", "radius", v),
    setBorder: (v) => setButtonProp("tertiary", "border", v),
    setFontWeight: (v) => setButtonProp("tertiary", "fontWeight", v),
    setFontSize: (v) => setButtonProp("tertiary", "fontSize", v),
    setLetterSpacing: (v) => setButtonProp("tertiary", "letterSpacing", v),
    setBoxShadow: (v) => setButtonProp("tertiary", "boxShadow", v),
    setPadding: (v) => setButtonProp("tertiary", "padding", v),
    setTextTransform: (v) => setButtonProp("tertiary", "textTransform", v),
    setHoverBg: (v) => setButtonProp("tertiary", "hoverBg", v),
    setHoverText: (v) => setButtonProp("tertiary", "hoverText", v),
    setHoverBorder: (v) => setButtonProp("tertiary", "hoverBorder", v),
    setLineHeight: (v) => setButtonProp("tertiary", "lineHeight", v),
  };

  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const [logoUrl, setLogoUrl] = useState(null);
  const [logoWidth, setLogoWidth] = useState(150);
  const [logoHeight, setLogoHeight] = useState(150);
  const [radius, setRadius] = useState(0);
  const [projectTitle, setProjectTitle] = useState("");

  const backendUrl = process.env.NEXT_PUBLIC_BE_URL;
  const [base, setBase] = useState(1); // default 1rem
  const [unit, setUnit] = useState("rem");
  const [fontScaleStyles, setFontScaleStyles] = useState(buildDefaultStyles());

  // Handler to load a project (from Header dropdown or elsewhere)
  const handleProjectLoad = (project) => {
    setProjectId(project._id || null);
    setProjectTitle(project.title || "");
    setLogoUrl(project.logo || null);
    setRadius(project.borderRadius + "px" || 0);
    setFontSets([
      project.fontPicker1 || fontSets[0],
      project.fontPicker2 || fontSets[1],
      project.fontPicker3 || fontSets[2],
    ]);
    setPalette1(project.colourPicker1?.rows || initialRowsPalette1);
    setPalette2(project.colourPicker2?.rows || initialRowsPalette2);
    setPalette3(project.colourPicker3?.rows || initialRowsPalette3);
    setSpacingBase(project.spacingScale?.base || 1);
    setSpacingUnit(project.spacingScale?.unit || "rem");
    // Restore all shared text fields and boxShadows
    setHeroTitle(project.heroTitle || "ABC Company");
    setHeroSubtitle(project.heroSubtitle || "Your success is our priority");
    setDescriptionTitle(project.descriptionTitle || "About Our Company");
    setDescriptionDesc(
      project.descriptionDesc ||
        "We are dedicated to delivering innovative solutions and exceptional service to help your business thrive in a dynamic world.",
    );
    setTestimonialQuote(
      project.testimonialQuote ||
        "Working with this company was a fantastic experience. Their team went above and beyond to deliver results.",
    );
    setTestimonialAuthor(
      project.testimonialAuthor || "— Jennie J., CEO of Jenn Corp",
    );
    setCompaniesTrustedText(
      project.companiesTrustedText || "Trusted by 10+ companies",
    );
    setFooterCopyright(
      project.footerCopyright ||
        `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
    );
    setFooterLinks(
      project.footerLinks || [
        "Home",
        "About",
        "Contact",
        "Privacy Policy",
        "Terms & Conditions",
      ],
    );
    setThreeIcons(
      project.threeIcons || [
        {
          label: "Fast Delivery",
          desc: "We ensure quick and reliable delivery for all your needs.",
        },
        {
          label: "Quality Service",
          desc: "Our team is dedicated to providing top-notch service every time.",
        },
        {
          label: "Support 24/7",
          desc: "We are here to help you around the clock, whenever you need us.",
        },
      ],
    );
    setBoxShadows(
      project.boxShadows || [
        {
          x: 0,
          y: 2,
          blur: 8,
          spread: 0,
          color: "#222",
          alpha: 0.18,
          inset: false,
        },
        {
          x: 0,
          y: 2,
          blur: 8,
          spread: 0,
          color: "#222",
          alpha: 0.18,
          inset: false,
        },
        {
          x: 0,
          y: 2,
          blur: 8,
          spread: 0,
          color: "#222",
          alpha: 0.18,
          inset: false,
        },
      ],
    );
    setPrimaryButtonStates([
      project.primaryButton1 || defaultButtonState(palette1).primary,
      project.primaryButton2 || defaultButtonState(palette2).primary,
      project.primaryButton3 || defaultButtonState(palette3).primary,
    ]);
    setSecondaryButtonStates([
      project.secondaryButton1 || defaultButtonState(palette1).secondary,
      project.secondaryButton2 || defaultButtonState(palette2).secondary,
      project.secondaryButton3 || defaultButtonState(palette3).secondary,
    ]);
    setTertiaryButtonStates([
      project.tertiaryButton1 || defaultButtonState(palette1).tertiary,
      project.tertiaryButton2 || defaultButtonState(palette2).tertiary,
      project.tertiaryButton3 || defaultButtonState(palette3).tertiary,
    ]);
    setTabButtonStates([
      project.tabButton1 || defaultButtonState(palette1).tab,
      project.tabButton2 || defaultButtonState(palette2).tab,
      project.tabButton3 || defaultButtonState(palette3).tab,
    ]);
  };

  const displayText = {
    heroTitle,
    setHeroTitle,
    heroSubtitle,
    setHeroSubtitle,
    descriptionTitle,
    setDescriptionTitle,
    descriptionDesc,
    setDescriptionDesc,
    testimonialQuote,
    setTestimonialQuote,
    testimonialAuthor,
    setTestimonialAuthor,
    companiesTrustedText,
    setCompaniesTrustedText,
    threeIcons,
    setThreeIcons,
    contact,
    setContact,
    footerCopyright,
    setFooterCopyright,
    footerLinks,
    setFooterLinks,
  };

  const displayOverrides = {
    navbar: {
      overrides: navbarOverrides[activeTab],
      onColorChange: handleNavbarColorChange,
    },
    threeIcons: {
      overrides: threeIconsOverrides[activeTab],
      onColorChange: handleThreeIconsColorChange,
    },
    companies: {
      overrides: companiesOverrides[activeTab],
      onColorChange: handleCompaniesColorChange,
    },
    description: {
      overrides: descriptionOverrides[activeTab],
      onColorChange: handleDescriptionColorChange,
    },
    heroImg: {
      overrides: heroImgOverrides[activeTab],
      onColorChange: handleHeroImgColorChange,
    },
    testimonial: {
      overrides: testimonialOverrides[activeTab],
      onColorChange: handleTestimonialColorChange,
    },
    footer: {
      overrides: footerOverrides[activeTab],
      onColorChange: handleFooterColorChange,
    },
  };

  const displayButtons = {
    primaryButton: <PrimaryButton {...displayText} />,
    secondaryButton: <SecondaryButton {...displayText} />,
    tertiaryButton: <TertiaryButton {...displayText} />,
  };

  return (
    <div>
      <Header onProjectLoad={handleProjectLoad} />
      <ProjectInfo
        selected={selected}
        selectedFontSet={selectedFontSet}
        radius={radius}
        heroImgUrl={heroImgUrl}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        primaryProps={primaryProps}
        secondaryProps={secondaryProps}
        tertiaryProps={tertiaryProps}
      />
      <SaveAndTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        projectTitle={projectTitle}
        setProjectTitle={setProjectTitle}
        backendUrl={backendUrl}
        logoUrl={logoUrl}
        radius={radius}
        primaryButtonStates={primaryButtonStates}
        secondaryButtonStates={secondaryButtonStates}
        tertiaryButtonStates={tertiaryButtonStates}
        tabButtonStates={tabButtonStates}
        fontSets={fontSets}
        palette1={palette1}
        palette2={palette2}
        palette3={palette3}
        spacingBase={spacingBase}
        spacingUnit={spacingUnit}
        projectId={projectId}
        setProjectId={setProjectId}
        // Shared text values
        heroTitle={heroTitle}
        heroSubtitle={heroSubtitle}
        descriptionTitle={descriptionTitle}
        descriptionDesc={descriptionDesc}
        contact={contact}
        setContact={setContact}
        testimonialQuote={testimonialQuote}
        testimonialAuthor={testimonialAuthor}
        companiesTrustedText={companiesTrustedText}
        footerCopyright={footerCopyright}
        footerLinks={footerLinks}
        threeIcons={threeIcons}
        boxShadows={boxShadows}
      />

      <main className={styles.displayRoot}>
        <button
          className={styles.drawerToggle}
          onClick={() => setDrawerOpen((open) => !open)}
          aria-label={drawerOpen ? "Close panel" : "Open panel"}
        >
          {drawerOpen ? "←" : "→"}
        </button>
        {/* Left pane only visible when open */}
        {drawerOpen && (
          <LeftPane
            projectTitle={projectTitle}
            activeTab={activeTab}
            palette1={palette1}
            setPalette1={setPalette1}
            palette2={palette2}
            setPalette2={setPalette2}
            palette3={palette3}
            setPalette3={setPalette3}
            selected={selected}
            heroImgUrl={heroImgUrl}
            setHeroImgUrl={setHeroImgUrl}
            fontSets={fontSets}
            fontMap={fontMap}
            handleFontSetChange={handleFontSetChange}
            selectedFontSetIdx={selectedFontSetIdx}
            handleSelectFontSet={handleSelectFontSet}
            selectedFontSet={selectedFontSet}
            fontScaleStyles={fontScaleStyles}
            setFontScaleStyles={setFontScaleStyles}
            spacingBase={spacingBase}
            setSpacingBase={setSpacingBase}
            spacingUnit={spacingUnit}
            setSpacingUnit={setSpacingUnit}
            primaryProps={primaryProps}
            secondaryProps={secondaryProps}
            tertiaryProps={tertiaryProps}
            tabProps={tabProps}
            logoUrl={logoUrl}
            setLogoUrl={setLogoUrl}
            logoWidth={logoWidth}
            setLogoWidth={setLogoWidth}
            logoHeight={logoHeight}
            setLogoHeight={setLogoHeight}
            radius={radius}
            setRadius={setRadius}
            inputStyles={inputStyles}
            setInputStyles={setInputStyles}
            boxShadow={boxShadow}
            setBoxShadow={setBoxShadow}
            displayFonts={displayFonts}
            bodyFonts={bodyFonts}
            allFonts={allFonts}
          />
        )}
        {/* Right pane always underneath, responsive */}
        <DisplayPane
          selectedFontSet={selectedFontSet}
          selected={selected}
          displayButtons={displayButtons}
          displayText={displayText}
          displayOverrides={displayOverrides}
          primaryProps={primaryProps}
          secondaryProps={secondaryProps}
          tertiaryProps={tertiaryProps}
          logoUrl={logoUrl}
          logoWidth={logoWidth}
          logoHeight={logoHeight}
          radius={radius}
          fontScaleStyles={fontScaleStyles}
          base={base}
          unit={unit}
          heroImgUrl={heroImgUrl}
          threeIcons={threeIcons}
          inputStyles={inputStyles}
        />
      </main>
    </div>
  );
}
