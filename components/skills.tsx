export default function Skills() {
  const skillCategories = [
    {
      category: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "CSS", "TailwindCSS"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js", "NestJS", "PostgreSQL"],
    },
    {
      category: "Languages",
      skills: ["JavaScript", "TypeScript", "C", "C++"],
    },
    {
      category: "DevOps",
      skills: ["Docker", "Kubernetes", "Git", "Nginx", "Azure"],
    },
  ]

  return (
    <section id="skills" className="md:ml-64 min-h-screen flex items-center">
      <div className="w-full max-w-4xl" style={{ padding: "1.5rem" }}>
        {/* Skills section with game-style grid */}
        <h2 className="game-title text-lg md:text-xl" style={{ marginBottom: "3rem" }}>
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1.5rem" }}>
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="pixel-border bg-card" style={{ padding: "1rem" }}>
              <h3 className="pixel-text font-bold text-accent text-sm" style={{ marginBottom: "1rem" }}>
                &gt; {cat.category}
              </h3>
              <div className="flex flex-wrap" style={{ gap: "0.5rem" }}>
                {cat.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="pixel-border pixel-text bg-muted text-foreground text-xs"
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
