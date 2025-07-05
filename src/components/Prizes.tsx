import React, { useRef, useEffect, useState } from "react";
import styles from "./Prizes.module.css";

const Prizes: React.FC = () => {
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
    <section id="prizes" className="section section-alt">
      <div className="container">
        <div className={styles.textCenter + " animate-on-scroll"}>
          <h2
            ref={headingRef}
            className={
              styles.prizesHeading +
              " " +
              (inView ? styles.prizesHeadingAnimated : "")
            }
          >
            🏆 Prizes & Recognition
          </h2>
          <p className="section-description">
            Compete for amazing prizes and join our exclusive community of data
            professionals
          </p>
        </div>

        <div className={styles.prizesContainer}>
          <div className={`${styles.mainPrizes} grid grid-3`}>
            <div
              className={`${styles.prizeCard} card interactive-card ${styles.prizeFirst} animate-on-scroll glass`}
            >
              <div className={styles.prizeGlow}></div>
              <div className={`${styles.prizeRank} floating`}>🥇</div>
              <h3>1st Place</h3>
              <div className={styles.prizeAmount}>$250</div>
              <div className={styles.prizeBonus}>
                + Lifetime "Founder Circle" Certificate
              </div>
              <div className={styles.prizeFeatures}>
                <div className={styles.feature}>🎖️ Exclusive Badge</div>
                <div className={styles.feature}>📜 Digital Certificate</div>
                <div className={styles.feature}>🌟 Website Feature</div>
              </div>
            </div>

            <div
              className={`${styles.prizeCard} card interactive-card ${styles.prizeSecond} animate-on-scroll glass`}
            >
              <div className={styles.prizeGlow}></div>
              <div className={`${styles.prizeRank} floating`}>🥈</div>
              <h3>2nd Place</h3>
              <div className={styles.prizeAmount}>$150</div>
              <div className={styles.prizeBonus}>+ Early Beta Access</div>
              <div className={styles.prizeFeatures}>
                <div className={styles.feature}>🚀 Beta Testing</div>
                <div className={styles.feature}>📜 Certificate</div>
                <div className={styles.feature}>💼 Portfolio Feature</div>
              </div>
            </div>

            <div
              className={`${styles.prizeCard} card interactive-card ${styles.prizeThird} animate-on-scroll glass`}
            >
              <div className={styles.prizeGlow}></div>
              <div className={`${styles.prizeRank} floating`}>🥉</div>
              <h3>3rd Place</h3>
              <div className={styles.prizeAmount}>$100</div>
              <div className={styles.prizeBonus}>+ 6-Month Premium Access</div>
              <div className={styles.prizeFeatures}>
                <div className={styles.feature}>⭐ Premium Features</div>
                <div className={styles.feature}>📜 Certificate</div>
                <div className={styles.feature}>🎯 Special Recognition</div>
              </div>
            </div>
          </div>

          <div className={`${styles.additionalPrizes} animate-on-scroll`}>
            <div className={styles.finalistsCard}>
              <div className={styles.prizeGlow}></div>
              <h3 className={styles.finalistsHeading}>🏅 Top 10 Finalists</h3>
              <div className={styles.finalistsDesc}>
                Certificates + Website Feature + Community
                <br />
                Recognition
              </div>
              <div className={styles.finalistPerks}>
                <span className={`${styles.perk} ${styles.certificate}`}>
                  <span className={styles.perkIcon}>📜</span> Digital
                  Certificate
                </span>
                <span className={`${styles.perk} ${styles.showcase}`}>
                  <span className={styles.perkIcon}>🌐</span> Website Showcase
                </span>
                <span className={`${styles.perk} ${styles.community}`}>
                  <span className={styles.perkIcon}>👥</span> Community Badge
                </span>
              </div>
            </div>
          </div>

          <div
            className={`${styles.allParticipants} card glass animate-on-scroll`}
          >
            <div className={styles.participantsHeader}>
              <h3>🎉 All Participants Receive</h3>
              <div className={styles.participantsCount}>
                Join 1000+ Participants
              </div>
            </div>
            <div className={`${styles.benefitsGrid} grid grid-3`}>
              <div className={`${styles.benefitItem} interactive-card`}>
                <span className={`${styles.benefitEmoji} floating`}>📜</span>
                <div className={styles.benefitContent}>
                  <span className={styles.benefitTitle}>
                    Certificate of Participation
                  </span>
                  <br />
                  <span className={styles.benefitDesc}>
                    Official recognition for your effort
                  </span>
                </div>
              </div>
              <div className={`${styles.benefitItem} interactive-card`}>
                <span className={`${styles.benefitEmoji} floating`}>🔐</span>
                <div className={styles.benefitContent}>
                  <span className={styles.benefitTitle}>
                    Closed Beta Access
                  </span>
                  <br />
                  <span className={styles.benefitDesc}>
                    Early access to our platform
                  </span>
                </div>
              </div>
              <div className={`${styles.benefitItem} interactive-card`}>
                <span className={`${styles.benefitEmoji} floating`}>🎫</span>
                <div className={styles.benefitContent}>
                  <span className={styles.benefitTitle}>Launch Discount</span>
                  <br />
                  <span className={styles.benefitDesc}>
                    Special pricing when we launch
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.prizeTotal} animate-on-scroll`}>
            <div className={`${styles.totalCard} glass`}>
              <div className={styles.totalAmount}>$500+</div>
              <div className={styles.totalLabel}>Total Prize Pool</div>
              <div className={styles.totalDesc}>
                Plus exclusive benefits and recognition
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prizes;
