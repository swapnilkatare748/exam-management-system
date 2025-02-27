import React from 'react'
import styles from './LoginPage.module.css';
import LoginPage from '../../Components/SignUppageComponents/LoginPageForm/LoginPage';
import WebsiteWrapper from '../../Components/WebsiteWrapper';

function LoginePage() {
  return (  
    <div className={`${styles.LoginePage} page flex-center`}>
         <LoginPage/>
    </div>
  )
}

export default LoginePage
