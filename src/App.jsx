import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import AdminDashboard from "./components/AdminDashboard";
import Portfolio from "./components/Portfolio";

export default function App() {
  const [view, setView] = useState(() => (window.location.hash === "#admin" ? "admin" : "portfolio"));

  function openAdmin() {
    window.location.hash = "admin";
    setView("admin");
  }

  function openPortfolio() {
    window.location.hash = "";
    setView("portfolio");
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.28 }}
      >
        {view === "admin" ? <AdminDashboard onExit={openPortfolio} /> : <Portfolio openAdmin={openAdmin} />}
      </motion.div>
    </AnimatePresence>
  );
}
