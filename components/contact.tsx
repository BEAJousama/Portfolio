"use client"

import { useState } from "react"
import { Mail, Github, Linkedin } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errors, setErrors] = useState({ name: "", email: "", message: "" })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = { name: "", email: "", message: "" }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = t.errorNameRequired
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = t.errorEmailRequired
      isValid = false
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.errorEmailInvalid
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = t.errorMessageRequired
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
        setErrors({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" })
    }
  }
  
  return (
    <section id="contact" className="md:ml-64 min-h-dvh flex items-center">
      <div className="w-full max-w-6xl mx-auto" style={{ padding: "0 1.5rem" }}>
        <h2 className="game-title text-lg md:text-xl" style={{ marginBottom: "3rem" }}>
          {t.contact}
        </h2>
        <div className="dashed-divider" style={{ marginBottom: "3rem" }}></div>

        {/* Contact Form */}
        <div className="pixel-border bg-card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
          <p className="pixel-text text-xs text-foreground" style={{ marginBottom: "1.5rem" }}>
            &gt; {t.sendMessage}
          </p>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label className="pixel-text text-xs font-bold" style={{ display: "block", marginBottom: "0.5rem" }}>
                {t.yourName}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="pixel-border pixel-text text-sm bg-background text-foreground"
                style={{ width: "100%", padding: "0.75rem", outline: "none" }}
              />
              {errors.name && (
                <p className="pixel-text text-xs text-foreground" style={{ marginTop: "0.5rem" }}>
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label className="pixel-text text-xs font-bold" style={{ display: "block", marginBottom: "0.5rem" }}>
                {t.yourEmail}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pixel-border pixel-text text-sm bg-background text-foreground"
                style={{ width: "100%", padding: "0.75rem", outline: "none" }}
              />
              {errors.email && (
                <p className="pixel-text text-xs text-foreground" style={{ marginTop: "0.5rem" }}>
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label className="pixel-text text-xs font-bold" style={{ display: "block", marginBottom: "0.5rem" }}>
                {t.yourMessage}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="pixel-border pixel-text text-sm bg-background text-foreground"
                style={{ width: "100%", padding: "0.75rem", outline: "none", resize: "vertical" }}
              />
              {errors.message && (
                <p className="pixel-text text-xs text-foreground" style={{ marginTop: "0.5rem" }}>
                  {errors.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="retro-button pixel-text text-sm font-bold"
              style={{ alignSelf: "flex-start" }}
            >
              {isSubmitting ? t.sending : t.sendButton}
            </button>
            {submitStatus === "success" && (
              <p className="pixel-text text-xs text-accent">{t.messageSent}</p>
            )}
            {submitStatus === "error" && (
              <p className="pixel-text text-xs text-destructive">{t.messageError}</p>
            )}
          </form>
          <div>

          </div>
        </div>

        {/* Contact section with game-style boxes */}
        <div className="pixel-border bg-card" style={{ padding: "1.5rem" }}>
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            <a
              href="mailto:beajousama@gmail.com"
              className="pixel-border pixel-text text-xs font-bold bg-accent text-accent-foreground hover:opacity-80"
              style={{ padding: "clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1rem)", display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Mail size={16} />
              <span className="hidden sm:inline">{t.emailme}</span>
            </a>
            <a
              href="https://github.com/beajousama"
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-border pixel-text text-xs font-bold bg-accent text-accent-foreground hover:opacity-80"
              style={{ padding: "clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1rem)", display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Github size={16} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ousama-beaj/"
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-border pixel-text text-xs font-bold bg-accent text-accent-foreground hover:opacity-80"
              style={{ padding: "clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1rem)", display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Linkedin size={16} />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>

          <div className="dashed-divider" style={{ margin: "2rem 0" }}></div>

          <p className="pixel-text text-xs text-center text-foreground">
            {t.copyright}
          </p>
        </div>
      </div>
    </section>
  )
}
