import React from "react";
import styles from "./Judging.module.css";

const Judging: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.judgingContent}>
          <div className={`${styles.judgingInfo} animate-on-scroll`}>
            <h2 className={styles.judgingHeading}>📌 Judging Criteria</h2>
            <p>
              Your submission will be evaluated based on these key factors that
              define exceptional data analysis:
            </p>

            <div className={styles.criteriaList}>
              <div
                className={`${styles.criteriaItem} interactive-card glass animate-on-scroll`}
              >
                <div className={`${styles.criteriaIcon} floating`}>💡</div>
                <div className={styles.criteriaContent}>
                  <h4>Clarity & Depth of Insight</h4>
                  <p>
                    How well do you extract and communicate meaningful insights
                    from the data?
                  </p>
                  <div className={styles.criteriaWeight}>Weight: 25%</div>
                </div>
              </div>

              <div
                className={`${styles.criteriaItem} interactive-card glass animate-on-scroll`}
              >
                <div className={`${styles.criteriaIcon} floating`}>🎨</div>
                <div className={styles.criteriaContent}>
                  <h4>Creativity in Data Storytelling</h4>
                  <p>
                    How innovative and engaging is your approach to presenting
                    data narratives?
                  </p>
                  <div className={styles.criteriaWeight}>Weight: 20%</div>
                </div>
              </div>

              <div
                className={`${styles.criteriaItem} interactive-card glass animate-on-scroll`}
              >
                <div className={`${styles.criteriaIcon} floating`}>🌍</div>
                <div className={styles.criteriaContent}>
                  <h4>Real-world Applicability</h4>
                  <p>
                    How practical and actionable are your insights for
                    real-world scenarios?
                  </p>
                  <div className={styles.criteriaWeight}>Weight: 25%</div>
                </div>
              </div>

              <div
                className={`${styles.criteriaItem} interactive-card glass animate-on-scroll`}
              >
                <div className={`${styles.criteriaIcon} floating`}>📊</div>
                <div className={styles.criteriaContent}>
                  <h4>Presentation Quality</h4>
                  <p>
                    How well-structured and professional is your final
                    presentation?
                  </p>
                  <div className={styles.criteriaWeight}>Weight: 20%</div>
                </div>
              </div>

              <div
                className={`${styles.criteriaItem} interactive-card glass animate-on-scroll`}
              >
                <div className={`${styles.criteriaIcon} floating`}>✨</div>
                <div className={styles.criteriaContent}>
                  <h4>Simplicity & Elegance</h4>
                  <p>
                    How effectively do you balance complexity with clarity and
                    elegance?
                  </p>
                  <div className={styles.criteriaWeight}>Weight: 10%</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={`${styles.whyJoin} glass animate-on-scroll`}>
              <h2 className={styles.whyJoinHeading}>📢 Why You Should Join</h2>
              <div className={styles.benefitsList}>
                <div className={`${styles.benefit} interactive-card`}>
                  <span className={`${styles.benefitIcon} floating`}>🧠</span>
                  <div className={styles.benefitText}>
                    <span className={styles.benefitTitle}>
                      Strengthen Your Skills
                    </span>
                    <br />
                    <span className={styles.benefitDesc}>
                      Enhance analytical thinking
                    </span>
                  </div>
                </div>
                <div className={`${styles.benefit} interactive-card`}>
                  <span className={`${styles.benefitIcon} floating`}>🌎</span>
                  <div className={styles.benefitText}>
                    <span className={styles.benefitTitle}>
                      Global Community
                    </span>
                    <br />
                    <span className={styles.benefitDesc}>
                      Connect with data professionals
                    </span>
                  </div>
                </div>
                <div className={`${styles.benefit} interactive-card`}>
                  <span className={`${styles.benefitIcon} floating`}>💼</span>
                  <div className={styles.benefitText}>
                    <span className={styles.benefitTitle}>
                      Career Recognition
                    </span>
                    <br />
                    <span className={styles.benefitDesc}>
                      Showcase your talent
                    </span>
                  </div>
                </div>
                <div className={`${styles.benefit} interactive-card`}>
                  <span className={`${styles.benefitIcon} floating`}>🚀</span>
                  <div className={styles.benefitText}>
                    <span className={styles.benefitTitle}>Be a Founder</span>
                    <br />
                    <span className={styles.benefitDesc}>
                      Join our journey from day one
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.judgingPanel} glass animate-on-scroll`}>
              <h3>👨‍💼 Expert Judges</h3>
              <div className={styles.judgesInfo}>
                <div className={styles.judgeItem}>
                  <div className={styles.judgeAvatar}>👨‍💻</div>
                  <div className={styles.judgeDetails}>
                    <span className={styles.judgeName}>Industry Experts</span>
                    <br />
                    <span className={styles.judgeRole}>
                      Data Science Leaders
                    </span>
                  </div>
                </div>
                <div className={styles.judgeItem}>
                  <div className={styles.judgeAvatar}>👩‍🔬</div>
                  <div className={styles.judgeDetails}>
                    <span className={styles.judgeName}>Academic Panel</span>
                    <br />
                    <span className={styles.judgeRole}>
                      Research Professionals
                    </span>
                  </div>
                </div>
                <div className={styles.judgeItem}>
                  <div className={styles.judgeAvatar}>🏢</div>
                  <div className={styles.judgeDetails}>
                    <span className={styles.judgeName}>DataAnalyzer Pro</span>
                    <br />
                    <span className={styles.judgeRole}>Founding Team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Judging;
