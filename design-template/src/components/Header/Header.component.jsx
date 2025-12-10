import React from "react";
import styles from "./Header.module.css";

const Header = () => {
    return (
        <header className={styles.headerRoot}>
            <div className={styles.title}>Design Template</div>
            <button className={styles.loginBtn}>Login</button>
        </header>
    );
};

export default Header;
