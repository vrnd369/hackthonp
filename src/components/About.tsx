import React, { useRef, useEffect, useState } from "react";
import styles from "./About.module.css";

const About: React.FC = () => {
  const headingRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    if (headingRef.current) observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <div className={styles.aboutContent}>
          <div className={`${styles.aboutText} animate-on-scroll`}>
            <h2
              ref={headingRef}
              className={`${styles.aboutHeading} ${
                inView ? styles.animateIn : ""
              }`}
            >
              <span className="emoji">💭</span> Discover the Analyst Within You
            </h2>
            <p className="section-description">
              The DataAnalyzer Pro Hackathon 2025 is a two-day global data
              challenge for students, analysts, and professionals who love
              turning numbers into narratives. You'll solve real-world problems
              using Python — no need for complex setups or our application
              (still in development). Just you, data, and your analytical
              mindset.
            </p>
          </div>

          <div className={`${styles.overviewGrid} grid grid-2`}>
            <div
              className={`${styles.overviewCard} card interactive-card animate-on-scroll glass`}
            >
              <div className={styles.cardHeader}>
                <h3>📅 Event Details</h3>
                <div className={styles.cardIcon}>🎯</div>
              </div>
              <div className={styles.detailList}>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>📅</div>
                  <div className={styles.detailContent}>
                    <strong>Date:</strong> August 22–23, 2025
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>🌐</div>
                  <div className={styles.detailContent}>
                    <strong>Format:</strong> 100% Virtual
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>⏱️</div>
                  <div className={styles.detailContent}>
                    <strong>Duration:</strong> 48 Hours
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>🐍</div>
                  <div className={styles.detailContent}>
                    <strong>Tools Allowed:</strong>{" "}
                    <span className="code-font">Python</span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>💰</div>
                  <div className={styles.detailContent}>
                    <strong>Entry Fee:</strong> Free or $10 (your choice)
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${styles.overviewCard} card interactive-card animate-on-scroll glass`}
            >
              <div className={styles.cardHeader}>
                <h3>👥 Who Can Join</h3>
                <div className={styles.cardIcon}>🌍</div>
              </div>
              <div className={styles.participantGrid}>
                <div className={styles.participantItem}>
                  <span className={styles.participantEmoji}>🎓</span>
                  <div className={styles.participantContent}>
                    <span className={styles.participantTitle}>Students</span>
                    <br />
                    <span className={styles.participantDesc}>
                      Learn by doing
                    </span>
                  </div>
                </div>
                <div className={styles.participantItem}>
                  <span className={styles.participantEmoji}>📊</span>
                  <div className={styles.participantContent}>
                    <span className={styles.participantTitle}>
                      Data Analysts
                    </span>
                    <br />
                    <span className={styles.participantDesc}>
                      Showcase skills
                    </span>
                  </div>
                </div>
                <div className={styles.participantItem}>
                  <span className={styles.participantEmoji}>💡</span>
                  <div className={styles.participantContent}>
                    <span className={styles.participantTitle}>
                      Data Enthusiasts
                    </span>
                    <br />
                    <span className={styles.participantDesc}>
                      Explore passion
                    </span>
                  </div>
                </div>
                <div className={styles.participantItem}>
                  <span className={styles.participantEmoji}>🌍</span>
                  <div className={styles.participantContent}>
                    <span className={styles.participantTitle}>
                      Global Community
                    </span>
                    <br />
                    <span className={styles.participantDesc}>
                      Connect worldwide
                    </span>
                  </div>
                </div>
              </div>
              <div className={`${styles.note} glass`}>
                <div className={styles.noteIcon}>💡</div>
                <div className={styles.noteContent}>
                  <strong>Note:</strong> Our platform is still in development —
                  no app usage required!
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.featuresShowcase} animate-on-scroll`}>
            <div className={`${styles.featureItem} floating`}>
              <div className={styles.featureIcon}>🚀</div>
              <h4>No Setup Required</h4>
              <p>
                Jump straight into analysis with your favorite Python
                environment
              </p>
            </div>
            <div className={`${styles.featureItem} floating`}>
              <div className={styles.featureIcon}>🎯</div>
              <h4>Real-World Data</h4>
              <p>
                Work with authentic datasets that mirror industry challenges
              </p>
            </div>
            <div className={`${styles.featureItem} floating`}>
              <div className={styles.featureIcon}>🏆</div>
              <h4>Global Recognition</h4>
              <p>
                Get featured on our platform and build your data science
                portfolio
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
