"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { useState, useEffect } from "react"

interface Skill {
  name: string
  level: number
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
    "NestJS": "https://icon.icepanel.io/Technology/svg/Nest.js.svg",
    "PostgreSQL": "https://icon.icepanel.io/Technology/svg/PostgresSQL.svg",
    "MongoDB": "https://icon.icepanel.io/Technology/svg/MongoDB.svg",
    "Redis": "https://icon.icepanel.io/Technology/svg/Redis.svg",
    "GraphQL": "https://icon.icepanel.io/Technology/svg/GraphQL.svg",
    "JavaScript": "https://icon.icepanel.io/Technology/svg/JavaScript.svg",
    "C": "https://icon.icepanel.io/Technology/svg/C.svg",
    "C++": "https://icon.icepanel.io/Technology/svg/C%2B%2B-%28CPlusPlus%29.svg",
    "Docker": "https://icon.icepanel.io/Technology/svg/Docker.svg",
    "Kubernetes": "https://icon.icepanel.io/Technology/svg/Kubernetes.svg",
    "Git": "https://icon.icepanel.io/Technology/svg/Git.svg",
    "Azure": "https://icon.icepanel.io/Technology/svg/Azure.svg",
    "AWS": "https://icon.icepanel.io/Technology/svg/AWS.svg",
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

  // On mobile, show all progress bars by default
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
        { name: "React", level: 95, color: "#61DAFB", iconUrl: getSkillIconUrl("React") },
        { name: "Next.js", level: 90, color: "#000000", iconUrl: getSkillIconUrl("Next.js") },
        { name: "CSS", level: 92, color: "#264DE4", iconUrl: getSkillIconUrl("CSS") },
        { name: "TailwindCSS", level: 90, color: "#06B6D4", iconUrl: getSkillIconUrl("TailwindCSS") },
        { name: "HTML", level: 95, color: "#E34F26", iconUrl: getSkillIconUrl("HTML") },
        { name: "Figma", level: 80, color: "#F24E1E", iconUrl: getSkillIconUrl("Figma") },

      ],
    },
    {
      category: t.backend,
      skills: [
        { name: "Node.js", level: 88, color: "#339933", iconUrl: getSkillIconUrl("Node.js") },
        { name: "NestJS", level: 80, color: "#E0234E", iconUrl: getSkillIconUrl("NestJS") },
        { name: "PostgreSQL", level: 82, color: "#336791", iconUrl: getSkillIconUrl("PostgreSQL") },
        { name: "MongoDB", level: 78, color: "#47A248", iconUrl: getSkillIconUrl("MongoDB") },
        { name: "Redis", level: 75, color: "#DC382D", iconUrl: getSkillIconUrl("Redis") },
        { name: "GraphQL", level: 72, color: "#E10098", iconUrl: getSkillIconUrl("GraphQL") },
      ],
    },
    {
      category: t.languagesSkills,
      skills: [
        { name: "JavaScript", level: 92, color: "#F7DF1E", iconUrl: getSkillIconUrl("JavaScript") },
        { name: "TypeScript", level: 88, color: "#3178C6", iconUrl: getSkillIconUrl("TypeScript") },
        { name: "C", level: 75, color: "#A8B9CC", iconUrl: getSkillIconUrl("C") },
        { name: "C++", level: 70, color: "#00599C", iconUrl: getSkillIconUrl("C++") },
      ],
    },
    {
      category: t.devops,
      skills: [
        { name: "Docker", level: 85, color: "#2496ED", iconUrl: getSkillIconUrl("Docker") },
        { name: "Kubernetes", level: 75, color: "#326CE5", iconUrl: getSkillIconUrl("Kubernetes") },
        { name: "Git", level: 90, color: "#F05032", iconUrl: getSkillIconUrl("Git") },
        { name: "Azure", level: 72, color: "#0078D4", iconUrl: getSkillIconUrl("Azure") },
        { name: "AWS", level: 70, color: "#FF9900", iconUrl: getSkillIconUrl("AWS") },
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
                        
                        {/* Percentage when active */}
                        {isActive(skill.name) && (
                          <span className="pixel-text" style={{ fontSize: "0.6rem", opacity: 0.8, marginLeft: "auto" }}>
                            {skill.level}%
                          </span>
                        )}
                      </div>
                      
                      {/* Progress bar - always visible on mobile */}
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
                            width: isActive(skill.name) ? `${skill.level}%` : "0%",
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
            ? "> Tap skills to see details"
            : hoveredSkill || clickedSkill
              ? `> ${hoveredSkill || clickedSkill} selected - View projects to see it in action!`
              : "> Hover over skills to see details"
          }
        </p>
      </div>
    </section>
  )
}
