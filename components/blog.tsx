"use client";

import { motion } from "motion/react";
import { BookOpen, ChevronRight } from "lucide-react";

const posts = [
  {
    title: "DMZ Done Right: Expose Only What You Must",
    category: "Networking / VLANs / Firewalls",
    date: "Draft",
  },
  {
    title: "Hyper-V Ops: What Actually Breaks in Production",
    category: "Windows Server & AD",
    date: "Draft",
  },
  {
    title: "Docker in Real Life: The 10 Things That Bite You",
    category: "Docker & Self-hosting",
    date: "Draft",
  },
  {
    title: "Monitoring: Alerts That Don't Make You Hate Your Phone",
    category: "Monitoring & Incident Response",
    date: "Draft",
  },
  {
    title: "Branch Protection: How to Stop 'Oops' in Main",
    category: "Azure & Identity",
    date: "Draft",
  },
];

export function Blog() {
  return (
    <section id="blog" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-yellow-500" />
          <h2 className="text-3xl font-display font-bold text-white">
            Writing / Content
          </h2>
        </div>
        <div className="w-12 h-1 bg-yellow-500 rounded-full mb-6" />
        <p className="text-gray-400 text-lg max-w-2xl">
          Notes from the trenches: infrastructure, DevOps, automation, and
          real-world IT—without marketing fluff.
        </p>
      </motion.div>

      <div className="grid gap-4">
        {posts.map((post, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-[#0a0a0a] border border-white/5 rounded-xl hover:border-yellow-500/30 transition-colors cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-yellow-500/80 uppercase tracking-wider bg-yellow-500/10 px-2 py-0.5 rounded">
                  {post.category}
                </span>
                <span className="text-xs text-gray-600 font-mono">
                  {post.date}
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-200 group-hover:text-yellow-400 transition-colors">
                {post.title}
              </h3>
            </div>
            <div className="mt-4 sm:mt-0 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
              <ChevronRight className="w-5 h-5 text-yellow-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
