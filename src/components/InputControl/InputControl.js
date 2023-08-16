import React from "react";

import styles from "./InputControl.module.css";

function InputControl(props) {
  return (
    <div className={styles.container}>
      {props.label && <label>{props.label}</label>}
      <input {...props} />
    </div>
  );
}

document.body.style = "background: #0D0907";
export default InputControl;
