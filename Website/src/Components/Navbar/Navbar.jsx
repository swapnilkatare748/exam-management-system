import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import PrimaryinputFields from '../InputFields/Primaryinputfields/PrimaryinputFields';
import { FiMenu, FiX } from 'react-icons/fi';
import { IoIosSearch } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { COMPANY_NAME, userName,userRole } from '../../Data';



const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks user's login status
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const header = document.getElementById('header');
    const navbarList = document.getElementById('navbar-list');
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add(styles.scrolled);
      } else {
        header.classList.remove(styles.scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    const userToken = localStorage.getItem('authToken');
    
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []); // Runs only once when the component mounts

  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <header className={`${styles.header}`} id="header">
        <div className={styles.container}>
          <div className={styles.container_First}>
          <a href="/" className={styles.logos}>
           <h3>{COMPANY_NAME}</h3>
          
          </a>
          <select name="version" id="">
            <option value="1">V.01</option>
            <option value="1">V.02</option>
            <option value="1">V.087</option>
           </select>
          </div>
          <div className={styles.menuIcon} onClick={toggleMenu}>
          {menuOpen ? <FiX size={25} /> : <FiMenu size={25} />}
          </div>

          <nav
            id="navbar"
            className={`${styles.navbar}  ${menuOpen ? styles.open : ''}`}
          >
            <ul id="navbar-list" className={styles['navbar-list']}>
              <li onClick={toggleMenu}>
                  <div className={styles.inputField}>
                  <IoIosSearch/>  <PrimaryinputFields placeholder="Search.."/>

                  </div>
              </li> 
              <li onClick={toggleMenu}>
                <Link to="/" className={styles['navbar-link']}><FaGithub size={22}/></Link>
              </li> 
              <li onClick={toggleMenu}>
                <Link to="/" className={styles['navbar-link']}><IoIosNotificationsOutline size={22}/></Link>
              </li> 
                 
              {!isLoggedIn ? (
              <>
                <li onClick={toggleMenu} ><Link to="/login" className={styles.navbarLink}>Login</Link></li>
                <li onClick={toggleMenu} ><Link to="/signup" className={`${styles.navbarLink} btn`}>Sign Up</Link></li>
              </>
            ) : (
              <li onClick={toggleMenu}>
                <Link to="/user" className={styles.navbarLink}>
                  <div className={styles.profilePhoto}></div>
                </Link>
              </li>
            )}
              
            </ul>            
          </nav>
          
        </div>
      </header>
    </div>
  );
};

export default Navbar;
