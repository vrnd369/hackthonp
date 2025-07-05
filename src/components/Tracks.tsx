import React, { useRef, useEffect, useState } from "react";
import styles from "./Tracks.module.css";

const Tracks: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
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
    <section id="tracks" className={`section ${styles.tracksSection}`}>
      <div className="container">
        <div className={styles.textCenter + " animate-on-scroll"}>
          <h2
            ref={headingRef}
            className={
              styles.tracksHeading +
              " " +
              (inView ? styles.tracksHeadingAnimated : "")
            }
          >
            🏁 Hackathon Tracks
          </h2>
          <p className={"section-description"}>
            Explore one or more of our exciting tracks and showcase your
            analytical prowess
          </p>
        </div>

        <div className={`${styles.tracksGrid} grid grid-3`}>
          <div
            className={`${styles.trackCard} card interactive-card animate-on-scroll glass`}
          >
            <div className={styles.trackHeader}>
              <span className={`${styles.trackEmoji} floating`}>🏆</span>
              <div className={`${styles.trackBadge} ${styles.popular}`}>
                Popular
              </div>
            </div>
            <h3>Data Storytelling Olympics</h3>
            <p>
              Turn complex data into simple, powerful stories that anyone can
              understand and act upon.
            </p>
            <div className={styles.trackFeatures}>
              <div className={styles.featureTag}>📊 Visualization</div>
              <div className={styles.featureTag}>📝 Narrative</div>
              <div className={styles.featureTag}>🎯 Impact</div>
            </div>
            <div className={styles.trackDifficulty}>
              <span className={styles.difficultyLabel}>Difficulty:</span>
              <div className={styles.difficultyBars}>
                <div className={`${styles.bar} ${styles.active}`}></div>
                <div className={`${styles.bar} ${styles.active}`}></div>
                <div className={styles.bar}></div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.trackCard} card interactive-card animate-on-scroll glass`}
          >
            <div className={styles.trackHeader}>
              <span className={`${styles.trackEmoji} floating`}>⚔️</span>
              <div className={`${styles.trackBadge} ${styles.challenge}`}>
                Challenge
              </div>
            </div>
            <h3>Insight Battle Royale</h3>
            <p>
              Compete head-to-head to find the most impactful insights from
              challenging datasets.
            </p>
            <div className={styles.trackFeatures}>
              <div className={styles.featureTag}>🔍 Analysis</div>
              <div className={styles.featureTag}>⚡ Speed</div>
              <div className={styles.featureTag}>🏆 Competition</div>
            </div>
            <div className={styles.trackDifficulty}>
              <span className={styles.difficultyLabel}>Difficulty:</span>
              <div className={styles.difficultyBars}>
                <div className={`${styles.bar} ${styles.active}`}></div>
                <div className={`${styles.bar} ${styles.active}`}></div>
                <div className={`${styles.bar} ${styles.active}`}></div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.trackCard} card interactive-card animate-on-scroll glass`}
          >
            <div className={styles.trackHeader}>
              <span className={`${styles.trackEmoji} floating`}>🤖</span>
              <div className={`${styles.trackBadge} ${styles.ai}`}>
                AI Focus
              </div>
            </div>
            <h3>AI vs. Human</h3>
            <p>
              Improve on AI-generated insights with your own analysis and human
              intuition.
            </p>
            <div className={styles.trackFeatures}>
              <div className={styles.featureTag}>🤖 AI Comparison</div>
              <div className={styles.featureTag}>🧠 Human Insight</div>
              <div className={styles.featureTag}>⚖️ Evaluation</div>
            </div>
            <div className={styles.trackDifficulty}>
              <span className={styles.difficultyLabel}>Difficulty:</span>
              <div className={styles.difficultyBars}>
                <div className={`${styles.bar} ${styles.active}`}></div>
                <div className={`${styles.bar} ${styles.active}`}></div>
                <div className={`${styles.bar} ${styles.active}`}></div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.trackCard} card interactive-card animate-on-scroll glass`}
          >
            <div className={styles.trackHeader}>
              <span className={`${styles.trackEmoji} floating`}>🌍</span>
              <div className={`${styles.trackBadge} ${styles.social}`}>
                Social Impact
              </div>
            </div>
            <h3>Data for Good</h3>
            <p>
              Use public datasets to solve global issues and make a positive
              impact on society.
            </p>
            <div className={styles.trackFeatures}>
              <div className={styles.featureTag}>🌱 Sustainability</div>
              <div className={styles.featureTag}>🤝 Social Good</div>
              <div className={styles.featureTag}>📈 Public Data</div>
            </div>
            <div className={styles.trackDifficulty}>
              <span className={styles.difficultyLabel}>Difficulty:</span>
              <div className={styles.difficultyBars}>
                <div className={`${styles.bar} ${styles.active}`}></div>
                <div className={`${styles.bar} ${styles.active}`}></div>
                <div className={styles.bar}></div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.trackCard} card interactive-card animate-on-scroll glass`}
          >
            <div className={styles.trackHeader}>
              <span className={`${styles.trackEmoji} floating`}>🔍</span>
              <div className={`${styles.trackBadge} ${styles.mystery}`}>
                Mystery
              </div>
            </div>
            <h3>The Blind Data Test</h3>
            <p>
              Analyze mystery datasets without context and discover hidden
              patterns and insights.
            </p>
            <div className={styles.trackFeatures}>
              <div className={styles.featureTag}>🕵️ Detective Work</div>
              <div className={styles.featureTag}>🧩 Pattern Finding</div>
              <div className={styles.featureTag}>❓ Unknown Context</div>
            </div>
            <div className={styles.trackDifficulty}>
              <span className={styles.difficultyLabel}>Difficulty:</span>
              <div className={styles.difficultyBars}>
                <div className={`${styles.bar} ${styles.active}`}></div>
                <div className={`${styles.bar} ${styles.active}`}></div>
                <div className={`${styles.bar} ${styles.active}`}></div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.trackCard} card interactive-card animate-on-scroll glass`}
          >
            <div className={styles.trackHeader}>
              <span className={`${styles.trackEmoji} floating`}>🚀</span>
              <div className={`${styles.trackBadge} ${styles.innovation}`}>
                Innovation
              </div>
            </div>
            <h3>Build Your Own Insight Bot</h3>
            <p>
              Imagine how AI will present insights in the future and prototype
              your vision.
            </p>
            <div className={styles.trackFeatures}>
              <div className={styles.featureTag}>🔮 Future Vision</div>
              <div className={styles.featureTag}>🛠️ Prototyping</div>
              <div className={styles.featureTag}>💡 Innovation</div>
            </div>
            <div className={styles.trackDifficulty}>
              <span className={styles.difficultyLabel}>Difficulty:</span>
              <div className={styles.difficultyBars}>
                <div className={`${styles.bar} ${styles.active}`}></div>
                <div className={`${styles.bar} ${styles.active}`}></div>
                <div className={`${styles.bar} ${styles.active}`}></div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.tracksCta} animate-on-scroll`}>
          <div className={`${styles.ctaContent} glass`}>
            <h3>Ready to Choose Your Track?</h3>
            <p>
              You can participate in multiple tracks or focus on one that
              excites you most
            </p>
            <a href="#register" className={styles.tracksBtn}>
              Get Started Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tracks;
