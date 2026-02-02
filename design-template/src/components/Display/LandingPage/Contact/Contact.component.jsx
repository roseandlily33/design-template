import React, { useState } from "react";
import styles from "./Contact.module.css";
import PrimaryButton from "@/components/Buttons/PrimaryButton.component";

const Contact = ({
  headerFontClass,
  mainFontClass,
  borderRadius,
  spacingChart,
  fontScale = {},
  breakpoint = "Desktop",
  contact,
  setContact,
  primaryButton,
}) => {
  const titleColor = fontScale?.h2?.[breakpoint]?.color || "#222";
  const descColor = fontScale?.p?.[breakpoint]?.color || "#444";
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);

  const sectionStyle = spacingChart
    ? { padding: `${spacingChart.xl.css} ${spacingChart.m.css}` }
    : undefined;
  const formStyle = spacingChart
    ? { gap: spacingChart.m.css }
    : { gap: "1.5rem" };

  const handleChange = (field, value) => {
    if (setContact) setContact((prev) => ({ ...prev, [field]: value }));
  };

  const handleTitleClick = () => setContact && setEditingTitle(true);
  const handleDescClick = () => setContact && setEditingDesc(true);
  const handleTitleChange = (e) =>
    setContact && setContact((prev) => ({ ...prev, title: e.target.value }));
  const handleDescChange = (e) =>
    setContact && setContact((prev) => ({ ...prev, desc: e.target.value }));
  const handleTitleBlur = () => setEditingTitle(false);
  const handleDescBlur = () => setEditingDesc(false);
  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") setEditingTitle(false);
  };
  const handleDescKeyDown = (e) => {
    if (e.key === "Enter") setEditingDesc(false);
  };
  return (
    <section
      className={styles.contactSection}
      style={{ borderRadius: borderRadius, ...sectionStyle }}
    >
      {editingTitle ? (
        <input
          className={headerFontClass + " " + styles.title}
          value={contact?.title || ""}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          onKeyDown={handleTitleKeyDown}
          autoFocus
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            textAlign: "center",
            width: "100%",
            color: titleColor,
          }}
        />
      ) : (
        <h2
          className={headerFontClass + " " + styles.title}
          onClick={handleTitleClick}
          style={{
            cursor: setContact ? "pointer" : undefined,
            color: titleColor,
            textAlign: "center",
          }}
        >
          {contact?.title}
          <span
            style={{
              display: "block",
              fontSize: 14,
              color: "#888",
              marginTop: 4,
            }}
          ></span>
        </h2>
      )}
      {editingDesc ? (
        <input
          className={mainFontClass + " " + styles.desc}
          value={contact?.desc || ""}
          onChange={handleDescChange}
          onBlur={handleDescBlur}
          onKeyDown={handleDescKeyDown}
          autoFocus
          style={{
            fontSize: "1.1rem",
            textAlign: "center",
            width: "100%",
            color: descColor,
          }}
        />
      ) : (
        <p
          className={mainFontClass + " " + styles.desc}
          onClick={handleDescClick}
          style={{
            cursor: setContact ? "pointer" : undefined,
            color: descColor,
            textAlign: "center",
            marginBottom: spacingChart?.m.css || "1rem",
          }}
        >
          {contact?.desc}
        </p>
      )}
      <form className={styles.form} style={formStyle}>
        <input
          className={mainFontClass + " " + styles.input}
          type="text"
          placeholder="Your Name"
          value={contact?.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <input
          className={mainFontClass + " " + styles.input}
          type="email"
          placeholder="Your Email"
          value={contact?.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <textarea
          className={mainFontClass + " " + styles.textarea}
          placeholder="Your Message"
          value={contact?.message || ""}
          onChange={(e) => handleChange("message", e.target.value)}
        />
        <div>{primaryButton}</div>
      </form>
    </section>
  );
};

export default Contact;
