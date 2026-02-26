"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { useState, useEffect } from "react"

interface Skill {
  name: string
  color: string
  iconUrl: string
}

const getSkillIconUrl = (skill: string): string => {
  const iconMap: Record<string, string> = {
    "React": "https://icon.icepanel.io/Technology/svg/React.svg",
    "Next.js": "https://icon.icepanel.io/Technology/svg/Next.js.svg",
    "TypeScript": "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
    "CSS": "https://icon.icepanel.io/Technology/svg/CSS3.svg",
    "TailwindCSS": "https://icon.icepanel.io/Technology/svg/Tailwind-CSS.svg",
    "HTML": "https://icon.icepanel.io/Technology/svg/HTML5.svg",
    "Node.js": "https://icon.icepanel.io/Technology/svg/Node.js.svg",
    "Express.js": "https://icon.icepanel.io/Technology/svg/Express.svg",
    "NestJS": "https://icon.icepanel.io/Technology/svg/Nest.js.svg",
    "PostgreSQL": "https://icon.icepanel.io/Technology/svg/PostgresSQL.svg",
    "MySQL": "https://icon.icepanel.io/Technology/svg/MySQL.svg",
    "Redis": "https://icon.icepanel.io/Technology/svg/Redis.svg",
    "JavaScript": "https://icon.icepanel.io/Technology/svg/JavaScript.svg",
    "C": "https://icon.icepanel.io/Technology/svg/C.svg",
    "C++": "https://icon.icepanel.io/Technology/svg/C%2B%2B-%28CPlusPlus%29.svg",
    "Docker": "https://icon.icepanel.io/Technology/svg/Docker.svg",
    "Kubernetes": "https://icon.icepanel.io/Technology/svg/Kubernetes.svg",
    "Nginx": "https://icon.icepanel.io/Technology/svg/Nginx.svg",
    "Ansible": "https://icon.icepanel.io/Technology/svg/Ansible.svg",
    "Git": "https://icon.icepanel.io/Technology/svg/Git.svg",
    "Azure": "https://icon.icepanel.io/Technology/svg/Azure.svg",
    "Figma": "https://icon.icepanel.io/Technology/svg/Figma.svg",
  }
  return iconMap[skill] || "https://icon.icepanel.io/Technology/svg/React.svg"
}

