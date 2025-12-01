"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useLanguage } from "@/contexts/LanguageContext"

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }

type Position = { x: number; y: number }
type Direction = { x: number; y: number }

const ALL_SKILLS = [
  "React", "Next.js", "TypeScript", "CSS", "TailwindCSS",
  "Node.js", "Express.js", "NestJS", "PostgreSQL",
  "JavaScript", "C", "C++",
  "Docker", "Kubernetes", "Git", "Nginx", "Azure"
]

export default function SnakeGame({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useLanguage()
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION)
  const [food, setFood] = useState<Position & { skill: string }>({ x: 15, y: 15, skill: ALL_SKILLS[0] })
  const [collectedSkills, setCollectedSkills] = useState<string[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(150)
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)

  const getRandomPosition = useCallback((excludeSkills: string[] = []): Position & { skill: string } => {
    const availableSkills = ALL_SKILLS.filter(s => !excludeSkills.includes(s))
    if (availableSkills.length === 0) {
      return { x: 0, y: 0, skill: "" }
    }
    
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
      skill: availableSkills[Math.floor(Math.random() * availableSkills.length)]
    }
  }, [])

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setCollectedSkills([])
    setFood(getRandomPosition())
    setGameOver(false)
    setGameWon(false)
    setIsPlaying(true)
    setSpeed(150)
  }, [getRandomPosition])

  const moveSnake = useCallback(() => {
    if (gameOver || gameWon || !isPlaying) return

    setSnake(prevSnake => {
      const newHead = {
        x: (prevSnake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (prevSnake[0].y + direction.y + GRID_SIZE) % GRID_SIZE
      }

      // Check collision with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true)
        setIsPlaying(false)
        return prevSnake
      }

      const newSnake = [newHead, ...prevSnake]

      // Check if food is eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        const newCollected = [...collectedSkills, food.skill]
        setCollectedSkills(newCollected)
        
        // Check win condition
        if (newCollected.length === ALL_SKILLS.length) {
          setGameWon(true)
          setIsPlaying(false)
          return newSnake
        }
        
        // Increase speed
        setSpeed(prev => Math.max(50, prev - 5))
        
        // Generate new food
        setFood(getRandomPosition(newCollected))
        return newSnake
      }

      // Remove tail if no food eaten
      newSnake.pop()
      return newSnake
    })
  }, [direction, food, gameOver, gameWon, isPlaying, collectedSkills, getRandomPosition])

  useEffect(() => {
    if (isPlaying && !gameOver && !gameWon) {
      gameLoopRef.current = setInterval(moveSnake, speed)
      return () => {
        if (gameLoopRef.current) clearInterval(gameLoopRef.current)
      }
    }
  }, [isPlaying, gameOver, gameWon, moveSnake, speed])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return

      const key = e.key.toLowerCase()
      
      // Prevent default for arrow keys, WASD, Page Up/Down, Home/End during game
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd', 'pageup', 'pagedown', 'home', 'end'].includes(key)) {
        e.preventDefault()
        e.stopPropagation()
      }

      if (!isPlaying) return

      switch (key) {
        case "arrowup":
        case "w":
          if (direction.y === 0) setDirection({ x: 0, y: -1 })
          break
        case "arrowdown":
        case "s":
          if (direction.y === 0) setDirection({ x: 0, y: 1 })
          break
        case "arrowleft":
        case "a":
          if (direction.x === 0) setDirection({ x: -1, y: 0 })
          break
        case "arrowright":
        case "d":
          if (direction.x === 0) setDirection({ x: 1, y: 0 })
          break
        case "escape":
          onClose()
          break
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyPress, { capture: true })
      return () => window.removeEventListener("keydown", handleKeyPress, { capture: true })
    }
  }, [direction, isOpen, isPlaying, onClose])

  useEffect(() => {
    if (isOpen && !isPlaying && !gameOver && !gameWon) {
      resetGame()
    }
  }, [isOpen, isPlaying, gameOver, gameWon, resetGame])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-background/95 backdrop-blur-sm z-9999 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="pixel-border bg-background p-4 md:p-8 max-w-2xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <h2 className="game-title text-sm md:text-lg">{t.snakeGameTitle}</h2>
          <button
            onClick={onClose}
            className="pixel-border pixel-text text-xs font-bold bg-card hover:bg-muted transition-colors px-3 py-1 whitespace-nowrap"
          >
            {t.snakeClose}
          </button>
        </div>

        {/* Instructions */}
        <p className="pixel-text text-xs mb-4 text-center">
          {t.snakeInstructions}
        </p>

        {/* Score */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4 pixel-text text-xs sm:text-sm">
          <span>{t.snakeScore}: {collectedSkills.length}/{ALL_SKILLS.length}</span>
          <span className="truncate">Next: {food.skill}</span>
        </div>

        {/* Game Grid */}
        <div className="flex justify-center mb-6">
          <div className="relative pixel-border bg-card overflow-hidden" style={{ 
            width: Math.min(GRID_SIZE * CELL_SIZE, 400), 
            height: Math.min(GRID_SIZE * CELL_SIZE, 400),
            aspectRatio: '1/1'
          }}>
          {/* Snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className="absolute bg-accent"
              style={{
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                opacity: index === 0 ? 1 : 0.7
              }}
            />
          ))}

          {/* Food */}
          {!gameOver && !gameWon && (
            <div
              className="absolute bg-foreground flex items-center justify-center pixel-text"
              style={{
                left: food.x * CELL_SIZE,
                top: food.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                fontSize: "8px",
                color: "var(--background)"
              }}
            >
              <span className="transform scale-75">{food.skill.substring(0, 2)}</span>
            </div>
          )}

          {/* Game Over Overlay */}
          {(gameOver || gameWon) && (
            <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center">
              <h3 className="game-title text-center text-md mb-4">
                {gameWon ? t.snakeWin : t.snakeGameOver}
              </h3>
              <p className="pixel-text text-sm mb-4">
                {t.snakeScore}: {collectedSkills.length}/{ALL_SKILLS.length}
              </p>
              <button
                onClick={resetGame}
                className="pixel-border pixel-text text-xs font-bold bg-accent text-accent-foreground hover:bg-muted transition-colors px-4 py-2"
              >
                {t.snakeRestart}
              </button>
            </div>
          )}
          </div>
        </div>

        {/* Collected Skills */}
        <div className="pixel-border bg-card p-3">
          <h4 className="pixel-text text-xs font-bold mb-2">Collected:</h4>
          <div className="flex flex-wrap gap-1">
            {collectedSkills.length === 0 ? (
              <span className="pixel-text text-xs">No skills collected yet...</span>
            ) : (
              collectedSkills.map((skill, i) => (
                <span
                  key={i}
                  className="pixel-border pixel-text bg-accent text-accent-foreground text-xs px-2 py-1"
                >
                  {skill}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
