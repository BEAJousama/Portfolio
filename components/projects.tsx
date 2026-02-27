"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useSound } from "@/hooks/use-sound"
import { useSoundSettings } from "@/contexts/SoundContext"
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
   const { playClick } = useSound()
   const { uiSoundEnabled } = useSoundSettings()

  const projects = [
    {
      title: "Leetube",
      description: "Dockerized full-stack TypeScript video-streaming app with torrent/movie API integration, subtitle management, and OAuth.",
      technologies: ["TypeScript", "Docker", "API Integration", "OAuth"],
      year: "2025",
      type: "demo",
      link: "",
      github: "https://github.com/LeetSaaS-s/HyperTube-Frontend",
      demo: "https://youtu.be/N-ohDCg3ij0",
      tags: ["web"],
    },
    {
      title: "BeigePill.com",
      description: "Full-stack, content-driven portfolio using Next.js, Sanity CMS and Mux: data schemas, client rendering, and deployment optimizations for fast, media-heavy pages.",
      technologies: ["Next.js", "Sanity CMS", "Mux", "TailwindCSS"],
      year: "2024",
      type: "deployed",
      link: "https://beigepill.com",
      demo: "",
      tags: ["web"],
    },
    {
      title: "Fleming.Watch",
      description: "Led development of Fleming Watch's product website: performant, CMS-powered Next.js experience with tailored animations and responsive design to improve product storytelling and user engagement.",
      technologies: ["Next.js", "React", "Sanity CMS", "TailwindCSS"],
      year: "2024",
      type: "deployed",
      link: "https://fleming.watch",
      demo: "",
      tags: ["web"],
    },
    {
      title: "PongMasters",
      description: "Full-stack real-time multiplayer web app (Next.js frontend, NestJS backend, WebSockets) with authentication, chat, notifications, and a browser-based Pong game.",
      technologies: ["Next.js", "NestJS", "WebSockets", "PostgreSQL"],
      year: "2023",
      type: "demo",
      link: "",
      github: "https://github.com/BEAJousama/ft_transcendence",
      demo: "https://youtu.be/sX8WaT4Rgtc",
      tags: ["web", "networking"],
    },
    {
      title: "WebServ",
      description: "Lightweight HTTP web server from scratch with socket-based networking, HTTP parsing, CGI/PHP support, and static file serving.",
      technologies: ["C++", "Socket Programming", "HTTP", "CGI"],
      year: "2022",
      type: "demo",
      link: "",
      github: "https://github.com/BEAJousama/websrv",
      tags: ["networking", "systems"],
    },
    {
      title: "BGP at Doors of Autonomous Systems",
      description: "Designed and deployed multi-node GNS3 topologies using FRR for routing, implemented static and dynamic multicast tests, and automated configuration/startup with shell scripts.",
      technologies: ["GNS3", "FRR", "Multicast", "Shell Scripting"],
      year: "2025",
      type: "demo",
      link: "",
      github: "https://github.com/BEAJousama/BADASS",
      tags: ["networking"],
    },
    {
      title: "KFS",
      description: "Minimal x86 kernel written in C and x86 assembly: custom bootloader, GDT/IDT setup, interrupt service routines, basic shell, and terminal I/O.",
      technologies: ["C", "x86 Assembly", "Kernel Development"],
      year: "2025",
      type: "demo",
      link: "",
      github: "https://github.com/BEAJousama/kfs_2",
      tags: ["systems", "low-level"],
    },
    {
      title: "Tokenizer",
      description: "Custom ERC20 token (B42) and multisig wallet (BM42) on Ethereum Sepolia — Solidity, OpenZeppelin, deployed and verified.",
      technologies: ["Solidity", "OpenZeppelin", "Ethereum", "Sepolia", "Remix"],
      year: "2025",
      type: "demo",
      link: "",
      github: "https://github.com/BEAJousama/Tokenizer",
      tags: ["web3"],
    },
    {
      title: "TokenizeArt",
      description: "ERC-721 NFT collection on Ethereum Sepolia. Solidity, OpenZeppelin, IPFS (Pinata), Remix, MetaMask; on-chain SVG option and minting web app.",
      technologies: ["Solidity", "OpenZeppelin", "IPFS", "Remix", "MetaMask", "Web3.js"],
      year: "2025",
      type: "demo",
      link: "",
      github: "https://github.com/Beajousama/TokenizeArt",
      tags: ["web3"],
    },
  ]

  // Simplified tags: "web" covers fullstack web work
  const tags = ["all", "web", "web3", "networking", "systems", "low-level"]

  const filteredProjects = selectedTag === "all" 
    ? projects 
    : projects.filter(project => project.tags.includes(selectedTag))

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3)

  return (
    <section id="projects" className="md:ml-64 min-h-dvh flex items-center">
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
              onClick={() => {
                if (uiSoundEnabled) {
                  playClick()
                }
                setSelectedTag(tag)
              }}
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
                        className="pixel-border pixel-text text-xs font-bold bg-foreground text-background hover:opacity-80 inline-flex items-center justify-center"
                        onClick={() => {
                          if (uiSoundEnabled) {
                            playClick()
                          }
                        }}
                        style={{ padding: "0.25rem 0.75rem" }}
                      >
                        [CODE]
                      </a>
                    </div>
                  )}
                    {project.type === "deployed" && project.link && (
                      <div>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pixel-border pixel-text text-xs font-bold bg-foreground text-background hover:opacity-80 inline-flex items-center justify-center"
                          onClick={() => {
                            if (uiSoundEnabled) {
                              playClick()
                            }
                          }}
                          style={{ padding: "0.25rem 0.75rem" }}
                        >
                          [LIVE]
                        </a>
                      </div>
                    )}
                    {project.type === "demo" && project.demo && (
                      <div>
                        <button
                          onClick={() => {
                            if (uiSoundEnabled) {
                              playClick()
                            }
                            setCurrentVideo(project.demo)
                            setCurrentProjectTitle(project.title)
                            setVideoDialogOpen(true)
                          }}
                          className="pixel-border pixel-text text-xs font-bold bg-foreground text-background hover:opacity-80 inline-flex items-center justify-center"
                          style={{ padding: "0.25rem 0.75rem" }}
                        >
                          [DEMO]
                        </button>
                      </div>
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

        {/* See More/Less Button */}
        {filteredProjects.length > 3 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                setShowAll((prev) => {
                  const next = !prev
                  // If we are collapsing the list, scroll back to the top of the section
                  if (prev) {
                    const section = document.getElementById("projects")
                    section?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  return next
                })
              }}
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
