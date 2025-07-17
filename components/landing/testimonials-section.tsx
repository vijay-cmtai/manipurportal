"use client"

import { Quote } from "lucide-react"
import { motion, Variants } from "framer-motion"

const testimonials = [
  {
    quote: "The transparency of the referral system is unmatched. I can track every single earning, and the daily payouts have been a game-changer for my finances.",
    name: "Priya Sharma",
    title: "Top Earner, Maharashtra",
    avatar: "/images/home/testimonial1.jpg",
  },
  {
    quote: "I had zero experience with YouTube. The AI video tool and the guided setup process made it incredibly easy to get started. I saw my first YouTube earnings in just two months!",
    name: "Rajesh Kumar",
    title: "Digital Creator, Delhi",
    avatar: "/images/home/testimonial1.jpg",
  },
  {
    quote: "The platform's support team is incredible. They are responsive, helpful, and genuinely invested in my success. It feels like a true partnership.",
    name: "Anjali Singh",
    title: "Community Leader, Bangalore",
    avatar: "/images/home/testimonial1.jpg",
  },
  {
    quote: "The daily tasks are simple, yet effective. It's the most consistent and reliable online earning platform I have ever used. Highly recommended!",
    name: "Vikram Rathod",
    title: "Freelancer, Gujarat",
    avatar: "/images/home/testimonial1.jpg",
  },
]

const marqueeVariants: Variants = {
  animate: {
    x: ["0%", "-100%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30,
        ease: "linear",
      },
    },
  },
}

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
            Voices of Success
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-slate-400">
            Don't just take our word for it. Here's what our successful members are saying about their journey with us.
          </p>
        </div>
      </div>
      
      <div className="relative mt-16">
        <div className="absolute inset-0 z-10 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"></div>
        <div className="group flex overflow-hidden">
          <motion.div 
            className="flex gap-8 shrink-0" 
            variants={marqueeVariants} 
            animate="animate"
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="relative w-[380px] flex-shrink-0 p-8 rounded-2xl bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-slate-700 group-hover:[animation-play-state:paused]"
              >
                <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/5 dark:text-teal-500/10" />
                <blockquote className="relative z-10 text-lg text-gray-700 dark:text-slate-300 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="mt-6 flex items-center">
                  <img className="h-12 w-12 rounded-full object-cover bg-gray-200 dark:bg-slate-700 border-2 border-gray-300 dark:border-slate-600" src={testimonial.avatar} alt={testimonial.name} />
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900 dark:text-slate-100">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-slate-400">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}