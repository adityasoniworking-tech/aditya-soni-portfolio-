"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Projects() {
  const [data, setData] = useState({
    projects: [
      { id: 1, title: "Scan2Health", description: "A health-aware barcode scanner web app enabling users to access comprehensive nutritional data, ingredient lists, and health impact assessments.", image: "", tech: "Web App, Frontend, Backend", github: "#", showGithub: true, live: "#", showLive: true },
      { id: 2, title: "Customer Order Tracking System", description: "A cloud-ready SAP ABAP application built using RAP. Integrates customer, product, and order data with CDS views and OData services supporting complete CRUD operations.", image: "", tech: "SAP ABAP, RAP, OData", github: "#", showGithub: true, live: "#", showLive: true },
      { id: 3, title: "Database Administration", description: "Designed and normalized relational databases in Oracle/MySQL with constraints, indexes, and triggers to ensure secure and efficient operations.", image: "", tech: "Oracle, MySQL, DB Design", github: "#", showGithub: true, live: "#", showLive: true }
    ]
  });

  useEffect(() => {
    const docRef = doc(db, "portfolio", "main");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const fetchedData = docSnap.data();

        if (!fetchedData.projects && fetchedData.proj1Title) {
          fetchedData.projects = [1, 2, 3].map(i => ({
            id: i,
            title: fetchedData[`proj${i}Title`] || "",
            description: fetchedData[`proj${i}Desc`] || "",
            image: "",
            tech: "",
            github: "#",
            showGithub: true,
            live: "#",
            showLive: true
          })).filter(p => p.title || p.description);
        }

        if (fetchedData.projects) {
          setData(prev => ({ ...prev, ...fetchedData }));
        }
      }
    }, (error) => {
      console.error("Error fetching Projects data:", error);
    });

    return () => unsubscribe();
  }, []);
  const projects = data.projects || [];

  // Used for fallbacks if no image is provided
  const gradients = [
    "var(--gradient-1)",
    "var(--gradient-2)",
    "linear-gradient(135deg, #10b981, #3b82f6)",
    "linear-gradient(135deg, #f59e0b, #ef4444)",
    "linear-gradient(135deg, #8b5cf6, #ec4899)"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <section id="projects" style={{
      padding: "1.5rem 2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative"
    }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "clamp(3rem, 7vw, 4.5rem)", fontWeight: 800, marginBottom: "1.5rem" }}>
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)" }}>
          A selection of my recent works
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2.5rem",
        }}
      >
        {projects.map((project, idx) => (
          <motion.article 
            key={project.id || idx} 
            variants={cardVariants}
            className="glass-panel"
            style={{
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              height: "100%", // Ensures identical card sizes
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
          >
            <div style={{
              height: "200px",
              borderRadius: "12px",
              background: project.image ? "rgba(255,255,255,0.02)" : gradients[idx % gradients.length],
              position: "relative",
              overflow: "hidden",
            }}>
              {project.image && (
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
              {/* Fake image overlay for premium look */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                zIndex: 1
              }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flexGrow: 1 }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "700" }}>{project.title}</h3>
              <p style={{ color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.6, flexGrow: 1 }}>
                {project.description}
              </p>
              
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
                {project.tech && project.tech.split(",").map(t => t.trim()).filter(Boolean).map((tag, tIdx) => (
                  <span key={tIdx} style={{
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "20px",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(255,255,255,0.05)"
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--glass-border)" }}>
              {project.showGithub !== false && (
                <a 
                  href={project.github || "#"} 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label={`View ${project.title} code on GitHub`}
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: "600", color: "rgba(255,255,255,0.8)", transition: "color 0.2s" }} 
                  onMouseOver={(e) => e.currentTarget.style.color = "var(--primary)"} 
                  onMouseOut={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                >
                  <Github size={16} /> Code Base
                </a>
              )}
              {project.showLive !== false && (
                <a 
                  href={project.live || "#"} 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label={`View live demo of ${project.title}`}
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: "600", color: "rgba(255,255,255,0.8)", transition: "color 0.2s" }} 
                  onMouseOver={(e) => e.currentTarget.style.color = "var(--accent)"} 
                  onMouseOut={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
