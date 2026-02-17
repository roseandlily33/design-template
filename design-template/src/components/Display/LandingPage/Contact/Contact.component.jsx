import React, { useState } from "react";
import styles from "./Contact.module.css";
import PrimaryButton from "@/components/Buttons/PrimaryButton.component";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = ({
    headerFontClass,
    mainFontClass,
    borderRadius,
    spacingChart,
    fontScale = {},
    breakpoint = "Desktop",
    contact,
    setContact,
    inputStyles,
    primaryButton,
    background,
}) => {
    const accent = inputStyles?.input?.border?.split(" ").pop() || "#6883a1";
    const grey = ["#eee", "#ccc", "#888", "#222"];
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
            style={{
                ...sectionStyle,
                ...(background ? { background } : {}),
                ...(borderRadius ? { borderRadius } : {}),
            }}
        >
            <div className={styles.splitContainer}>
                {/* Left: Form (2/3) */}
                <div className={styles.formPane}>
                    {editingTitle ? (
                        <input
                            className={headerFontClass + " " + styles.title}
                            value={contact?.title || ""}
                            onChange={handleTitleChange}
                            onBlur={handleTitleBlur}
                            onKeyDown={handleTitleKeyDown}
                            autoFocus
                            style={{
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
                                marginBottom: spacingChart?.m.css || "1rem",
                            }}
                        >
                            {contact?.desc}
                        </p>
                    )}
                    <form className={styles.form} style={formStyle}>
                        <label className={styles.inputLabel} htmlFor="contact-name">Name</label>
                        <input
                            id="contact-name"
                            className={mainFontClass + " " + styles.input}
                            type="text"
                            placeholder="Your Name"
                            value={contact?.name || ""}
                            onChange={(e) => handleChange("name", e.target.value)}
                            style={inputStyles?.input}
                        />
                        <label className={styles.inputLabel} htmlFor="contact-email">Email</label>
                        <input
                            id="contact-email"
                            className={mainFontClass + " " + styles.input}
                            type="email"
                            placeholder="Your Email"
                            value={contact?.email || ""}
                            onChange={(e) => handleChange("email", e.target.value)}
                            style={inputStyles?.input}
                        />
                        <label className={styles.inputLabel} htmlFor="contact-message">Message</label>
                        <textarea
                            id="contact-message"
                            className={mainFontClass + " " + styles.textarea}
                            placeholder="Your Message"
                            value={contact?.message || ""}
                            onChange={(e) => handleChange("message", e.target.value)}
                            style={inputStyles?.textarea}
                        />
                        <div>{primaryButton}</div>
                    </form>
                </div>
                {/* Right: Sidebar (1/3) */}
                <div className={styles.infoPane} style={{ borderRadius }}>
                    <div className={styles.infoBlock}>
                        <FaMapMarkerAlt className={styles.infoIcon} style={{ color: accent }} />
                        <div>
                            <div className={styles.infoLabel} style={{ color: accent }}>Address</div>
                            <div className={styles.infoValue} style={{ color: grey[3] || '#222' }}>123 Main St, Toronto, ON</div>
                        </div>
                    </div>
                    <div className={styles.infoBlock}>
                        <FaPhoneAlt className={styles.infoIcon} style={{ color: accent }} />
                        <div>
                            <div className={styles.infoLabel} style={{ color: accent }}>Phone</div>
                            <div className={styles.infoValue} style={{ color: grey[3] || '#222' }}>(416) 555-1234</div>
                        </div>
                    </div>
                    <div className={styles.infoBlock}>
                        <FaEnvelope className={styles.infoIcon} style={{ color: accent }} />
                        <div>
                            <div className={styles.infoLabel} style={{ color: accent }}>Email</div>
                            <div className={styles.infoValue} style={{ color: grey[3] || '#222' }}>hello@company.com</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
