"use client";

import { motion } from "motion/react";
import { Server, Shield, Workflow, Cloud } from "lucide-react";

const skillCategories = [
  {
    title: "Infrastructure & Virtualization",
    icon: <Server className="w-5 h-5 text-yellow-500" />,
    skills: [
      "Windows Server (Core), Active Directory, GPO, DNS/DHCP",
      "Hyper-V clusters, VM lifecycle, backup/restore, replication",
      "Storage integrations (iSCSI/NAS), performance & resiliency",
    ],
  },
  {
    title: "Networking & Security",
    icon: <Shield className="w-5 h-5 text-yellow-500" />,
    skills: [
      "VLAN architecture (Mgmt / Main / Guest / IoT / DMZ)",
      "Firewalls (policy design, NAT, segmentation), VPN access patterns",
      "Hardening, least privilege, secure exposure of public services",
    ],
  },
  {
    title: "DevOps & Automation",
    icon: <Workflow className="w-5 h-5 text-yellow-500" />,
    skills: [
      "Docker / Compose, reverse proxy (Caddy / Nginx style patterns)",
      "CI/CD with GitHub Actions, branching strategy & protections",
      "Monitoring stacks (Zabbix / Grafana / Prometheus concepts)",
    ],
  },
  {
    title: "Cloud & Identity",
    icon: <Cloud className="w-5 h-5 text-yellow-500" />,
    skills: [
      "Microsoft 365 / Entra ID hybrid concepts, directory sync patterns",
      "Cloud fundamentals and production readiness practices",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl font-display font-bold text-white mb-4">
          Core Skills
        </h2>
        <div className="w-12 h-1 bg-yellow-500 rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-yellow-500/30 transition-colors group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-yellow-500/10 rounded-xl group-hover:bg-yellow-500/20 transition-colors">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-200">
                {category.title}
              </h3>
            </div>
            <ul className="space-y-4">
              {category.skills.map((skill, sIdx) => (
                <li key={sIdx} className="flex items-start gap-3 text-gray-400">
                  <span className="text-yellow-500/50 mt-1.5 text-xs">■</span>
                  <span className="leading-relaxed">{skill}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
