import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import LoginModal from "../Login/LoginModal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  // const [status, setStatus] = useState("Checking login status...");
  const backendUrl = process.env.NEXT_PUBLIC_BE_URL;
  console.log("Backend URL:", backendUrl);

  // Check login status on mount (try to get user info)
  useEffect(() => {
    fetch(`${backendUrl}/api/me`, { credentials: "include" })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not authenticated");
      })
      .then((data) => {
        setLoggedIn(true);
        setUser(data.user || null);
      })
      .catch(() => {
        setLoggedIn(false);
        setUser(null);
      });
  }, [backendUrl]);
  // useEffect(() => {
  //   fetch(`${backendUrl}/test-cors`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("CORS test response:", data);
  //       setStatus("CORS check complete.");
  //     })
  //     .catch((error) => {
  //       console.error("CORS test error:", error);
  //       setStatus("CORS check failed.");
  //     });
  // }, [backendUrl]);

  const handleAuth = (newUser) => {
    setUser(newUser || null);
    setLoggedIn(true);
  };

  const handleLogout = async () => {
    await fetch(`${backendUrl}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <header className={styles.headerRoot}>
      <div className={styles.title}>Design Template</div>
      {loggedIn ? (
        <div className={styles.profileWrap}>
          <div className={styles.avatar} title={user?.email || "Account"}>
            {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
          </div>
          <div className={styles.dropdown}>
            <div className={styles.dropdownItem}>
              <strong>{user?.email || "User"}</strong>
            </div>
            <div className={styles.dropdownItem} onClick={() => alert("Share clicked")}>Share</div>
            <div className={styles.dropdownItem} onClick={handleLogout}>Logout</div>
          </div>
        </div>
      ) : (
        <>
          <button
            className={styles.loginBtn}
            onClick={() => setShowModal(true)}
          >
            Login
          </button>
          <LoginModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onAuth={handleAuth}
          />
        </>
      )}
    </header>
  );
};

export default Header;
