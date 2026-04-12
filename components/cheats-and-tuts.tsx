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
  },
  {
    title: "Azure AZ-104 Study Guide",
    description: "Πλήρης οδηγός (14 chapters) βάσει του επίσημου curriculum. Real IT scenarios, KQL & CLI.",
    category: "Azure",
    date: "2026-04",
    link: "/cheatsheets/az104-index.html"
  },
  {
    title: "M365 Tenant Migration V2",
    description: "Assessment & Planning guide for migrating M365 tenants efficiently.",
    category: "DevOps",
    date: "2026-04",
    link: "/cheatsheets/tenant-migration-assessment-tutorial.html"
  },
  {
    title: "Winget Complete Tutorial",
    description: "Automate Windows setups and package installations seamlessly with Winget.",
    category: "SysAdmin",
    date: "2026-04",
    link: "/cheatsheets/winget-tutorial.html"
  },
  {
    title: "ERPNext English School guide",
    description: "A complete guide on configuring and using ERPNext for an English School.",
    category: "ERP",
    date: "2026-04",
    link: "/cheatsheets/english-school-erpnext-guide.html"
  },
  {
    title: "ERPNext V15 & MyDATA",
    description: "Comprehensive tutorial on connecting ERPNext V15 to Greek MyDATA.",
    category: "ERP",
    date: "2026-04",
    link: "/cheatsheets/erpnext-v15-mydata-tutorial.html"
  },
  {
    title: "Ελληνικά Παραστατικά & MyDATA",
    description: "Οδηγός διαχείρισης παραστατικών και διαβίβασης MyDATA στο ERPNext.",
    category: "ERP",
    date: "2026-04",
    link: "/cheatsheets/parastika-mydata-guide.html"
  },
  {
    title: "Formik & Yup in React Native",
    description: "The ultimate combo for building and validating forms in mobile apps.",
    category: "Mobile Dev",
    date: "2026-04",
    link: "/cheatsheets/formik-yup-tutorial.html"
  },
  {
    title: "React Native Paper Guide",
    description: "Building beautiful Material Design UIs in React Native with React Native Paper.",
    category: "Mobile Dev",
    date: "2026-04",
    link: "/cheatsheets/react-native-paper-tutorial.html"
  },
  {
    title: "ERPNext MyDATA Guide",
    description: "Οδηγός διασύνδεσης και ρυθμίσεων για το MyDATA στο παλαιότερου τύπου ERPNext.",
    category: "ERP",
    date: "2026-04",
    link: "/cheatsheets/erpnext-mydata-tutorial.html"
  }
];

export function CheatsAndTuts() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(cheatsheets.map(sheet => sheet.category)))];

  const filteredSheets = activeCategory === "All" 
    ? cheatsheets 
    : cheatsheets.filter(sheet => sheet.category === activeCategory);

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
              {/* Category Filter Pills */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center gap-3 mb-8"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)] font-bold"
                        : "bg-[#111] text-gray-400 hover:bg-[#1a1a1a] hover:text-yellow-500 border border-white/5"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 w-full">
                <AnimatePresence mode="popLayout">
                  {filteredSheets.map((sheet, idx) => (
                    <motion.div
                      key={sheet.title}
                      layout
                      initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="w-full h-full"
                    >
                      <Link href={sheet.link} target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer">
                        <div className="h-full flex flex-col justify-between p-6 bg-[#0a0a0a] border border-white/5 rounded-2xl hover:border-yellow-500/50 hover:bg-white/[0.02] transition-colors relative overflow-hidden group">
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
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
