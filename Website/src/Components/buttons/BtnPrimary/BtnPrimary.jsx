import React from 'react'
import styles from './BtnPrimary.module.css';


function BtnPrimary(props) {
  return (
      <button className={styles.btn_primary} onClick={props.onClick} >{props.text}</button>
  )
}

export default BtnPrimary