export default function Skills() {
  const { t } = useLanguage()
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [clickedSkill, setClickedSkill] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // On mobile, show all bars expanded by default
  const isActive = (skillName: string) => {
    if (isMobile) return true // Always show on mobile
    return hoveredSkill === skillName || clickedSkill === skillName
  }

  const handleClick = (skillName: string) => {
    if (isMobile) {
      // On mobile, toggle the clicked skill
      setClickedSkill(clickedSkill === skillName ? null : skillName)
    } else {
      setClickedSkill(skillName)
    }
  }
  
  const skillCategories: { category: string; skills: Skill[] }[] = [
    {
      category: t.frontend,
      skills: [
        { name: "React", color: "#61DAFB", iconUrl: getSkillIconUrl("React") },
        { name: "Next.js", color: "#000000", iconUrl: getSkillIconUrl("Next.js") },
        { name: "CSS", color: "#264DE4", iconUrl: getSkillIconUrl("CSS") },
        { name: "TailwindCSS", color: "#06B6D4", iconUrl: getSkillIconUrl("TailwindCSS") },
      ],
    },
    {
      category: t.backend,
      skills: [
        { name: "Node.js", color: "#339933", iconUrl: getSkillIconUrl("Node.js") },
        { name: "Express.js", color: "#000000", iconUrl: getSkillIconUrl("Express.js") },
        { name: "NestJS", color: "#E0234E", iconUrl: getSkillIconUrl("NestJS") },
      ],
    },
    {
      category: t.databases,
      skills: [
        { name: "PostgreSQL", color: "#336791", iconUrl: getSkillIconUrl("PostgreSQL") },
        { name: "MySQL", color: "#4479A1", iconUrl: getSkillIconUrl("MySQL") },
        { name: "Redis", color: "#DC382D", iconUrl: getSkillIconUrl("Redis") },
      ],
    },
    {
      category: t.languagesSkills,
      skills: [
        { name: "JavaScript", color: "#F7DF1E", iconUrl: getSkillIconUrl("JavaScript") },
        { name: "TypeScript", color: "#3178C6", iconUrl: getSkillIconUrl("TypeScript") },
        { name: "C", color: "#A8B9CC", iconUrl: getSkillIconUrl("C") },
        { name: "C++", color: "#00599C", iconUrl: getSkillIconUrl("C++") },
      ],
    },
    {
      category: t.devops,
      skills: [
        { name: "Git", color: "#F05032", iconUrl: getSkillIconUrl("Git") },
        { name: "Docker", color: "#2496ED", iconUrl: getSkillIconUrl("Docker") },
        { name: "Kubernetes", color: "#326CE5", iconUrl: getSkillIconUrl("Kubernetes") },
        { name: "Nginx", color: "#009639", iconUrl: getSkillIconUrl("Nginx") },
        { name: "Ansible", color: "#EE0000", iconUrl: getSkillIconUrl("Ansible") },
        { name: "Azure", color: "#0078D4", iconUrl: getSkillIconUrl("Azure") },
      ],
    },
  ]

  return (
    <section id="skills" className="md:ml-64 min-h-dvh flex items-center">
      <div className="w-full max-w-6xl mx-auto" style={{ padding: "0 1.5rem" }}>
        <h2 className="game-title text-lg md:text-xl" style={{ marginBottom: "3rem" }}>
          {t.skills}
        </h2>
        <div className="dashed-divider" style={{ marginBottom: "3rem" }}></div>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "2rem" }}>
          {skillCategories.map((cat, idx) => (
            <div key={idx}>
              <h3 className="pixel-text font-bold text-sm" style={{ marginBottom: "1rem", color: "var(--accent)" }}>
                &gt; {cat.category}
              </h3>
              <div className="grid grid-cols-2" style={{ gap: "0.75rem" }}>
                {cat.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="skill-item pixel-border"
                    style={{
                      padding: "0.75rem",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                      background: isActive(skill.name) 
                        ? "var(--accent)" 
                        : "var(--card)",
                      color: isActive(skill.name) 
                        ? "var(--accent-foreground)" 
                        : "var(--foreground)",
                      transition: "all 0.3s ease",
                      transform: isActive(skill.name) ? "scale(1.05)" : "scale(1)",
                    }}
                    onMouseEnter={() => !isMobile && setHoveredSkill(skill.name)}
                    onMouseLeave={() => !isMobile && setHoveredSkill(null)}
                    onClick={() => handleClick(skill.name)}
                    onTouchStart={() => isMobile && setHoveredSkill(skill.name)}
                    onTouchEnd={() => isMobile && setHoveredSkill(null)}
                  >
                    {/* Glow effect when active */}
                    {isActive(skill.name) && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `radial-gradient(circle at center, ${skill.color}40 0%, transparent 70%)`,
                          pointerEvents: "none",
                        }}
                      />
                    )}
                    
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div className="flex items-center gap-3" style={{ marginBottom: "0.5rem" }}>
                        {/* Real Brand Icon */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "28px",
                            height: "28px",
                            borderRadius: "4px",
                            background: isActive(skill.name) 
                              ? "rgba(255,255,255,0.2)" 
                              : `${skill.color}20`,
                            color: isActive(skill.name) ? "white" : skill.color,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <img 
                            src={skill.iconUrl} 
                            alt={skill.name}
                            width={18}
                            height={18}
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        
                        {/* Name */}
                        <span className="pixel-text" style={{ fontSize: "0.7rem", fontWeight: "bold" }}>
                          {skill.name}
                        </span>
                      </div>
                      
                      {/* Animated bar (fills on hover/active — no percentage, just highlight) */}
                      <div 
                        style={{
                          height: "6px",
                          background: isActive(skill.name) 
                            ? "rgba(255,255,255,0.3)" 
                            : "var(--muted)",
                          borderRadius: "2px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: isActive(skill.name) ? "100%" : "0%",
                            background: isActive(skill.name) ? "white" : skill.color,
                            transition: "width 0.5s ease",
                            boxShadow: isActive(skill.name) 
                              ? `0 0 10px ${skill.color}` 
                              : "none",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Hint text */}
        <p 
          className="pixel-text" 
          style={{ 
            marginTop: "3rem", 
            textAlign: "center", 
            opacity: 0.6,
            fontSize: "0.65rem" 
          }}
        >
          {isMobile
            ? "> Tap a skill to highlight"
            : hoveredSkill || clickedSkill
              ? "> Check out Projects to see these in action"
              : "> Hover over a skill to highlight"
          }
        </p>
      </div>
    </section>
  )
}
