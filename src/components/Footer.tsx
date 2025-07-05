import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={`${styles.footerMain} animate-on-scroll`}>
            <div className={styles.footerBrand}>
              <div className={styles.brandLogo}>
                <img
                  src="/data sai logo png.png"
                  alt="DataAnalyzer Pro"
                  className={`${styles.footerLogo} floating`}
                />
                <div className={styles.brandText}>
                  <h3>DataAnalyzer Pro</h3>
                  <p>Turning data into insights, insights into action.</p>
                </div>
              </div>
              <div className={styles.brandStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>1000+</span>
                  <span className={styles.statLabel}>Participants</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>$500+</span>
                  <span className={styles.statLabel}>Prize Pool</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>48</span>
                  <span className={styles.statLabel}>Hours</span>
                </div>
              </div>
            </div>

            <div className={styles.footerLinks}>
              <div className={`${styles.linkGroup} animate-on-scroll`}>
                <h4>🎯 Event</h4>
                <a href="#about">About Hackathon</a>
                <a href="#tracks">Competition Tracks</a>
                <a href="#prizes">Prizes & Awards</a>
                <a href="#register">Register Now</a>
              </div>

              <div className={`${styles.linkGroup} animate-on-scroll`}>
                <h4>🌐 Connect</h4>
                <a href="#" target="_blank" className={styles.socialLink}>
                  <span className={styles.linkIcon}>💼</span>
                  <span>LinkedIn</span>
                </a>
                <a href="#" target="_blank" className={styles.socialLink}>
                  <span className={styles.linkIcon}>🐦</span>
                  <span>Twitter</span>
                </a>
                <a href="#" target="_blank" className={styles.socialLink}>
                  <span className={styles.linkIcon}>💬</span>
                  <span>Discord</span>
                </a>
                <a
                  href="mailto:info@dataanalyzerpro.com"
                  className={styles.socialLink}
                >
                  <span className={styles.linkIcon}>📧</span>
                  <span>Email</span>
                </a>
              </div>

              <div className={`${styles.linkGroup} animate-on-scroll`}>
                <h4>📚 Resources</h4>
                <a href="#">Hackathon FAQ</a>
                <a href="#">Submission Guidelines</a>
                <a href="#">Code of Conduct</a>
                <a href="#">Privacy Policy</a>
              </div>
            </div>
          </div>

          <div className={`${styles.footerCta} animate-on-scroll`}>
            <div className={`${styles.ctaCard} glass interactive-card`}>
              <div className={styles.ctaContent}>
                <h3>🔗 Stay Connected</h3>
                <p>
                  Follow us for updates, resources, and team networking
                  opportunities. Join our growing community of data enthusiasts!
                </p>
                <div className={styles.ctaActions}>
                  <a href="#register" className={styles.footerBtn}>
                    Join Hackathon
                  </a>
                  <a href="#" className={styles.footerBtnOutline}>
                    Join Discord
                  </a>
                </div>
              </div>
              <div className={styles.ctaVisual}>
                <div className={styles.floatingElements}>
                  <div className={styles.floatingElement}>📊</div>
                  <div className={styles.floatingElement}>💡</div>
                  <div className={styles.floatingElement}>🐍</div>
                  <div className={styles.floatingElement}>🏆</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <div className={styles.footerCopyright}>
              <p>&copy; 2025 DataAnalyzer Pro. All rights reserved.</p>
              <p className={styles.tagline}>
                Hackathon 2025 - Think Like an Analyst. Present Like a Pro.
              </p>
            </div>
            <div className={styles.footerBadge}>
              <span className={styles.badgeText}>Made with</span>
              <span className={`${styles.badgeHeart} floating`}>❤️</span>
              <span className={styles.badgeText}>for data enthusiasts</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
