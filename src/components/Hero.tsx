import React from "react";
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <video autoPlay loop muted playsInline className={styles.heroVideo}>
        <source src="/hero-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={`${styles.heroContent} text-center`}>
        <div className={`${styles.heroBadge} floating animate-on-scroll`}>
          <span className="emoji">🚀</span>
          <span>Virtual Hackathon 2025</span>
        </div>
        <h1 className={styles.heroTitle}>
          <span className={styles.textGradient}>DataAnalyzer Pro</span>
          <br />
          <span className={styles.heroSubtitleText}>Hackathon 2025</span>
        </h1>
        <p className={`${styles.heroSubtitle} animate-on-scroll`}>
          "Think Like an Analyst. Present Like a Pro."
        </p>
        <p className={`${styles.heroDescription} animate-on-scroll`}>
          A 48-hour virtual hackathon where aspiring data professionals turn raw
          data into real-world insights — using the power of Python.
        </p>
        <div className={styles.heroMeta}>
          <div className={`${styles.metaItem} interactive-card`}>
            <span className="emoji">🗓</span>
            <div className={styles.metaContent}>
              <span className={styles.metaLabel}>Date</span>
              <span className={styles.metaValue}>July 25–26, 2025</span>
            </div>
          </div>
          <div className={`${styles.metaItem} interactive-card`}>
            <span className="emoji">🌐</span>
            <div className={styles.metaContent}>
              <span className={styles.metaLabel}>Format</span>
              <span className={styles.metaValue}>100% Virtual</span>
            </div>
          </div>
          <div className={`${styles.metaItem} interactive-card`}>
            <span className="emoji">💻</span>
            <div className={styles.metaContent}>
              <span className={styles.metaLabel}>Tools</span>
              <span className={`${styles.metaValue} code-font`}>
                Python Only
              </span>
            </div>
          </div>
        </div>
        <div className={`${styles.heroActions} animate-on-scroll`}>
          <a href="#register" className={styles.heroBtn}>
            <span>Register Now</span>
            <span>&rarr;</span>
          </a>
          <a href="#about" className={styles.heroBtnOutline}>
            <span>Learn More</span>
          </a>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>48</div>
            <div className={styles.statLabel}>HOURS</div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>$500+</div>
            <div className={styles.statLabel}>PRIZES</div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>Global</div>
            <div className={styles.statLabel}>COMMUNITY</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
