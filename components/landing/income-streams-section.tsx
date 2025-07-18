"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
// === 1. ICON KO IMPORT KAREIN: 'Check' ko 'Youtube' se badla gaya hai ===
import { Youtube, Network, Video } from "lucide-react";
import { useState } from "react";

const incomeSources = [
  {
    id: "assignments",
    icon: Youtube,
    title: "Daily Assignments",
    description:
      "Earn consistent daily income by engaging with assigned video content. A simple, reliable way to boost your earnings every single day.",
  },
  {
    id: "youtube",
    // === 2. ICON KO YAHAN UPDATE KAREIN: 'Check' ko 'Youtube' se badla gaya hai ===
    icon: Youtube,
    title: "Social Media Monetization",
    description:
      "Leverage our AI videos on your own channel to build a powerful, long-term revenue stream that grows with your audience.",
  },
  {
    id: "referral",
    icon: Network,
    title: "5-Level Referral Program",
    description:
      "Build a robust downline and earn passive income from the efforts of your network, up to five levels deep. Your growth fuels your earnings.",
  },
];

const contentVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const treeItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export function IncomeStreamsSection() {
  const [activeTab, setActiveTab] = useState(incomeSources[0]);

  return (
    <section className="py-24 bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
            One Platform, Multiple Income Streams
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-slate-400">
            Our platform is engineered for empowerment, offering diverse and
            transparent ways to generate income. You are in complete control of
            your financial growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-1 flex flex-col space-y-2">
            {incomeSources.map((source) => (
              <button
                key={source.id}
                onClick={() => setActiveTab(source)}
                className={`relative w-full p-4 text-left rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 focus-visible:ring-primary dark:focus-visible:ring-teal-500 ${
                  activeTab.id === source.id
                    ? "bg-primary/10 dark:bg-slate-800 shadow-lg"
                    : "bg-gray-100/50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
              >
                {activeTab.id === source.id && (
                  <motion.div
                    layoutId="active-income-indicator"
                    className="absolute left-0 top-0 h-full w-1 bg-primary dark:bg-teal-500 rounded-l-lg"
                  ></motion.div>
                )}
                <div className="flex items-start space-x-4 pl-3">
                  <source.icon
                    className={`h-6 w-6 mt-1 flex-shrink-0 ${activeTab.id === source.id ? "text-primary dark:text-teal-400" : "text-gray-500 dark:text-slate-500"}`}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-slate-100">
                      {source.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                      {source.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 min-h-[28rem] bg-white dark:bg-slate-800/50 rounded-lg p-8 border border-gray-200 dark:border-transparent">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {activeTab.id !== "referral" && (
                  <div className="flex flex-col items-center text-center h-full justify-center">
                    <div className="flex items-center justify-center h-28 w-28 rounded-full bg-gradient-to-br from-primary/5 to-sky-500/5 dark:from-teal-500/10 dark:to-sky-500/10 mb-6">
                      <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-primary/10 to-sky-500/10 dark:from-teal-500/20 dark:to-sky-500/20">
                        <activeTab.icon className="h-12 w-12 text-primary dark:text-teal-400" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
                      {activeTab.title}
                    </h3>
                    <p className="mt-2 max-w-md text-gray-600 dark:text-slate-400">
                      {activeTab.description}
                    </p>
                  </div>
                )}

                {activeTab.id === "referral" && (
                  <div>
                    <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-slate-100 mb-8">
                      {activeTab.title}
                    </h3>
                    <motion.div
                      className="relative pl-10"
                      variants={{
                        visible: { transition: { staggerChildren: 0.1 } },
                      }}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="absolute left-4 top-4 h-[calc(100%-2rem)] w-0.5 bg-gray-200 dark:bg-slate-700"></div>
                      {[
                        {
                          node: "You",
                          detail: "Refer 6 Members Directly",
                          isAdmin: true,
                        },
                        {
                          node: "Level 1",
                          detail: "Earn 20% of 0.5% from direct referrals",
                        },
                        {
                          node: "Level 2",
                          detail: "Earn 20% of 0.5% from Level 1's referrals",
                        },
                        {
                          node: "Level 3",
                          detail: "Earn 20% of 0.5% from Level 2's referrals",
                        },
                        {
                          node: "Level 4",
                          detail: "Earn 20% of 0.5% from Level 3's referrals",
                        },
                        {
                          node: "Level 5",
                          detail: "Earn 20% of 0.5% from Level 4's referrals",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="relative mb-4"
                          variants={treeItemVariants}
                        >
                          <div className="absolute -left-10 top-3 h-0.5 w-6 bg-gray-200 dark:bg-slate-700"></div>
                          <div
                            className={`absolute -left-[22px] top-[6px] h-4 w-4 rounded-full border-2 ${item.isAdmin ? "border-primary dark:border-teal-400 bg-white dark:bg-slate-900" : "border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800"}`}
                          ></div>
                          <div
                            className={`p-3 rounded-lg ${item.isAdmin ? "bg-primary/10 border border-primary/20 dark:bg-teal-500/10 dark:border-teal-500/30" : "bg-gray-100 dark:bg-slate-800"}`}
                          >
                            <span
                              className={`font-bold ${item.isAdmin ? "text-primary dark:text-teal-400" : "text-gray-800 dark:text-slate-300"}`}
                            >
                              {item.node}:
                            </span>
                            <span className="ml-2 text-gray-600 dark:text-slate-400">
                              {item.detail}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
