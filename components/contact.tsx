"use client";

import { motion } from "motion/react";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />

        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
          Let&apos;s build something resilient.
        </h2>

        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Want to collaborate, hire me, or just talk infra? I&apos;m open to
          projects and infrastructure/DevOps roles.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <a
            href="mailto:hello@vbatsalis.gr"
            className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors text-gray-200"
          >
            <Mail className="w-5 h-5 text-yellow-500" />
            <span>hello@vbatsalis.gr</span>
          </a>
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-200">
            <MapPin className="w-5 h-5 text-yellow-500" />
            <span>Greece</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <a
            href="#"
            className="p-3 bg-white/5 hover:bg-yellow-500 hover:text-black border border-white/10 rounded-full transition-all text-gray-400"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="p-3 bg-white/5 hover:bg-yellow-500 hover:text-black border border-white/10 rounded-full transition-all text-gray-400"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
