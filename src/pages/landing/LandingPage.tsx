// src/pages/landing/LandingPage.tsx

import React, { useEffect, useMemo, useState } from "react";
import "./LandingPage.css";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";


const EMAILJS_SERVICE_ID = "service_ox0euhr";
const EMAILJS_TEMPLATE_ID = "template_x1kgwh4";
const EMAILJS_PUBLIC_KEY = "iHF23rhsJtRR54_ND";


/* =============================================================
   GreentekX — Landing Page (Bilingual via react-i18next)
   - Brand name stays hardcoded: GreentekX
   - All other visible strings are routed through i18n keys
============================================================= */

const LandingPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    projectName: "",
    country: "",
    buildingType: "",
    area: "",
    stage: "",
    deadline: "",
    email: "",
    notes: "",
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formError, setFormError] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    projectName: false,
    country: false,
    email: false,
  });

  // FORM 2: General Inquiry
  const [showInfoForm, setShowInfoForm] = useState(false);

  const [infoFormData, setInfoFormData] = useState({
    fullName: "",
    email: "",
    organisation: "",
    country: "",
    message: "",
  });

  const [infoFormStatus, setInfoFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [infoValidationErrors, setInfoValidationErrors] = useState({
    fullName: false,
    email: false,
    message: false,
  });

  useEffect(() => {
  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    setShowScrollTop(scrollTop > 250);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  const handleRequestRegulatory = () => {
    setShowForm(true);
    setFormStatus("idle");
    setFormError("");

    // Reset form fields
    setFormData({
      projectName: "",
      country: "",
      buildingType: "",
      area: "",
      stage: "",
      deadline: "",
      email: "",
      notes: "",
    });

    // Reset validation errors
    setValidationErrors({
      projectName: false,
      country: false,
      email: false,
    });
  };

  const handleShowInfoForm = () => {
    setShowInfoForm(true);
    setInfoFormStatus("idle");
    setInfoValidationErrors({
      fullName: false,
      email: false,
      message: false,
    });
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormStatus("idle");

    // Reset previous errors
    setValidationErrors({
      projectName: false,
      country: false,
      email: false,
    });

    let hasError = false;
    const newErrors: any = {};

    // Project name
    if (!formData.projectName.trim()) {
      newErrors.projectName = true;
      hasError = true;
    }

    // Country
    if (!formData.country.trim()) {
      newErrors.country = true;
      hasError = true;
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = true;
      hasError = true;
    }

    if (hasError) {
      setValidationErrors((prev) => ({ ...prev, ...newErrors }));
      setFormStatus("error");
      return;
    }

    setFormStatus("loading");

    // Build email message text (localized labels)
    const messageText =
      `${t("landing.regulatoryEmail.title")}\n\n` +
      `${t("landing.regulatoryForm.fields.projectName.label")}: ${formData.projectName}\n` +
      `${t("landing.regulatoryForm.fields.country.label")}: ${formData.country}\n` +
      `${t("landing.regulatoryForm.fields.buildingType.label")}: ${formData.buildingType}\n` +
      `${t("landing.regulatoryForm.fields.area.label")}: ${formData.area}\n` +
      `${t("landing.regulatoryForm.fields.stage.label")}: ${formData.stage}\n` +
      `${t("landing.regulatoryForm.fields.deadline.label")}: ${formData.deadline}\n` +
      `${t("landing.regulatoryForm.fields.email.label")}: ${formData.email}\n\n` +
      `${t("landing.regulatoryForm.fields.notes.label")}\n${formData.notes}`;

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.projectName,
          email: formData.email,
          message: messageText,
        },
        EMAILJS_PUBLIC_KEY
      );

      setFormStatus("success");
    } catch (err) {
      // keep console error (original behavior)
      console.error("EmailJS error (regulatory form):", err);
      setFormStatus("error");
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleInfoFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset status
    setInfoFormStatus("idle");

    // Reset previous errors
    setInfoValidationErrors({
      fullName: false,
      email: false,
      message: false,
    });

    let hasError = false;
    const newErrors: any = {};

    // Full name
    if (!infoFormData.fullName.trim()) {
      newErrors.fullName = true;
      hasError = true;
    }

    // Email
    if (!infoFormData.email.trim()) {
      newErrors.email = true;
      hasError = true;
    }

    // Message
    if (!infoFormData.message.trim()) {
      newErrors.message = true;
      hasError = true;
    }

    // If validation error
    if (hasError) {
      setInfoValidationErrors((prev) => ({ ...prev, ...newErrors }));
      setInfoFormStatus("error");
      return;
    }

    // SEND EMAIL VIA EMAILJS
    try {
      setInfoFormStatus("loading");

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: infoFormData.fullName,
          email: infoFormData.email,
          message: infoFormData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      // Show success message
      setInfoFormStatus("success");
    } catch (err) {
      console.error("EmailJS error (info form):", err);
      setInfoFormStatus("error");
    }
  };

  const handleRequestInfo = () => {
    // preserved logic (not used in UI currently)
    window.location.href =
      "mailto:info@greentekx.com?subject=GreentekX%20Pilot%20Project&body=Hello%20GreentekX%20team,";
  };

 const handleScrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};


  // Keep option values stable; translate labels only
  const countryOptions = useMemo(
    () => [
      { value: "", labelKey: "Select country" },

      // Priority EU region
      { value: "Finland", labelKey: "landing.options.country.finland" },
      { value: "Sweden", labelKey: "landing.options.country.sweden" },
      { value: "Denmark", labelKey: "landing.options.country.denmark" },
      { value: "Norway", labelKey: "landing.options.country.norway" },
      { value: "Germany", labelKey: "landing.options.country.germany" },
      { value: "Netherlands", labelKey: "landing.options.country.netherlands" },
      { value: "Belgium", labelKey: "landing.options.country.belgium" },
      { value: "Estonia", labelKey: "landing.options.country.estonia" },
      { value: "Latvia", labelKey: "landing.options.country.latvia" },
      { value: "Lithuania", labelKey: "landing.options.country.lithuania" },
      { value: "Poland", labelKey: "landing.options.country.poland" },
      { value: "Austria", labelKey: "landing.options.country.austria" },
      { value: "France", labelKey: "landing.options.country.france" },
      { value: "Italy", labelKey: "landing.options.country.italy" },
      { value: "Spain", labelKey: "landing.options.country.spain" },
      { value: "Portugal", labelKey: "landing.options.country.portugal" },
      { value: "Ireland", labelKey: "landing.options.country.ireland" },

      // General fallback
      { value: "United Kingdom", labelKey: "landing.options.country.uk" },
      { value: "Other", labelKey: "landing.options.country.other" },
    ],
    []
  );

  const buildingTypeOptions = useMemo(
    () => [
      { value: "", labelKey: "landing.options.buildingType.placeholder" },
      { value: "Office", labelKey: "landing.options.buildingType.office" },
      { value: "Residential", labelKey: "landing.options.buildingType.residential" },
      { value: "Mixed-use", labelKey: "landing.options.buildingType.mixedUse" },
      { value: "Education", labelKey: "landing.options.buildingType.education" },
      { value: "Healthcare", labelKey: "landing.options.buildingType.healthcare" },
      { value: "Industrial", labelKey: "landing.options.buildingType.industrial" },
      { value: "Retail", labelKey: "landing.options.buildingType.retail" },
      { value: "Logistics", labelKey: "landing.options.buildingType.logistics" },
      { value: "Hotel", labelKey: "landing.options.buildingType.hotel" },
      { value: "Cultural", labelKey: "landing.options.buildingType.cultural" },
    ],
    []
  );

  const stageOptions = useMemo(
    () => [
      { value: "", labelKey: "landing.options.stage.placeholder" },
      { value: "Concept", labelKey: "landing.options.stage.concept" },
      { value: "Design", labelKey: "landing.options.stage.design" },
      { value: "Tender", labelKey: "landing.options.stage.tender" },
      { value: "As-built", labelKey: "landing.options.stage.asBuilt" },
    ],
    []
  );

  return (
    <div className="lp-root">
      {/* HERO */}
      <section className="lp-hero">
<div className="lp-lang-switch">
  <button
    className={i18n.language === "en" ? "active" : ""}
    onClick={() => i18n.changeLanguage("en")}
  >
    EN
  </button>
  <span> | </span>
  <button
    className={i18n.language === "fi" ? "active" : ""}
    onClick={() => i18n.changeLanguage("fi")}
  >
    FI
  </button>
</div>

        <div className="lp-container lp-hero-inner">
          <div className="lp-hero-brand">
            <div className="lp-hero-logo-ball" />
            <div className="lp-hero-brand-text">GreentekX</div>
          </div>

          <p className="lp-hero-tagline">{t("landing.hero.tagline")}</p>

          <h1 className="lp-hero-title">{t("landing.hero.title")}</h1>

          <p className="lp-hero-subtext">{t("landing.hero.subtext")}</p>

          <div className="lp-hero-ctas">
            <button className="lp-btn lp-btn-primary" onClick={handleRequestRegulatory}>
              {t("landing.hero.primaryCta")}
            </button>

            <div className="lp-cta-note">{t("landing.hero.responseTime")}</div>
          </div>

          <div className="lp-hero-trust">{t("landing.hero.trust")}</div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="lp-section lp-section-value">
        <div className="lp-container">
          <div className="lp-card lp-value-card">
            <h2 className="lp-section-title">{t("landing.value.title")}</h2>
            <div className="lp-value-grid">
              <div className="lp-value-item">
                <h3 className="lp-value-title">{t("landing.value.items.euFramework.title")}</h3>
                <p className="lp-value-body">{t("landing.value.items.euFramework.body")}</p>
              </div>
              <div className="lp-value-item">
                <h3 className="lp-value-title">{t("landing.value.items.aggregation.title")}</h3>
                <p className="lp-value-body">{t("landing.value.items.aggregation.body")}</p>
              </div>
              <div className="lp-value-item">
                <h3 className="lp-value-title">{t("landing.value.items.reporting.title")}</h3>
                <p className="lp-value-body">{t("landing.value.items.reporting.body")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="lp-section lp-section-capabilities">
        <div className="lp-container">
          <h2 className="lp-section-title">{t("landing.capabilities.title")}</h2>
          <div className="lp-cap-grid">
            <div className="lp-cap-card">
              <h3 className="lp-cap-title">{t("landing.capabilities.items.materialsHub.title")}</h3>
              <p className="lp-cap-body">{t("landing.capabilities.items.materialsHub.body")}</p>
            </div>
            <div className="lp-cap-card">
              <h3 className="lp-cap-title">{t("landing.capabilities.items.projectWlc.title")}</h3>
              <p className="lp-cap-body">{t("landing.capabilities.items.projectWlc.body")}</p>
            </div>
            <div className="lp-cap-card">
              <h3 className="lp-cap-title">{t("landing.capabilities.items.climateBenchmarking.title")}</h3>
              <p className="lp-cap-body">{t("landing.capabilities.items.climateBenchmarking.body")}</p>
            </div>
            <div className="lp-cap-card">
              <h3 className="lp-cap-title">{t("landing.capabilities.items.stageAdjusted.title")}</h3>
              <p className="lp-cap-body">{t("landing.capabilities.items.stageAdjusted.body")}</p>
            </div>
            <div className="lp-cap-card">
              <h3 className="lp-cap-title">{t("landing.capabilities.items.indicatorSet.title")}</h3>
              <p className="lp-cap-body">{t("landing.capabilities.items.indicatorSet.body")}</p>
            </div>
            <div className="lp-cap-card">
              <h3 className="lp-cap-title">{t("landing.capabilities.items.outputs.title")}</h3>
              <p className="lp-cap-body">{t("landing.capabilities.items.outputs.body")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPETITIVE ADVANTAGES */}
      <section className="lp-section lp-section-adv">
        <div className="lp-container">
          <h2 className="lp-section-title">{t("landing.advantages.title")}</h2>

          <div className="lp-adv-grid">
            <ul className="lp-bullets">
              <li>{t("landing.advantages.left.1")}</li>
              <li>{t("landing.advantages.left.2")}</li>
              <li>{t("landing.advantages.left.3")}</li>
            </ul>

            <ul className="lp-bullets">
              <li>{t("landing.advantages.right.1")}</li>
              <li>{t("landing.advantages.right.2")}</li>
              <li>{t("landing.advantages.right.3")}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section className="lp-section lp-section-who">
        <div className="lp-container">
          <h2 className="lp-section-title">{t("landing.who.title")}</h2>
          <div className="lp-who-grid">
            <div className="lp-who-card">{t("landing.who.items.1")}</div>
            <div className="lp-who-card">{t("landing.who.items.2")}</div>
            <div className="lp-who-card">{t("landing.who.items.3")}</div>
            <div className="lp-who-card">{t("landing.who.items.4")}</div>
            <div className="lp-who-card">{t("landing.who.items.5")}</div>
            <div className="lp-who-card">{t("landing.who.items.6")}</div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="lp-section lp-section-final">
        <div className="lp-container lp-final-inner">
          <h2 className="lp-final-title">{t("landing.final.title")}</h2>
          <p className="lp-final-sub">{t("landing.final.sub")}</p>
          <div className="lp-final-ctas">
            <button
              className="lp-btn lp-btn-final-primary"
              type="button"
              onClick={handleRequestRegulatory}
            >
              {t("landing.final.primaryCta")}
            </button>
            <button
              className="lp-btn lp-btn-final-secondary"
              type="button"
              onClick={handleShowInfoForm}
            >
              {t("landing.final.secondaryCta")}
            </button>
          </div>
        </div>
      </section>

      {/* REGULATORY REQUEST FORM MODAL */}
      {showForm && (
        <div
          className="lp-modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
          }}
        >
          <div
            className="lp-modal"
            style={{
              background: "#ffffff",
              borderRadius: 18,
              maxWidth: 520,
              width: "90%",
              padding: "24px 28px",
              boxShadow: "0 18px 60px rgba(0,0,0,0.25)",
              maxHeight: "90vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#0e3d2c",
                  }}
                >
                  {t("landing.regulatoryForm.title")}
                </h3>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 13,
                    lineHeight: "20px",
                    color: "rgba(7,58,41,0.8)",
                  }}
                >
                  {t("landing.regulatoryForm.subtitle")}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseForm}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: 12,
                  color: "rgba(0,0,0,0.6)",
                  cursor: "pointer",
                  padding: "4px 0 0 8px",
                  textDecoration: "underline",
                  textUnderlineOffset: 2,
                }}
              >
                {t("common.close")}
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleFormSubmit}
              style={{ display: "grid", gap: 10, marginTop: 4 }}
            >
              {/* Project name */}
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label
                  htmlFor="projectName"
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "rgba(7,58,41,0.85)",
                  }}
                >
                  {t("landing.regulatoryForm.fields.projectName.label")}
                </label>
                <input
                  id="projectName"
                  name="projectName"
                  placeholder={t("landing.regulatoryForm.fields.projectName.placeholder")}
                  value={formData.projectName}
                  onChange={handleFormChange}
                  style={{
                    padding: "10px",
                    borderRadius: 8,
                    border: validationErrors.projectName
                      ? "1px solid #d04545"
                      : "1px solid #ddd",
                    fontSize: 13,
                  }}
                />
              </div>

              {/* Country */}
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label
                  htmlFor="country"
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "rgba(7,58,41,0.85)",
                  }}
                >
                  {t("landing.regulatoryForm.fields.country.label")}
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleFormChange}
                  style={{
                    padding: "10px",
                    borderRadius: 8,
                    border: validationErrors.country
                      ? "1px solid #d04545"
                      : "1px solid #ddd",
                    fontSize: 13,
                    backgroundColor: "#fff",
                  }}
                >
                  {countryOptions.map((o) => (
                    <option key={o.value || "__placeholder"} value={o.value}>
                      {t(o.labelKey)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Building type */}
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label
                  htmlFor="buildingType"
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "rgba(7,58,41,0.85)",
                  }}
                >
                  {t("landing.regulatoryForm.fields.buildingType.label")}
                </label>
                <select
                  id="buildingType"
                  name="buildingType"
                  value={formData.buildingType}
                  onChange={handleFormChange}
                  style={{
                    padding: "10px",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    fontSize: 13,
                    backgroundColor: "#fff",
                  }}
                >
                  {buildingTypeOptions.map((o) => (
                    <option key={o.value || "__placeholder"} value={o.value}>
                      {t(o.labelKey)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Area + Stage (2 columns on wide) */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <label
                    htmlFor="area"
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "rgba(7,58,41,0.85)",
                    }}
                  >
                    {t("landing.regulatoryForm.fields.area.label")}
                  </label>
                  <input
                    id="area"
                    type="number"
                    name="area"
                    placeholder={t("landing.regulatoryForm.fields.area.placeholder")}
                    value={formData.area}
                    onChange={handleFormChange}
                    min="0"
                    step="1"
                    style={{
                      padding: "10px",
                      borderRadius: 8,
                      border: "1px solid #ddd",
                      fontSize: 13,
                    }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <label
                    htmlFor="stage"
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "rgba(7,58,41,0.85)",
                    }}
                  >
                    {t("landing.regulatoryForm.fields.stage.label")}
                  </label>
                  <select
                    id="stage"
                    name="stage"
                    value={formData.stage}
                    onChange={handleFormChange}
                    style={{
                      padding: "10px",
                      borderRadius: 8,
                      border: "1px solid #ddd",
                      fontSize: 13,
                      backgroundColor: "#fff",
                    }}
                  >
                    {stageOptions.map((o) => (
                      <option key={o.value || "__placeholder"} value={o.value}>
                        {t(o.labelKey)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Deadline */}
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label
                  htmlFor="deadline"
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "rgba(7,58,41,0.85)",
                  }}
                >
                  {t("landing.regulatoryForm.fields.deadline.label")}
                </label>
                <input
                  id="deadline"
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleFormChange}
                  style={{
                    padding: "10px",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    fontSize: 13,
                  }}
                />
              </div>

              {/* Email */}
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label
                  htmlFor="email"
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "rgba(7,58,41,0.85)",
                  }}
                >
                  {t("landing.regulatoryForm.fields.email.label")}
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder={t("landing.regulatoryForm.fields.email.placeholder")}
                  value={formData.email}
                  onChange={handleFormChange}
                  style={{
                    padding: "10px",
                    borderRadius: 8,
                    border: validationErrors.email
                      ? "1px solid #d04545"
                      : "1px solid #ddd",
                    fontSize: 13,
                  }}
                />
              </div>

              {/* Notes */}
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label
                  htmlFor="notes"
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "rgba(7,58,41,0.85)",
                  }}
                >
                  {t("landing.regulatoryForm.fields.notes.label")}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder={t("landing.regulatoryForm.fields.notes.placeholder")}
                  value={formData.notes}
                  onChange={handleFormChange}
                  rows={3}
                  style={{
                    padding: "10px",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    fontSize: 13,
                    resize: "vertical",
                  }}
                />
              </div>

              <div className="privacy-box">
                <div className="privacy-title">{t("landing.privacy.title")}</div>
                <ul className="privacy-list">
                  <li>{t("landing.privacy.items.1")}</li>
                  <li>{t("landing.privacy.items.2")}</li>
                  <li>{t("landing.privacy.items.3")}</li>
                  <li>{t("landing.privacy.items.4")}</li>
                </ul>
              </div>

              {formError && (
                <div
                  style={{
                    background: "rgba(208, 69, 69, 0.08)",
                    border: "1px solid rgba(208, 69, 69, 0.25)",
                    padding: "8px 10px",
                    borderRadius: 6,
                    fontSize: 12,
                    color: "#a23535",
                    marginTop: 6,
                    lineHeight: "18px",
                  }}
                >
                  {formError}
                </div>
              )}

              {formStatus === "success" && (
                <div
                  style={{
                    background: "rgba(15,140,96,0.10)",
                    border: "1px solid rgba(15,140,96,0.28)",
                    padding: "8px 10px",
                    borderRadius: 6,
                    fontSize: 12,
                    color: "#0a7b4a",
                    marginTop: 6,
                    lineHeight: "18px",
                    whiteSpace: "pre-line",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div>{t("landing.regulatoryForm.successMessage")}</div>
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 999,
                      border: "1px solid rgba(0,0,0,0.15)",
                      background: "#ffffff",
                      cursor: "pointer",
                      fontSize: 12,
                      alignSelf: "flex-end",
                      fontWeight: 500,
                    }}
                  >
                    {t("common.close")}
                  </button>
                </div>
              )}

              {/* Actions */}
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 8,
                }}
              >
                <button
                  type="button"
                  onClick={handleCloseForm}
                  disabled={formStatus === "loading"}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 999,
                    border: "1px solid rgba(0,0,0,0.15)",
                    background: "#ffffff",
                    cursor: formStatus === "loading" ? "not-allowed" : "pointer",
                    fontSize: 14,
                    opacity: formStatus === "loading" ? 0.6 : 1,
                  }}
                >
                  {t("common.cancel")}
                </button>
                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 999,
                    border: "none",
                    background:
                      "linear-gradient(92deg, #1fc77b 0%, #0ea371 50%, #2ee8a0 100%)",
                    color: "#ffffff",
                    cursor: formStatus === "loading" ? "not-allowed" : "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    opacity: formStatus === "loading" ? 0.7 : 1,
                  }}
                >
                  {formStatus === "loading"
                    ? t("common.sending")
                    : t("common.sendRequest")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INFO REQUEST FORM MODAL */}
      {showInfoForm && (
        <div
          className="lp-modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
          }}
        >
          <div
            className="lp-modal"
            style={{
              background: "#ffffff",
              borderRadius: 18,
              maxWidth: 520,
              width: "90%",
              padding: "24px 28px",
              boxShadow: "0 18px 60px rgba(0,0,0,0.25)",
              maxHeight: "90vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#0e3d2c",
                  }}
                >
                  {t("landing.infoForm.title")}
                </h3>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 13,
                    lineHeight: "20px",
                    color: "rgba(7,58,41,0.8)",
                  }}
                >
                  {t("landing.infoForm.subtitle")}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowInfoForm(false)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: 12,
                  color: "rgba(0,0,0,0.6)",
                  cursor: "pointer",
                  padding: "4px 0 0 8px",
                  textDecoration: "underline",
                  textUnderlineOffset: 2,
                }}
              >
                {t("common.close")}
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleInfoFormSubmit}
              style={{ display: "grid", gap: 10, marginTop: 4 }}
            >
              <input
                name="fullName"
                placeholder={t("landing.infoForm.fields.fullName.placeholder")}
                value={infoFormData.fullName}
                onChange={(e) =>
                  setInfoFormData((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
                style={{
                  padding: "10px",
                  borderRadius: 8,
                  border: infoValidationErrors.fullName
                    ? "1px solid #d04545"
                    : "1px solid #ddd",
                  fontSize: 13,
                }}
              />

              <input
                name="email"
                type="email"
                placeholder={t("landing.infoForm.fields.email.placeholder")}
                value={infoFormData.email}
                onChange={(e) =>
                  setInfoFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                style={{
                  padding: "10px",
                  borderRadius: 8,
                  border: infoValidationErrors.email
                    ? "1px solid #d04545"
                    : "1px solid #ddd",
                  fontSize: 13,
                }}
              />

              <input
                name="organisation"
                placeholder={t("landing.infoForm.fields.organisation.placeholder")}
                value={infoFormData.organisation}
                onChange={(e) =>
                  setInfoFormData((prev) => ({
                    ...prev,
                    organisation: e.target.value,
                  }))
                }
                style={{
                  padding: "10px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  fontSize: 13,
                }}
              />

              <input
                name="country"
                placeholder={t("landing.infoForm.fields.country.placeholder")}
                value={infoFormData.country}
                onChange={(e) =>
                  setInfoFormData((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
                style={{
                  padding: "10px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  fontSize: 13,
                }}
              />

              <textarea
                name="message"
                placeholder={t("landing.infoForm.fields.message.placeholder")}
                rows={3}
                value={infoFormData.message}
                onChange={(e) =>
                  setInfoFormData((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                style={{
                  padding: "10px",
                  borderRadius: 8,
                  border: infoValidationErrors.message
                    ? "1px solid #d04545"
                    : "1px solid #ddd",
                  fontSize: 13,
                }}
              />

              {/* Error */}
              {infoFormStatus === "error" && (
                <div
                  style={{
                    background: "rgba(208,69,69,0.08)",
                    border: "1px solid rgba(208,69,69,0.25)",
                    padding: "8px 10px",
                    borderRadius: 6,
                    fontSize: 12,
                    color: "#a23535",
                    marginTop: 6,
                    lineHeight: "18px",
                  }}
                >
                  {t("landing.infoForm.errorMessage")}
                </div>
              )}

              {/* Actions */}
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 8,
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowInfoForm(false)}
                  disabled={infoFormStatus === "loading"}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 999,
                    border: "1px solid rgba(0,0,0,0.15)",
                    background: "#ffffff",
                    cursor: infoFormStatus === "loading" ? "not-allowed" : "pointer",
                    fontSize: 14,
                    opacity: infoFormStatus === "loading" ? 0.6 : 1,
                  }}
                >
                  {t("common.cancel")}
                </button>

                <button
                  type="submit"
                  disabled={infoFormStatus === "loading"}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 999,
                    border: "none",
                    background:
                      "linear-gradient(92deg, #1fc77b 0%, #0ea371 50%, #2ee8a0 100%)",
                    color: "#ffffff",
                    cursor: infoFormStatus === "loading" ? "not-allowed" : "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    opacity: infoFormStatus === "loading" ? 0.7 : 1,
                  }}
                >
                  {infoFormStatus === "loading"
                    ? t("common.sending")
                    : t("common.submitRequest")}
                </button>
              </div>

              {/* Success */}
              {infoFormStatus === "success" && (
                <div
                  style={{
                    background: "rgba(15,140,96,0.10)",
                    border: "1px solid rgba(15,140,96,0.28)",
                    padding: "12px 14px",
                    borderRadius: 6,
                    fontSize: 12,
                    color: "#0a7b4a",
                    marginTop: 12,
                    lineHeight: "18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div>{t("landing.infoForm.successMessage")}</div>

                  <button
                    type="button"
                    onClick={() => setShowInfoForm(false)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 999,
                      border: "1px solid rgba(0,0,0,0.15)",
                      background: "#ffffff",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 500,
                      width: "fit-content",
                      alignSelf: "flex-end",
                    }}
                  >
                    {t("common.close")}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* FOOTER EMAIL */}
      <footer className="lp-footer">
        {t("landing.footer.contact")} {" "}
        <a href="mailto:info@greentekx.com">info@greentekx.com</a>
      </footer>

      {/* SCROLL TO TOP BUTTON */}
      {showScrollTop && (
        <button className="lp-scroll-top" onClick={handleScrollTop}>
          ▲
        </button>
      )}
    </div>
  );
};

export default LandingPage;

