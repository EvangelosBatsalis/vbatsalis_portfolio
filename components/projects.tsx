"use client";

import { motion } from "motion/react";
import { FolderGit2, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Segmented Network & DMZ Design (Production)",
    summary:
      "Designed and maintained a segmented network with dedicated DMZ for public-facing services, isolating critical internal systems and reducing blast radius.",
    tech: [
      "VLANs",
      "Firewall Policies",
      "Routing",
      "Reverse Proxy",
      "Access Controls",
    ],
    outcomes:
      "Safer exposure of web apps, clearer boundaries between environments, easier troubleshooting.",
    highlights: [
      "Dedicated DMZ VLAN for public services",
      "Only required services exposed; admin tooling kept private",
      "Clear separation: Mgmt vs internal vs guest/IoT vs DMZ",
    ],
  },
  {
    title: "Hyper-V Infrastructure Modernization (On-Prem)",
    summary:
      "Operated and improved a Hyper-V environment with Windows Server Core hosts, focusing on stability, recoverability, and operational clarity.",
    tech: ["Hyper-V", "Windows Server Core", "PowerShell", "iDRAC"],
    outcomes:
      "More reliable VM operations, faster incident response, cleaner host management.",
    highlights: [
      "Standardization",
      "Troubleshooting runbooks",
      "Recovery workflows",
    ],
  },
  {
    title: "Dockerized Services & Reverse Proxy Publishing",
    summary:
      "Built a containerized services stack and published selected apps safely behind a reverse proxy.",
    tech: ["Docker", "Docker Compose", "Reverse Proxy", "TLS", "Routing"],
    outcomes: "Faster deployments, repeatable builds, controlled exposure.",
    highlights: [
      "Environment separation",
      "Safer defaults",
      "Minimal open ports",
    ],
  },
  {
    title: "qBittorrent Docker Hardening",
    summary:
      "Hardened inbound traffic rules so only required torrent port ranges are reachable, reducing unnecessary exposure.",
    tech: ["Docker Networking", "Firewall Rules", "Port-range Controls"],
    outcomes: "Reduced attack surface, predictable connectivity.",
    highlights: ["Explicit rules > 'open everything and pray'"],
  },
  {
    title: "Monitoring & Observability Starter Stack",
    summary:
      "Implemented monitoring patterns for infrastructure/services and created a baseline dashboarding approach.",
    tech: ["Zabbix", "Grafana", "Prometheus"],
    outcomes: "Better visibility, earlier detection, fewer surprises.",
    highlights: ["Actionable alerts", "Service health views"],
  },
  {
    title: "Devitory (Blog + CMS concept)",
    summary:
      "Designed the concept for a DevOps/IT blog with CMS so content can be authored easily and published fast.",
    tech: ["Headless CMS", "Next.js", "Content Modeling"],
    outcomes:
      "Clear content structure, scalable categories, easy author workflow.",
    highlights: ["DevOps, Azure, Infra content strategy"],
  },
  {
    title: "Famify (Family Organization SaaS concept)",
    summary:
      "Defined a multi-tenant SaaS concept for family organization with future API and mobile app roadmap.",
    tech: ["Next.js", "React", "API-first", "Auth & Tenancy"],
    outcomes: "Product direction, scope definition, monetization logic.",
    highlights: [
      "Tenant pages",
      "Booking/calendar features",
      "Subscription plans",
    ],
  },
];

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl font-display font-bold text-white mb-4">
          Selected Projects
        </h2>
        <div className="w-12 h-1 bg-yellow-500 rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
          >
            {/* Subtle gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <FolderGit2 className="w-8 h-8 text-yellow-500" />
                <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-yellow-500 transition-colors" />
              </div>

              <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-yellow-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                {project.summary}
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                    Outcomes
                  </h4>
                  <p className="text-sm text-gray-300">{project.outcomes}</p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                    Highlights
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {project.highlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-yellow-500/50 mt-1">-</span> {hl}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-white/5 text-gray-300 text-xs font-mono rounded-md border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
