"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence, Variants } from "framer-motion"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blogs" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
]

const mobileMenuVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const mobileLinkVariant: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initial = saved || (prefersDark ? "dark" : "light")
    setTheme(initial)
    document.documentElement.classList.toggle("dark", initial === "dark")
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const handleLinkClick = () => setIsMenuOpen(false)

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${isScrolled ? "bg-gray-100 dark:bg-slate-900 border-b border-gray-300 dark:border-slate-700" : "bg-white/90 dark:bg-slate-900/80"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <span className="font-extrabold text-2xl text-gray-900 dark:text-white tracking-tight">UEIEP</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium ${pathname === link.href ? "text-teal-600 dark:text-teal-400" : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="ghost" asChild className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              <Link href="/login">Login</Link>
            </Button>
            <Button className="text-sm font-semibold bg-teal-600 hover:bg-teal-500 text-white rounded-full px-5 py-2 shadow-md" asChild>
              <Link href="/register">Join Now</Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-gray-700 dark:text-white">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" className="p-2 rounded-md text-gray-700 dark:text-gray-300">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-white dark:bg-slate-900 backdrop-blur-xl lg:hidden"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
              <div className="flex items-center justify-between h-20">
                <Link href="/" onClick={handleLinkClick} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">U</span>
                  </div>
                </Link>
                <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="p-2 rounded-md text-gray-700 dark:text-gray-300">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <motion.nav
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                initial="hidden"
                animate="visible"
                className="flex-1 flex flex-col items-center justify-center space-y-4"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.href} variants={mobileLinkVariant}>
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className={`text-3xl font-semibold transition-colors ${pathname === link.href ? "text-teal-600 dark:text-teal-400" : "text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white"}`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <div className="flex flex-col space-y-4 py-8">
                <Button variant="outline" size="lg" className="border-gray-300 dark:border-slate-700 text-gray-700 dark:text-white" asChild>
                  <Link href="/login" onClick={handleLinkClick}>Login</Link>
                </Button>
                <Button size="lg" className="bg-teal-600 hover:bg-teal-500 text-white" asChild>
                  <Link href="/register" onClick={handleLinkClick}>Join Now</Link>
                </Button>
                <Button variant="ghost" size="lg" onClick={toggleTheme} className="text-gray-700 dark:text-white">
                  {theme === "dark" ? (
                    <div className="flex items-center gap-2">
                      <Sun className="w-5 h-5" /> Light Mode
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Moon className="w-5 h-5" /> Dark Mode
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
