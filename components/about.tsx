"use client";

import { motion } from "motion/react";
import { Terminal } from "lucide-react";

export function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-[1fr_2fr] gap-12 items-start"
      >
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-12 h-1 bg-yellow-500 rounded-full" />
        </div>

        <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
          <p>
            I&apos;m an IT System Administrator and Infrastructure/DevOps
            Engineer with hands-on experience in on-prem environments (Hyper-V,
            Windows Server Core, storage, VLAN segmentation, firewalls) and
            modern DevOps workflows (Docker, CI/CD, reverse proxies,
            monitoring).
          </p>
          <p>
            I care about security, reliability, and clean operations: least
            privilege, strong segmentation, documented runbooks, and automation
            over heroics.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-8">
            <h3 className="text-white font-mono text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-yellow-500" /> Core Values
            </h3>
            <ul className="space-y-3 font-mono text-sm">
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 mt-0.5">›</span>
                <span>
                  <strong className="text-gray-200">
                    Reliability &gt; hype
                  </strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 mt-0.5">›</span>
                <span>
                  <strong className="text-gray-200">Security by design</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 mt-0.5">›</span>
                <span>
                  <strong className="text-gray-200">Automate the boring</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 mt-0.5">›</span>
                <span>
                  <strong className="text-gray-200">
                    Document like you&apos;ll forget tomorrow
                  </strong>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
