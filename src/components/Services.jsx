"use client";

import { motion } from "framer-motion";
import { Code, Layout, Smartphone, Server, Database } from "lucide-react";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Services() {
  const [data, setData] = useState({
    services: [
      { id: 1, title: "Web Development", description: "I build fast, interactive, and responsive websites tailored to your brand.", icon: "Layout" },
      { id: 2, title: "UI/UX & Landing Pages", description: "Designing beautiful, conversion-focused landing pages with modern aesthetics.", icon: "Smartphone" },
      { id: 3, title: "Full Stack Apps", description: "End-to-end web application development combining robust backend APIs with fluid frontends.", icon: "Server" },
      { id: 4, title: "Mobile-First Design", description: "Ensuring your website looks incredible and works flawlessly on any device natively.", icon: "Code" }
    ]
  });

  useEffect(() => {
    const docRef = doc(db, "portfolio", "main");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const fetchedData = docSnap.data();

        if (!fetchedData.services && fetchedData.srv1Title) {
          const staticIcons = ["Layout", "Smartphone", "Server", "Code"];
          fetchedData.services = [1, 2, 3, 4].map((i, index) => ({
            id: i,
            title: fetchedData[`srv${i}Title`] || "",
            description: fetchedData[`srv${i}Desc`] || "",
            icon: staticIcons[index]
          })).filter(s => s.title || s.description);
        }

        if (fetchedData.services) {
          setData(prev => ({ ...prev, ...fetchedData }));
        }
      }
    }, (error) => {
      console.error("Error fetching Services data:", error);
    });

    return () => unsubscribe();
  }, []);
  const iconMap = {
    Layout,
    Smartphone,
    Server,
    Code,
    Database
  };

  const services = (data.services || []).map(s => ({
    ...s,
    icon: iconMap[s.icon] || Code
  }));

  return (
    <section id="services" style={{
      padding: "1.5rem 2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative"
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        <h2 style={{ fontSize: "clamp(3rem, 7vw, 4.5rem)", fontWeight: 800, marginBottom: "1.5rem" }}>
          Specialized <span className="text-gradient">Services</span>
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)" }}>
          Solutions tailored to your digital needs
        </p>
      </motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "2.5rem"
      }}>
        {services.map((service, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-panel"
            style={{
              padding: "2.5rem",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              transition: "transform 0.3s ease",
              cursor: "default"
            }}
          >
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "15px",
              background: "rgba(139, 92, 246, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary)"
            }}>
              <service.icon size={32} />
            </div>
            
            <div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>{service.title}</h3>
              <p style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.8, fontSize: "1rem" }}>{service.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
