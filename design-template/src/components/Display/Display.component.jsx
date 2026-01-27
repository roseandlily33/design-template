import React, { useRef, useEffect, useState, useMemo } from "react";
import styles from "./Display.module.css";
import Navbar from "./LandingPage/Navbar/Navbar.component";
import HeroImage from "./LandingPage/HeroImg/HeroImg.component";
import Description from "./LandingPage/Description/Description.component";
import ThreeIcons from "./LandingPage/3Icons/3Icons.component";
import Companies from "./LandingPage/Companies/Companies.component";
import Testimonial from "./LandingPage/Testimonial/Testimonial.component";
import Footer from "./LandingPage/Footer/Footer.component";
import { buildFontVarsCSS } from "./fontVars";
import { buildSpacingVars, buildSpacingChart } from "./spacingChart";

const Display = ({
  logo,
  logoWidth = 150,
  logoHeight = 150,
  // The buttons
  primaryButton,
  secondaryButton,
  tertiaryButton,
  borderRadius,
  colours,
  // For Fonts
  fonts,
  fontMap,
  fontScale,
  // For the spacing
  base = 1, // spacing base (from SpacingChart)
  unit = "rem", // spacing unit (from SpacingChart)
  navbarOverrides = {},
  onNavbarColorChange,
  threeIconsOverrides = {},
  onThreeIconsColorChange,
  companiesOverrides = {},
  onCompaniesColorChange,
  descriptionOverrides = {},
  onDescriptionColorChange,
  heroImgOverrides = {},
  onHeroImgColorChange,
  testimonialOverrides = {},
  onTestimonialColorChange,
  footerOverrides = {},
  onFooterColorChange,
  heroImgUrl,
  testimonialQuote,
  setTestimonialQuote,
  testimonialAuthor,
  setTestimonialAuthor,
  heroTitle,
  setHeroTitle,
  heroSubtitle,
  setHeroSubtitle,
  companiesTrustedText,
  setCompaniesTrustedText,
  descriptionTitle,
  setDescriptionTitle,
  descriptionDesc,
  setDescriptionDesc,
  threeIcons,
  setThreeIcons,
  footerCopyright,
  setFooterCopyright,
  footerLinks,
  setFooterLinks,
  breakpoint = "Desktop",
}) => {
  const spacingVars = buildSpacingVars(base, unit);
  const spacingChart = buildSpacingChart(base, unit);

  const headerFontClass =
    fontMap && fonts && fonts.head ? fontMap[fonts.head] : "";
  const mainFontClass =
    fontMap && fonts && fonts.main ? fontMap[fonts.main] : "";
  const extraFontClass =
    fontMap && fonts && fonts.extra ? fontMap[fonts.extra] : "";

  const displayRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      if (displayRef.current) {
        setSize({
          width: displayRef.current.offsetWidth,
          height: displayRef.current.offsetHeight,
        });
      }
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const fontVarsCSS = useMemo(() => buildFontVarsCSS(fontScale), [fontScale]);
  // console.log('Font var', fontVarsCSS);
  // console.log("Colours", colours);
  return (
    <div className={styles.displayRoot} ref={displayRef} style={spacingVars}>
      <style dangerouslySetInnerHTML={{ __html: fontVarsCSS }} />
      <p style={{ fontSize: 14, color: "#888", marginBottom: 8 }}>
        Size: {size.width}px × {size.height}px
      </p>
      {/* Navbar mockup */}
      <Navbar
        logo={logo}
        logoWidth={logoWidth}
        logoHeight={logoHeight}
        headerFontClass={headerFontClass}
        mainFontClass={mainFontClass}
        secondaryButton={secondaryButton}
        colours={colours}
        spacingChart={spacingChart}
        spacingBase={base}
        spacingUnit={unit}
        overrides={navbarOverrides}
        onColorChange={onNavbarColorChange}
      />
      <HeroImage
        primaryButton={primaryButton}
        headerFontClass={headerFontClass}
        mainFontClass={mainFontClass}
        colours={colours}
        spacingChart={spacingChart}
        //spacingBase={base}
        //spacingUnit={unit}
        //overrides={heroImgOverrides}
        //onColorChange={onHeroImgColorChange}
        heroImgUrl={heroImgUrl}
        heroTitle={heroTitle}
        setHeroTitle={setHeroTitle}
        heroSubtitle={heroSubtitle}
        setHeroSubtitle={setHeroSubtitle}
        fontScale={fontScale}
        breakpoint={breakpoint}
      />
      <Description
        secondaryButton={secondaryButton}
        tertiaryButton={tertiaryButton}
        headerFontClass={headerFontClass}
        mainFontClass={mainFontClass}
        colours={colours}
        spacingChart={spacingChart}
        //spacingBase={base}
        //spacingUnit={unit}
        //overrides={descriptionOverrides}
        //onColorChange={onDescriptionColorChange}
        descriptionTitle={descriptionTitle}
        setDescriptionTitle={setDescriptionTitle}
        descriptionDesc={descriptionDesc}
        setDescriptionDesc={setDescriptionDesc}
        fontScale={fontScale}
        breakpoint={breakpoint}
      />
      <ThreeIcons
        headerFontClass={headerFontClass}
        mainFontClass={mainFontClass}
        borderRadius={borderRadius}
        colours={colours}
        spacingChart={spacingChart}
        //spacingBase={base}
        //spacingUnit={unit}
        //overrides={threeIconsOverrides}
        //onColorChange={onThreeIconsColorChange}
        threeIcons={threeIcons}
        setThreeIcons={setThreeIcons}
        fontScale={fontScale}
        breakpoint={breakpoint}
      />
      <Companies
        mainFontClass={mainFontClass}
        extraFontClass={extraFontClass}
        colours={colours}
        spacingChart={spacingChart}
        spacingBase={base}
        spacingUnit={unit}
        overrides={companiesOverrides}
        onColorChange={onCompaniesColorChange}
        companiesTrustedText={companiesTrustedText}
        setCompaniesTrustedText={setCompaniesTrustedText}
      />
      <Testimonial
        mainFontClass={mainFontClass}
        extraFontClass={extraFontClass}
        borderRadius={borderRadius}
        colours={colours}
        spacingChart={spacingChart}
        //spacingBase={base}
        //spacingUnit={unit}
        //overrides={testimonialOverrides}
        //onColorChange={onTestimonialColorChange}
        quote={testimonialQuote}
        setQuote={setTestimonialQuote}
        author={testimonialAuthor}
        setAuthor={setTestimonialAuthor}
        fontScale={fontScale}
        breakpoint={breakpoint}
      />
      <Footer
        logo={logo}
        logoWidth={logoWidth}
        logoHeight={logoHeight}
        headerFontClass={headerFontClass}
        mainFontClass={mainFontClass}
        colours={colours}
        spacingChart={spacingChart}
        spacingBase={base}
        spacingUnit={unit}
        overrides={footerOverrides}
        onColorChange={onFooterColorChange}
        footerCopyright={footerCopyright}
        setFooterCopyright={setFooterCopyright}
        footerLinks={footerLinks}
        setFooterLinks={setFooterLinks}
      />
    </div>
  );
};

export default Display;
