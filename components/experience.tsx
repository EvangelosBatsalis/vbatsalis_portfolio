"use client";

import { motion } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-display font-bold text-white">
              Experience
            </h2>
          </div>

          <div className="relative pl-8 border-l border-white/10 space-y-10">
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#050505] border-2 border-yellow-500" />
              <h3 className="text-xl font-bold text-gray-200">
                IT Operations / System Administration
              </h3>
              <p className="text-yellow-500/80 font-mono text-sm mb-4 mt-1">
                Current / Recent
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500/50 mt-1.5 text-xs">■</span>
                  Managed infrastructure operations across servers,
                  virtualization, and networks.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500/50 mt-1.5 text-xs">■</span>
                  Delivered reliability improvements through segmentation,
                  standardization, and documentation.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500/50 mt-1.5 text-xs">■</span>
                  Supported business-critical systems and ensured continuity of
                  day-to-day IT operations.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Education & Certs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-display font-bold text-white">
              Education & Certifications
            </h2>
          </div>

          <div className="relative pl-8 border-l border-white/10 space-y-10">
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#050505] border-2 border-yellow-500" />
              <h3 className="text-xl font-bold text-gray-200">
                Computer Science
              </h3>
              <p className="text-gray-400 mt-2">
                University studies in Computer Science (In Progress)
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#050505] border-2 border-white/20" />
              <h3 className="text-xl font-bold text-gray-200">
                Certification Roadmap
              </h3>
              <div className="mt-4 space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-yellow-500">
                      AZ-900
                    </span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      Planned
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">Azure Fundamentals</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-yellow-500">
                      AZ-104
                    </span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      Planned
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">Azure Administrator</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-yellow-500">
                      DevOps Track
                    </span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      Future
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Azure DevOps Engineer Expert
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
