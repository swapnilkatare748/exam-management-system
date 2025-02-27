import React from 'react'
import styles from "./EditButton.module.css";

function EditButton(props) {
  return (
<button className={styles.EditButton} onClick={props.onClick} >{props.text}
</button>
)
}

export default EditButton
