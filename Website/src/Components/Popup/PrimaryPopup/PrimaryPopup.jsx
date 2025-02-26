import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./PrimaryPopup.module.css";
import BtnPrimary from "../../buttons/BtnPrimary/BtnPrimary";

function PrimaryPopup({ message, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      id="popup-overlay"
      onClick={onClose} // Close when clicking the overlay
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className={styles.popupBox}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <p className={styles.message}>{message}</p>
        <button onClick={onClose} className={styles.okButton}>
          Ok
        </button>

      </motion.div>
    </div>
  );
}

export default PrimaryPopup;
