// src/pages/landing/LandingPage.tsx

import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import emailjs from "@emailjs/browser";
const EMAILJS_SERVICE_ID = "service_ox0euhr";
const EMAILJS_TEMPLATE_ID = "template_x1kgwh4";
const EMAILJS_PUBLIC_KEY = "iHF23rhsJtRR54_ND";
const LandingPage: React.FC = () => {
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

const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
  "idle"
);
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

const [infoFormStatus, setInfoFormStatus] = useState<"idle" | "success" | "error">("idle");

const [infoValidationErrors, setInfoValidationErrors] = useState({
  fullName: false,
  email: false,
  message: false,
});


useEffect(() => {
  const handleScroll = () => {
    setShowScrollTop(document.body.scrollTop > 250);
  };

  document.body.addEventListener("scroll", handleScroll);
  return () => document.body.removeEventListener("scroll", handleScroll);
}, []);
const handleRequestRegulatory = () => {
  setShowForm(true);
  setFormStatus("idle");
  setFormError("");

  // Reset form fields (optional but recommended)
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
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  // تبدیل همه‌ی داده‌های فرم به یک پیام مرتب
  const messageText =
    "New Regulatory Request:\n\n" +
    `Project name: ${formData.projectName}\n` +
    `Country: ${formData.country}\n` +
    `Building type: ${formData.buildingType}\n` +
    `Gross floor area: ${formData.area}\n` +
    `Design stage: ${formData.stage}\n` +
    `Target deadline: ${formData.deadline}\n` +
    `Email: ${formData.email}\n\n` +
    `Notes:\n${formData.notes}`;

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

  // ==============================================
  // SEND EMAIL VIA EMAILJS
  // ==============================================
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
    window.location.href =
      "mailto:info@greentekx.com?subject=GreentekX%20Pilot%20Project&body=Hello%20GreentekX%20team,";
  };

  const handleScrollTop = () => {
   document.body.scrollTo({ top: 0, behavior: "smooth" });


  };

  return (
    <div className="lp-root">
      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-container lp-hero-inner">
          <div className="lp-hero-brand">
            <div className="lp-hero-logo-ball" />
            <div className="lp-hero-brand-text">GreentekX</div>
          </div>

          <p className="lp-hero-tagline">
            Measure Carbon. Build Cleaner &amp; Greener.
          </p>

          <h1 className="lp-hero-title">
            Whole-Life Carbon Intelligence Platform
          </h1>

          <p className="lp-hero-subtext">
            A modern, transparent and EU-aligned platform that helps
            engineering teams, consultants and organisations calculate and
            report Whole-Life Carbon with clarity and confidence.
          </p>

        <div className="lp-hero-ctas">

  <button
    className="lp-btn lp-btn-primary"
    onClick={() => handleRequestRegulatory()}
  >
    Request Regulatory Assessment
  </button>

  <div className="lp-cta-note">Typical response time: 1–2 business days</div>

</div>




          <div className="lp-hero-trust">
            Regulatory-ready for EU Taxonomy • EN 15804+A2 • EN 15978 • Level(s)
          </div>
        </div>
      </section>


      {/* VALUE PROPOSITION */}
      <section className="lp-section lp-section-value">
        <div className="lp-container">
          <div className="lp-card lp-value-card">
            <h2 className="lp-section-title">Why GreentekX?</h2>
            <div className="lp-value-grid">
              <div className="lp-value-item">
                <h3 className="lp-value-title">Full EU-Compliant Framework</h3>
                <p className="lp-value-body">
                  Supports EN 15804+A2, EN 15978, EU Taxonomy and Level(s) so
                  your Whole-Life Carbon results are consistent, auditable and
                  ready for regulators.
                </p>
              </div>
              <div className="lp-value-item">
                <h3 className="lp-value-title">High-Accuracy Aggregation</h3>
                <p className="lp-value-body">
                  Brings together embodied, operational and end-of-life impacts
                  across all materials and energy sources in a single,
                  structured workflow.
                </p>
              </div>
              <div className="lp-value-item">
                <h3 className="lp-value-title">Professional Reporting Engine</h3>
                <p className="lp-value-body">
                  Generates clean, regulator-ready reports and advanced
                  analytics layouts that match the expectations of European
                  engineering teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="lp-section lp-section-capabilities">
        <div className="lp-container">
          <h2 className="lp-section-title">Core capabilities</h2>
          <div className="lp-cap-grid">
            <div className="lp-cap-card">
              <h3 className="lp-cap-title">Materials Intelligence Hub</h3>
              <p className="lp-cap-body">
                Manage materials, EPDs and stage-based profiles in a single
                structured interface designed for Whole-Life Carbon workflows.
              </p>
            </div>
            <div className="lp-cap-card">
              <h3 className="lp-cap-title">Project-level WLC Analysis</h3>
              <p className="lp-cap-body">
                Calculate A1–A3, A–D, B6 energy and more, with clear separation
                of embodied, operational and end-of-life impacts.
              </p>
            </div>
            <div className="lp-cap-card">
              <h3 className="lp-cap-title">Climate-zone Benchmarking</h3>
              <p className="lp-cap-body">
                Compare projects against Nordic, Central European and
                Mediterranean benchmarks for more realistic performance
                insights.
              </p>
            </div>
            <div className="lp-cap-card">
              <h3 className="lp-cap-title">
                Stage-adjusted Accuracy Model
              </h3>
              <p className="lp-cap-body">
                Account for Concept, Design, Tender and As-built stages so
                benchmark expectations match the maturity of each project.
              </p>
            </div>
            <div className="lp-cap-card">
              <h3 className="lp-cap-title">
                Full EN 15804+A2 Indicator Set
              </h3>
              <p className="lp-cap-body">
                No shortcuts: GWP, AP, EP-F/M/T, ODP, POCP, ADP-F/M, WDP, HWD,
                NHWD, RWD and many more in one consistent view.
              </p>
            </div>
            <div className="lp-cap-card">
              <h3 className="lp-cap-title">Regulatory &amp; Advanced Outputs</h3>
              <p className="lp-cap-body">
                Switch between compact regulatory reports and deep-dive
                analytics layouts, depending on your audience and use case.
              </p>
            </div>
          </div>
        </div>
      </section>
{/* COMPETITIVE ADVANTAGES */}
<section className="lp-section lp-section-adv">
  <div className="lp-container">

    <h2 className="lp-section-title">
      What makes GreentekX different?
    </h2>

    <div className="lp-adv-grid">

      <ul className="lp-bullets">
        <li>Climate-zone normalization for realistic European benchmarks.</li>
        <li>Stage-weighted benchmark adjustments from Concept to As-built.</li>
        <li>
          Full coverage of all 32 EN 15804+A2 indicators without simplifications,
          including full A1–A3 to C4 integration and transparent material-level
          calculations.
        </li>
      </ul>

      <ul className="lp-bullets">
        <li>Research-grade transparency for engineering and academic work.</li>
        <li>Regulatory-ready documentation with clear indicator breakdowns.</li>
        <li>Modern, scientific UI designed for real project workflows.</li>
      </ul>

    </div>
  </div>
</section>


      {/* WHO IS IT FOR */}
      <section className="lp-section lp-section-who">
        <div className="lp-container">
          <h2 className="lp-section-title">Who uses GreentekX?</h2>
          <div className="lp-who-grid">
            <div className="lp-who-card">Engineering &amp; design offices</div>
            <div className="lp-who-card">Carbon and LCA consultants</div>
            <div className="lp-who-card">Architecture practices</div>
            <div className="lp-who-card">
              Universities &amp; research projects
            </div>
            <div className="lp-who-card">
              Sustainability and ESG teams
            </div>
            <div className="lp-who-card">
              Public-sector and regulatory projects
            </div>
          </div>
        </div>
      </section>

     

  {/* FINAL CTA */}
  <section className="lp-section lp-section-final">
    <div className="lp-container lp-final-inner">
      <h2 className="lp-final-title">
        Ready to bring EU-grade Whole-Life Carbon to your projects?
      </h2>
      <p className="lp-final-sub">
        Start with a pilot project or request a sample assessment to see how
        GreentekX fits into your workflow.
      </p>
      <div className="lp-final-ctas">
        <button
          className="lp-btn lp-btn-final-primary"
          type="button"
          onClick={handleRequestRegulatory}
        >
          Request Regulatory Assessment
        </button>
        <button
          className="lp-btn lp-btn-final-secondary"
          type="button"
          onClick={handleShowInfoForm}
        >
          Request more information
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
              Request Regulatory Assessment
            </h3>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 13,
                lineHeight: "20px",
                color: "rgba(7,58,41,0.8)",
              }}
            >
              Fill in a few project details and we will contact you with the
              next steps within 48 hours.
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
            Close
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
              Project name *
            </label>
            <input
              id="projectName"
              name="projectName"
              placeholder="e.g. Helsinki Office Tower"
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
              Country *
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
              <option value="">Country *</option>

              {/* Priority EU region */}
              <option value="Finland">Finland</option>
              <option value="Sweden">Sweden</option>
              <option value="Denmark">Denmark</option>
              <option value="Norway">Norway</option>
              <option value="Germany">Germany</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Belgium">Belgium</option>
              <option value="Estonia">Estonia</option>
              <option value="Latvia">Latvia</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Poland">Poland</option>
              <option value="Austria">Austria</option>
              <option value="France">France</option>
              <option value="Italy">Italy</option>
              <option value="Spain">Spain</option>
              <option value="Portugal">Portugal</option>
              <option value="Ireland">Ireland</option>

              {/* General fallback */}
              <option value="United Kingdom">United Kingdom</option>
              <option value="Other">Other (non-EU)</option>
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
              Building type
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
              <option value="">Select building type</option>
              <option value="Office">Office</option>
              <option value="Residential">Residential</option>
              <option value="Mixed-use">Mixed-use</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Industrial">Industrial</option>
              <option value="Retail">Retail</option>
              <option value="Logistics">Logistics</option>
              <option value="Hotel">Hotel</option>
              <option value="Cultural">Cultural</option>
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
                Gross floor area (m²)
              </label>
              <input
                id="area"
                type="number"
                name="area"
                placeholder="e.g. 12 000"
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
                Design stage
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
                <option value="">Select stage</option>
                <option value="Concept">Concept</option>
                <option value="Design">Design</option>
                <option value="Tender">Tender</option>
                <option value="As-built">As-built</option>
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
              Target deadline for the report
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
              Contact email *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="yourname@company.com"
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
              Additional information
            </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Describe special requirements, missing data or constraints…"
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
  <div className="privacy-title">Data & Privacy</div>
  <ul className="privacy-list">
    <li>Your information is processed confidentially.</li>
    <li>Used only for preparing your carbon report.</li>
    <li>Never shared with third parties.</li>
    <li>Full deletion available upon request.</li>
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
              <div>
                Thank you. Your request has been received. We will contact you
                within 48 hours with the next steps.
              </div>
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
                Close
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
                cursor:
                  formStatus === "loading" ? "not-allowed" : "pointer",
                fontSize: 14,
                opacity: formStatus === "loading" ? 0.6 : 1,
              }}
            >
              Cancel
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
                cursor:
                  formStatus === "loading" ? "not-allowed" : "pointer",
                fontSize: 14,
                fontWeight: 600,
                opacity: formStatus === "loading" ? 0.7 : 1,
              }}
            >
              {formStatus === "loading" ? "Sending…" : "Send request"}
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
              Request more information
            </h3>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 13,
                lineHeight: "20px",
                color: "rgba(7,58,41,0.8)",
              }}
            >
              Send us a brief message and a GreentekX specialist will follow up within 48 hours.
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
            Close
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleInfoFormSubmit}
          style={{ display: "grid", gap: 10, marginTop: 4 }}
        >
          <input
            name="fullName"
            placeholder="Full name *"
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
            placeholder="Work email *"
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
            placeholder="Organisation (optional)"
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
            placeholder="Country (optional)"
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
            placeholder="Your message *"
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
              Please complete all required fields.
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
                cursor:
                  infoFormStatus === "loading" ? "not-allowed" : "pointer",
                fontSize: 14,
                opacity: infoFormStatus === "loading" ? 0.6 : 1,
              }}
            >
              Cancel
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
                cursor:
                  infoFormStatus === "loading" ? "not-allowed" : "pointer",
                fontSize: 14,
                fontWeight: 600,
                opacity: infoFormStatus === "loading" ? 0.7 : 1,
              }}
            >
              {infoFormStatus === "loading" ? "Sending…" : "Submit request"}
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
              <div>Thank you. We will get back to you within 48 hours.</div>

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
                Close
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )}



      {/* FOOTER EMAIL */}
      <footer className="lp-footer">
        Contact us:{" "}
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