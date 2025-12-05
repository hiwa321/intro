import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Intro.css";

/* =============================================================
   GreentekX — Animated Intro (Final Professional Version)
   Dynamic Globe + Brand Entrance + Footer Alignment
============================================================= */

const Intro: React.FC = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    const wrapper = document.querySelector(".intro-screen");
    if (wrapper) wrapper.classList.add("outro");
    setTimeout(() => navigate("/landing"), 900);
  };

  return (
  <div className="intro-screen">
    <div className={`intro-center ${animate ? "show" : ""}`}>

      <div className="intro-logo">
        <div className="intro-globe">
          <div className="globe-inner"></div>
        </div>
        <h1 className="intro-title">GreentekX</h1>
      </div>

      <p className="intro-tagline">Measure Carbon. Build Cleaner & Greener.</p>

      <button className="intro-btn" onClick={handleEnter}>
        Enter Platform
      </button>

      {/* FIX: سه جمله زیر دکمه باید اینجــا باشند */}
      <div className="intro-mini-trust">
        <div>EU-Ready Compliance</div>
        <div>Independent Assessment</div>
        <div>Confidential & Secure</div>
      </div>

    </div>

    <footer className="intro-footer">
      Aligned with EU Taxonomy • EN 15978 +A2 • Level(s)
    </footer>
  </div>
);

};

export default Intro;
