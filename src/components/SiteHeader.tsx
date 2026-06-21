"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, MessageSquare, X } from "lucide-react";
import { assetPath } from "@/lib/site";

const navItems = [
  { id: "inicio", label: "Início" },
  { id: "escritorio", label: "Escritório" },
  { id: "areas", label: "Áreas de Atuação" },
  { id: "diferenciais", label: "Diferenciais" },
  { id: "contato", label: "Contato" },
];

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -45% 0px",
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetSection = entry.target.id === "advogados" ? "escritorio" : entry.target.id;
          setActiveSection(targetSection);
        }
      });
    }, observerOptions);

    ["inicio", "escritorio", "areas", "diferenciais", "contato", "advogados"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full h-20 md:h-[88px] z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060b16]/92 shadow-lg shadow-black/20 md:backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          <a href="#inicio" className="flex items-center h-full gap-2 group transition-transform duration-300">
            <div className="hidden md:block relative h-16 w-72">
              <Image
                src={assetPath("/logo-full-white.svg")}
                alt="Trajano e Ferro Advogados"
                fill
                className="object-contain object-left transition-transform duration-300 group-hover:scale-[1.01]"
                sizes="288px"
              />
            </div>
            <div className="block md:hidden relative h-12 w-14">
              <Image
                src={assetPath("/logo-mark-white.svg")}
                alt="Trajano e Ferro"
                fill
                className="object-contain object-left"
                sizes="56px"
              />
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm font-semibold tracking-wide transition-all duration-200 hover:text-white relative py-1 group ${
                  activeSection === item.id ? "text-white" : "text-silver-300"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-royal-400 transition-all duration-300 ${
                    activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <a
              href="#contato"
              className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 rounded bg-[#17186a] hover:bg-blue-800 hover:shadow-lg hover:shadow-brand-blue/20 active:scale-95 border border-white/10"
            >
              Fale com um advogado
            </a>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="text-silver-200 hover:text-white focus:outline-none p-2 rounded-lg border border-white/10 bg-navy-950/70"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#060b16]/98 overflow-hidden shadow-2xl">
          <div className="px-4 pt-2 pb-6 space-y-1.5">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded text-sm font-medium tracking-wide transition-all ${
                  activeSection === item.id
                    ? "bg-[#17186a]/30 text-white border-l-4 border-royal-400"
                    : "text-silver-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 px-4">
              <a
                href="#contato"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded text-sm font-semibold text-white bg-[#17186a] border border-white/10 shadow-lg shadow-brand-blue/25"
              >
                <MessageSquare size={16} />
                Fale com um advogado
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
