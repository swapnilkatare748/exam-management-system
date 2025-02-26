import React from 'react'
import styles from './btnSecondary.module.css';
function BtnSecondary(props ) {
  return (
   <button  className={styles.BtnSecondary} style={{ color: props.color }}>{props.text}</button>
  )
}

export default BtnSecondary
