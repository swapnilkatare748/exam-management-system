import React from "react";
import styles from "./Footer.module.css";
import {FaLongArrowAltUp,IoLogoInstagram,FaLinkedin,FaGithub,CiTwitter} from "../../Utils/Icons";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <a href="#" className={styles.logo}>
          Material UI
          </a>
          <p className={styles.footerText}>
          Material UI is an open-source React component library that implements Google's Material Design.
          </p>
        </div>

        <ul className={styles.footerList}>
          <li>
            <p className={styles.footerListTitle}>Company</p>
          </li>
          <li>
            <a href="#" className={styles.footerLink}>About us</a>
          </li>
          <li>
            <a href="#" className={styles.footerLink}>Services</a>
          </li>
          <li>
            <a href="#" className={styles.footerLink}>Pricing</a>
          </li>
          <li>
            <a href="#" className={styles.footerLink}>Blog</a>
          </li>
          <li>
            <a href="#" className={styles.footerLink}>Login</a>
          </li>
        </ul>

        <ul className={styles.footerList}>
          <li>
            <p className={styles.footerListTitle}>Useful Links</p>
          </li>
          <li>
            <a href="#" className={styles.footerLink}>Terms of Services</a>
          </li>
          <li>
            <a href="#" className={styles.footerLink}>Privacy Policy</a>
          </li>
          <li>
            <a href="#" className={styles.footerLink}>Listing</a>
          </li>
          <li>
            <a href="#" className={styles.footerLink}>Contact</a>
          </li>
        </ul>

        <ul className={styles.footerList}>
          <li>
            <p className={styles.footerListTitle}>Contact Details</p>
          </li>
          <li className={styles.footerItem}>
            <address className={styles.address}>
              C/54 Northwest Freeway, Suite 558, Houston, USA 485
              <br />
              <a href="#" className={styles.addressLink}>
                View on Google map
              </a>
            </address>
          </li>
          <li className={styles.footerItem}>
            <a href="mailto:contact@example.com" className={styles.footerLink}>
              contact@example.com
            </a>
          </li>
          <li className={styles.footerItem}>
            <a href="tel:+152534468854" className={styles.footerLink}>
              +152 534-468-854
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          &copy; Material UI.{" "}
          <a href="#" className={styles.copyrightLink}>
            Ltd.
          </a>
          .
        </p>
        <ul className={styles.socialList}>
          <li>
            <a href="#" className={styles.socialLink}><IoLogoInstagram/></a>
          </li>
          <li>
            <a href="#" className={styles.socialLink}><FaLinkedin/></a>
          </li>
          <li>
            <a href="#" className={styles.socialLink}><FaGithub/></a>
          </li>
          <li>
            <a href="#" className={styles.socialLink}><CiTwitter/></a>
          </li>
        </ul>
        <a href="#top" className={styles.backTopBtn} aria-label="back to top">
          <FaLongArrowAltUp/>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
