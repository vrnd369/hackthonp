import React, { useState, useRef } from "react";
import styles from "./Registration.module.css";
import PaymentModal from "./PaymentModal";

interface RegistrationData {
  name: string;
  email: string;
  phone: string | null;
  experience_level: string;
  motivation: string | null;
  tracks_interested: string[];
  registration_type: "free" | "premium";
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    name: "",
    email: "",
    phone: "",
    experience_level: "",
    motivation: "",
    tracks_interested: [],
    registration_type: "free",
  });
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedRegistrationType, setSelectedRegistrationType] = useState<
    "free" | "premium"
  >("free");
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTrackChange = (trackValue: string) => {
    setSelectedTracks((prev) => {
      if (prev.includes(trackValue)) {
        return prev.filter((track) => track !== trackValue);
      } else {
        return [...prev, trackValue];
      }
    });
  };

  const handleRegistrationTypeChange = (type: "free" | "premium") => {
    setSelectedRegistrationType(type);
    setFormData((prev) => ({
      ...prev,
      registration_type: type,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);

    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.experience_level ||
        !selectedRegistrationType
      ) {
        throw new Error("Please fill in all required fields");
      }

      const updatedFormData = {
        ...formData,
        tracks_interested: selectedTracks,
      };

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (selectedRegistrationType === "premium") {
        // Fetch client secret from backend
        try {
          const response = await fetch("/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: 10, // $10 for premium registration
              currency: "usd",
              description: "Premium Hackathon Registration",
              metadata: {
                participant_name: formData.name,
                participant_email: formData.email,
              },
            }),
          });
          const data = await response.json();
          if (data.client_secret) {
            setClientSecret(data.client_secret);
            setShowPaymentModal(true);
          } else {
            throw new Error(data.error || "Failed to create payment intent.");
          }
        } catch (err) {
          setErrorMessage(
            (err as Error).message || "Payment initialization failed."
          );
          setShowError(true);
        }
      } else {
        setShowSuccess(true);
        if (formRef.current) {
          formRef.current.reset();
        }
        setFormData({
          name: "",
          email: "",
          phone: "",
          experience_level: "",
          motivation: "",
          tracks_interested: [],
          registration_type: "free",
        });
        setSelectedTracks([]);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage(
        (error as Error).message || "Registration failed. Please try again."
      );
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setShowSuccess(false);
    setShowError(false);
    if (formRef.current) {
      formRef.current.reset();
    }
    setFormData({
      name: "",
      email: "",
      phone: "",
      experience_level: "",
      motivation: "",
      tracks_interested: [],
      registration_type: "free",
    });
    setSelectedTracks([]);
    setSelectedRegistrationType("free");
  };

  const hideError = () => {
    setShowError(false);
  };

  const handlePaymentClose = () => {
    setShowPaymentModal(false);
  };

  if (showSuccess) {
    return (
      <section id="register" className="section section-alt">
        <div className="container">
          <div className={styles.successMessage}>
            <div className={`${styles.successContent} glass`}>
              <div className={styles.successIcon}>🎉</div>
              <h4>Registration Successful!</h4>
              <p>
                Thank you for registering! You'll receive a confirmation email
                with your welcome kit within 24 hours.
              </p>
              <div className={styles.successActions}>
                <a href="#" className="btn btn-outline">
                  Join Discord
                </a>
                <button onClick={resetForm} className="btn">
                  Register Another
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="section section-alt">
      <div className="container">
        <div className={styles.registrationContent}>
          <div className={`${styles.registrationInfo} animate-on-scroll`}>
            <h2 className={`${styles.registrationHeading} animate-on-scroll`}>
              📩 How to Participate
            </h2>
            <div className={styles.stepsTimeline}>
              <div className={`${styles.step} animate-on-scroll`}>
                <div className={styles.stepConnector}></div>
                <div className={`${styles.stepNumber} floating`}>1</div>
                <div className={styles.stepContent}>
                  <h4>Register Now</h4>
                  <p>
                    Fill out the registration form and submit your details to
                    secure your spot in this exciting hackathon.
                  </p>
                  <div className={styles.stepTime}>⏱️ 2 minutes</div>
                </div>
              </div>

              <div className={`${styles.step} animate-on-scroll`}>
                <div className={styles.stepConnector}></div>
                <div className={`${styles.stepNumber} floating`}>2</div>
                <div className={styles.stepContent}>
                  <h4>Receive Welcome Kit</h4>
                  <p>
                    Get your comprehensive welcome kit with datasets,
                    guidelines, and all necessary resources to get started.
                  </p>
                  <div className={styles.stepTime}>📧 Within 24 hours</div>
                </div>
              </div>

              <div className={`${styles.step} animate-on-scroll`}>
                <div className={styles.stepConnector}></div>
                <div className={`${styles.stepNumber} floating`}>3</div>
                <div className={styles.stepContent}>
                  <h4>Choose Your Track</h4>
                  <p>
                    Select one or more tracks that align with your interests and
                    expertise, then start your analysis journey.
                  </p>
                  <div className={styles.stepTime}>🎯 Event day</div>
                </div>
              </div>

              <div className={`${styles.step} animate-on-scroll`}>
                <div className={styles.stepConnector}></div>
                <div className={`${styles.stepNumber} floating`}>4</div>
                <div className={styles.stepContent}>
                  <h4>Submit Analysis</h4>
                  <p>
                    Complete your comprehensive analysis and submit your
                    findings before the deadline for expert judging.
                  </p>
                  <div className={styles.stepTime}>⏰ 48-hour deadline</div>
                </div>
              </div>

              <div className={`${styles.step} animate-on-scroll`}>
                <div className={`${styles.stepConnector} ${styles.last}`}></div>
                <div className={`${styles.stepNumber} floating`}>5</div>
                <div className={styles.stepContent}>
                  <h4>Join Award Ceremony</h4>
                  <p>
                    Attend the exciting closing session and award ceremony to
                    celebrate achievements and see the results.
                  </p>
                  <div className={styles.stepTime}>🏆 Final day</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.registrationForm}>
            <div className={`${styles.formCard} card glass`}>
              <div className={styles.formHeader}>
                <h3>🚀 Ready to Join?</h3>
                <p>Register now for the DataAnalyzer Pro Hackathon 2025</p>
                <div className={styles.registrationStats}>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>1000+</span>
                    <span className={styles.statLabel}>Registered</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>48</span>
                    <span className={styles.statLabel}>Hours Left</span>
                  </div>
                </div>
              </div>

              {showError && (
                <div className={styles.errorMessage}>
                  <div className={`${styles.errorContent} glass`}>
                    <div className={styles.errorIcon}>❌</div>
                    <h4>Registration Failed</h4>
                    <p>{errorMessage}</p>
                    <button onClick={hideError} className="btn btn-outline">
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className={styles.registrationFormContainer}
              >
                <div className={styles.formSection}>
                  <h4>📝 Personal Information</h4>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className={styles.formSection}>
                  <h4>🎯 Experience & Interests</h4>
                  <div className={styles.formGroup}>
                    <label htmlFor="experience">Experience Level *</label>
                    <select
                      id="experience"
                      name="experience_level"
                      required
                      value={formData.experience_level}
                      onChange={handleInputChange}
                    >
                      <option value="">Select your experience level</option>
                      <option value="beginner">Beginner (0-1 years)</option>
                      <option value="intermediate">
                        Intermediate (1-3 years)
                      </option>
                      <option value="advanced">Advanced (3+ years)</option>
                      <option value="expert">Expert (5+ years)</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="tracks">
                      Tracks of Interest (Select multiple)
                    </label>
                    <div className={styles.checkboxGroup}>
                      {[
                        {
                          value: "storytelling",
                          label: "Data Storytelling Olympics",
                        },
                        {
                          value: "battle-royale",
                          label: "Insight Battle Royale",
                        },
                        { value: "ai-vs-human", label: "AI vs. Human" },
                        { value: "data-for-good", label: "Data for Good" },
                        { value: "blind-test", label: "The Blind Data Test" },
                        {
                          value: "insight-bot",
                          label: "Build Your Own Insight Bot",
                        },
                      ].map((track) => (
                        <label
                          key={track.value}
                          className={styles.checkboxItem}
                        >
                          <input
                            type="checkbox"
                            value={track.value}
                            checked={selectedTracks.includes(track.value)}
                            onChange={() => handleTrackChange(track.value)}
                          />
                          <span className={styles.checkmark}></span>
                          {track.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="motivation">
                      What motivates you to join? (Optional)
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      rows={3}
                      placeholder="Tell us what excites you about this hackathon..."
                      value={formData.motivation || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className={styles.formSection}>
                  <h4>💳 Registration</h4>
                  <div className={styles.registrationOptions}>
                    <label
                      className={`${styles.optionCard} ${
                        styles.featured
                      } glass ${
                        selectedRegistrationType === "premium"
                          ? styles.selected
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="registration_type"
                        value="premium"
                        checked={selectedRegistrationType === "premium"}
                        onChange={() => handleRegistrationTypeChange("premium")}
                      />
                      <div className={styles.optionContent}>
                        <div className={styles.optionHeader}>
                          <h5> Registration</h5>
                          <div className={styles.optionPrice}>$10</div>
                        </div>
                        <div className={styles.optionFeatures}>
                          <div className={styles.feature}>
                            ⭐ Priority support
                          </div>
                          <div className={styles.feature}>
                            ⭐ Exclusive resources
                          </div>
                          <div className={styles.feature}>
                            ⭐ Premium community access
                          </div>
                          <div className={styles.feature}>
                            ⭐ Special recognition
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="submit"
                    className={`btn btn-primary ${styles.submitBtn}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className={styles.spinner}></div>
                        Registering...
                      </>
                    ) : (
                      "Complete Registration"
                    )}
                  </button>
                </div>
              </form>

              <div className={`${styles.contactInfo} glass`}>
                <h4>❓ Questions?</h4>
                <p>
                  Contact us at{" "}
                  <a href="mailto:info@dataanalyzerpro.com">
                    info@dataanalyzerpro.com
                  </a>
                </p>
                <div className={styles.socialLinks}>
                  <a href="#" className={styles.socialLink}>
                    💬 Discord
                  </a>
                  <a href="#" className={styles.socialLink}>
                    📱 Twitter
                  </a>
                  <a href="#" className={styles.socialLink}>
                    💼 LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={handlePaymentClose}
        clientSecret={clientSecret}
      />
    </section>
  );
};

export default Registration;
