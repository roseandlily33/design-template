import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import LoginModal from "../Login/LoginModal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
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

  // fetch user's projects when logged in
  useEffect(() => {
    if (!loggedIn) {
      setProjects([]);
      return;
    }
    (async () => {
      try {
        const res = await fetch(`${backendUrl}/api/projects`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load projects");
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.warn("Could not load projects:", err);
        setProjects([]);
      }
    })();
  }, [backendUrl, loggedIn]);
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

  // dropdown open state and refs for outside click
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const avatarRef = React.useRef(null);
  const dropdownRef = React.useRef(null);

  const toggleDropdown = () => setDropdownOpen((v) => !v);
  const closeDropdown = () => setDropdownOpen(false);

  // close when clicking outside
  React.useEffect(() => {
    function handleClick(e) {
      if (
        dropdownOpen &&
        avatarRef.current &&
        !avatarRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        closeDropdown();
      }
    }
    function handleKey(e) {
      if (e.key === "Escape") closeDropdown();
    }
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKey);
    };
  }, [dropdownOpen]);

  return (
    <header className={styles.headerRoot}>
      <div className={styles.title}>Design Template</div>
      {loggedIn ? (
        <div
          className={styles.profileWrap + (dropdownOpen ? ` ${styles.open}` : "")}
        >
          <button
            ref={avatarRef}
            className={styles.avatar}
            title={user?.email || "Account"}
            aria-haspopup="menu"
            aria-expanded={dropdownOpen}
            onClick={toggleDropdown}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleDropdown();
              }
            }}
          >
            {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
          </button>
          <div ref={dropdownRef} className={styles.dropdown} role="menu">
            <div className={styles.dropdownItem} role="menuitem">
              <strong>{user?.email || "User"}</strong>
            </div>
            <div className={styles.dropdownSection}>
              <div className={styles.dropdownSectionTitle}>Projects</div>
              {projects.length === 0 ? (
                <div className={styles.projectItem}>No projects</div>
              ) : (
                projects.map((p) => (
                  <div
                    key={p._id}
                    className={styles.projectItem}
                    tabIndex={0}
                    role="menuitem"
                    onClick={async () => {
                      try {
                        const res = await fetch(`${backendUrl}/api/project/${p._id}`, {
                          credentials: "include",
                        });
                        const data = await res.json();
                        if (!res.ok) throw new Error(data.error || "Load failed");
                        console.log("Loaded project:", data);
                        // temporary: notify user
                        alert(`Loaded project: ${data.title || p.title || p._id}`);
                        closeDropdown();
                      } catch (err) {
                        console.error(err);
                        alert(err.message || "Failed to load project");
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.click();
                    }}
                  >
                    {p.title || "Untitled"}
                  </div>
                ))
              )}
            </div>
            <div
              className={styles.dropdownItem}
              role="menuitem"
              tabIndex={0}
              onClick={() => alert("Share clicked")}
              onKeyDown={(e) => e.key === "Enter" && alert("Share clicked")}
            >
              Share
            </div>
            <div
              className={styles.dropdownItem}
              role="menuitem"
              tabIndex={0}
              onClick={() => {
                handleLogout();
                closeDropdown();
              }}
              onKeyDown={(e) => e.key === "Enter" && (handleLogout(), closeDropdown())}
            >
              Logout
            </div>
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
            onAuth={(u) => {
              handleAuth(u);
              closeDropdown();
            }}
          />
        </>
      )}
    </header>
  );
};

export default Header;
