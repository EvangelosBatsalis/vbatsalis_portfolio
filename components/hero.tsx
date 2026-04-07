"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="w-full min-h-[90vh] flex flex-col items-center justify-center relative pt-20 pb-16 px-6">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center max-w-4xl w-full"
      >
        {/* Status Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/5 mb-12">
          <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
          <span className="text-xs font-mono text-yellow-500 tracking-wider uppercase">
            Under Development... (but the work isn&apos;t 😄)
          </span>
        </div>

        {/* Name */}
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-6">
          <span className="text-white">EVANGELOS</span>
          <br />
          <span className="text-yellow-500">BATSALIS</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 font-display mb-12 tracking-wide">
          Portfolio & Digital Workspace
        </p>

        {/* Headlines */}
        <div className="max-w-3xl mx-auto space-y-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-200">
            Building resilient infrastructure. Shipping automation. Keeping
            production alive.
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            I work across Windows Server, virtualization, networking, security,
            and DevOps pipelines—turning{" "}
            <span className="text-gray-300 font-mono text-sm bg-white/5 px-2 py-1 rounded">
              &quot;it works on my laptop&quot;
            </span>{" "}
            into{" "}
            <span className="text-yellow-500/90 font-mono text-sm bg-yellow-500/10 px-2 py-1 rounded">
              &quot;it runs in production.&quot;
            </span>
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-8 py-4 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2"
          >
            View Projects <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#cheats-and-tuts"
            className="px-8 py-4 bg-[#0a0a0a] text-yellow-500 font-semibold rounded-lg hover:bg-yellow-500/10 transition-colors border border-yellow-500/30 flex items-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]"
          >
            Cheats & Tuts 💛
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-white/5 text-white font-medium rounded-lg hover:bg-white/10 transition-colors border border-white/10"
          >
            Download Resume / Contact
          </a>
        </div>
      </motion.div>
    </section>
  );
}
