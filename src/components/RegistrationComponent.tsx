import React, { useState, useEffect, useRef } from "react";
import styles from "./Registration.module.css";
import { supabase } from "../lib/supabase";
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

const RegistrationComponent: React.FC = () => {
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
  const [selectedRegistrationType, setSelectedRegistrationType] = useState<
    "free" | "premium"
  >("free");
  const [registrationId, setRegistrationId] = useState<string | null>(null);

  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

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
    console.log("Form submitted!");
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);

    try {
      // Validate required fields
      if (
        !formData.name ||
        !formData.email ||
        !formData.experience_level ||
        !selectedRegistrationType
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Update form data with selected tracks and registration type
      // Ensure data types match the database schema exactly
      const updatedFormData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone?.trim() || null, // Convert empty string to null
        experience_level: formData.experience_level,
        motivation: formData.motivation?.trim() || null, // Convert empty string to null
        tracks_interested: selectedTracks,
        registration_type: selectedRegistrationType,
      };

      console.log("About to insert into Supabase:", updatedFormData);

      // Use Supabase client to insert data
      const { data, error } = await supabase
        .from("hackathon_registrations")
        .insert([updatedFormData])
        .select();

      console.log("Supabase insert result:", { data, error });

      if (error) {
        console.error("Supabase error:", error);
        console.error("Error details:", {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });
        throw new Error(error.message || "Failed to save registration.");
      }

      if (!data || data.length === 0) {
        throw new Error("No data returned from registration.");
      }

      // Store registration id for payment confirmation
      if (data && data[0] && data[0].id) {
        setRegistrationId(data[0].id);
      }

      if (selectedRegistrationType === "premium") {
        // Create payment intent for premium registration
        await createPaymentIntent(data[0].id, updatedFormData);
      } else {
        // Free registration - show success immediately
        setShowSuccess(true);
        resetForm();
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

  const createPaymentIntent = async (
    registrationId: string,
    registrationData: any
  ) => {
    setPaymentLoading(true);
    try {
      const response = await fetch(
        `https://rnwgojmxlvgrtnozxmlc.supabase.co/functions/v1/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJud2dvam14bHZncnRub3p4bWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNjU1MjksImV4cCI6MjA2NTg0MTUyOX0._gA3hl3QP1pDNUO-4s0ilGgkXot39-G4qt3IqeDlGHw`,
          },
          body: JSON.stringify({
            amount: 10.0, // $10 for premium registration
            currency: "usd",
            description:
              "Premium Hackathon Registration - DataAnalyzer Pro 2025",
            metadata: {
              registration_id: registrationId,
              participant_name: registrationData.name,
              participant_email: registrationData.email,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create payment intent");
      }

      const { client_secret } = await response.json();
      setClientSecret(client_secret);
      setShowPaymentModal(true);
    } catch (error) {
      console.error("Payment intent creation error:", error);
      setErrorMessage(
        (error as Error).message ||
          "Failed to initialize payment. Please try again."
      );
      setShowError(true);
    } finally {
      setPaymentLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    if (!registrationId) return;

    try {
      // Confirm payment with backend
      const response = await fetch(
        `https://rnwgojmxlvgrtnozxmlc.supabase.co/functions/v1/confirm-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJud2dvam14bHZncnRub3p4bWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNjU1MjksImV4cCI6MjA2NTg0MTUyOX0._gA3hl3QP1pDNUO-4s0ilGgkXot39-G4qt3IqeDlGHw`,
          },
          body: JSON.stringify({
            registration_id: registrationId,
            payment_intent_id: clientSecret?.split("_secret_")[0], // Extract payment intent ID
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to confirm payment");
      }

      // Close payment modal and show success
      setShowPaymentModal(false);
      setClientSecret(null);
      setShowSuccess(true);
      resetForm();
    } catch (error) {
      console.error("Payment confirmation error:", error);
      setErrorMessage(
        (error as Error).message ||
          "Payment confirmation failed. Please contact support."
      );
      setShowError(true);
    }
  };

  const handlePaymentClose = () => {
    setShowPaymentModal(false);
    setClientSecret(null);
    // Don't reset form here as user might want to try again
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
                <a href="#" className={styles.successBtnOutline}>
                  Join Discord
                </a>
                <button onClick={resetForm} className={styles.successBtn}>
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
                          <span className={styles.checkboxLabel}>
                            {track.label}
                          </span>
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
                          <h5>Premium Registration</h5>
                          <div className={styles.optionPrice}>$10</div>
                        </div>
                        <div className={styles.optionFeatures}>
                          <div className={styles.feature}>
                            ✅ Full hackathon access
                          </div>
                          <div className={styles.feature}>
                            ✅ All datasets & resources
                          </div>
                          <div className={styles.feature}>
                            ✅ Certificate of participation
                          </div>
                          <div className={styles.feature}>
                            ✅ Community access
                          </div>
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
      {showPaymentModal && clientSecret && (
        <PaymentModal
          isOpen={showPaymentModal}
          clientSecret={clientSecret}
          onClose={handlePaymentClose}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </section>
  );
};

export default RegistrationComponent;
