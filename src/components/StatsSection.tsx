"use client";

import React from "react";
import { motion as framerMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Users, HeartHandshake, Scale } from "lucide-react";

type StatItem =
  | { kind: "number"; value: number; suffix: string; label: string }
  | { kind: "icon"; icon: LucideIcon; label: string };

// Easily editable stats configuration
// Change values here to update the metrics on the website.
export const STATS_DATA: StatItem[] = [
  { kind: "number", value: 20, suffix: "+", label: "Anos de Experiência" },
  { kind: "icon", icon: HeartHandshake, label: "Atendimento Personalizado" },
  { kind: "icon", icon: Scale, label: "Áreas de Atuação" },
  { kind: "icon", icon: Users, label: "Advogados Especializados" }
];

export default function StatsSection() {
  return (
    <section className="relative py-20 bg-[#f8f7f2] border-b border-gray-200/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {STATS_DATA.map((stat, idx) => {
            return (
              <framerMotion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex flex-col items-center text-center p-6 rounded border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-12 flex items-center justify-center mb-3">
                  {stat.kind === "number" ? (
                    <div className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0d1a3a] tracking-tight">
                      <span>{stat.value}</span>
                      <span className="text-royal-600 font-sans">{stat.suffix}</span>
                    </div>
                  ) : (
                    <stat.icon
                      aria-hidden="true"
                      strokeWidth={1.35}
                      className="h-10 w-10 text-[#0d1a3a]"
                    />
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#374151] font-light tracking-wide uppercase">
                  {stat.label}
                </p>
              </framerMotion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
