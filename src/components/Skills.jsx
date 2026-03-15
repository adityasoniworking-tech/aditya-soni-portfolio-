"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Skills() {
  const [data, setData] = useState({
    skills: [
      { id: 1, title: "Languages", list: "C, Java, Python, ABAP" },
      { id: 2, title: "Web Development", list: "HTML, CSS, JavaScript, PHP, React JS" },
      { id: 3, title: "Database Skills", list: "SQL, MySQL, Oracle, PhpMyAdmin" },
      { id: 4, title: "Tools & Others", list: "GitHub, VS Code, Jupyter Notebook, Google Colab, PowerBI" },
      { id: 5, title: "Soft Skills", list: "Communication, Teamwork, Time Management, Problem Solving, Leadership" }
    ]
  });

  useEffect(() => {
    const docRef = doc(db, "portfolio", "main");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const fetchedData = docSnap.data();

        if (!fetchedData.skills && fetchedData.skill1Title) {
          fetchedData.skills = [1, 2, 3, 4, 5].map(i => ({
            id: i,
            title: fetchedData[`skill${i}Title`] || "",
            list: fetchedData[`skill${i}List`] || ""
          })).filter(s => s.title || s.list);
        }

        if (fetchedData.skills) {
          setData(prev => ({ ...prev, ...fetchedData }));
        }
      }
    }, (error) => {
      console.error("Error fetching Skills data:", error);
    });

    return () => unsubscribe();
  }, []);
  const categories = data.skills ? data.skills.map(s => ({
    title: s.title,
    skills: s.list ? s.list.split(",").map(val => val.trim()).filter(Boolean) : []
  })) : [];

  // Assuming skillCategories will be defined elsewhere or derived from 'categories' with added icons.
  // For the purpose of this edit, we'll use 'categories' and omit the icon part as it's not provided.
  // If icons are intended, the user would need to define skillCategories with icon properties.
  const skillCategories = categories; // Using existing categories for now

  return (
    <section id="skills" style={{
      padding: "1.5rem 2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative"
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "clamp(3rem, 7vw, 4.5rem)", fontWeight: 800, marginBottom: "1.5rem" }}>
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)" }}>
            My toolbox for digital craftsmanship
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2.5rem"
        }}>
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel"
              style={{
                padding: "2.5rem",
                transition: "all 0.3s ease"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.5rem" }}>
                {/* Removed <cat.icon size={28} /> as 'icon' property is not defined in 'categories' */}
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>{cat.title}</h3>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {cat.skills.map((skill, j) => (
                  <span
                    key={j}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "rgba(139, 92, 246, 0.05)",
                      border: "1px solid rgba(139, 92, 246, 0.15)",
                      borderRadius: "20px",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: "rgba(255, 255, 255, 0.8)"
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
