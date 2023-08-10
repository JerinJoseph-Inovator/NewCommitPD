import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import $ from "jquery"
//importing typewriter-effect
import Typewriter from "typewriter-effect";
import './Login.css';


import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";

import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  
  const handleSubmission = () => {
    console.log("Handle submission");
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.verse}>
        <span lassName={styles.type_writer_text}>
          
        <div className={styles.TYP}>
            <Typewriter
                onInit={(typewriter) => {
                    typewriter
                        .typeString("Be the change you want to be, for within your actions lies the power to ignite a brighter path and inspire a world transformed.")
                        .pauseFor(10000)
                        .deleteAll()
                        .typeString("Be the change you want to be, for within your actions lies the power to ignite a brighter path and inspire a world transformed.")
                        .start();
                }}
            />
        </div>
      </span>
      </h1> 
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>

        <InputControl
          label="Email"
          type="text"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />
        <InputControl
          label="Password"
          type="password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          placeholder="Enter Password"
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <span>
              <Link to="/signup">Sign up </Link>
            </span>
          Today!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
