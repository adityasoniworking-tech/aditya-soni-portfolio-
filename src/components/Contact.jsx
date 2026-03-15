"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Linkedin, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Contact() {
  const [data, setData] = useState({
    contactEmail: "adityasoni.tech04@gmail.com",
    contactPhone: "9228127958",
    contactLocation: "Desra road, Bilimora 396321",
    contactLinkedin: "aditya-soni-927ab5259",
    contactGithub: "adityajsoni25"
  });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    const docRef = doc(db, "portfolio", "main");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData(prev => ({ ...prev, ...docSnap.data() }));
      }
    }, (error) => {
      console.error("Error fetching Contact data:", error);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setStatus(null);

    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (resp.ok) {
        setStatus('success');
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  const contactItems = [
    { icon: Mail, label: "Email", value: data.contactEmail, href: `mailto:${data.contactEmail}` },
    { icon: Phone, label: "Phone", value: data.contactPhone, href: `tel:${data.contactPhone}` },
    { icon: MapPin, label: "Location", value: data.contactLocation },
  ];

  return (
    <section id="contact" style={{
      padding: "1.5rem 2rem",
      maxWidth: "1100px",
      margin: "0 auto",
      position: "relative"
    }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "clamp(3rem, 7vw, 4.5rem)", fontWeight: 800, marginBottom: "1.5rem" }}>
          Get In <span className="text-gradient">Touch</span>
        </h2>
        <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)", maxWidth: "600px", margin: "0 auto" }}>
          Have a project in mind? Let's talk.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "4rem",
        alignItems: "start"
      }}>
        {/* Contact Info Cards */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}>
          {contactItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            className="glass-panel"
            style={{
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem"
            }}
          >
            <div style={{ 
              width: "50px", 
              height: "50px", 
              borderRadius: "12px", 
              background: "rgba(139, 92, 246, 0.1)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              color: "var(--primary)"
            }}>
              <item.icon size={24} />
            </div>
            <div>
              <p style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.5)", margin: 0, textTransform: "uppercase", fontWeight: 700, letterSpacing: "1px" }}>{item.label}</p>
              {item.href ? (
                <a href={item.href} style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff" }}>{item.value}</a>
              ) : (
                <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fff", margin: 0 }}>{item.value}</p>
              )}
            </div>
          </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="glass-panel"
          style={{ 
            padding: "3rem", 
            display: "flex", 
            flexDirection: "column", 
            gap: "1.5rem" 
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.6)" }}>Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                style={{
                  padding: "0.8rem 1rem", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.08)",
                  background: "rgba(255, 255, 255, 0.02)", color: "white", outline: "none", fontSize: "0.95rem"
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.6)" }}>Email</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                style={{
                  padding: "0.8rem 1rem", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.08)",
                  background: "rgba(255, 255, 255, 0.02)", color: "white", outline: "none", fontSize: "0.95rem"
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.6)" }}>Message</label>
            <textarea 
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              placeholder="Hi Aditya, I'd like to talk about..."
              style={{
                padding: "0.8rem 1rem", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(255, 255, 255, 0.02)", color: "white", outline: "none", fontSize: "0.95rem", resize: "none"
              }}
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: "var(--gradient-1)",
              color: "white",
              padding: "1rem",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              border: "none",
              marginTop: "0.5rem",
              transition: "transform 0.2s",
              opacity: isSubmitting ? 0.7 : 1
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? "Sending..." : status === 'success' ? "Message Sent!" : "Send Message"}
          </motion.button>
          
          {status === 'success' && (
            <p style={{ color: '#10b981', fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>
              Thanks! I'll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>
              Something went wrong. Please try again.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
