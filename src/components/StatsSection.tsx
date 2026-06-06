"use client";

import React, { useEffect, useState } from "react";
import { motion as framerMotion } from "framer-motion";

// Easily editable stats configuration
// Change values here to update the metrics on the website.
export const STATS_DATA = [
  { value: 8, suffix: "+", label: "Anos de Experiência" },
  { value: 300, suffix: "+", label: "Clientes Atendidos" },
  { value: 3, suffix: "", label: "Áreas de Atuação" },
  { value: 2, suffix: "", label: "Advogados Especializados" }
];

interface CountUpProps {
  value: number;
  duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration, hasStarted]);

  return (
    <framerMotion.span
      onViewportEnter={() => {
        setHasStarted(true);
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {count}
    </framerMotion.span>
  );
};

export default function StatsSection() {
  return (
    <section className="relative py-20 bg-[#f8f7f2] border-b border-gray-200/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {STATS_DATA.map((stat, idx) => (
            <framerMotion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex flex-col items-center text-center p-6 rounded border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-12 flex items-center justify-center mb-3">
                <div className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0d1a3a] tracking-tight">
                  <CountUp value={stat.value} />
                  <span className="text-royal-600 font-sans">{stat.suffix}</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#374151] font-light tracking-wide uppercase">
                {stat.label}
              </p>
            </framerMotion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
