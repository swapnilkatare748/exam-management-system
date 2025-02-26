import { useState } from "react";
import { Switch } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import styles from "./SettingCom.module.css";
import { motion } from "framer-motion";
import ThemeToggle from "../../ThemeToggle/ThemeToggel";

export default function Settings() {
  const [showCode, setShowCode] = useState(false);
  const [followUp, setFollowUp] = useState(true);
  const [theme, setTheme] = useState("Dark");
  const [language, setLanguage] = useState("Auto-detect");

  return ( 
     <div className={styles.Overlay}>
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.settingsContainer}
    >
      <h2 className={styles.title}>Settings</h2>
      <div className={styles.optionsList}>
        <div className={styles.optionItem}>
          <span>Theme</span><ThemeToggle/>
        </div>

        <div className={styles.optionItem}>
          <span>Always open to registe user</span>
          <Switch
            checked={showCode}
            onChange={setShowCode}
            className={
              `${showCode ? styles.switchOn : styles.switchOff} ${styles.switch}`
            }
          >
            <span className={`${showCode ? styles.toggleOn : styles.toggleOff} ${styles.toggle}`} />
          </Switch>
        </div>

        <div className={styles.optionItem}>
          <span>Show follow up suggestions in chats</span>
          <Switch
            checked={followUp}
            onChange={setFollowUp}
            className={
              `${followUp ? styles.switchOn : styles.switchOff} ${styles.switch}`
            }
          >
            <span className={`${followUp ? styles.toggleOn : styles.toggleOff} ${styles.toggle}`} />
          </Switch>
        </div>

        <div className={styles.optionItem}>
          <span>Language</span>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.dropdownButton}
          >
            {language} <ChevronDown className={styles.icon} />
          </motion.button>
        </div>
      </div>
    </motion.div>
    </div>
  );
}
