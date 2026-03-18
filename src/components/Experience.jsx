"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Experience() {
  const [data, setData] = useState({
    experiences: [
      { id: 1, year: "Present", role: "Full Stack Web Developer", company: "Growlity, Inc.", description: "Working as a Full Stack Web Developer leveraging technologies like React, Node.js, Express, MongoDB, and PostgreSQL." },
      { id: 2, year: "Summer Internship", role: "SAP Educate to Employ (E2E)", company: "SAP", description: "Completed hands-on training in ABAP development on SAP BTP, working on real-world backend business scenarios and custom development." },
      { id: 3, year: "2022 - 2026", role: "B.E. Computer Science Engineering (CGPA 8.56)", company: "Gujarat Technological University", description: "R. N. G. PATEL INSTITUTE OF TECHNOLOGY. Gained a solid grasp of programming, web technologies, and databases." }
    ]
  });

  useEffect(() => {
    const docRef = doc(db, "portfolio", "main");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const fetchedData = docSnap.data();
        
        if (!fetchedData.experiences && fetchedData.exp1Year) {
          fetchedData.experiences = [1, 2, 3].map(i => ({
            id: i,
            year: fetchedData[`exp${i}Year`] || "",
            role: fetchedData[`exp${i}Role`] || "",
            company: fetchedData[`exp${i}Company`] || "",
            description: fetchedData[`exp${i}Desc`] || ""
          })).filter(e => e.year || e.role);
        }

        if (fetchedData.experiences) {
          setData(prev => ({ ...prev, ...fetchedData }));
        }
      }
    }, (error) => {
      console.error("Error fetching Experience data:", error);
    });

    return () => unsubscribe();
  }, []);
  const experiences = [...(data.experiences || [])].reverse();
  return (
    <section id="experience" style={{
      padding: "1.5rem 2rem",
      maxWidth: "1000px",
      margin: "0 auto",
      position: "relative"
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "2.5rem" }}
      >
        <h2 style={{ fontSize: "clamp(3rem, 7vw, 4.5rem)", fontWeight: 800, marginBottom: "1.5rem" }}>
          My <span className="text-gradient">Journey</span>
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)", maxWidth: "700px", margin: "0 auto" }}>
          A timeline of my professional and learning experiences.
        </p>
      </motion.div>

      <div style={{ position: "relative", maxWidth: "900px", margin: "0 auto" }}>
        {/* Vertical Line */}
        <div style={{
          position: "absolute",
          left: "24px",
          top: 0,
          width: "2px",
          height: "100%",
          background: "linear-gradient(to bottom, transparent, var(--primary), transparent)",
          opacity: 0.3,
          zIndex: 0,
          transform: "translateX(-50%)"
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {experiences.map((exp, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            style={{ 
              width: "100%", 
              display: "flex", 
              justifyContent: "flex-start",
              position: "relative" 
            }}
          >
            {/* Timeline Dot */}
            <div style={{
              position: "absolute",
              left: "24px",
              top: "2.5rem",
              transform: "translateX(-50%)",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "var(--primary)",
              border: "3px solid var(--background)",
              boxShadow: "0 0 10px var(--primary)",
              zIndex: 1
            }} />

            <div className="glass-panel" style={{ 
              padding: "2rem",
              marginLeft: "4rem",
              width: "100%",
              position: "relative"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <span style={{
                  padding: "0.3rem 0.8rem",
                  background: "var(--primary)",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  color: "white"
                }}>{exp.year}</span>
                <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem" }}>{exp.location || ""}</span>
              </div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800, margin: "0 0 0.35rem 0", color: "#fff" }}>{exp.role}</h3>
              <p style={{ color: "var(--primary)", fontWeight: 700, fontSize: "1rem", margin: "0 0 0.75rem 0" }}>{exp.company}</p>
              <p style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.6, margin: 0, fontSize: "0.95rem" }}>{exp.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
      </div>
    </section>
  );
}
