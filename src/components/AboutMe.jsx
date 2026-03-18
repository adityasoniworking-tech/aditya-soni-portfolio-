"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / value));
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= value) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return <span ref={ref}>{count}</span>;
}

export default function AboutMe() {
  const [data, setData] = useState({
    aboutText: "Driven and curious Computer Engineering student with a solid grasp of programming, web technologies, and databases. Eager to learn, adapt, and apply my technical and soft skills in dynamic, team-oriented environments to create meaningful impact.",
    cgpa: "8",
    cgpaDecimals: ".56",
    projectsCount: "3",
    certCount: "5"
  });

  useEffect(() => {
    const docRef = doc(db, "portfolio", "main");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().aboutText) {
        setData(prev => ({ ...prev, ...docSnap.data() }));
      }
    }, (error) => {
      console.error("Error fetching About data:", error);
    });

    return () => unsubscribe();
  }, []);

  const stats = [
    { label: "CGPA", value: Number(data.cgpa) || 8, suffix: data.cgpaDecimals || ".56" },
    { label: "Projects", value: Number(data.projectsCount) || 3, suffix: "+" },
    { label: "Certifications", value: Number(data.certCount) || 5, suffix: "+" }
  ];

  return (
    <section id="about" style={{
      padding: "1.5rem 2rem",
      maxWidth: "1100px",
      margin: "0 auto",
      position: "relative"
    }}>
      <style>{`
        @media (max-width: 768px) {
          .about-stats { grid-template-columns: repeat(3, 1fr) !important; gap: 0.75rem !important; margin-top: 0.5rem !important; }
          .about-stats article { padding: 1.25rem 0.5rem !important; }
          .about-stats h3 { font-size: 1.5rem !important; }
          .about-stats p { font-size: 0.65rem !important; }
          .about-wrapper { gap: 0.75rem !important; }
          .about-text { margin-bottom: 0 !important; }
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="about-wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center"
        }}
      >
        <div className="about-text" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "clamp(3rem, 7vw, 4.5rem)", fontWeight: 800, marginBottom: "1.5rem" }}>
            About <span className="text-gradient-alt">Me</span>
          </h2>
          <p style={{
            color: "rgba(255, 255, 255, 0.75)",
            fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)",
            maxWidth: "750px",
            lineHeight: 1.8,
            margin: "0 auto"
          }}>
            {data.aboutText}
          </p>
        </div>

        {/* Animated Stats Grid */}
        <div className="about-stats" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2rem",
          width: "100%",
          marginTop: "2rem"
        }}>
          {stats.map((stat, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel"
              style={{
                padding: "2.5rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem"
              }}
            >
              <h3 style={{ fontSize: "clamp(2rem, 6vw, 2.75rem)", fontWeight: 800, color: "var(--primary)", margin: 0 }}>
                <AnimatedNumber value={stat.value} />{stat.suffix}
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.6)", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.75rem", fontWeight: 600 }}>
                {stat.label}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
