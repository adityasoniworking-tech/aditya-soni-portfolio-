"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const resp = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await resp.json();

      if (resp.ok && result.success) {
        sessionStorage.setItem("isAdminLoggedIn", "true");
        router.push("/dashboard-ctrl");
      } else {
        setError(result.error || "Invalid Email or Password.");
      }
    } catch (err) {
      setError("Failed to connect to server.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem"
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel"
        style={{
          padding: "3rem",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 0.5rem 0" }}>
            Admin <span className="text-gradient">Portal</span>
          </h1>
          <p style={{ color: "rgba(255, 255, 255, 0.6)", margin: 0 }}>Sign in to manage your portfolio</p>
        </div>

        {error && (
          <div style={{
            padding: "1rem",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            borderRadius: "8px",
            color: "#ef4444",
            fontSize: "0.875rem",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.7)" }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%", padding: "1rem", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(0, 0, 0, 0.2)", color: "white", outline: "none", fontSize: "1rem"
              }}
            />
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.7)" }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%", padding: "1rem", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(0, 0, 0, 0.2)", color: "white", outline: "none", fontSize: "1rem"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "var(--foreground)", color: "var(--background)", padding: "1rem", borderRadius: "8px",
              fontWeight: 700, fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer", border: "none", marginTop: "0.5rem",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
