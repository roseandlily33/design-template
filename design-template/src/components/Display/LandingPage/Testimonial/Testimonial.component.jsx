import React, { useState, useEffect, useRef } from "react";
import styles from "./Testimonial.module.css";
import EditableWithColor from "../../Modal/EditableElement.component";


const Testimonial = ({
  mainFontClass,
  extraFontClass,
  colours = [],
  spacingChart,
  //overrides = {},
  //onColorChange,
  quote,
  setQuote,
  author,
  setAuthor,
  fontScale = {},
  breakpoint = "Desktop",
}) => {
  const [editingQuote, setEditingQuote] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(false);

  // Use fontScale color for quote (p) and author (h5), based on breakpoint
  const quoteColor = fontScale?.p?.[breakpoint]?.color || "#fff";
  const authorColor = fontScale?.h5?.[breakpoint]?.color || "#fff";

  const handleQuoteClick = () => setEditingQuote(true);
  const handleAuthorClick = () => setEditingAuthor(true);
  const handleQuoteChange = (e) => setQuote && setQuote(e.target.value);
  const handleAuthorChange = (e) => setAuthor && setAuthor(e.target.value);
  const handleQuoteBlur = () => setEditingQuote(false);
  const handleAuthorBlur = () => setEditingAuthor(false);
  const handleQuoteKeyDown = (e) => {
    if (e.key === "Enter") setEditingQuote(false);
  };
  const handleAuthorKeyDown = (e) => {
    if (e.key === "Enter") setEditingAuthor(false);
  };

  // inline fallback when CSS vars not present
  const cardStyle = spacingChart
    ? {
      padding: `${spacingChart.xxl.css} ${spacingChart.m.css} ${spacingChart.m.css} ${spacingChart.m.css}`,
    }
    : undefined;

  return (
    <section className={styles.testimonialSection}>
      <div className={styles.card} style={cardStyle}>
        {/*
        <EditableWithColor
          palettes={colours}
          initialColor={quoteColor}
          onSelect={(c) => {
            if (onColorChange) onColorChange("quote", c);
          }}
        >
        */}
        {editingQuote ? (
          <input
            className={mainFontClass + " " + styles.quote}
            value={quote}
            onChange={handleQuoteChange}
            onBlur={handleQuoteBlur}
            onKeyDown={handleQuoteKeyDown}
            autoFocus
            style={{
              fontSize: "1.25rem",
              fontStyle: "italic",
              textAlign: "center",
              width: "100%",
              color: quoteColor,
            }}
          />
        ) : (
          <blockquote
            className={mainFontClass + " " + styles.quote}
            onClick={handleQuoteClick}
            style={{ cursor: "pointer", color: quoteColor }}
          >
            &ldquo;{quote}&rdquo;
          </blockquote>
        )}
        {/*</EditableWithColor>*/}

        {/*
        <EditableWithColor
          palettes={colours}
          initialColor={authorColor}
          onSelect={(c) => {
            if (onColorChange) onColorChange("author", c);
          }}
        >
        */}
        {editingAuthor ? (
          <input
            className={extraFontClass + " " + styles.author}
            value={author}
            onChange={handleAuthorChange}
            onBlur={handleAuthorBlur}
            onKeyDown={handleAuthorKeyDown}
            autoFocus
            style={{
              fontSize: "1rem",
              textAlign: "center",
              width: "100%",
              color: authorColor,
            }}
          />
        ) : (
          <h5
            className={extraFontClass + " " + styles.author}
            onClick={handleAuthorClick}
            style={{ cursor: "pointer", color: authorColor }}
          >
            {author}
          </h5>
        )}
        {/*</EditableWithColor>*/}
      </div>
    </section>
  );
};

export default Testimonial;
