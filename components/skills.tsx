"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export default function Skills() {
  const { t } = useLanguage()
  
  const skillCategories = [
    {
      category: t.frontend,
      skills: ["React", "Next.js", "TypeScript", "CSS", "TailwindCSS"],
    },
    {
      category: t.backend,
      skills: ["Node.js", "Express.js", "NestJS", "PostgreSQL"],
    },
    {
      category: t.languagesSkills,
      skills: ["JavaScript", "TypeScript", "C", "C++"],
    },
    {
      category: t.devops,
      skills: ["Docker", "Kubernetes", "Git", "Nginx", "Azure"],
    },
  ]

  return (
    <section id="skills" className="md:ml-64 min-h-dvh flex items-center">
      <div className="w-full max-w-6xl mx-auto" style={{ padding: "0 1.5rem" }}>
        {/* Skills section with game-style grid */}
        <h2 className="game-title text-lg md:text-xl" style={{ marginBottom: "3rem" }}>
          {t.skills}
        </h2>
        <div className="dashed-divider" style={{ marginBottom: "3rem" }}></div>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1.5rem" }}>
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="pixel-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors" style={{ padding: "1rem" }}>
              <h3 className="pixel-text font-bold text-sm" style={{ marginBottom: "1rem" }}>
                &gt; {cat.category}
              </h3>
              <div className="flex flex-wrap" style={{ gap: "0.5rem" }}>
                {cat.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="pixel-border pixel-text bg-accent text-accent-foreground text-xs"
                    style={{ padding: "0.25rem 0.5rem" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
