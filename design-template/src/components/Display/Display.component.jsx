import React, { useRef, useEffect, useState, useMemo } from "react";
import styles from "./Display.module.css";
import Navbar from "./LandingPage/Navbar/Navbar.component";
import BackgroundSelector from "./BackgroundSelector/BackgroundSelector.component";
import HeroImage from "./LandingPage/HeroImg/HeroImg.component";
import Description from "./LandingPage/Description/Description.component";
import ThreeIcons from "./LandingPage/3Icons/3Icons.component";
import Companies from "./LandingPage/Companies/Companies.component";
import Testimonial from "./LandingPage/Testimonial/Testimonial.component";
import Contact from "./LandingPage/Contact/Contact.component";
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
  companiesOverrides = {},
  onCompaniesColorChange,
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
  contact,
  setContact,
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

  const sharedProps = {
    colours,
    headerFontClass,
    mainFontClass,
    spacingChart,
    fontScale,
    spacingBase: spacingVars,
    spacingUnit: unit,
    breakpoint,
    borderRadius,
  };

  // Background selection state for each section
  const sectionKeys = [
    "navbar",
    "hero",
    "description",
    "threeicons",
    "companies",
    "testimonial",
    "contact",
    "footer",
  ];
  const [bgSelectorVisible, setBgSelectorVisible] = useState(false);
  const [backgrounds, setBackgrounds] = useState(() =>
    Object.fromEntries(sectionKeys.map(k => [k, "#fff"]))
  );
  const handleBgChange = (key, color) => {
    setBackgrounds(prev => ({ ...prev, [key]: color }));
  };

  // Section registry for dynamic layout
  const sections = [
    {
      Component: Navbar,
      key: "navbar",
      props: {
        logo,
        logoWidth,
        logoHeight,
        secondaryButton,
        overrides: navbarOverrides,
        onColorChange: onNavbarColorChange,
        background: backgrounds.navbar,
      },
    },
    {
      Component: HeroImage,
      key: "hero",
      props: {
        primaryButton,
        heroImgUrl,
        heroTitle,
        setHeroTitle,
        heroSubtitle,
        setHeroSubtitle,
        background: backgrounds.hero,
      },
    },
    {
      Component: Description,
      key: "description",
      props: {
        secondaryButton,
        tertiaryButton,
        descriptionTitle,
        setDescriptionTitle,
        descriptionDesc,
        setDescriptionDesc,
        background: backgrounds.description,
      },
    },
    {
      Component: ThreeIcons,
      key: "threeicons",
      props: {
        threeIcons,
        setThreeIcons,
        fontScale,
        breakpoint,
        background: backgrounds.threeicons,
      },
    },
    {
      Component: Companies,
      key: "companies",
      props: {
        overrides: companiesOverrides,
        onColorChange: onCompaniesColorChange,
        companiesTrustedText,
        setCompaniesTrustedText,
        background: backgrounds.companies,
      },
    },
    {
      Component: Testimonial,
      key: "testimonial",
      props: {
        quote: testimonialQuote,
        setQuote: setTestimonialQuote,
        author: testimonialAuthor,
        setAuthor: setTestimonialAuthor,
        background: backgrounds.testimonial,
      },
    },
    {
      Component: Contact,
      key: "contact",
      props: {
        primaryButton,
        contact,
        setContact,
        onColorChange: onCompaniesColorChange,
        background: backgrounds.contact,
      },
    },
    {
      Component: Footer,
      key: "footer",
      props: {
        logo,
        logoWidth,
        logoHeight,
        overrides: footerOverrides,
        onColorChange: onFooterColorChange,
        footerCopyright,
        setFooterCopyright,
        footerLinks,
        setFooterLinks,
        background: backgrounds.footer,
      },
    },
  ];

  return (
    <div className={styles.displayRoot} ref={displayRef} style={spacingVars}>
      <style dangerouslySetInnerHTML={{ __html: fontVarsCSS }} />
      <BackgroundSelector
        colours={colours}
        onChange={handleBgChange}
        visible={bgSelectorVisible}
        setVisible={setBgSelectorVisible}
        backgrounds={backgrounds}
      />
      <p style={{ fontSize: 14, color: "#888", marginBottom: 8 }}>
        Size: {size.width}px × {size.height}px
      </p>
      {sections?.map(({ Component, key, props }) => (
        <Component key={key} {...sharedProps} {...props} />
      ))}
    </div>
  );
};

export default Display;
