import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropdownMenu = (
    <div className={styles.mobileDropdownMenu}>
      <a
        href="#about"
        className={styles.navLink}
        onClick={() => setIsMenuOpen(false)}
      >
        About
      </a>
      <a
        href="#tracks"
        className={styles.navLink}
        onClick={() => setIsMenuOpen(false)}
      >
        Tracks
      </a>
      <a
        href="#prizes"
        className={styles.navLink}
        onClick={() => setIsMenuOpen(false)}
      >
        Prizes
      </a>
      <a
        href="#register"
        className={`${styles.navLink} ${styles.btnNav}`}
        onClick={() => setIsMenuOpen(false)}
      >
        Register
      </a>
    </div>
  );

  return (
    <>
      <header className={`${styles.header} glass`}>
        <nav className={styles.nav}>
          <div className="container">
            <div className={styles.navContent}>
              <div className={`${styles.logo} floating`}>
                <img
                  src="/data sai logo png.png"
                  alt="DataAnalyzer Pro"
                  className={styles.logoImg}
                />
                <span className={styles.logoText}>DataAnalyzer Pro</span>
              </div>
              {/* Desktop Nav Links */}
              <div className={styles.navLinks}>
                <a href="#about" className={styles.navLink}>
                  About
                </a>
                <a href="#tracks" className={styles.navLink}>
                  Tracks
                </a>
                <a href="#prizes" className={styles.navLink}>
                  Prizes
                </a>
                <a
                  href="#register"
                  className={`${styles.navLink} ${styles.btnNav}`}
                >
                  Register
                </a>
              </div>
              {/* Hamburger Icon */}
              <div
                className={styles.mobileMenuToggle}
                onClick={() => setIsMenuOpen((open) => !open)}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* Mobile Dropdown Menu rendered via portal */}
      {isMenuOpen &&
        typeof window !== "undefined" &&
        ReactDOM.createPortal(dropdownMenu, document.body)}
    </>
  );
};

export default Header;
