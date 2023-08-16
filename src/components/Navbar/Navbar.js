import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

function Navbar({ name }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.info("Signed Out User");
        navigate('/login');
      })
      .catch((error) => {
        // An error happened.
        console.error("Signout Error: ", error);
      });
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <h1 className={styles.logo}>Plastic Detection</h1>
        <p>A step towards brighter future</p>
      </div>
      {name ? (
        <div className={styles.welcomeContainer}>
          <p>Welcome, {name}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
