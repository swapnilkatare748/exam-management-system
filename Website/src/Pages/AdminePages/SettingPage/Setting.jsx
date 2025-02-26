import React from 'react'
import styles from './Setting.module.css';
import WebsiteWrapper from '../../../Components/WebsiteWrapper';
import Settings from '../../../Components/AdmineComponents/SettingCom/SettingCom';


function Setting() {
  return (
    <WebsiteWrapper>
       <div className={`${styles.Setting}`}>
        <Settings/>      
       </div>
    </WebsiteWrapper>
  )
}

export default Setting
