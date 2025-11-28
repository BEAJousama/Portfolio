"use client"

import { Mail, Github, Linkedin } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="md:ml-64 min-h-screen flex items-center">
      <div className="w-full max-w-3xl" style={{ padding: "1.5rem" }}>
        {/* Contact section with game-style boxes */}
        <div className="pixel-border bg-card" style={{ padding: "1.5rem" }}>
          <h2 className="game-title text-lg md:text-xl" style={{ marginBottom: "2rem" }}>
            Contact
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div
              className="pixel-border bg-background"
              style={{ padding: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <Mail size={24} style={{ color: "var(--accent)" }} />
              <div>
                <p className="pixel-text text-xs text-muted-foreground" style={{ marginBottom: "0.5rem" }}>
                  &gt; EMAIL
                </p>
                <a
                  href="mailto:beajousama@gmail.com"
                  className="pixel-text font-bold text-accent hover:text-foreground transition-colors break-all"
                >
                  beajousama@gmail.com
                </a>
              </div>
            </div>

            <div className="pixel-border bg-background" style={{ padding: "1rem" }}>
              <p className="pixel-text text-xs text-muted-foreground" style={{ marginBottom: "0.5rem" }}>
                &gt; PHONE
              </p>
              <a
                href="tel:+212626432399"
                className="pixel-text font-bold text-accent hover:text-foreground transition-colors"
              >
                +212 626 432 399
              </a>
            </div>

            <div className="pixel-border bg-background" style={{ padding: "1rem" }}>
              <p className="pixel-text text-xs text-muted-foreground" style={{ marginBottom: "1rem" }}>
                &gt; SOCIAL
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a
                  href="https://github.com/beajousama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  title="GitHub"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/beajousama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  title="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a href="mailto:beajousama@gmail.com" className="social-icon" title="Gmail">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="dashed-divider" style={{ margin: "2rem 0" }}></div>

          <p className="pixel-text text-xs text-center text-muted-foreground">
            © 2025 Beaj Ousama • All rights reserved
          </p>
        </div>
      </div>
    </section>
  )
}
