import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Intro.css";

/* =============================================================
   GreentekX — Animated Intro (i18n-ready)
   - Brand hardcoded
   - Real language switch (EN | FI)
   - Animation & routing preserved
============================================================= */

const Intro: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
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

  const changeLang = (lang: "en" | "fi") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className="intro-screen">
      {/* Language Switch — top right */}
      <div className="intro-lang-switch">
        <button
          className={i18n.language === "en" ? "active" : ""}
          onClick={() => changeLang("en")}
        >
          EN
        </button>
        <span>|</span>
        <button
          className={i18n.language === "fi" ? "active" : ""}
          onClick={() => changeLang("fi")}
        >
          FI
        </button>
      </div>

      <div className={`intro-center ${animate ? "show" : ""}`}>
        <div className="intro-logo">
          <div className="intro-globe">
            <div className="globe-inner"></div>
          </div>
          {/* Brand must NOT be translated */}
          <h1 className="intro-title">GreentekX</h1>
        </div>

        <p className="intro-tagline">{t("intro.tagline")}</p>

        <button className="intro-btn" onClick={handleEnter}>
          {t("intro.enter")}
        </button>

        <div className="intro-mini-trust">
          <div>{t("intro.trust.eu")}</div>
          <div>{t("intro.trust.independent")}</div>
          <div>{t("intro.trust.secure")}</div>
        </div>
      </div>

      <footer className="intro-footer">{t("intro.footer")}</footer>
    </div>
  );
};

export default Intro;
