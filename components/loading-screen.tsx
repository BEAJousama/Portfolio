"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [percentage, setPercentage] = useState(0)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    // Get initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme")
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    setTheme((savedTheme as "light" | "dark") || systemTheme)

    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return Math.min(prev + 5, 100)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="loading-screen w-screen h-screen flex items-center justify-center z-50" style={{ background: theme === "dark" ? "#2b2520" : "#c9b896" }}>
      <div className="loading-content">
        {/* Retro logo/icon */}
        <div className="loading-logo pixel-border flex items-center justify-center" style={{ background: theme === "dark" ? "#3a332b" : "#c9b896" }}>
          <svg width="120" height="120" viewBox="0 0 532 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M180 32C261.738 32 328 98.2619 328 180C328 261.738 261.738 328 180 328C98.2619 328 32 261.738 32 180C32 98.2619 98.2619 32 180 32Z" stroke={theme === "dark" ? "#8b7355" : "#6B5B42"} strokeWidth="64" />
            <circle cx="180" cy="180" r="148" stroke={theme === "dark" ? "#c4b5a8" : "#D4C5A0"} strokeWidth="64" fill="none" strokeDasharray="233 930" />
            <path d="M265.948 10.6237C261.88 8.97487 267.158 8.8648 342.921 9.08465C342.951 9.08462 421.615 9.00034 425.571 9.5407C429.525 10.0812 430.751 10.0808 434.468 11.1618C467.346 20.7251 490.929 45.6891 502.475 81.194C507.203 95.8137 507.752 115.49 504.014 132.198C501.265 144.509 493.788 160.008 485.761 169.681C483.671 172.21 482.021 174.628 482.021 174.958C482.022 175.398 484.991 178.695 488.619 182.432C504.893 198.921 515.23 221.894 516.77 244.978C519.848 290.046 491.809 334.235 450.573 349.295C432.1 356 432.759 356 342.921 356C292.998 356 261 355.56 261 355.01C261.001 354.461 262.1 353.582 263.529 353.142C269.028 351.493 287.501 341.71 296.737 335.554C308.173 328.08 327.527 309.283 334.784 298.841L339.732 291.695L382.067 291.146L424.292 290.596L431.77 286.968C439.797 283.011 443.975 278.504 448.264 269.161C450.133 265.204 450.573 261.906 450.573 253.222C450.683 243 450.352 241.681 447.054 234.866C442.325 225.193 433.969 217.498 424.622 214.31C418.574 212.222 415.275 212.002 395.482 212.002H373.16L373.93 202.878C375.359 188.148 374.7 159.459 372.94 152.973L371.291 147.258L392.844 146.927C417.475 146.598 420.444 145.718 429.681 136.705C448.154 118.787 443.865 88.9978 420.993 77.0163L415.495 74.0485L377.889 73.4987L340.282 72.9499L334.784 65.0348C327.747 55.0319 308.723 36.1251 297.617 28.2106C289.26 22.165 274.855 14.1413 265.948 10.6237Z" fill={theme === "dark" ? "#8b7355" : "#6B5B42"} />
          </svg>
        </div>

        {/* Loading text */}
        <h2 className="game-title loading-text" style={{ fontSize: "1.2rem", marginTop: "2rem", marginBottom: "1.5rem", color: theme === "dark" ? "#f5f5f5" : "#000000" }}>
          Loading...
        </h2>

        {/* Progress bar container */}
        <div className="progress-container pixel-border" style={{ background: theme === "dark" ? "#3a332b" : "#c9b896" }}>
          <div className="progress-bar-loading" style={{ background: theme === "dark" ? "#c9b896" : "#6b5b42" }}></div>
        </div>

        {/* Percentage */}
        <p className="pixel-text" style={{ marginTop: "1rem", fontSize: "0.875rem", color: theme === "dark" ? "#f5f5f5" : "#000000" }}>
          {percentage}%
        </p>

        {/* Loading hints - gaming style */}
        <p className="pixel-text loading-hint" style={{ marginTop: "2rem", fontSize: "0.75rem", opacity: 0.7, color: theme === "dark" ? "#f5f5f5" : "#000000" }}>
          &gt; Press START to continue...
        </p>
      </div>

      <style jsx>{`
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
          padding: 0;
        }

        .loading-content {
          text-align: center;
          animation: fadeIn 0.5s ease;
        }

        .loading-logo {
          display: inline-block;
          padding: 1rem;
          animation: pulse 1.5s ease-in-out infinite;
          width: 152px;
          height: 152px;
          box-sizing: border-box;
        }
        
        .loading-logo svg {
          display: block;
          width: 120px;
          height: 120px;
        }

        .loading-text {
          animation: blink 1s step-end infinite;
        }

        .progress-container {
          width: 300px;
          height: 24px;
          position: relative;
          overflow: hidden;
        }

        .progress-bar-loading {
          height: 100%;
          animation: fillProgress 2s ease-out forwards;
          position: relative;
        }

        .progress-bar-loading::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 20px;
          background: linear-gradient(90deg, transparent, ${theme === "dark" ? "#d4c5a0" : "#d4c5a0"});
          animation: shimmer 1s infinite;
        }

        .loading-hint {
          animation: blink 1.5s step-end infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0.3;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fillProgress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
