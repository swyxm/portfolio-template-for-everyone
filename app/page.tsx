"use client"
import { Button } from "@/components/ui/button"
import { Moon, Sun, ChevronDown, ChevronRight, Star, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"

// Animation hook for intersection observer
function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return [ref, isInView] as const
}

// Staggered list animation hook
function useStaggeredList(items: any[], delay = 100) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [isTriggered, setIsTriggered] = useState(false)

  useEffect(() => {
    if (isTriggered) {
      items.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, index])
        }, index * delay)
      })
    }
  }, [isTriggered, items.length, delay])

  return [visibleItems, setIsTriggered] as const
}

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [mounted, setMounted] = useState(false)

  // Easter egg states
  const [logoClickCount, setLogoClickCount] = useState(0)
  const [rainbowMode, setRainbowMode] = useState(false)
  const [showStars, setShowStars] = useState(false)

  // Animation refs
  const [headerRef, headerInView] = useInView(0.1)
  const [introRef, introInView] = useInView(0.2)
  const [achievementsRef, achievementsInView] = useInView(0.2)
  const [projectsRef, projectsInView] = useInView(0.2)
  const [philosophyRef, philosophyInView] = useInView(0.2)
  const [statusRef, statusInView] = useInView(0.2)
  const [expandableRef, expandableInView] = useInView(0.2)

  // Staggered animations
  const achievements = [
    "launched a productivity app with 15k+ active users",
    "$8k/month from freelance work building mvps for startups",
    "placed 2nd at google developer challenge",
    "contributed to vercel open source (merged 3 prs)",
    "built and sold a chrome extension for low five figures",
  ]

  const projects = [
    "mindflow.app - ai-powered note taking",
    "devtools.so - curated developer resources",
    "quickship.dev - react component starter kit",
    "swayam.tools - collection of micro-tools",
  ]

  const [visibleAchievements, triggerAchievements] = useStaggeredList(achievements, 150)
  const [visibleProjects, triggerProjects] = useStaggeredList(projects, 120)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Simple console message
  useEffect(() => {
    if (mounted) {
      console.log("👋 hey there! try clicking the square in the top-left corner...")
    }
  }, [mounted])

  useEffect(() => {
    if (achievementsInView) {
      triggerAchievements(true)
    }
  }, [achievementsInView, triggerAchievements])

  useEffect(() => {
    if (projectsInView) {
      triggerProjects(true)
    }
  }, [projectsInView, triggerProjects])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Logo click handler for rainbow mode
  const handleLogoClick = () => {
    const newCount = logoClickCount + 1
    setLogoClickCount(newCount)

    if (newCount === 5) {
      setRainbowMode(true)
    }
  }

  // Star animation handler
  const handleStarClick = () => {
    setShowStars(true)
    // Auto-hide after 10 seconds
    setTimeout(() => {
      setShowStars(false)
    }, 10000)
  }
  const duration = Math.min(100/logoClickCount, 300)

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Twinkling Stars Effect */}
      {showStars && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {/* Twinkling Stars */}
          {Array.from({ length: 20 }, (_, i) => (
            <Star
              key={`twinkle-${i}`}
              className={`absolute text-yellow-400 ${
                i % 3 === 0 ? "animate-twinkle" : i % 3 === 1 ? "animate-twinkle-delayed" : "animate-twinkle-slow"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                filter: "drop-shadow(0 0 6px rgba(255, 255, 0, 0.6))",
              }}
              size={Math.random() * 8 + 8}
            />
          ))}

          {/* Shooting Stars with Particle Trails */}
          {Array.from({ length: 3 }, (_, i) => {
            // Different spawn positions along the left side
            const spawnPositions = [
              { left: "5%", top: "10%" }, // top-left
              { left: "8%", top: "50%" }, // middle-left
              { left: "3%", top: "80%" }, // bottom-left
            ]
            const position = spawnPositions[i]

            return (
              <div key={`shooting-group-${i}`} className="absolute">
                {/* Main shooting star */}
                <div
                  className={`absolute w-2 h-2 bg-white rounded-full animate-shooting-star-${i + 1}`}
                  style={{
                    left: position.left,
                    top: position.top,
                    animationDelay: `${i * 1.5}s`,
                    boxShadow: "0 0 8px 3px rgba(247, 226, 133, 0.9), 0 0 16px 6px rgba(250, 211, 112, 0.5)",
                    zIndex: 15,
                  }}
                />

                {/* Particle trail */}
                {Array.from({ length: 8 }, (_, j) => (
                  <div
                    key={`particle-${i}-${j}`}
                    className={`absolute w-1 h-1 bg-white rounded-full animate-particle-trail-${i + 1}`}
                    style={{
                      left: position.left,
                      top: position.top,
                      animationDelay: `${i * 1.5 + j * 0.1}s`,
                      boxShadow: `0 0 ${4 - j * 0.3}px ${2 - j * 0.2}px rgba(255, 255, 255, ${0.7 - j * 0.08})`,
                      opacity: 0.8 - j * 0.1,
                    }}
                  />
                ))}

                {/* Sparkle particles */}
                {Array.from({ length: 5 }, (_, k) => (
                  <div
                    key={`sparkle-${i}-${k}`}
                    className={`absolute w-0.5 h-0.5 bg-blue-200 rounded-full animate-particle-trail-${i + 1}`}
                    style={{
                      left: position.left,
                      top: position.top,
                      animationDelay: `${i * 1.5 + k * 0.15}s`,
                      boxShadow: `0 0 ${3 - k * 0.4}px ${1 - k * 0.1}px rgba(173, 216, 230, ${0.6 - k * 0.1})`,
                      opacity: 0.6 - k * 0.1,
                    }}
                  />
                ))}
              </div>
            )
          })}
        </div>
      )}

      {/* Header */}
      <header
        ref={headerRef}
        className={`flex justify-between items-start p-6 md:p-8 transition-all duration-1000 ease-out relative z-20 ${
          headerInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div
        
        className={`w-4 h-4 rounded-sm cursor-pointer select-none transition-all hover:scale-125 ${
          logoClickCount > 0
            ? `bg-gradient-to-r from-indigo-500 to-slate-500 animate-bounce duration-[${duration}ms] shadow-lg shadow-blue-500/30`
            : "bg-slate-600 dark:bg-slate-400 animate-pulse"
        } ${rainbowMode ? "animate-spin" : ""}`}
        onClick={handleLogoClick}
        title={logoClickCount > 0 ? `clicks: ${logoClickCount}` : "try clicking me"}
      />

        <nav className="flex gap-6 text-sm items-center">
          <Link
            href="#contact"
            className="hover:text-slate-600 dark:hover:text-slate-300 transition-all duration-200 hover:scale-105 relative group"
          >
            CNTCT
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-slate-600 dark:bg-slate-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="https://linkedin.com"
            className="hover:text-slate-600 dark:hover:text-slate-300 transition-all duration-200 hover:scale-105 relative group"
          >
            LNKDN
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-slate-600 dark:bg-slate-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="https://github.com"
            className="hover:text-slate-600 dark:hover:text-slate-300 transition-all duration-200 hover:scale-105 relative group"
          >
            GTHB
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-slate-600 dark:bg-slate-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="https://twitter.com"
            className="hover:text-slate-600 dark:hover:text-slate-300 transition-all duration-200 hover:scale-105 relative group"
          >
            TWTR
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-slate-600 dark:bg-slate-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Star Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleStarClick}
            className="p-0 h-auto hover:bg-transparent hover:text-yellow-400 hover:[text-shadow:0_0_500px_#fffff] transition-all duration-300 hover:scale-110"
            title="twinkle twinkle ✨"
          >
            <Sparkles className="h-4 w-4 transition-all duration-300" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-0 h-auto hover:bg-transparent hover:text-slate-600 dark:hover:text-slate-300 transition-all duration-300 hover:scale-110"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
          </Button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 md:px-8 pb-16 relative z-20">
        <div className="space-y-8">
          {/* Intro */}
          <section
            ref={introRef}
            className={`space-y-4 transition-all duration-1000 ease-out delay-200 ${
              introInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h1
              className={`text-lg font-normal group ${
                rainbowMode
                  ? "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse"
                  : ""
              }`}
            >
              <span className={`inline-block transition-all duration-300 group-hover:scale-105 group-hover:brightness-125 group-hover:contrast-125 ${
                rainbowMode ? "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent" : ""
              }`}>
                hey, i'm swayam 👋 
              </span>
            </h1>
            <p className="text-sm text-muted-foreground">
              i'm 19, based in{" "}
              <Link
                href="#"
                className="text-slate-600 dark:text-slate-400 hover:underline underline-offset-2 transition-all duration-200 hover:text-slate-800 dark:hover:text-slate-200"
              >
                toronto & california 🇨🇦🇺🇸
              </Link>
              .
            </p>
            <p className="text-sm text-muted-foreground">i'm a csba major @ usc ✌️</p>
          </section>

          {/* Achievements */}
          <section
            ref={achievementsRef}
            className={`space-y-4 transition-all duration-1000 ease-out delay-300 ${
              achievementsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-sm font-normal">recent wins:</h2>
            <ul className="space-y-2 text-sm text-muted-foreground ml-4">
              {achievements.map((achievement, index) => (
                <li
                  key={index}
                  className={`transition-all duration-500 ease-out ${
                    visibleAchievements.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  } hover:text-foreground hover:translate-x-1`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  •{" "}
                  {achievement.includes("freelance") ? (
                    <>
                      $8k/month from{" "}
                      <Link
                        href="#"
                        className="text-slate-600 dark:text-slate-400 hover:underline underline-offset-2 transition-all duration-200"
                      >
                        freelance work
                      </Link>{" "}
                      building mvps for startups
                    </>
                  ) : achievement.includes("google") ? (
                    <>
                      placed 2nd at{" "}
                      <Link
                        href="#"
                        className="text-slate-600 dark:text-slate-400 hover:underline underline-offset-2 transition-all duration-200"
                      >
                        google developer challenge
                      </Link>
                    </>
                  ) : achievement.includes("vercel") ? (
                    <>
                      contributed to{" "}
                      <Link
                        href="#"
                        className="text-slate-600 dark:text-slate-400 hover:underline underline-offset-2 transition-all duration-200"
                      >
                        vercel
                      </Link>{" "}
                      open source (merged 3 prs)
                    </>
                  ) : achievement.includes("chrome") ? (
                    <>
                      built and sold{" "}
                      <Link
                        href="#"
                        className="text-slate-600 dark:text-slate-400 hover:underline underline-offset-2 transition-all duration-200"
                      >
                        a chrome extension
                      </Link>{" "}
                      for low five figures
                    </>
                  ) : (
                    achievement
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* Current Work */}
          <section
            ref={projectsRef}
            className={`space-y-4 transition-all duration-1000 ease-out delay-400 ${
              projectsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-sm font-normal">currently building:</h2>
            <ul className="space-y-2 text-sm text-muted-foreground ml-4">
              {projects.map((project, index) => (
                <li
                  key={index}
                  className={`transition-all duration-500 ease-out ${
                    visibleProjects.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  } hover:text-foreground hover:translate-x-1`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  •{" "}
                  <Link
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:underline underline-offset-2 transition-all duration-200 hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    {project.split(" - ")[0]}
                  </Link>{" "}
                  - {project.split(" - ")[1]}
                </li>
              ))}
            </ul>
          </section>

          {/* Philosophy */}
          <section
            ref={philosophyRef}
            className={`space-y-4 text-sm text-muted-foreground transition-all duration-1000 ease-out delay-500 ${
              philosophyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="hover:text-foreground transition-colors duration-300">
              i believe in building fast, shipping faster. most ideas don't need months of planning - they need a
              weekend and some caffeine.
            </p>
          </section>

          {/* Current Status */}
          <section
            ref={statusRef}
            className={`space-y-4 transition-all duration-1000 ease-out delay-600 ${
              statusInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-sm font-normal">right now:</h2>
            <p className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
              deep in react server components, exploring ai integrations, and probably drinking too much coffee.
            </p>
            <p className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
              always down to chat about startups, tech, or that weird bug you've been stuck on for hours.
            </p>
          </section>

          {/* Expandable Sections */}
          <section
            ref={expandableRef}
            className={`space-y-4 transition-all duration-1000 ease-out delay-700 ${
              expandableInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="space-y-2">
              <button
                onClick={() => toggleSection("journey")}
                className="flex items-center gap-2 text-sm hover:bg-muted p-2 -m-2 rounded w-full text-left transition-all duration-200 hover:translate-x-1 group"
              >
                <span className="transition-transform duration-200 group-hover:scale-110">
                  {expandedSections.journey ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </span>
                my journey
                <span className="ml-auto text-xs text-muted-foreground transition-all duration-200 group-hover:text-foreground">
                  expand
                </span>
              </button>
              {expandedSections.journey && (
                <div className="ml-5 text-sm space-y-2 text-muted-foreground animate-in slide-in-from-top-2 duration-300">
                  <p className="hover:text-foreground transition-colors duration-300">
                    started with html/css in high school. got obsessed with making things look pixel-perfect. then
                    discovered javascript and everything clicked.
                  </p>
                  <p className="hover:text-foreground transition-colors duration-300">
                    spent college building random projects - a spotify clone, a weather app, way too many todo lists.
                    learned more from side projects than lectures.
                  </p>
                  <p className="hover:text-foreground transition-colors duration-300">
                    dropped out junior year to work at a startup. best decision i ever made.
                  </p>
                  {rainbowMode && (
                    <p className="text-xs text-purple-400 animate-pulse mt-2">
                      🌈 you found the rainbow! thanks for being curious.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button
                onClick={() => toggleSection("stack")}
                className="flex items-center gap-2 text-sm hover:bg-muted p-2 -m-2 rounded w-full text-left transition-all duration-200 hover:translate-x-1 group"
              >
                <span className="transition-transform duration-200 group-hover:scale-110">
                  {expandedSections.stack ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                </span>
                tech i love
                <span className="ml-auto text-xs text-muted-foreground transition-all duration-200 group-hover:text-foreground">
                  expand
                </span>
              </button>
              {expandedSections.stack && (
                <div className="ml-5 text-sm space-y-2 text-muted-foreground animate-in slide-in-from-top-2 duration-300">
                  <p className="hover:text-foreground transition-colors duration-300">
                    react/next.js for frontend. typescript everywhere. tailwind for styling because life's too short for
                    css-in-js debates.
                  </p>
                  <p className="hover:text-foreground transition-colors duration-300">
                    node.js + postgres for backend. prisma for orm. vercel for deployment because it just works.
                    sometimes railway when i need more control.
                  </p>
                  <p className="hover:text-foreground transition-colors duration-300">
                    figma for design. cursor for coding. linear for project management. notion for everything else.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button
                onClick={() => toggleSection("philosophy")}
                className="flex items-center gap-2 text-sm hover:bg-muted p-2 -m-2 rounded w-full text-left transition-all duration-200 hover:translate-x-1 group"
              >
                <span className="transition-transform duration-200 group-hover:scale-110">
                  {expandedSections.philosophy ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </span>
                how i work
                <span className="ml-auto text-xs text-muted-foreground transition-all duration-200 group-hover:text-foreground">
                  expand
                </span>
              </button>
              {expandedSections.philosophy && (
                <div className="ml-5 text-sm space-y-2 text-muted-foreground animate-in slide-in-from-top-2 duration-300">
                  <p className="hover:text-foreground transition-colors duration-300">
                    ship early, iterate fast. user feedback beats internal debates every time. build for real problems,
                    not imaginary ones.
                  </p>
                  <p className="hover:text-foreground transition-colors duration-300">
                    code should be readable by humans first, computers second. comments are for why, not what. tests are
                    documentation that never lies.
                  </p>
                  <p className="hover:text-foreground transition-colors duration-300">
                    remote-first but love good coffee shops. async communication over meetings. deep work over busy
                    work.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button
                onClick={() => toggleSection("future")}
                className="flex items-center gap-2 text-sm hover:bg-muted p-2 -m-2 rounded w-full text-left transition-all duration-200 hover:translate-x-1 group"
              >
                <span className="transition-transform duration-200 group-hover:scale-110">
                  {expandedSections.future ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                </span>
                what's next
                <span className="ml-auto text-xs text-muted-foreground transition-all duration-200 group-hover:text-foreground">
                  expand
                </span>
              </button>
              {expandedSections.future && (
                <div className="ml-5 text-sm space-y-2 text-muted-foreground animate-in slide-in-from-top-2 duration-300">
                  <p className="hover:text-foreground transition-colors duration-300">
                    building a small but profitable company. something that solves real problems for developers or
                    creators.
                  </p>
                  <p className="hover:text-foreground transition-colors duration-300">
                    want to write more - about building products, technical deep dives, maybe a newsletter. sharing
                    knowledge feels good.
                  </p>
                  <p className="hover:text-foreground transition-colors duration-300">
                    eventually mentor other developers. remember what it felt like to be stuck on everything. want to
                    help others get unstuck faster.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
