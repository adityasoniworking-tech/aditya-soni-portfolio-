"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Code2, Terminal, Cpu, Database, Layout } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Hero() {
  const [data, setData] = useState({
    heroName: "Aditya Soni",
    heroTitle: "CSE Student & Developer",
    heroDesc: "I am a driven and curious Computer Engineering student, eager to apply my technical and problem-solving skills to build impactful web applications and digital experiences.",
    contactLinkedin: "aditya-soni-927ab5259",
    contactGithub: "adityajsoni25",
    contactEmail: "adityasoni.tech04@gmail.com"
  });

  useEffect(() => {
    const docRef = doc(db, "portfolio", "main");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().heroName) {
        setData(prev => ({ ...prev, ...docSnap.data() }));
      }
    }, (error) => {
      console.error("Error fetching Hero data:", error);
    });

    return () => unsubscribe();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 12 } },
  };

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "clamp(2rem, 5vh, 4rem) 2rem",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Hero Animated Background from globals.css */}
      <div className="hero-animated-bg" />
      <div className="grid-pattern" />

      {/* Website Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          cursor: "pointer"
        }}
      >
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)"
        }}>
          <img src="/logo.png" alt="AS Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <span style={{ 
          fontSize: "1.25rem", 
          fontWeight: "800", 
          letterSpacing: "1px",
          background: "linear-gradient(to right, #fff, #a855f7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          ADITYA
        </span>
      </motion.div>

      {/* Floating Developer Icons */}
      {[
        { Icon: Code2, top: "20%", left: "15%", delay: "0s", size: 48, color: "#a855f7" },
        { Icon: Terminal, top: "70%", left: "10%", delay: "2s", size: 64, color: "#3b82f6" },
        { Icon: Cpu, top: "15%", right: "15%", delay: "1s", size: 56, color: "#ec4899" },
        { Icon: Database, top: "65%", right: "10%", delay: "3s", size: 40, color: "#10b981" },
        { Icon: Layout, top: "85%", left: "50%", delay: "4s", size: 32, color: "#8b5cf6" },
      ].map((item, i) => (
        <div 
          key={i}
          style={{
            position: "absolute",
            top: item.top,
            left: item.left,
            right: item.right,
            color: item.color,
            animation: "randomFloat 6s ease-in-out infinite",
            animationDelay: item.delay,
            zIndex: 0,
            filter: "blur(1px)",
            opacity: 0.2 // Slightly lower opacity for icons
          }}
        >
          <item.Icon size={item.size} />
        </div>
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ textAlign: "center", maxWidth: "900px", zIndex: 1 }}
      >
        <motion.div variants={itemVariants} style={{ marginBottom: "1.5rem" }}>
          <span 
            style={{ 
              padding: "0.5rem 1.25rem", 
              borderRadius: "30px",
              border: "1px solid rgba(0, 255, 255, 0.4)",
              background: "rgba(255, 255, 255, 0.03)",
              fontSize: "0.7rem",
              fontWeight: "700",
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              boxShadow: "0 0 10px rgba(0, 255, 255, 0.1), inset 0 0 5px rgba(0, 255, 255, 0.05)",
              color: "#e2e8f0"
            }}
          >
            Welcome to my universe
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants} 
          style={{ 
            fontSize: "clamp(3.5rem, 10vw, 7.5rem)", 
            fontWeight: "900", 
            lineHeight: 1,
            marginBottom: "1rem",
            letterSpacing: "-0.04em",
            background: "linear-gradient(to right, #a855f7, #3b82f6, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 40px rgba(168, 85, 247, 0.4)",
            display: "inline-block"
          }}
        >
          {data.heroName}
        </motion.h1>

        <motion.h2 
          variants={itemVariants} 
          style={{ 
            fontSize: "clamp(1.25rem, 4vw, 2.75rem)", 
            fontWeight: "800",
            color: "#f8fafc",
            marginBottom: "1.5rem",
            letterSpacing: "-0.02em"
          }}
        >
          {data.heroTitle}
        </motion.h2>

        <motion.p 
          variants={itemVariants}
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)",
            color: "rgba(255, 255, 255, 0.7)",
            maxWidth: "700px",
            margin: "0 auto 3.5rem auto",
            lineHeight: 1.6
          }}
        >
          {data.heroDesc}
        </motion.p>

        <motion.div 
          variants={itemVariants}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginTop: "1rem" }}
        >
          <MagneticButton>
            <a href="#projects" style={{
              background: "linear-gradient(to right, #8b5cf6, #3b82f6)",
              color: "white",
              padding: "1rem 2rem",
              borderRadius: "30px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
              cursor: "pointer",
              textDecoration: "none"
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              View Projects <ArrowRight size={18} />
            </a>
          </MagneticButton>

          <MagneticButton>
            <a href="#contact" style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "white",
              padding: "1rem 2rem",
              borderRadius: "30px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.3s ease",
              cursor: "pointer",
              backdropFilter: "blur(10px)",
              textDecoration: "none"
            }}
            onMouseOver={(e) => {
               e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
               e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            }}
            onMouseOut={(e) => {
               e.currentTarget.style.background = "transparent";
               e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
            }}
            >
              Contact Me <Mail size={18} />
            </a>
          </MagneticButton>

          {data.resumeLink && (
            <MagneticButton>
              <a 
                href={data.resumeLink} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "white",
                  padding: "1rem 2rem",
                  borderRadius: "30px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                  textDecoration: "none"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                }}
              >
                Download Resume <ArrowRight size={18} style={{ transform: "rotate(90deg)" }} />
              </a>
            </MagneticButton>
          )}

          <div style={{ 
            display: "flex", 
            gap: "0.25rem", 
            background: "rgba(255, 255, 255, 0.02)", 
            padding: "0.25rem", 
            borderRadius: "40px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            marginLeft: "0.5rem"
          }}>
            <a href={`https://github.com/${data.contactGithub}`} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "45px", height: "45px", borderRadius: "50%", color: "rgba(255,255,255,0.7)", transition: "all 0.3s" }} onMouseOver={(e) => { e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"; }} onMouseOut={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.background = "transparent"; }}>
              <Github size={18} />
            </a>
            <a href={`https://linkedin.com/in/${data.contactLinkedin}`} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "45px", height: "45px", borderRadius: "50%", color: "rgba(255,255,255,0.7)", transition: "all 0.3s" }} onMouseOver={(e) => { e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"; }} onMouseOut={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.background = "transparent"; }}>
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${data.contactEmail}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "45px", height: "45px", borderRadius: "50%", color: "rgba(255,255,255,0.7)", transition: "all 0.3s" }} onMouseOver={(e) => { e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"; }} onMouseOut={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.background = "transparent"; }}>
              <Mail size={18} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
