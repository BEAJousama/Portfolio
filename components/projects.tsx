"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import VideoPlayer from "@/components/video-player"

export default function Projects() {
  const [selectedTag, setSelectedTag] = useState("all")
  const [showAll, setShowAll] = useState(false)
  const [videoDialogOpen, setVideoDialogOpen] = useState(false)
  const [currentVideo, setCurrentVideo] = useState("")
  const [currentProjectTitle, setCurrentProjectTitle] = useState("")
  const { t } = useLanguage()

  const projects = [
      {
      title: "Leetube",
      description: "Full-stack video-streaming app with torrent/movie API and OAuth.",
      technologies: ["TypeScript", "Docker", "API Integration", "OAuth"],
      year: "2025",
      type: "demo",
      link: "",
      github: "https://github.com/LeetSaaS-s/HyperTube-Frontend",
      demo: "https://youtu.be/N-ohDCg3ij0",
      tags: ["web", "fullstack"],
    },
    // add this project
    {
      title: "Portfolio V1",
      description: "My personal portfolio website showcasing projects and skills.",
      technologies: ["Next.js", "React", "TypeScript", "TailwindCSS"],
      year: "2025",
      type: "deployed",
      link: "https://portfolio-iota-eosin-89.vercel.app/",
      github: "https://github.com/BEAJousama/portfolio",
      demo: "",
      tags: ["web", "fullstack"],
    },
    {
      title: "Fleming.Watch",
      description: "Product website with CMS-powered Next.js experience and responsive design.",
      technologies: ["Next.js", "React", "Sanity CMS", "TailwindCSS"],
      year: "2024",
      type: "deployed",
      link: "https://fleming.watch",
      demo: "",
      tags: ["web", "fullstack"],
    },
    {
      title: "BeigePill.com",
      description: "Full-stack content portfolio with media-heavy page optimization.",
      technologies: ["Next.js", "Sanity CMS", "Mux", "TailwindCSS"],
      year: "2024",
      type: "deployed",
      link: "https://beigepill.com",
      demo: "",
      tags: ["web", "fullstack"],
    },
    {
      title: "PongMasters",
      description: "Real-time multiplayer web app with WebSockets, chat, and Pong game.",
      technologies: ["Next.js", "NestJS", "WebSockets", "PostgreSQL"],
      year: "2023",
      type: "demo",
      link: "",
      github: "https://github.com/BEAJousama/ft_transcendence",
      demo: "https://youtu.be/sX8WaT4Rgtc",
      tags: ["web", "fullstack", "networking"],
    },
    {
      title: "WebServ",
      description: "Lightweight HTTP web server with socket networking and CGI support.",
      technologies: ["C++", "Socket Programming", "HTTP Protocol"],
      year: "2022",
      type: "demo",
      link: "",
      github: "https://github.com/BEAJousama/websrv",
      // demo: "https://youtu.be/NHt6gKs2KY1Vf4xcosyFX7TGd7nb6IEW00dZ5jn1Sg2c",
      tags: ["networking", "systems"],
    },
    {
      title: "KFS - x86 Kernel",
      description: "Custom x86 kernel with bootloader, GDT/IDT, and interrupt routines.",
      technologies: ["C", "x86 Assembly", "Kernel Development"],
      year: "2025",
      type: "demo",
      link: "",
      github: "https://github.com/BEAJousama/kfs_2",
      // demo: "https://stream.mux.com/NHt6gKs2KY1Vf4xcosyFX7TGd7nb6IEW00dZ5jn1Sg2c/high.mp4",
      tags: ["systems", "low-level"],
    },
    // add bgp project
    {
      title: "BGP AT DOORS OF AUTONOMUS SYSTEMS",
      description: "Built and automated GNS3 network labs with FRR-based routers and scripted hosts to design, deploy, and validate multicast routing scenarios.",
      technologies: ["GNS3", "Networking Protocols", "Shell Scripting"],
      year: "2025",
      type: "demo",
      link: "",
      github: "https://github.com/BEAJousama/BADASS",
      // demo: "",
      tags: ["networking"],
    }
  ]

  const tags = ["all", "web", "fullstack", "networking", "systems", "low-level"]

  const filteredProjects = selectedTag === "all" 
    ? projects 
    : projects.filter(project => project.tags.includes(selectedTag))

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3)

  return (
    <section id="projects" className="md:ml-64 min-h-[100dvh] flex items-center">
      <div className="w-full max-w-6xl mx-auto" style={{ padding: "0 1.5rem" }}>
        {/* Projects section with game-style cards */}
        <h2 className="game-title text-lg md:text-xl" style={{ marginBottom: "3rem" }}>
          {t.projectsTitle}
        </h2>
        <div className="dashed-divider" style={{ marginBottom: "3rem" }}></div>

        {/* Filter Tags */}
        <div className="flex flex-wrap mb-8" style={{ gap: "0.5rem" }}>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`pixel-border pixel-text text-xs font-bold transition-colors ${
                selectedTag === tag 
                  ? "bg-accent text-accent-foreground" 
                  : "bg-card text-foreground hover:bg-muted"
              }`}
              style={{ padding: "0.5rem 1rem" }}
            >
              {tag.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", minHeight: "400px" }}>
          {displayedProjects.map((project, idx) => (
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
                  <p className="pixel-text text-xs" style={{ marginTop: "0.25rem" }}>
                    {project.year}
                  </p>
                </div>
                <div className="flex" style={{ gap: "0.5rem" }}>            
                  {project.github && (
                    <div>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pixel-border pixel-text text-xs font-bold bg-foreground text-background hover:opacity-80"
                        style={{ padding: "0.25rem 0.75rem" }}
                      >
                        [CODE]
                      </a>
                    </div>
                  )}
                  <div>
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
                      <button
                        onClick={() => {
                          setCurrentVideo(project.demo)
                          setCurrentProjectTitle(project.title)
                          setVideoDialogOpen(true)
                        }}
                        className="pixel-border pixel-text text-xs font-bold bg-foreground text-background hover:opacity-80"
                        style={{ padding: "0.25rem 0.75rem" }}
                      >
                        [DEMO]
                      </button>
                    )}
                  </div>
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

        {/* See More/Less Button */}
        {filteredProjects.length > 3 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="retro-button font-bold"
            >
              {showAll ? t.showLess : `${t.seeMoreProjects} (${filteredProjects.length - 3} ${t.more}`}
            </button>
          </div>
        )}
      </div>

      {/* Video Dialog */}
      <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogContent className="pixel-border bg-card max-w-[95vw] md:max-w-[85vw] lg:max-w-[1200px] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-4 flex flex-row items-center justify-between">
            <DialogTitle className="pixel-text text-base md:text-xl font-bold">
              {currentProjectTitle}
            </DialogTitle>
            <button
              onClick={() => setVideoDialogOpen(false)}
              className="pixel-border pixel-text text-xs font-bold bg-foreground text-background hover:opacity-80"
              style={{ padding: "0.5rem 1rem" }}
            >
              [CLOSE]
            </button>
          </DialogHeader>
          <div className="w-full">
            <VideoPlayer
              src={currentVideo}
              title={currentProjectTitle}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
