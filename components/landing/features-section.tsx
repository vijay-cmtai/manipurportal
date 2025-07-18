"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  Variants,
} from "framer-motion";
import { Users, DollarSign, Shield, TrendingUp, Video } from "lucide-react";
import React from "react";

const featuresList = [
  {
    icon: Video,
    title: "AI-Powered Content Creation",
    description:
      "Receive personalized, AI-generated video scripts on trending topics, with optimized titles and tags to maximize your Social Media's reach and engagement effortlessly.",
  },
  {
    icon: DollarSign,
    title: "Multiple Income Streams",
    description:
      "The platform offers social meadia monetization and transparent multi-level commission system from their social media activity",
  },
  {
    icon: Users,
    title: "Expansive Referral Network",
    description:
      "Build your downline and earn compounding passive income from 5 levels of successful referrals.",
  },
  {
    icon: TrendingUp,
    title: "Growth Analytics",
    description:
      "Track your progress with detailed, real-time analytics to optimize your overall earning potential.",
  },
  {
    icon: Shield,
    title: "Fortified Security",
    description:
      "Your data and earnings are protected with bank-grade security and secure UPI integration.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const FeatureCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative h-full w-full rounded-2xl bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 p-8 group transition-shadow hover:shadow-xl dark:hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-teal-500/10 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 hidden dark:block"
        style={{
          background: useMotionTemplate`radial-gradient(400px at ${mouseX}px ${mouseY}px, rgba(20, 184, 166, 0.15), transparent 80%)`,
        }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden"
        style={{
          background: useMotionTemplate`radial-gradient(400px at ${mouseX}px ${mouseY}px, rgba(99, 102, 241, 0.1), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

export function FeaturesSection() {
  const [mainFeature, ...otherFeatures] = featuresList;

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
            An Unfair Advantage for Content Creators
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-slate-400">
            Our platform is more than just a tool—it's your strategic partner in
            building a digital empire, one feature at a time.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="lg:col-span-2 lg:row-span-2"
            variants={itemVariants}
          >
            <FeatureCard>
              <div className="h-full w-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-primary/10 to-sky-500/10 dark:from-teal-500/20 dark:to-sky-500/20 mb-5">
                    <mainFeature.icon className="h-7 w-7 text-primary dark:text-teal-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-slate-100 mb-2">
                    {mainFeature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                    {mainFeature.description}
                  </p>
                </div>
                <div className="mt-6 h-48 bg-gray-50 dark:bg-slate-900/50 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                  {/* Dark Mode SVG */}
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden dark:block"
                  >
                    <defs>
                      <linearGradient
                        id="darkGraphGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "rgba(20, 184, 166, 0.5)" }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: "rgba(20, 184, 166, 0)" }}
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 150 C 40 120, 80 100, 120 110 S 200 140, 240 100, 280 40, 320 60, 360 120, 400 130 L 400 180 L 0 180 Z"
                      fill="url(#darkGraphGradient)"
                      stroke="#14b8a6"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  {/* Light Mode SVG */}
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    className="dark:hidden"
                  >
                    <defs>
                      <linearGradient
                        id="lightGraphGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "rgba(99, 102, 241, 0.4)" }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: "rgba(99, 102, 241, 0)" }}
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 150 C 40 120, 80 100, 120 110 S 200 140, 240 100, 280 40, 320 60, 360 120, 400 130 L 400 180 L 0 180 Z"
                      fill="url(#lightGraphGradient)"
                      stroke="#6366f1"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              </div>
            </FeatureCard>
          </motion.div>

          {otherFeatures.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard>
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gray-100 dark:bg-gradient-to-br dark:from-slate-500/20 dark:to-slate-400/20 mb-5">
                  <feature.icon className="h-7 w-7 text-gray-600 dark:text-slate-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </FeatureCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
