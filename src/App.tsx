/* ============================================================
   GreentekX — Minimal Router
   Only 2 pages: Intro + Landing
   No auth, no dashboard, no materials, no protected routes
   ============================================================ */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Intro from "./pages/Intro/Intro";
import LandingPage from "./pages/landing/LandingPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
