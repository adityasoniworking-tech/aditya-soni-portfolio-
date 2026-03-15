"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const [data, setData] = useState({
    showTestimonials: true,
    testimonials: []
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const docRef = doc(db, "portfolio", "main");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData(prev => ({ ...prev, ...docSnap.data() }));
      }
    }, (error) => {
      console.error("Error fetching Testimonials:", error);
    });

    return () => unsubscribe();
  }, []);

  const visibleTestimonials = (data.testimonials || []).filter(t => t.show !== false);

  // Auto-play logic
  useEffect(() => {
    if (visibleTestimonials.length <= 1) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % visibleTestimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [visibleTestimonials.length]);

  if (!data.showTestimonials || visibleTestimonials.length === 0) return null;

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % visibleTestimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + visibleTestimonials.length) % visibleTestimonials.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)"
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)"
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)"
    })
  };

  return (
    <section id="testimonials" style={{
      padding: "1.5rem 1.5rem",
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
    }}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "clamp(2.25rem, 6vw, 3.5rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
          What <span className="text-gradient">People Say</span>
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
          Feedback from my peers and collaborators
        </p>
      </div>

      <div style={{ position: "relative", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.article
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="glass-panel"
            style={{
              width: "100%",
              maxWidth: "600px",
              padding: "clamp(1.5rem, 4vw, 2.5rem)",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              textAlign: "center",
              position: "absolute"
            }}
          >
            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              color: "var(--primary)",
              opacity: 0.15 
            }}>
              <Quote size={40} />
            </div>

            <p style={{ 
              color: "#f8fafc", 
              fontSize: "clamp(1rem, 2vw, 1.25rem)", 
              fontStyle: "italic", 
              lineHeight: 1.6,
              fontWeight: 400,
              margin: 0
            }}>
              &quot;{visibleTestimonials[currentIndex].quote}&quot;
            </p>

            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: 700, margin: "0 0 0.15rem 0", color: "white" }}>
                {visibleTestimonials[currentIndex].author}
              </h4>
              <p style={{ color: "var(--primary)", fontSize: "0.8rem", fontWeight: 600, margin: 0, textTransform: "uppercase", letterSpacing: "1px" }}>
                {visibleTestimonials[currentIndex].role}
              </p>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div style={{ 
        marginTop: "2.5rem",
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: "1.25rem" 
      }}>
        <button 
          onClick={prevTestimonial}
          style={{ 
            background: "rgba(255,255,255,0.03)", 
            border: "1px solid rgba(255,255,255,0.06)", 
            color: "white", 
            width: "40px", 
            height: "40px", 
            borderRadius: "50%", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            cursor: "pointer",
            transition: "0.3s"
          }}
        >
          <ChevronLeft size={18} />
        </button>

        <div style={{ display: "flex", gap: "0.4rem" }}>
          {visibleTestimonials.map((_, i) => (
            <div 
              key={i} 
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              style={{ 
                width: i === currentIndex ? "16px" : "6px", 
                height: "6px", 
                borderRadius: "3px", 
                background: i === currentIndex ? "var(--primary)" : "rgba(255,255,255,0.15)",
                cursor: "pointer",
                transition: "0.4s ease"
              }} 
            />
          ))}
        </div>

        <button 
          onClick={nextTestimonial}
          style={{ 
            background: "rgba(255,255,255,0.03)", 
            border: "1px solid rgba(255,255,255,0.06)", 
            color: "white", 
            width: "40px", 
            height: "40px", 
            borderRadius: "50%", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            cursor: "pointer",
            transition: "0.3s"
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
