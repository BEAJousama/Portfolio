export default function About() {
  return (
    <section id="experience" className="md:ml-64 min-h-screen flex items-center">
      <div className="w-full max-w-3xl" style={{ padding: "1.5rem" }}>
        {/* About section with experience */}
        <div className="pixel-border bg-card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 className="game-title text-lg md:text-xl" style={{ marginBottom: "1.5rem" }}>
            Experience
          </h2>
          <div style={{ gap: "1rem", display: "flex", flexDirection: "column" }}>
            <div>
              <p className="pixel-text font-bold text-foreground">Fullstack Engineer</p>
              <p className="pixel-text text-xs text-muted-foreground">FutureCorp • Paris | Nov 2023 - Mar 2025</p>
            </div>
            <div className="border-l-4 border-accent" style={{ paddingLeft: "1rem" }}>
              <div style={{ gap: "0.5rem", display: "flex", flexDirection: "column" }}>
                <p className="pixel-text text-sm">▸ Developed fast, SEO-optimized websites with Next.js & Sanity CMS</p>
                <p className="pixel-text text-sm">
                  ▸ Managed high-profile clients: Saatchi & Saatchi, The Brooklyn Tower
                </p>
                <p className="pixel-text text-sm">▸ Achieved 99.9% uptime, reduced issues by 25%</p>
                <p className="pixel-text text-sm">▸ Collaborated on responsive UI & content workflows</p>
              </div>
            </div>
          </div>
        </div>

        {/* About section */}
        <div className="pixel-border bg-card" style={{ padding: "1.5rem" }}>
          <h2 className="game-title text-lg md:text-xl" style={{ marginBottom: "1.5rem" }}>
            About
          </h2>
          <div style={{ gap: "1rem", display: "flex", flexDirection: "column" }}>
            <p className="pixel-text text-sm leading-relaxed">
              Advanced student at <span className="font-bold">UM6P - 1337 Coding School</span> (42 Network) with strong
              fundamentals in C/C++, algorithms, Unix systems, and software engineering.
            </p>
            <p className="pixel-text text-sm leading-relaxed">
              Languages: <span className="font-bold">English (Professional)</span>,{" "}
              <span className="font-bold">French (Fluent)</span>, <span className="font-bold">Arabic (Native)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
