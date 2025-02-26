import React from "react";
import styles from "./DeleteButton.module.css";

function DeleteButton(props) {
  return (
    <button className={styles.DeleteButton} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default DeleteButton;
