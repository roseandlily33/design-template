import React, { useRef, useEffect, useState } from "react";
import styles from "./Display.module.css";
import Navbar from "./LandingPage/Navbar/Navbar.component";
import HeroImage from "./LandingPage/HeroImg/HeroImg.component";
import Description from "./LandingPage/Description/Description.component";
import ThreeIcons from "./LandingPage/3Icons/3Icons.component";
import Companies from "./LandingPage/Companies/Companies.component";
import Testimonial from "./LandingPage/Testimonial/Testimonial.component";
import Footer from "./LandingPage/Footer/Footer.component";

const Display = ({
  logo,
  primaryButton,
  secondaryButton,
  tertiaryButton,
  typeScale,
  borderRadius,
  spacingChart,
  colours,
  fonts,
  fontMap,
}) => {
  // console.log(fonts);
  // console.log(logo);
  // console.log(borderRadius);
  console.log(colours);
  console.log(spacingChart);

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

  return (
    <div className={styles.displayRoot} ref={displayRef}>
      <p style={{ fontSize: 14, color: "#888", marginBottom: 8 }}>
        Size: {size.width}px × {size.height}px
      </p>
      {/* Navbar mockup */}
      <Navbar
        logo={logo}
        headerFontClass={headerFontClass}
        mainFontClass={mainFontClass}
        secondaryButton={secondaryButton}
        colours={colours}
      />
      <HeroImage
        primaryButton={primaryButton}
        headerFontClass={headerFontClass}
        mainFontClass={mainFontClass}
        colours={colours}
      />
      <Description
        secondaryButton={secondaryButton}
        tertiaryButton={tertiaryButton}
        headerFontClass={headerFontClass}
        mainFontClass={mainFontClass}
        colours={colours}
      />
      <ThreeIcons
        headerFontClass={headerFontClass}
        mainFontClass={mainFontClass}
        borderRadius={borderRadius}
        colours={colours}
      />
      <Companies
        mainFontClass={mainFontClass}
        extraFontClass={extraFontClass}
        colours={colours}
      />
      <Testimonial
        mainFontClass={mainFontClass}
        extraFontClass={extraFontClass}
        borderRadius={borderRadius}
        colours={colours}
      />
      <Footer
        logo={logo}
        headerFontClass={headerFontClass}
        mainFontClass={mainFontClass}
        colours={colours}
      />
    </div>
  );
};

export default Display;
