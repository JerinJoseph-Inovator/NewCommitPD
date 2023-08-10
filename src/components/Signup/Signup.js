import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app, db } from "../../firebase";
import { collection, addDoc } from 'firebase/firestore';
import Typewriter from "typewriter-effect";
import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";
import styles from "./Signup.module.css";
import { data } from "jquery";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const database = collection(db, 'users',)
  const collectionRef = collection(db, 'users');

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
// NEW CODE HERE 

        addDoc(database, values)
          .then(() => {
          alert("Data Added")
            })
          .catch((err) => {
            alert('Error adding document:', err);
            });

// NEW CODE END HERE        
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>


        <InputControl
          label="Name"
          placeholder="Enter your name"
          type="text"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          type="text"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          type="password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
      <span className={styles.verse}>
      
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
      </span>
    </div>
  );
}

export default Signup;
