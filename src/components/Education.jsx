"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Education() {
  const [data, setData] = useState({
    education: [
      {
        id: 1,
        year: "2022 - 2026",
        degree: "B.E. Computer Science Engineering",
        institution: "Gujarat Technological University",
        details: "R. N. G. PATEL INSTITUTE OF TECHNOLOGY (RNGPIT). Current CGPA: 8.56. Focus on Core CS subjects, Web Development, and Software Engineering."
      },
      {
        id: 2,
        year: "2020 - 2022",
        degree: "Higher Secondary Education (Class XII)",
        institution: "GS&HSEB",
        details: "Completed with Science Stream. Developed strong foundation in Mathematics and Physics."
      },
      {
        id: 3,
        year: "2018 - 2020",
        degree: "Secondary Education (Class X)",
        institution: "GSEB",
        details: "Foundation years focusing on broad academic excellence."
      }
    ]
  });

  useEffect(() => {
    const docRef = doc(db, "portfolio", "main");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const fetchedData = docSnap.data();
        if (fetchedData.education) {
          setData(prev => ({ ...prev, education: fetchedData.education }));
        }
      }
    }, (error) => {
      console.error("Error fetching Education data:", error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="education" style={{
      padding: "4rem 2rem",
      maxWidth: "1100px",
      margin: "0 auto",
      position: "relative"
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "3.5rem" }}
      >
        <h2 style={{ fontSize: "clamp(3rem, 7vw, 4.5rem)", fontWeight: 800, marginBottom: "1.5rem" }}>
          Education <span className="text-gradient-alt">Background</span>
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)", maxWidth: "700px", margin: "0 auto" }}>
          My academic journey and qualifications.
        </p>
      </motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2rem"
      }}>
        {data.education.map((edu, i) => (
          <motion.article
            key={edu.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-panel"
            style={{
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <div style={{
              position: "absolute",
              top: "0",
              right: "0",
              padding: "0.5rem 1.2rem",
              background: "var(--gradient-2)",
              color: "white",
              fontSize: "0.75rem",
              fontWeight: 800,
              borderBottomLeftRadius: "12px",
              textTransform: "uppercase"
            }}>
              {edu.year}
            </div>
            
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary)", marginTop: "1rem" }}>
              {edu.degree}
            </h3>
            
            <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff" }}>
              {edu.institution}
            </h4>
            
            <p style={{ 
              color: "rgba(255, 255, 255, 0.65)", 
              fontSize: "0.95rem", 
              lineHeight: 1.7,
              margin: 0 
            }}>
              {edu.details}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
