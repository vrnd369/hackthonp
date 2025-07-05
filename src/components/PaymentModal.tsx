import React from "react";
import styles from "./PaymentModal.module.css";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { stripePromise } from "../lib/stripe";
import { useState } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientSecret: string | null;
  onSuccess?: () => void;
}

const PaymentForm: React.FC<{
  onClose: () => void;
  onSuccess?: () => void;
}> = ({ onClose, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!stripe || !elements) {
      setError("Stripe has not loaded yet.");
      setLoading(false);
      return;
    }
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });
    if (error) {
      setError(error.message || "Payment failed. Please try again.");
      setLoading(false);
    } else {
      setLoading(false);
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.paymentForm}>
      <PaymentElement />
      <div className={styles.paymentActions}>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <div className={styles.spinner}></div> Processing...
            </>
          ) : (
            <span className={styles.btnText}>Complete Payment</span>
          )}
        </button>
        <button type="button" onClick={onClose} className="btn btn-outline">
          Cancel
        </button>
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </form>
  );
};

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  clientSecret,
  onSuccess,
}) => {
  if (!isOpen) return null;
  return (
    <div className={styles.paymentModal}>
      <div className={styles.modalOverlay} onClick={onClose}></div>
      <div className={`${styles.modalContent} glass`}>
        <div className={styles.modalHeader}>
          <h3>💳 Complete Your Premium Registration</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.paymentInfo}>
          <div className={styles.registrationSummary}>
            <h4>Registration Summary</h4>
            <div className={styles.summaryItem}>
              <span>Premium Hackathon Registration</span>
              <span className={styles.price}>$10.00</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span className={styles.totalPrice}>$10.00</span>
            </div>
          </div>
        </div>
        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm onClose={onClose} onSuccess={onSuccess} />
          </Elements>
        ) : (
          <div className={styles.paymentForm}>
            <div className={styles.paymentActions}>
              <button className="btn btn-primary" disabled>
                Loading payment...
              </button>
              <button onClick={onClose} className="btn btn-outline">
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className={styles.paymentSecurity}>
          <div className={styles.securityBadges}>
            <div className={styles.securityBadge}>
              <span className={styles.securityIcon}>🔒</span>
              <span>SSL Secured</span>
            </div>
            <div className={styles.securityBadge}>
              <span className={styles.securityIcon}>💳</span>
              <span>Stripe Powered</span>
            </div>
            <div className={styles.securityBadge}>
              <span className={styles.securityIcon}>🛡️</span>
              <span>PCI Compliant</span>
            </div>
          </div>
          <p className={styles.securityText}>
            Your payment information is secure and encrypted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
