"use client"

export default function Hero() {
  return (
    <section id="about" className="md:ml-64 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl" style={{ padding: "1.5rem" }}>
        {/* Hero section with game-style boxes */}
        <div className="pixel-border bg-card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 className="game-title text-xl md:text-2xl text-center" style={{ marginBottom: "1.5rem" }}>
            Hi there
          </h2>
          <p className="pixel-text text-sm md:text-base leading-relaxed" style={{ marginBottom: "1rem" }}>
            I'm a Fullstack Software Engineer building fast, scalable web applications with Next.js, React, Node.js, and
            modern web technologies.
          </p>
          <p className="pixel-text text-sm md:text-base leading-relaxed">
            I love solving real problems, writing clean code, and collaborating in fast-moving startup environments.
          </p>
        </div>

        {/* Decorative divider */}
        <div className="dashed-divider" style={{ margin: "2rem 0" }}></div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row justify-center" style={{ gap: "1rem" }}>
          <button
            onClick={() => {
              const element = document.getElementById("projects")
              element?.scrollIntoView({ behavior: "smooth" })
            }}
            className="retro-button font-bold"
          >
            {"[ View Projects ]"}
          </button>
          <button
            onClick={() => {
              const element = document.getElementById("contact")
              element?.scrollIntoView({ behavior: "smooth" })
            }}
            className="pixel-border bg-background text-foreground border-2 cursor-pointer font-bold hover:bg-muted transition-colors"
            style={{ padding: "0.75rem 1.5rem" }}
          >
            {"[ Get in Touch ]"}
          </button>
        </div>
      </div>
    </section>
  )
}
