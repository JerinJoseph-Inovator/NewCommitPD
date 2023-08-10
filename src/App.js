import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Signup/Signup";
import PlasticDetection from "./components/PlasticDetection/PlasticDetection";

import { auth } from "./firebase";

import "./App.css";

function App() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  console.log("userId", userId);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar name={userName} />
        <Routes>
          <Route path="/" element={<Home userId={userId} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/PlasticDetection" element={<PlasticDetection />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
