"use client"

import { Footer } from "@/components/landing/footer"
import { Header } from "@/components/landing/header"
import { animate, AnimatePresence, motion, useInView, useMotionValue, useTransform } from "framer-motion"
import { Users, Heart, Lightbulb, Rocket, Shield, Target } from "lucide-react"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"

const team = [
    { name: "Rajesh Kumar", role: "Founder & CEO", image: "/images/home/testimonial1.jpg", description: "Visionary leader with 15+ years in AI and digital platforms." },
    { name: "Priya Sharma", role: "Chief Technology Officer", image: "/images/home/testimonial1.jpg", description: "AI research pioneer and specialist in generative content systems." },
    { name: "Amit Patel", role: "Head of Operations", image: "/images/home/testimonial1.jpg", description: "Digital marketing ecosystem expert ensuring seamless Admin experience." },
]

const values = [
    { icon: Target, title: "Mission-Driven", description: "To democratize income opportunities through AI-powered content and strategic networking.", bgUrl: "/images/home/testimonial1.jpg" },
    { icon: Users, title: "Community First", description: "Connecting like-minded individuals who support each other's growth and success.", bgUrl: "/images/home/testimonial1.jpg" },
    { icon: Shield, title: "Unwavering Trust", description: "Your data and earnings are protected with bank-grade security and complete transparency.", bgUrl: "/images/home/testimonial1.jpg" },
]

const storyChapters = [
    { icon: Lightbulb, title: "The Genesis", year: "2023", text: "Born from a simple observation: millions of talented individuals lack access to sustainable digital income. We envisioned a platform combining AI with community power." },
    { icon: Rocket, title: "The Launch", year: "2023", text: "UEIEP was launched to create a platform where anyone can build multiple income streams, focusing on a decentralized, community-driven future." },
    { icon: Heart, title: "The Impact", year: "Today", text: "Proudly serving over 10,000 Admins across India, distributing over ₹50 lakhs in earnings through a transparent, automated system that puts Admins first." }
]

const AnimatedCounter = ({ to }: { to: number }) => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (inView) animate(count, to, { duration: 2, ease: "easeOut" })
  }, [inView, count, to])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

const TeamCard = ({ member }: { member: typeof team[0] }) => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useTransform(y, [-100, 100], [30, -30])
    const rotateY = useTransform(x, [-100, 100], [-30, 30])
  
    return (
      <motion.div
        style={{ x, y, rotateX, rotateY, z: 100 }}
        drag
        dragElastic={0.18}
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        whileTap={{ cursor: "grabbing" }}
        className="relative text-center p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-xl border border-gray-200 dark:border-slate-700/80 shadow-2xl shadow-primary/10 cursor-grab"
      >
        <motion.div
          style={{ x, y, rotateX, rotateY, z: 100000 }}
          className="absolute inset-0"
        />
        <img src={member.image} alt={member.name} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover ring-4 ring-gray-300 dark:ring-slate-700"/>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100">{member.name}</h3>
        <p className="text-primary font-medium mb-3">{member.role}</p>
        <p className="text-gray-600 dark:text-slate-400 text-sm">{member.description}</p>
      </motion.div>
    )
}

export default function AboutPage() {
  const [hoveredValue, setHoveredValue] = useState(values[0])

  return (
    <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
      <Header />
      <main>
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-white dark:bg-slate-900">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[80rem] h-[80rem] bg-radial-gradient from-primary/10 to-transparent opacity-50"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div className="max-w-4xl mx-auto text-center" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8}}>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-gradient-to-br from-gray-900 to-gray-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                The Architecture of Empowerment
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-slate-400 max-w-3xl mx-auto">
                We're not just building a platform; we're engineering a new digital economy powered by community and shared opportunity.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-gray-50 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="lg:sticky top-24">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                            Our Journey, Our Promise
                        </h2>
                        <p className="mt-6 text-lg text-gray-600 dark:text-slate-400">
                            From a simple idea to a thriving community, our story is one of innovation, dedication, and a relentless focus on empowering our Admins.
                        </p>
                    </div>
                    <div className="space-y-12">
                        {storyChapters.map((chapter, index) => (
                            <motion.div 
                                key={index}
                                className="p-8 bg-white/80 dark:bg-slate-900/50 backdrop-blur-md rounded-xl border border-gray-200 dark:border-slate-800"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                                        <chapter.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-slate-100">{chapter.title}</h3>
                                    <span className="text-sm font-mono text-gray-500 dark:text-slate-500">{chapter.year}</span>
                                </div>
                                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">{chapter.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        <section className="py-24 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">What Drives Us</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-slate-400">Our core values are the pillars that support our vision and guide our actions.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
                    <div className="flex flex-col gap-4">
                        {values.map((value) => (
                            <div key={value.title} onMouseEnter={() => setHoveredValue(value)} className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 ${hoveredValue.title === value.title ? 'bg-gray-100 dark:bg-slate-800 border-primary/50' : 'bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700/80'}`}>
                                <div className="flex items-center gap-4">
                                    <value.icon className={`h-7 w-7 transition-colors ${hoveredValue.title === value.title ? 'text-primary' : 'text-gray-500 dark:text-slate-500'}`} />
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100">{value.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div key={hoveredValue.title} className="relative h-96 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-800" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.5}}>
                            <img src={hoveredValue.bgUrl} alt={hoveredValue.title} className="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-20" />
                            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900/80 to-transparent"></div>
                            <div className="absolute bottom-0 p-8 text-gray-900 dark:text-white">
                                <h3 className="text-2xl font-bold">{hoveredValue.title}</h3>
                                <p className="mt-2 text-gray-700 dark:text-slate-300">{hoveredValue.description}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
        
        <section className="py-24 bg-gray-50 dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">The Architects of Empowerment</h2>
              <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto mt-4">Meet the passionate individuals dedicated to building your digital future.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16" style={{ perspective: "1000px" }}>
              {team.map((member) => <TeamCard key={member.name} member={member} />)}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="relative p-12 text-center bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-radial-gradient from-primary/10 to-transparent opacity-70"></div>
                </div>
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">Join a Thriving Community</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">Become part of a network of over <AnimatedCounter to={10000}/>+ successful creators and earners.</p>
                    <div className="mt-8">
                        <Link href="/register" className="inline-block px-10 py-4 text-base font-bold text-primary-foreground bg-primary hover:bg-primary-hover rounded-full shadow-lg shadow-primary/20 transition-transform hover:scale-105">Start Your Journey</Link>
                    </div>
                </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}