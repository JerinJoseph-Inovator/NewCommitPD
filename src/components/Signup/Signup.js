import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import Typewriter from "typewriter-effect";

import InputControl from "../InputControl/InputControl";
import styles from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

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
        navigate("/Home");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <div className={styles.headingBox}>
          <h2 className={styles.heading}>Signup</h2>
          <div className={styles.subheading}>Empowering change through AI:</div>
          <div className={styles.subheading}>
            Your gateway to a plastic-free tomorrow!
          </div>
        </div>



      <span>
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
        </span>

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p style={{ color: "white" }}>
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
                  .typeString(
                    "Be the change you want to be, for within your actions lies the power to ignite a brighter path and inspire a world transformed."
                  )
                  .pauseFor(10000)
                  .deleteAll()
                  .typeString(
                    "Be the change you want to be, for within your actions lies the power to ignite a brighter path and inspire a world transformed."
                  )
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
