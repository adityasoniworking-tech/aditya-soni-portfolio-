"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import MagneticButton from "./MagneticButton";

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Footer() {
  const [name, setName] = useState("Aditya");
  const [resumeLink, setResumeLink] = useState("/resume.pdf");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "portfolio", "main");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.heroName) setName(data.heroName.split(" ")[0]);
          if (data.resumeLink) setResumeLink(data.resumeLink);
        }
      } catch (error) {
        console.error("Error fetching Footer data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <footer style={{
      padding: "4rem 2rem",
      borderTop: "1px solid var(--glass-border)",
      background: "var(--bg-gradient-end)",
      marginTop: "4rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "2.5rem"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <img src="/logo.png" alt="AS Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <span style={{ 
          fontSize: "1rem", 
          fontWeight: "800", 
          letterSpacing: "1px",
          color: "white"
        }}>
          ADITYA
        </span>
      </div>
      <MagneticButton>
        <a 
          href={resumeLink} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem 2.5rem",
            borderRadius: "30px",
            background: "var(--foreground)",
            color: "var(--background)",
            fontWeight: 700,
            fontSize: "1.125rem",
            textDecoration: "none",
            transition: "transform 0.2s"
          }}
        >
          <Download size={20} />
          Download Resume
        </a>
      </MagneticButton>

      <div style={{ textAlign: "center", color: "rgba(255, 255, 255, 0.4)", fontSize: "0.875rem" }}>
        <p style={{ margin: "0 0 0.5rem 0" }}>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <p style={{ margin: 0 }}>Built with Next.js, Framer Motion, and Vanilla Custom CSS.</p>
      </div>
    </footer>
  );
}
