import React, { useEffect } from "react";
import styles from "./Layout.module.css";
import { Helmet } from "react-helmet-async";

interface LayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  title,
  description = "A 48-hour virtual hackathon where aspiring data professionals turn raw data into real-world insights using Python.",
  children,
}) => {
  useEffect(() => {
    // Enhanced cursor effect
    const cursorDot = document.querySelector(
      "[data-cursor-dot]"
    ) as HTMLElement;
    const cursorOutline = document.querySelector(
      "[data-cursor-outline]"
    ) as HTMLElement;

    const handleMouseMove = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;

      if (cursorDot) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
      }

      if (cursorOutline) {
        cursorOutline.animate(
          {
            left: `${posX}px`,
            top: `${posY}px`,
          },
          { duration: 500, fill: "forwards" }
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Intersection Observer for animations
    const observerOptions = {
      threshold: [0.1, 0.3],
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
          entry.target.classList.add("animate-in");
        } else {
          entry.target.classList.remove("animate-in");
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(".animate-on-scroll");
    animatableElements.forEach((el) => observer.observe(el));

    // Throttled scroll handler for better performance
    let scrollTimeout: number | undefined;
    const handleScroll = () => {
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll(".parallax");

        parallaxElements.forEach((element) => {
          const speed = parseFloat(
            (element as HTMLElement).dataset.speed || "0.5"
          );
          const yPos = -(scrolled * speed);
          (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
        });
      });
    };

    // Use passive scroll listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Debounced resize handler
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const animatedElements = document.querySelectorAll(".animate-in");
        animatedElements.forEach((el) => {
          (el as HTMLElement).style.transform = "translateY(0)";
        });
      }, 250);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Optimized parallax effect with reduced frequency
    let lastScrollTime = 0;
    const scrollHandler = () => {
      const now = Date.now();
      if (now - lastScrollTime < 16) return; // Limit to ~60fps
      lastScrollTime = now;

      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll(".parallax");

      parallaxElements.forEach((element) => {
        const speed = parseFloat(
          (element as HTMLElement).dataset.speed || "0.5"
        );
        const yPos = -(scrolled * speed);
        (
          element as HTMLElement
        ).style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };

    // Floating animation for hero elements
    const floatingElements = document.querySelectorAll(".floating");
    floatingElements.forEach((element, index) => {
      (element as HTMLElement).style.animationDelay = `${index * 0.5}s`;
    });

    // Optimized interactive hover effects
    const interactiveCards = document.querySelectorAll(".interactive-card");
    interactiveCards.forEach((card) => {
      let isHovering = false;

      const handleMouseMove = (e: MouseEvent) => {
        if (!isHovering) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        requestAnimationFrame(() => {
          (
            card as HTMLElement
          ).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0, 0, 10px)`;
        });
      };

      const handleMouseEnter = () => {
        isHovering = true;
      };

      const handleMouseLeave = () => {
        isHovering = false;
        requestAnimationFrame(() => {
          (card as HTMLElement).style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)";
        });
      };

      card.addEventListener("mousemove", handleMouseMove as EventListener);
      card.addEventListener("mouseenter", handleMouseEnter as EventListener);
      card.addEventListener("mouseleave", handleMouseLeave as EventListener);
    });

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div>
        <div className={styles.cursorDot} data-cursor-dot></div>
        <div className={styles.cursorOutline} data-cursor-outline></div>
        {children}
      </div>
    </>
  );
};

export default Layout;
