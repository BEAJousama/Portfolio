"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export default function About() {
  const { t } = useLanguage()
  
  return (
    <section id="about" className="md:ml-64 min-h-dvh flex items-center">
      <div className="w-full max-w-6xl mx-auto" style={{ padding: "0 1.5rem" }}>
        <h2 className="game-title text-lg md:text-xl" style={{ marginBottom: "3rem" }}>
          {t.about}
        </h2>
        <div className="dashed-divider" style={{ marginBottom: "3rem" }}></div>

        {/* About section with experience */}
        <div className="pixel-border bg-card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 className="game-title text-lg md:text-xl" style={{ marginBottom: "1.5rem" }}>
            {t.experience}
          </h2>
          <div style={{ gap: "2rem", display: "flex", flexDirection: "column" }}>
            {/* FutureCorp Experience */}
            <div style={{ gap: "0.75rem", display: "flex", flexDirection: "column" }}>
              <div>
                <p className="pixel-text font-bold text-foreground">{t.fullstackEngineer}</p>
                <p className="pixel-text text-xs text-foreground">{t.experienceCompany}</p>
              </div>
              <div className="border-l-4 border-accent" style={{ paddingLeft: "1rem" }}>
                <div style={{ gap: "0.5rem", display: "flex", flexDirection: "column" }}>
                  <p className="pixel-text text-sm">{t.exp1}</p>
                  <p className="pixel-text text-sm">{t.exp2}</p>
                  <p className="pixel-text text-sm">{t.exp3}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education section */}
        <div className="pixel-border bg-card" style={{ padding: "1.5rem" }}>
          <h2 className="game-title text-lg md:text-xl" style={{ marginBottom: "1.5rem" }}>
            {t.education}
          </h2>
          <div style={{ gap: "2rem", display: "flex", flexDirection: "column" }}>
            {/* 1337 Education */}
            <div style={{ gap: "0.75rem", display: "flex", flexDirection: "column" }}>
              <div>
                <p className="pixel-text font-bold text-foreground">{t.edu1337}</p>
                <p className="pixel-text text-xs text-foreground">{t.edu1337Date}</p>
                <p className="pixel-text text-sm text-accent" style={{ marginTop: "0.25rem" }}>{t.edu1337Degree}</p>
              </div>
              <div className="border-l-4 border-accent" style={{ paddingLeft: "1rem" }}>
                <p className="pixel-text text-sm leading-relaxed">{t.edu1337Desc}</p>
              </div>
            </div>
            
            {/* ENSA Education */}
            <div style={{ gap: "0.75rem", display: "flex", flexDirection: "column" }}>
              <div>
                <p className="pixel-text font-bold text-foreground">{t.eduEnsa}</p>
                <p className="pixel-text text-xs text-foreground">{t.eduEnsaDate}</p>
                <p className="pixel-text text-sm text-accent" style={{ marginTop: "0.25rem" }}>{t.eduEnsaDegree}</p>
              </div>
              <div className="border-l-4 border-accent" style={{ paddingLeft: "1rem" }}>
                <p className="pixel-text text-sm leading-relaxed">{t.eduEnsaDesc}</p>
              </div>
            </div>
            
            {/* Languages */}
            <div className="dashed-divider" style={{ margin: "0.5rem 0" }}></div>
            <p className="pixel-text text-sm leading-relaxed">
              {t.languages}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
