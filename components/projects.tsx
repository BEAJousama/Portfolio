"use client"

export default function Projects() {
  const projects = [
    {
      title: "Fleming.Watch",
      description: "Product website with CMS-powered Next.js experience and responsive design.",
      technologies: ["Next.js", "React", "Sanity CMS", "TailwindCSS"],
      year: "2024",
      type: "deployed",
      link: "https://fleming.watch",
      demo: "",
    },
    {
      title: "BeigePill.com",
      description: "Full-stack content portfolio with media-heavy page optimization.",
      technologies: ["Next.js", "Sanity CMS", "Mux", "TailwindCSS"],
      year: "2024",
      type: "deployed",
      link: "https://beigepill.com",
      demo: "",
    },
    {
      title: "PongMasters",
      description: "Real-time multiplayer web app with WebSockets, chat, and Pong game.",
      technologies: ["Next.js", "NestJS", "WebSockets", "PostgreSQL"],
      year: "2023",
      type: "demo",
      link: "",
      demo: "https://youtu.be/example",
    },
    {
      title: "Leetube",
      description: "Full-stack video-streaming app with torrent/movie API and OAuth.",
      technologies: ["TypeScript", "Docker", "API Integration", "OAuth"],
      year: "2023",
      type: "demo",
      link: "",
      demo: "https://youtu.be/example",
    },
    {
      title: "WebServ",
      description: "Lightweight HTTP web server with socket networking and CGI support.",
      technologies: ["C++", "Socket Programming", "HTTP Protocol"],
      year: "2022",
      type: "demo",
      link: "",
      demo: "https://youtu.be/example",
    },
    {
      title: "KFS - x86 Kernel",
      description: "Custom x86 kernel with bootloader, GDT/IDT, and interrupt routines.",
      technologies: ["C", "x86 Assembly", "Kernel Development"],
      year: "2022",
      type: "demo",
      link: "",
      demo: "https://youtu.be/example",
    },
  ]

  return (
    <section id="projects" className="md:ml-64 min-h-screen flex items-center">
      <div className="w-full max-w-4xl" style={{ padding: "1.5rem" }}>
        {/* Projects section with game-style cards */}
        <h2 className="game-title text-lg md:text-xl" style={{ marginBottom: "3rem" }}>
          Projects
        </h2>
        <div className="dashed-divider" style={{ marginBottom: "3rem" }}></div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="pixel-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors"
              style={{ padding: "1.5rem" }}
            >
              <div
                className="flex flex-col md:flex-row md:items-start md:justify-between"
                style={{ gap: "1rem", marginBottom: "1rem" }}
              >
                <div>
                  <h3 className="pixel-text font-bold text-lg">{project.title}</h3>
                  <p className="pixel-text text-xs opacity-75" style={{ marginTop: "0.25rem" }}>
                    {project.year}
                  </p>
                </div>
                <div className="flex" style={{ gap: "0.5rem" }}>
                  {project.type === "deployed" && project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pixel-border pixel-text text-xs font-bold bg-foreground text-background hover:opacity-80"
                      style={{ padding: "0.25rem 0.75rem" }}
                    >
                      [LIVE]
                    </a>
                  )}
                  {project.type === "demo" && project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pixel-border pixel-text text-xs font-bold bg-foreground text-background hover:opacity-80"
                      style={{ padding: "0.25rem 0.75rem" }}
                    >
                      [DEMO]
                    </a>
                  )}
                </div>
              </div>

              <p className="pixel-text text-sm leading-relaxed" style={{ marginBottom: "1rem" }}>
                {project.description}
              </p>

              <div className="flex flex-wrap" style={{ gap: "0.5rem" }}>
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="pixel-border pixel-text text-xs"
                    style={{ padding: "0.25rem 0.5rem", backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                  >
                    {tech}
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
