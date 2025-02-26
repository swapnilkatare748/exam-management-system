import React from 'react';
import styles from './SignUPpage.module.css';
import RegistrationForm from '../../Components/SignUppageComponents/SignUp/SignUp';
import WebsiteWrapper from '../../Components/WebsiteWrapper';

function SignUPpage() {
  return (
    <div className={`${styles.SignUPpage} page flex-center`}>
      <RegistrationForm/>
    </div>
  )
}

export default SignUPpage
