import { motion } from "framer-motion";
import React from "react";

export function Section({ id, eyebrow, title, children, className = "" }) {
  return (
    <section id={id} className={`section-shell ${className}`}>
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        {eyebrow && <span>{eyebrow}</span>}
        {title && <h2>{title}</h2>}
      </motion.div>
      {children}
    </section>
  );
}

export function MagneticCard({ children, className = "" }) {
  return (
    <motion.div
      className={`premium-card ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.01 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}

export function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

export function ButtonLink({ href, children, variant = "primary" }) {
  return (
    <a className={`btn ${variant}`} href={href}>
      {children}
    </a>
  );
}
