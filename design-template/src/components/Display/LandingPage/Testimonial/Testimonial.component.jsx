import React, { useState, useEffect, useRef } from "react";
import styles from "./Testimonial.module.css";
import EditableWithColor from "../../Modal/EditableElement.component";

const Testimonial = ({
  mainFontClass,
  extraFontClass,
  colours = [],
  spacingChart,
  overrides = {},
  onColorChange,
}) => {
  const [editingQuote, setEditingQuote] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(false);
  const [quote, setQuote] = useState(
    "Working with this company was a fantastic experience. Their team went above and beyond to deliver results."
  );
  const [author, setAuthor] = useState("— Jamie L., CEO of Acme Corp");

  // Helper to get palette color by label and index
  const getPaletteColor = (label, idx = 0) => {
    const row = Array.isArray(colours)
      ? colours.find(
          (r) => r.label && r.label.toLowerCase() === label.toLowerCase()
        )
      : null;
    return row && Array.isArray(row.colors) && row.colors[idx]
      ? row.colors[idx]
      : undefined;
  };

  // Palette defaults
  const defaultQuoteColor =
    getPaletteColor("Grey", 5) || getPaletteColor("Grey", 6) || "#fff";
  const defaultAuthorColor =
    getPaletteColor("Main", 1) || getPaletteColor("Main", 3) || "#fff";

  // Compute colors directly from overrides and palette
  const quoteColor = overrides.quote ?? defaultQuoteColor;
  const authorColor = overrides.author ?? defaultAuthorColor;

  const handleQuoteClick = () => setEditingQuote(true);
  const handleAuthorClick = () => setEditingAuthor(true);
  const handleQuoteChange = (e) => setQuote(e.target.value);
  const handleAuthorChange = (e) => setAuthor(e.target.value);
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
        <EditableWithColor
          palettes={colours}
          initialColor={quoteColor}
          onSelect={(c) => {
            if (onColorChange) onColorChange("quote", c);
          }}
        >
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
        </EditableWithColor>

        <EditableWithColor
          palettes={colours}
          initialColor={authorColor}
          onSelect={(c) => {
            if (onColorChange) onColorChange("author", c);
          }}
        >
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
        </EditableWithColor>
      </div>
    </section>
  );
};

export default Testimonial;
