import React from 'react'
import styles from './PrimaryinputFields.module.css';

function PrimaryinputFields(props) {
  return (
   <input type="text" className={styles.PrimaryinputFields} placeholder={props.placeholder} />
  )
}

export default PrimaryinputFields
