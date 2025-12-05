// ============================================================
//  GreentekX — App Router (Final Enterprise-Ready Version)
//  Smart Routing: Projects → Regulatory / Analytical / Materials
//  Professional, clean, scientific, fully protected
// ============================================================

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ======== Components ========
import ProtectedRoute from "./components/ProtectedRoute";
import TopBar from "./components/TopBar";
import LandingPage from "./pages/landing/LandingPage";


// ======== Main Pages ========
import Intro from "./pages/intro/Intro";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProjectsDashboard from "./pages/projects/ProjectsDashboard";
import SelectProjectType from "./pages/SelectProjectType/SelectProjectType";
import NewProjectRegulatory from "./pages/newproject/NewProjectRegulatory";
import NewProjectAnalytical from "./pages/newproject/NewProjectAnalytical";
import Materials from "./pages/materials/Materials";
import PortfolioAnalyticsDashboard from "./pages/portfolioAnalytics/PortfolioAnalyticsDashboard";
import AnalyticsDashboardCharts from "./pages/analytics/AnalyticsDashboardCharts";
import MapAnalytics from "./pages/mapAnalytics/MapAnalytics";

// ============================================================
//  MAIN APPLICATION ROUTER
// ============================================================
function App() {
  return (
    <Router>
      <Routes>
        {/* ======================= PUBLIC ROUTES ======================= */}
        <Route path="/" element={<Intro />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ======================= PROTECTED (LOGGED-IN) ROUTES ======================= */}
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/selectprojecttype"
          element={
            <ProtectedRoute>
              <SelectProjectType />
            </ProtectedRoute>
          }
        />

        {/* 🔹 Regulatory / Analytical Project Editing (with ID) */}
        <Route
          path="/newproject/regulatory/:id"
          element={
            <ProtectedRoute>
              <NewProjectRegulatory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/newproject/analytical/:id"
          element={
            <ProtectedRoute>
              <NewProjectAnalytical />
            </ProtectedRoute>
          }
        />

        {/* 🔹 Optional routes for new project creation (without ID) */}
        <Route
          path="/newproject/regulatory"
          element={
            <ProtectedRoute>
              <NewProjectRegulatory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/newproject/analytical"
          element={
            <ProtectedRoute>
              <NewProjectAnalytical />
            </ProtectedRoute>
          }
        />

        {/* 🔹 Project-Specific Materials Editing */}
        <Route
          path="/materials/:id"
          element={
            <ProtectedRoute>
              <Materials />
            </ProtectedRoute>
          }
        />

        {/* 🔹 Global Materials Page (legacy fallback) */}
        <Route
          path="/materials"
          element={
            <ProtectedRoute>
              <Materials />
            </ProtectedRoute>
          }
        />

        {/* 🔹 Portfolio & Analytics Modules */}
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <PortfolioAnalyticsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsDashboardCharts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mapanalytics"
          element={
            <ProtectedRoute>
              <MapAnalytics />
            </ProtectedRoute>
          }
        />

        {/* ======================= FALLBACK ======================= */}
        <Route path="*" element={<Navigate to="/projects" replace />} />
      </Routes>

      {/* ✅ TopBar visible only inside protected environment */}
      {!["/", "/login", "/register", "/landing"].includes(window.location.pathname) && (
        <TopBar />
      )}
    </Router>
  );
}

export default App;
