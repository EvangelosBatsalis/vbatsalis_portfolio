"use client";

import { motion, AnimatePresence } from "motion/react";
import { FolderHeart, ExternalLink, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const cheatsheets = [
  {
    title: "Windows Server & Hyper-V",
    description: "Troubleshooting, PowerShell commands, AD Diagnostics, Clustering and Storage survival guide.",
    category: "SysAdmin",
    date: "2026-04",
    link: "/cheatsheets/sysadmin-hyperv-cheatsheet.html"
  },
  {
    title: "DevOps Arsenal",
    description: "Containerization, CI/CD pipelines, automation tools, and deployment strategies.",
    category: "DevOps",
    date: "2026-04",
    link: "/cheatsheets/devops-cheatsheet.html"
  },
  {
    title: "React Native Visual Guide",
    description: "A complete visual reference for building cross-platform mobile apps with React Native.",
    category: "Mobile Dev",
    date: "2026-04",
    link: "/cheatsheets/react-native-complete-visual-guide.html"
  },
  {
    title: "NativeWind Cheatsheet",
    description: "Tailwind CSS for React Native. Quick reference for utilities, styling, and configuration.",
    category: "Styling",
    date: "2026-04",
    link: "/cheatsheets/nativewind-cheatsheet.html"
  },
  {
    title: "NativeWind Complete Tutorial",
    description: "Deep dive into NativeWind to master styling on mobile devices seamlessly.",
    category: "Tutorial",
    date: "2026-04",
    link: "/cheatsheets/NativeWind-Complete-Tutorial.html"
  }
];

export function CheatsAndTuts() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="cheats-and-tuts" className="scroll-mt-24">
      {/* The "Smart and Funny" Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full relative group overflow-hidden bg-gradient-to-br from-[#101010] to-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 flex items-center justify-between shadow-xl cursor-pointer"
      >
        <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative z-10 w-full">
          <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(234,179,8,0.15)] flex-shrink-0">
            <FolderHeart className="w-8 h-8 text-yellow-500" />
          </div>
          
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2 flex items-center justify-center sm:justify-start gap-2">
              Cheats & Tuts With Love <Sparkles className="w-5 h-5 text-yellow-400" />
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl">
              Tap here to unlock my secret vault of copy-paste magic, server survival guides, and 3 AM panic solutions.
            </p>
          </div>
          
          <div className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-transform duration-500 ${isOpen ? 'rotate-90 bg-white/10' : 'group-hover:bg-white/5'}`}>
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </motion.button>

      {/* The Beautiful Scrollable Area */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-8 pb-4">
              <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory hide-scrollbar relative">
                {cheatsheets.map((sheet, idx) => (
                  <Link href={sheet.link} key={idx} target="_blank" rel="noopener noreferrer" className="snap-center shrink-0 w-[300px] sm:w-[350px]">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="h-full flex flex-col justify-between p-6 bg-[#0a0a0a] border border-white/5 rounded-2xl hover:border-yellow-500/50 hover:bg-white/[0.02] transition-all relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-[-10px] group-hover:translate-y-0 text-yellow-500/50">
                        <ExternalLink className="w-5 h-5" />
                      </div>
                      
                      <div className="relative z-10">
                        <span className="text-[10px] font-mono text-yellow-500/80 uppercase tracking-wider bg-yellow-500/10 px-2 py-0.5 rounded-full mb-4 inline-block border border-yellow-500/20">
                          {sheet.category}
                        </span>
                        
                        <h3 className="text-xl font-medium text-gray-200 group-hover:text-yellow-400 transition-colors mb-2 leading-tight">
                          {sheet.title}
                        </h3>
                        
                        <p className="text-sm text-gray-400 leading-relaxed mt-3">
                          {sheet.description}
                        </p>
                      </div>

                      <div className="mt-8 pt-4 border-t border-white/5 group-hover:border-yellow-500/20 transition-colors">
                        <span className="text-[11px] text-gray-500 font-mono tracking-widest uppercase">
                          ADDED: {sheet.date}
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
            
            <style jsx global>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
