"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion as framerMotion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import StatsSection from "../components/StatsSection";
import {
  Scale,
  Briefcase,
  Users,
  Clock,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  FileText,
  ExternalLink,
  Award
} from "lucide-react";
import {
  WHATSAPP_NUMBER,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  OFFICE_ADDRESS,
  OFFICE_HOURS
} from "../config/constants";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const assetPath = (path: string) => `${basePath}${path}`;

// Type definition for form state
interface FormState {
  name: string;
  phone: string;
  area: string;
  description: string;
}

// Motion Animation Variants for Menu and Header
const navContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
} as const;

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
} as const;

const mobileContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
} as const;

const mobileItemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120, damping: 15 } }
} as const;

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Mobile menu visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Current active section for scroll tracking
  const [activeSection, setActiveSection] = useState("inicio");

  // Form inputs
  const [formState, setFormState] = useState<FormState>({
    name: "",
    phone: "",
    area: "",
    description: "",
  });

  // Track scrolling to toggle header glassmorphism
  const [scrolled, setScrolled] = useState(false);

  // Scroll handler for transparent/opaque transition at 80px scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to dynamically track active section during scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -45% 0px", // Detect section when it reaches the middle viewport area
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

    const sections = ["inicio", "escritorio", "areas", "diferenciais", "contato", "advogados"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Update form area when clicking a CTA
  const handleSelectArea = (areaName: string) => {
    setFormState((prev) => ({ ...prev, area: areaName }));
    const contactSection = document.getElementById("contato");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Form input change handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Phone number mask formatting (BR style: (XX) XXXXX-XXXX)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    
    // Formatting
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    
    setFormState((prev) => ({ ...prev, phone: value }));
  };

  // WhatsApp form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verify fields
    if (!formState.name || !formState.phone || !formState.area) {
      alert("Por favor, preencha os campos obrigatórios (Nome, Telefone e Área de Interesse).");
      return;
    }

    // Compose message
    const message = `Olá, vim pelo site da Trajano e Ferro Advogados e gostaria de atendimento jurídico.

Nome: ${formState.name}
Telefone: ${formState.phone}
Área de interesse: ${formState.area}
Descrição do caso: ${formState.description || "Não informada."}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  // Navigation items
  const navItems = [
    { id: "inicio", label: "Início" },
    { id: "escritorio", label: "Escritório" },
    { id: "areas", label: "Áreas de Atuação" },
    { id: "diferenciais", label: "Diferenciais" },
    { id: "contato", label: "Contato" },
  ];

  return (
    <div className="relative min-h-screen font-sans bg-[#f8f7f2] selection:bg-brand-blue selection:text-white">
      {/* Background Decorative Radial Glows (only on dark areas like Hero, Footer, etc.) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Glow at top behind Hero */}
        <div className="absolute top-0 left-[-10%] h-[600px] w-[600px] rounded-full bg-brand-blue/10 blur-[150px]" />
      </div>

      {/* Floating Stable Header */}
      <header
        className={`fixed top-0 left-0 w-full h-20 md:h-[88px] z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#060b16]/92 shadow-lg shadow-black/20 backdrop-blur-md border-b border-white/[0.06]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full">
            {/* Logo container with controlled dimensions */}
            <a href="#inicio" className="flex items-center h-full gap-2 group transition-transform duration-300">
              {/* Desktop Logo */}
              <div className="hidden md:block relative h-16 w-72">
                <Image
                  src={assetPath("/logo-full-white.svg")}
                  alt="Trajano & Ferro Advogados"
                  fill
                  className="object-contain object-left transition-transform duration-300 group-hover:scale-[1.01]"
                  priority
                />
              </div>
              {/* Mobile Logo */}
              <div className="block md:hidden relative h-12 w-14">
                <Image
                  src={assetPath("/logo-mark-white.svg")}
                  alt="Trajano & Ferro"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </a>

            {/* Desktop Navigation Links (with entry animations) */}
            <framerMotion.nav
              variants={navContainerVariants}
              initial="hidden"
              animate="show"
              className="hidden md:flex items-center gap-8"
            >
              {navItems.map((item) => (
                <framerMotion.a
                  variants={navItemVariants}
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-sm font-semibold tracking-wide transition-all duration-200 hover:text-white relative py-1 group ${
                    activeSection === item.id ? "text-white" : "text-silver-300"
                  }`}
                >
                  {item.label}
                  {/* Underline expansion on hover & active */}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-royal-400 transition-all duration-300 ${
                    activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </framerMotion.a>
              ))}
            </framerMotion.nav>

            {/* Header Call to Action Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => handleSelectArea("Geral")}
                className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 rounded bg-[#17186a] hover:bg-blue-800 hover:shadow-lg hover:shadow-brand-blue/20 active:scale-95 border border-white/10 cursor-pointer"
              >
                Fale com um advogado
              </button>
            </div>

            {/* Hamburger Button for Mobile */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-silver-200 hover:text-white focus:outline-none p-2 rounded-lg border border-white/10 bg-navy-950/40 backdrop-blur-sm"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <framerMotion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden border-b border-white/10 bg-[#060b16]/95 backdrop-blur-lg overflow-hidden shadow-2xl"
            >
              <framerMotion.div 
                variants={mobileContainerVariants}
                initial="hidden"
                animate="show"
                className="px-4 pt-2 pb-6 space-y-1.5"
              >
                {navItems.map((item) => (
                  <framerMotion.div
                    key={item.id}
                    variants={mobileItemVariants}
                  >
                    <a
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
                  </framerMotion.div>
                ))}
                <div className="pt-3 px-4">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleSelectArea("Geral");
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded text-sm font-semibold text-white bg-[#17186a] border border-white/10 shadow-lg shadow-brand-blue/25 cursor-pointer"
                  >
                    <MessageSquare size={16} />
                    Fale com um advogado
                  </button>
                </div>
              </framerMotion.div>
            </framerMotion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section (Dark Navy Background) */}
      <section
        id="inicio"
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 bg-[#060b16] text-[#f8fafc] overflow-hidden"
      >
        {/* Parallax Background Image with Dark Overlay */}
        <framerMotion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <Image
            src={assetPath("/hero-bg.webp")}
            alt="Fundo Escritório Jurídico"
            fill
            className="object-cover opacity-20"
            priority
          />
        </framerMotion.div>

        {/* Diagonal lines texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none diagonal-lines" />

        {/* Glow behind Hero Right */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#17186a]/15 blur-[120px] pointer-events-none z-0" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <framerMotion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 text-left space-y-8"
            >
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#17186a]/40 border border-[#17186a]/30 text-[10px] font-bold uppercase tracking-widest text-royal-300"
              >
                <Scale size={13} className="text-royal-300" />
                <span>Advocacia Estratégica</span>
              </div>

              <div className="space-y-4">
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                  Advocacia estratégica para proteger seus direitos com{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-silver-200 to-royal-300 underline decoration-royal-400/50 decoration-2 underline-offset-8">
                    segurança e excelência
                  </span>
                  .
                </h1>

                <p className="text-lg sm:text-xl text-silver-300 max-w-2xl font-light leading-relaxed">
                  Atuação jurídica consultiva e contenciosa nas áreas trabalhista, cível e administrativa, com atendimento personalizado e foco em soluções eficientes.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => handleSelectArea("Geral")}
                  className="flex items-center justify-center gap-3 px-8 py-3.5 rounded text-sm font-semibold text-white bg-[#17186a] hover:bg-blue-800 hover:shadow-xl hover:shadow-brand-blue/20 transition-all duration-300 border border-white/10 group cursor-pointer"
                >
                  <MessageSquare size={16} className="text-royal-300" />
                  <span>Falar pelo WhatsApp</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#areas"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded text-sm font-semibold text-silver-200 hover:text-white bg-white/5 hover:bg-[#17186a]/60 border border-white/10 hover:border-royal-400 transition-all duration-300 hover:shadow-lg hover:shadow-brand-blue/20 cursor-pointer"
                >
                  <span>Conhecer áreas de atuação</span>
                </a>
              </div>
            </framerMotion.div>

            {/* Hero Right Graphic - Replaced with Folder Mockup */}
            <framerMotion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <div className="hero-image-frame relative w-full max-w-[420px] aspect-[4/5] md:aspect-auto md:h-[450px] overflow-hidden">
                <Image
                  src={assetPath("/hero-mockup.webp")}
                  alt="Conceito Trajano & Ferro Advogados"
                  fill
                  className="z-0 object-cover transition-transform duration-750 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#060b16]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </framerMotion.div>
          </div>
        </div>
      </section>

      {/* Stats Section / Social Proof */}
      {/* Decorative Transition Line: Hero -> Stats */}
      <div className="w-full flex items-center justify-center gap-4 py-2 bg-[#f8f7f2] relative z-20">
        <div className="flex-1 h-[1px] bg-gray-200" />
        <div className="w-2.5 h-2.5 bg-royal-400 rotate-45 shrink-0" />
        <div className="flex-1 h-[1px] bg-gray-200" />
      </div>

      <StatsSection />

      {/* Decorative Transition Line: Stats -> Sobre */}
      <div className="w-full flex items-center justify-center gap-4 py-2 bg-[#08111f] relative z-20">
        <div className="flex-1 h-[1px] bg-white/10" />
        <div className="w-2.5 h-2.5 bg-royal-400 rotate-45 shrink-0" />
        <div className="flex-1 h-[1px] bg-white/10" />
      </div>

      {/* About Section (Dark Navy Background, 2-Column layout) */}
      <section
        id="escritorio"
        className="relative py-16 md:py-20 lg:py-24 bg-[#08111f] text-silver-300 overflow-hidden border-b border-white/5"
      >
        {/* Diagonal lines texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none diagonal-lines" />

        {/* Monogram Watermark Background */}
        <div className="absolute right-10 bottom-[-50px] opacity-[0.015] pointer-events-none select-none hidden lg:block">
          <Image src={assetPath("/logo-mark.svg")} alt="Monograma TF" width={320} height={320} />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Titles & Narrative */}
            <framerMotion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-6 text-left p-8 sm:p-10 bg-[#060b16]/40 backdrop-blur-sm rounded double-border-frame-dark shadow-xl"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-[0.25em] text-royal-300 uppercase block">O Escritório</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  {"Sobre a Trajano e Ferro Advogados"}
                </h2>
              </div>

              <p className="text-base sm:text-lg text-silver-200 font-light leading-relaxed">
                A Trajano e Ferro Advogados atua com compromisso técnico, ética e proximidade no atendimento. O escritório oferece soluções jurídicas voltadas à prevenção, defesa e orientação de seus clientes, sempre com análise cuidadosa de cada caso e comunicação clara durante todo o processo.
              </p>

              <p className="text-sm text-silver-400 font-light leading-relaxed">
                Nossa filosofia de atuação está fundamentada na transparência e no respeito às normas éticas, prestando uma assessoria focada nas reais possibilidades legais de cada demanda. Buscamos sempre mitigar riscos e estruturar defesas técnicas consistentes nas esferas administrativa e judicial.
              </p>

              <div className="pt-2">
                <a
                  href="#contato"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-royal-300 hover:text-royal-400 transition-colors group"
                >
                  <span>Agende uma consulta informativa</span>
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </framerMotion.div>

            {/* Right Column: Professional Office Image */}
            <framerMotion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 relative h-[450px] w-full rounded overflow-hidden double-border-frame-dark shadow-2xl bg-[#060b16]/40"
            >
              <Image
                src={assetPath("/about-office.webp")}
                alt="Escritório Trajano & Ferro Advogados"
                fill
                className="object-cover transition-transform duration-750 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060b16]/60 via-transparent to-transparent pointer-events-none" />
            </framerMotion.div>

          </div>
        </div>
      </section>

      {/* Decorative Transition Line: Sobre -> Advogados */}
      <div className="w-full flex items-center justify-center gap-4 py-2 bg-[#f8f7f2] relative z-20">
        <div className="flex-1 h-[1px] bg-gray-200" />
        <div className="w-2.5 h-2.5 bg-royal-400 rotate-45 shrink-0" />
        <div className="flex-1 h-[1px] bg-gray-200" />
      </div>

      {/* Lawyers Section (Off-White Background) */}
      <section
        id="advogados"
        className="relative py-16 md:py-20 lg:py-24 bg-[#f8f7f2] text-[#374151] overflow-hidden border-b border-gray-200/20"
      >
        {/* Subtle diagonal lines texture overlay */}
        <div className="absolute inset-0 opacity-[0.01] pointer-events-none diagonal-lines" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <framerMotion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto space-y-4 mb-16"
          >
            <span className="text-xs font-bold tracking-[0.25em] text-royal-600 uppercase block">Corpo Jurídico</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0d1a3a] tracking-tight">
              Profissionais à frente da Trajano & Ferro Advogados
            </h2>
            <p className="text-[#374151] font-light text-sm sm:text-base">
              Experiência técnica, atuação ética e compromisso com a defesa estratégica de seus direitos.
            </p>
            <div className="classic-divider">
              <span className="classic-divider-diamond" />
            </div>
          </framerMotion.div>

          {/* Grid containing the 2 lawyers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto px-4">
            
            {/* Card 1: Cláudia */}
            <framerMotion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group flex flex-col sm:flex-row bg-white rounded border border-gray-200 shadow-md hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 overflow-hidden max-w-2xl lg:max-w-none mx-auto w-full"
            >
              {/* Image Container with cross-fade hover */}
              <div className="relative w-full sm:w-[38%] aspect-[3/4] sm:aspect-auto sm:self-stretch overflow-hidden bg-gray-50 shrink-0">
                {/* Image 1 (Main) */}
                <Image
                  src={assetPath("/claudia-1.webp")}
                  alt="Dra. Cláudia Trajano"
                  fill
                  className="object-cover object-center transition-all duration-700 group-hover:scale-102 group-hover:opacity-0"
                  sizes="(max-w-640px) 100vw, 25vw"
                  quality={100}
                  priority
                />
                {/* Image 2 (Hover) */}
                <Image
                  src={assetPath("/claudia-2.webp")}
                  alt="Dra. Cláudia Trajano - Atuação"
                  fill
                  className="object-cover object-center absolute inset-0 opacity-0 transition-all duration-700 group-hover:scale-102 group-hover:opacity-100"
                  sizes="(max-w-640px) 100vw, 25vw"
                  quality={100}
                />
                {/* Subtle right accent border on image when in row layout */}
                <div className="absolute top-0 right-0 h-full w-[3px] bg-royal-400 hidden sm:block opacity-80" />
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-royal-400 sm:hidden opacity-80" />
              </div>

              {/* Text info */}
              <div className="p-6 lg:p-8 flex flex-col justify-between flex-grow text-left space-y-6">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl lg:text-2xl font-bold text-[#0d1a3a] leading-tight">
                      Dra. Cláudia Trajano
                    </h3>
                    <p className="text-xs font-semibold text-royal-600 uppercase tracking-wider">
                      Sócia-Fundadora | OAB/SP 345.678
                    </p>
                  </div>
                  <p className="text-xs lg:text-sm text-[#374151] font-light leading-relaxed">
                    Especialista em Direito Trabalhista com mais de 10 anos de atuação estratégica na defesa de trabalhadores e assessoria preventiva. Comprometida com a transparência processual e a obtenção de soluções justas.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div>
                    <h4 className="text-[10px] lg:text-xs font-bold text-[#0d1a3a] uppercase tracking-wider mb-2">Áreas de Foco</h4>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[9px] lg:text-[10px] bg-royal-50 text-royal-700 px-2 py-0.5 rounded font-medium border border-royal-100">Direito do Trabalho</span>
                      <span className="text-[9px] lg:text-[10px] bg-royal-50 text-royal-700 px-2 py-0.5 rounded font-medium border border-royal-100">Rescisões</span>
                      <span className="text-[9px] lg:text-[10px] bg-royal-50 text-royal-700 px-2 py-0.5 rounded font-medium border border-royal-100">Verbas Trabalhistas</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectArea("Direito Trabalhista")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded text-xs font-semibold text-white bg-[#17186a] hover:bg-blue-800 transition-all cursor-pointer active:scale-98"
                  >
                    <MessageSquare size={13} />
                    <span>Falar com a Dra. Cláudia</span>
                  </button>
                </div>
              </div>
            </framerMotion.div>

            {/* Card 2: Paulo */}
            <framerMotion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group flex flex-col sm:flex-row bg-white rounded border border-gray-200 shadow-md hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 overflow-hidden max-w-2xl lg:max-w-none mx-auto w-full"
            >
              {/* Image Container */}
              <div className="relative w-full sm:w-[38%] aspect-[3/4] sm:aspect-auto sm:self-stretch overflow-hidden bg-gray-50 shrink-0">
                <Image
                  src={assetPath("/paulo.webp")}
                  alt="Dr. Paulo Ferro"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
                  sizes="(max-w-640px) 100vw, 25vw"
                  quality={100}
                />
                {/* Subtle right accent border on image when in row layout */}
                <div className="absolute top-0 right-0 h-full w-[3px] bg-royal-400 hidden sm:block opacity-80" />
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-royal-400 sm:hidden opacity-80" />
              </div>

              {/* Text info */}
              <div className="p-6 lg:p-8 flex flex-col justify-between flex-grow text-left space-y-6">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl lg:text-2xl font-bold text-[#0d1a3a] leading-tight">
                      Dr. Paulo Ferro
                    </h3>
                    <p className="text-xs font-semibold text-royal-600 uppercase tracking-wider">
                      Sócio-Fundador | OAB/SP 412.345
                    </p>
                  </div>
                  <p className="text-xs lg:text-sm text-[#374151] font-light leading-relaxed">
                    Especialista em Direito Cível e Administrativo, com sólida experiência em disputas contratuais, planos de saúde, responsabilidade civil e pareceres de conformidade para profissionais da saúde.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div>
                    <h4 className="text-[10px] lg:text-xs font-bold text-[#0d1a3a] uppercase tracking-wider mb-2">Áreas de Foco</h4>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[9px] lg:text-[10px] bg-royal-50 text-royal-700 px-2 py-0.5 rounded font-medium border border-royal-100">Direito Cível</span>
                      <span className="text-[9px] lg:text-[10px] bg-royal-50 text-royal-700 px-2 py-0.5 rounded font-medium border border-royal-100">Planos de Saúde</span>
                      <span className="text-[9px] lg:text-[10px] bg-royal-50 text-royal-700 px-2 py-0.5 rounded font-medium border border-royal-100">Direito Administrativo</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectArea("Direito Cível")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded text-xs font-semibold text-white bg-[#17186a] hover:bg-blue-800 transition-all cursor-pointer active:scale-98"
                  >
                    <MessageSquare size={13} />
                    <span>Falar com o Dr. Paulo</span>
                  </button>
                </div>
              </div>
            </framerMotion.div>

          </div>
        </div>
      </section>

      {/* Decorative Transition Line: Advogados -> Areas */}
      <div className="w-full flex items-center justify-center gap-4 py-2 bg-[#f8f7f2] relative z-20">
        <div className="flex-1 h-[1px] bg-gray-200/50" />
        <div className="w-1.5 h-1.5 bg-royal-400/50 rotate-45 shrink-0" />
        <div className="flex-1 h-[1px] bg-gray-200/50" />
      </div>

      {/* Practice Areas Section (Off-White Background) */}
      <section
        id="areas"
        className="relative py-16 md:py-20 lg:py-24 bg-[#f8f7f2] text-[#374151] overflow-hidden border-b border-gray-200/30"
      >
        {/* Diagonal lines texture overlay */}
        <div className="absolute inset-0 opacity-[0.01] pointer-events-none diagonal-lines" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <framerMotion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto space-y-4 mb-12"
          >
            <span className="text-xs font-bold tracking-[0.25em] text-royal-600 uppercase block">{"Áreas de Atendimento"}</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0d1a3a] tracking-tight">
              Soluções Jurídicas Sob Medida
            </h2>
            <p className="text-[#374151] font-light text-sm sm:text-base">
              Atendimento especializado com rigor técnico e foco na resolução eficiente de demandas.
            </p>
            
            {/* Elegant Classical Divider */}
            <div className="classic-divider">
              <span className="classic-divider-diamond" />
            </div>
          </framerMotion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* 1. DIREITO TRABALHISTA - STRATEGIC SECTOR ACCENTED */}
            <framerMotion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="md:col-span-12 lg:col-span-6 flex"
            >
              <div className="relative w-full overflow-hidden flex flex-col justify-between p-8 group rounded border border-royal-400/30 bg-white shadow-md hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300">
                {/* Accent line top */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-royal-500 to-royal-300" />
                
                <div className="absolute top-4 right-4 w-12 h-12 bg-royal-50/50 border border-royal-100 rounded flex items-center justify-center">
                  <Briefcase className="text-royal-600 h-5 w-5" />
                </div>
                
                <div className="space-y-5 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-royal-500/10 text-[9px] font-extrabold uppercase tracking-widest text-royal-600">
                    Atuação Principal (Empregados)
                  </div>
                  
                  <h3 className="font-serif text-2xl font-bold text-[#0d1a3a] tracking-wide">
                    Direito Trabalhista
                  </h3>
                  
                  <p className="text-sm text-[#374151] leading-relaxed font-light">
                    Atuação na defesa dos direitos de empregados e empresas, com foco especial em demandas trabalhistas de empregados, análise de verbas rescisórias, vínculos de trabalho, horas extras, assédio, demissões e demais questões relacionadas às relações de trabalho.
                  </p>
                  
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4b5563] font-light">
                    <div className="flex items-center gap-2">
                      <ChevronRight size={13} className="text-royal-600 shrink-0" />
                      <span>Análise de Verbas Rescisórias</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChevronRight size={13} className="text-royal-600 shrink-0" />
                      <span>Reconhecimento de Vínculo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChevronRight size={13} className="text-royal-600 shrink-0" />
                      <span>Cálculo de Horas Extras</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChevronRight size={13} className="text-royal-600 shrink-0" />
                      <span>Demissões e Assédio</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-[11px] text-[#4b5563] font-light italic">Foco em consolidar seus direitos laborais</span>
                  <button
                    onClick={() => handleSelectArea("Direito Trabalhista")}
                    className="flex items-center gap-1 text-xs font-bold text-royal-600 hover:text-royal-700 transition-colors cursor-pointer"
                  >
                    <span>Consultar esta área</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </framerMotion.div>

            {/* 2. DIREITO CÍVEL */}
            <framerMotion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-6 lg:col-span-6 flex"
            >
              <div className="w-full overflow-hidden flex flex-col justify-between p-8 group rounded border border-gray-200 bg-white shadow-md hover:-translate-y-1.5 hover:border-royal-400/35 hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300">
                <div className="space-y-5 text-left">
                  <div className="w-11 h-11 rounded bg-royal-50/50 border border-royal-100 flex items-center justify-center shadow-sm">
                    <Users className="text-royal-600 h-5 w-5" />
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold text-[#0d1a3a] tracking-wide">
                    Direito Cível
                  </h3>
                  
                  <p className="text-sm text-[#374151] leading-relaxed font-light">
                    Atuação em demandas envolvendo planos de saúde, contratos bancários, indenizações, responsabilidade civil e demais conflitos da vida civil, buscando soluções técnicas e adequadas para cada situação.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-[#4b5563] font-light">Planos de saúde e indenizações</span>
                  <button
                    onClick={() => handleSelectArea("Direito Cível")}
                    className="flex items-center gap-1 text-xs font-bold text-royal-600 hover:text-royal-700 transition-colors cursor-pointer"
                  >
                    <span>Consultar</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </framerMotion.div>

            {/* 3. DIREITO ADMINISTRATIVO */}
            <framerMotion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:col-span-6 lg:col-span-6 flex"
            >
              <div className="w-full overflow-hidden flex flex-col justify-between p-8 group rounded border border-gray-200 bg-white shadow-md hover:-translate-y-1.5 hover:border-royal-400/35 hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300">
                <div className="space-y-5 text-left">
                  <div className="w-11 h-11 rounded bg-royal-50/50 border border-royal-100 flex items-center justify-center shadow-sm">
                    <Award className="text-royal-600 h-5 w-5" />
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold text-[#0d1a3a] tracking-wide">
                    Direito Administrativo
                  </h3>
                  
                  <p className="text-sm text-[#374151] leading-relaxed font-light">
                    Elaboração de pareceres e defesa administrativa para profissionais da saúde, com análise técnica, orientação jurídica e acompanhamento estratégico em órgãos ou conselhos.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-[#4b5563] font-light">Pareceres e acompanhamento estratégico</span>
                  <button
                    onClick={() => handleSelectArea("Direito Administrativo")}
                    className="flex items-center gap-1 text-xs font-bold text-royal-600 hover:text-royal-700 transition-colors cursor-pointer"
                  >
                    <span>Consultar</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </framerMotion.div>

            {/* 4. CONSULTIVO JURÍDICO */}
            <framerMotion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:col-span-6 lg:col-span-6 flex"
            >
              <div className="w-full overflow-hidden flex flex-col justify-between p-8 group rounded border border-gray-200 bg-white shadow-md hover:-translate-y-1.5 hover:border-royal-400/35 hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300">
                <div className="space-y-5 text-left">
                  <div className="w-11 h-11 rounded bg-royal-50/50 border border-royal-100 flex items-center justify-center shadow-sm">
                    <FileText className="text-royal-600 h-5 w-5" />
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold text-[#0d1a3a] tracking-wide">
                    Consultivo Jurídico
                  </h3>
                  
                  <p className="text-sm text-[#374151] leading-relaxed font-light">
                    Orientação preventiva para pessoas físicas, profissionais e empresas, auxiliando na tomada de decisões com maior segurança jurídica e mitigação de riscos.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-[#4b5563] font-light">Redução técnica de riscos e contratos</span>
                  <button
                    onClick={() => handleSelectArea("Consultivo Jurídico")}
                    className="flex items-center gap-1 text-xs font-bold text-royal-600 hover:text-royal-700 transition-colors cursor-pointer"
                  >
                    <span>Consultar</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </framerMotion.div>

          </div>
        </div>
      </section>

      {/* Strategic Labor Highlight Banner (Dark Navy Impact Block) */}
      <section className="relative py-20 bg-[#060b16] text-white border-y border-white/5 overflow-hidden">
        {/* Glowing navy accents */}
        <div className="absolute right-[-10%] top-0 bottom-0 w-1/3 bg-[#17186a]/20 blur-[130px] pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative text-center space-y-8 z-10">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
              Você precisa de orientação sobre seus direitos trabalhistas?
            </h2>
            <p className="text-sm sm:text-base text-silver-300 leading-relaxed font-light">
              Se você tem dúvidas sobre verbas rescisórias, horas extras, vínculo empregatício, demissão, assédio, condições de trabalho ou outros direitos, a Trajano e Ferro Advogados pode analisar o seu caso com atenção e indicar os caminhos jurídicos adequados.
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => handleSelectArea("Direito Trabalhista")}
              className="flex items-center gap-3 px-8 py-3.5 rounded text-sm font-semibold text-white bg-[#17186a] hover:bg-blue-800 transition-all duration-300 shadow-xl shadow-brand-blue/20 cursor-pointer border border-white/10 hover:border-white/20 active:scale-95"
            >
              <MessageSquare size={16} />
              <span>Conversar com o escritório</span>
            </button>
          </div>

          <p className="text-[11px] text-silver-400 max-w-xl mx-auto italic font-light leading-relaxed">
            Aviso de Ética Jurídica: Nossa assessoria baseia-se em análise rigorosa das leis vigentes. Não fazemos promessas ou garantias de resultados financeiros ou processuais.
          </p>
        </div>
      </section>

      {/* Decorative Transition Line: Areas -> Diferenciais */}
      <div className="w-full flex items-center justify-center gap-4 py-2 bg-[#0b172a] relative z-20">
        <div className="flex-1 h-[1px] bg-white/10" />
        <div className="w-2.5 h-2.5 bg-royal-400 rotate-45 shrink-0" />
        <div className="flex-1 h-[1px] bg-white/10" />
      </div>

      {/* Differentials Section (Dark Navy Background) */}
      <section
        id="diferenciais"
        className="relative py-16 md:py-20 lg:py-24 bg-[#0b172a] text-silver-300 overflow-hidden border-b border-white/5"
      >
        {/* Diagonal lines texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none diagonal-lines" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Differential text description */}
            <framerMotion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4 space-y-6 text-left"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-[0.25em] text-royal-300 uppercase block">Diferenciais</span>
                <h2 className="font-serif text-3xl font-bold text-white tracking-tight leading-tight">
                  {"Por que escolher a Trajano & Ferro?"}
                </h2>
              </div>
              <p className="text-sm text-silver-300 font-light leading-relaxed">
                Estruturamos nosso escritório sob os pilares da seriedade e do foco no cliente, organizando nossos fluxos de atendimento para oferecer uma experiência ética e esclarecedora.
              </p>
              
              <div className="classic-divider-dark !mx-0">
                <span className="classic-divider-dark-diamond" />
              </div>
            </framerMotion.div>

            {/* Right Differential list - Cardless Editorial Layout */}
            <framerMotion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10"
            >
              
              {/* Item 1 */}
              <div className="flex items-start gap-4 text-left border-b border-white/5 pb-6">
                <div className="text-sm font-serif font-bold text-royal-400 mt-0.5 select-none">I.</div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white tracking-wide">Atendimento claro e individualizado</h3>
                  <p className="text-xs text-silver-400 font-light leading-relaxed">
                    Comunicação constante, assegurando que o cliente compreenda cada decisão processual.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-4 text-left border-b border-white/5 pb-6">
                <div className="text-sm font-serif font-bold text-royal-400 mt-0.5 select-none">II.</div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white tracking-wide">Análise estratégica de cada caso</h3>
                  <p className="text-xs text-silver-400 font-light leading-relaxed">
                    Verificação profunda da legislação e julgados recentes para aumentar a consistência jurídica.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-4 text-left border-b border-white/5 pb-6">
                <div className="text-sm font-serif font-bold text-royal-400 mt-0.5 select-none">III.</div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white tracking-wide">Atuação consultiva e contenciosa</h3>
                  <p className="text-xs text-silver-400 font-light leading-relaxed">
                    Auxílio preventivo para evitar litígios desnecessários, além de defesa forte no judiciário.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-start gap-4 text-left border-b border-white/5 pb-6">
                <div className="text-sm font-serif font-bold text-royal-400 mt-0.5 select-none">IV.</div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white tracking-wide">Comunicação objetiva com o cliente</h3>
                  <p className="text-xs text-silver-400 font-light leading-relaxed">
                    Acompanhamento direto e relatórios simples. Sem jargões técnicos excessivos.
                  </p>
                </div>
              </div>

              {/* Item 5 - Span full width on desktop */}
              <div className="flex items-start gap-4 text-left sm:col-span-2 border-b border-white/5 pb-6">
                <div className="text-sm font-serif font-bold text-royal-400 mt-0.5 select-none">V.</div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white tracking-wide">Experiência especializada</h3>
                  <p className="text-xs text-silver-400 font-light leading-relaxed">
                    Foco qualificado nas esferas Trabalhista (para empresas e empregados), Cível (planos de saúde, indenizações) e Administrativa (defesa técnica de profissionais da saúde).
                  </p>
                </div>
              </div>

            </framerMotion.div>

          </div>
        </div>
      </section>

      {/* Decorative Transition Line: Diferenciais -> Depoimentos */}
      <div className="w-full flex items-center justify-center gap-4 py-2 bg-[#f8f7f2] relative z-20">
        <div className="flex-1 h-[1px] bg-gray-200" />
        <div className="w-2.5 h-2.5 bg-royal-400 rotate-45 shrink-0" />
        <div className="flex-1 h-[1px] bg-gray-200" />
      </div>

      {/* Testimonials Section (Off-White Background) */}
      <section
        id="depoimentos"
        className="relative py-16 md:py-20 lg:py-24 bg-[#f8f7f2] text-[#374151] overflow-hidden border-b border-gray-200/30"
      >
        <div className="absolute inset-0 opacity-[0.012] pointer-events-none diagonal-lines" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <framerMotion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto space-y-4 mb-16"
          >
            <span className="text-xs font-bold tracking-[0.25em] text-royal-600 uppercase block">Depoimentos</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0d1a3a] tracking-tight">
              A Opinião dos Nossos Clientes
            </h2>
            <p className="text-[#374151] font-light text-sm sm:text-base">
              A satisfação técnica e o acolhimento humano refletidos na avaliação de quem confia em nosso trabalho.
            </p>
            <div className="classic-divider">
              <span className="classic-divider-diamond" />
            </div>
          </framerMotion.div>

          {/* Desktop/Tablet Testimonials Grid */}
          <div className="hidden md:grid grid-cols-3 gap-8">
            {/* Card 1 */}
            <framerMotion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-8 rounded border border-gray-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col justify-between text-left relative"
            >
              <div className="space-y-4">
                <div className="flex text-amber-500 gap-1">
                  {"★★★★★"}
                </div>
                <p className="text-xs sm:text-sm text-[#374151] leading-relaxed italic">
                  {"Fui extremamente bem atendido em meu caso de rescisão indireta. O escritório agiu com total clareza, transparência e profissionalismo, demonstrando domínio técnico absoluto durante todo o processo."}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-8 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-royal-500/10 border border-royal-400/20 flex items-center justify-center text-royal-600 font-serif font-bold">
                  {"T"}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#0d1a3a]">{"Cliente – Direito Trabalhista"}</h4>
                  <p className="text-[10px] text-gray-500 font-light mt-0.5">{"Avaliação Verificada"}</p>
                </div>
              </div>
            </framerMotion.div>

            {/* Card 2 */}
            <framerMotion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-8 rounded border border-gray-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col justify-between text-left relative"
            >
              <div className="space-y-4">
                <div className="flex text-amber-500 gap-1">
                  {"★★★★★"}
                </div>
                <p className="text-xs sm:text-sm text-[#374151] leading-relaxed italic">
                  {"Excelente assessoria na revisão contratual e na condução de uma disputa cível complexa. A comunicação clara e a análise rigorosa dos riscos nos deram total segurança e tranquilidade."}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-8 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-royal-500/10 border border-royal-400/20 flex items-center justify-center text-royal-600 font-serif font-bold">
                  {"C"}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#0d1a3a]">{"Cliente – Direito Cível"}</h4>
                  <p className="text-[10px] text-gray-500 font-light mt-0.5">{"Avaliação Verificada"}</p>
                </div>
              </div>
            </framerMotion.div>

            {/* Card 3 */}
            <framerMotion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="p-8 rounded border border-gray-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col justify-between text-left relative"
            >
              <div className="space-y-4">
                <div className="flex text-amber-500 gap-1">
                  {"★★★★★"}
                </div>
                <p className="text-xs sm:text-sm text-[#374151] leading-relaxed italic">
                  {"Equipe jurídica muito competente e diligente no suporte de processos administrativos e pareceres de conformidade pública. Recomendo fortemente a quem busca assessoria técnica e ética."}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-8 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-royal-500/10 border border-royal-400/20 flex items-center justify-center text-royal-600 font-serif font-bold">
                  {"A"}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#0d1a3a]">{"Cliente – Direito Administrativo"}</h4>
                  <p className="text-[10px] text-gray-500 font-light mt-0.5">{"Avaliação Verificada"}</p>
                </div>
              </div>
            </framerMotion.div>
          </div>

          {/* Mobile Testimonials Snap Carousel */}
          <div className="md:hidden flex flex-col items-center">
            <div className="w-full snap-x snap-mandatory flex overflow-x-auto gap-6 pb-6 scrollbar-hide">
              {/* Card 1 */}
              <div className="snap-center shrink-0 w-full p-8 rounded border border-gray-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col justify-between text-left relative">
                <div className="space-y-4">
                  <div className="flex text-amber-500 gap-1">{"★★★★★"}</div>
                  <p className="text-xs text-[#374151] leading-relaxed italic">
                    {"Fui extremamente bem atendido em meu caso de rescisão indireta. O escritório agiu com total clareza, transparência e profissionalismo, demonstrando domínio técnico absoluto durante todo o processo."}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-8 pt-4 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-royal-500/10 border border-royal-400/20 flex items-center justify-center text-royal-600 font-serif font-bold text-sm">{"T"}</div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#0d1a3a]">{"Cliente – Direito Trabalhista"}</h4>
                    <p className="text-[9px] text-gray-500 font-light mt-0.5">{"Avaliação Verificada"}</p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="snap-center shrink-0 w-full p-8 rounded border border-gray-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col justify-between text-left relative">
                <div className="space-y-4">
                  <div className="flex text-amber-500 gap-1">{"★★★★★"}</div>
                  <p className="text-xs text-[#374151] leading-relaxed italic">
                    {"Excelente assessoria na revisão contratual e na condução de uma disputa cível complexa. A comunicação clara e a análise rigorosa dos riscos nos deram total segurança e tranquilidade."}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-8 pt-4 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-royal-500/10 border border-royal-400/20 flex items-center justify-center text-royal-600 font-serif font-bold text-sm">{"C"}</div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#0d1a3a]">{"Cliente – Direito Cível"}</h4>
                    <p className="text-[9px] text-gray-500 font-light mt-0.5">{"Avaliação Verificada"}</p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="snap-center shrink-0 w-full p-8 rounded border border-gray-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col justify-between text-left relative">
                <div className="space-y-4">
                  <div className="flex text-amber-500 gap-1">{"★★★★★"}</div>
                  <p className="text-xs text-[#374151] leading-relaxed italic">
                    {"Equipe jurídica muito competente e diligente no suporte de processos administrativos e pareceres de conformidade pública. Recomendo fortemente a quem busca assessoria técnica e ética."}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-8 pt-4 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-royal-500/10 border border-royal-400/20 flex items-center justify-center text-royal-600 font-serif font-bold text-sm">{"A"}</div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#0d1a3a]">{"Cliente – Direito Administrativo"}</h4>
                    <p className="text-[9px] text-gray-500 font-light mt-0.5">{"Avaliação Verificada"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Swipe Indicators */}
            <div className="flex gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-royal-400" />
              <span className="w-2 h-2 rounded-full bg-royal-200" />
              <span className="w-2 h-2 rounded-full bg-royal-200" />
            </div>
            <p className="text-[10px] text-gray-500 font-light mt-3 italic">{"Arraste para os lados para ver mais depoimentos"}</p>
          </div>

        </div>
      </section>

      {/* Decorative Transition Line: Depoimentos -> Contato */}
      <div className="w-full flex items-center justify-center gap-4 py-2 bg-[#060b16] relative z-20">
        <div className="flex-1 h-[1px] bg-white/10" />
        <div className="w-2.5 h-2.5 bg-royal-400 rotate-45 shrink-0" />
        <div className="flex-1 h-[1px] bg-white/10" />
      </div>

      {/* Contact Section & Form (Dark Navy Background) */}
      <section
        id="contato"
        className="relative py-16 md:py-20 lg:py-24 bg-[#060b16] text-[#f8fafc] overflow-hidden"
      >
        {/* Diagonal lines texture overlay */}
        <div className="absolute inset-0 opacity-[0.01] pointer-events-none diagonal-lines" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Form Details Column in Navy Box (5 cols) */}
            <framerMotion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 rounded bg-[#08111f] text-white p-8 flex flex-col justify-between border border-white/5 shadow-xl text-left double-border-frame-dark"
            >
              <div className="space-y-6">
                <span className="text-xs font-bold tracking-[0.25em] text-royal-300 uppercase block">Atendimento</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  Inicie seu atendimento
                </h2>
                <p className="text-xs sm:text-sm text-silver-300 font-light leading-relaxed">
                  Preencha o formulário ao lado para nos contar sobre o seu caso. Você será redirecionado para o WhatsApp para conversar diretamente com um de nossos advogados.
                </p>
              </div>

              {/* Display Contact Info only if variables exist in config */}
              <div className="space-y-5 pt-8 text-xs text-silver-300 border-t border-white/10 mt-8">
                
                {OFFICE_HOURS && (
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-royal-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">{"Horário de Atendimento"}</p>
                      <p className="mt-0.5 text-silver-400 font-light leading-normal">{OFFICE_HOURS}</p>
                    </div>
                  </div>
                )}

                {CONTACT_PHONE && (
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-royal-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">{"Telefone"}</p>
                      <p className="mt-0.5 text-silver-400 font-light leading-normal">{CONTACT_PHONE}</p>
                    </div>
                  </div>
                )}

                {CONTACT_EMAIL && (
                  <div className="flex items-start gap-3">
                    <Mail size={16} className="text-royal-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">E-mail</p>
                      <p className="mt-0.5 text-silver-400 font-light leading-normal">{CONTACT_EMAIL}</p>
                    </div>
                  </div>
                )}

                {OFFICE_ADDRESS && (
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-royal-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Endereço</p>
                      <p className="mt-0.5 text-silver-400 font-light leading-normal">{OFFICE_ADDRESS}</p>
                    </div>
                  </div>
                )}
                
                {/* Note about digital operations */}
                <div className="p-4 rounded border border-white/5 bg-navy-950/50 text-[10px] leading-relaxed italic text-silver-400 font-light mt-4">
                  * Atendimento digital estruturado em todo o território nacional. Atendimento físico sob consulta e agendamento prévio.
                </div>
              </div>
            </framerMotion.div>

            {/* Right Column: Form Card (Dark Glassmorphic version) */}
            <framerMotion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 bg-[#08111f]/60 backdrop-blur-sm p-8 sm:p-10 rounded border border-white/5 shadow-xl double-border-frame-dark text-left"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name field */}
                  <div className="flex flex-col space-y-1.5 text-left">
                    <label htmlFor="name" className="text-xs font-bold text-silver-300">
                      Nome Completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome completo"
                      className="w-full text-sm px-4 py-2.5 rounded bg-navy-950/40 border border-white/10 focus:outline-none focus:border-royal-400 focus:ring-1 focus:ring-royal-400/20 transition-all text-white placeholder-silver-500 font-light"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col space-y-1.5 text-left">
                    <label htmlFor="phone" className="text-xs font-bold text-silver-300">
                      WhatsApp / Telefone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formState.phone}
                      onChange={handlePhoneChange}
                      placeholder="(DD) 99999-9999"
                      className="w-full text-sm px-4 py-2.5 rounded bg-navy-950/40 border border-white/10 focus:outline-none focus:border-royal-400 focus:ring-1 focus:ring-royal-400/20 transition-all text-white placeholder-silver-500 font-light"
                    />
                  </div>

                  {/* Area field */}
                  <div className="flex flex-col space-y-1.5 text-left sm:col-span-2">
                    <label htmlFor="area" className="text-xs font-bold text-silver-300">
                      {"Área de Interesse"} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="area"
                      name="area"
                      required
                      value={formState.area}
                      onChange={handleInputChange}
                      className="w-full text-sm px-4 py-2.5 rounded bg-navy-950/40 border border-white/10 focus:outline-none focus:border-royal-400 focus:ring-1 focus:ring-royal-400/20 transition-all text-white font-light appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3e%3c/svg%3e")`,
                        backgroundPosition: `right 16px center`,
                        backgroundSize: `16px 16px`,
                        backgroundRepeat: `no-repeat`
                      }}
                    >
                      <option value="" disabled className="text-silver-500 bg-[#08111f]">{"Selecione uma área"}</option>
                      <option value="Direito Trabalhista" className="text-white bg-[#08111f]">{"Direito Trabalhista (Destaque)"}</option>
                      <option value="Direito Cível" className="text-white bg-[#08111f]">{"Direito Cível (Contratos, Saúde, Indenizações)"}</option>
                      <option value="Direito Administrativo" className="text-white bg-[#08111f]">{"Direito Administrativo (Profissionais da Saúde)"}</option>
                      <option value="Consultivo Jurídico" className="text-white bg-[#08111f]">{"Consultivo Jurídico (Orientação Preventiva)"}</option>
                      <option value="Outro" className="text-white bg-[#08111f]">{"Outro assunto"}</option>
                    </select>
                  </div>

                  {/* Case description field */}
                  <div className="flex flex-col space-y-1.5 text-left sm:col-span-2">
                    <label htmlFor="description" className="text-xs font-bold text-silver-300">
                      {"Resumo do Caso (Opcional)"}
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formState.description}
                      onChange={handleInputChange}
                      placeholder="Descreva de forma breve sua situação para agilizarmos sua triagem..."
                      className="w-full text-sm px-4 py-2.5 rounded bg-navy-950/40 border border-white/10 focus:outline-none focus:border-royal-400 focus:ring-1 focus:ring-royal-400/20 transition-all text-white placeholder-silver-500 font-light resize-none"
                    />
                  </div>

                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 px-8 py-3.5 rounded text-sm font-semibold text-white bg-[#17186a] hover:bg-blue-800 hover:shadow-xl hover:shadow-brand-blue/20 transition-all duration-300 border border-white/10 hover:border-royal-400 cursor-pointer active:scale-[0.98]"
                  >
                    <MessageSquare size={16} />
                    <span>Enviar e Iniciar Atendimento</span>
                  </button>
                  <p className="text-[10px] text-silver-400 text-center mt-3 font-light">
                    * Ao clicar, uma janela do WhatsApp se abrirá para falar diretamente com nosso escritório.
                  </p>
                </div>
              </form>
            </framerMotion.div>

          </div>
        </div>
      </section>

      <footer className="relative bg-[#060b16] border-t border-white/5 py-20 text-[#f8fafc]">
        {/* Glow behind Footer */}
        <div className="absolute left-[-10%] bottom-0 h-[300px] w-[300px] rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Col 1: Logo & Description (4 cols) */}
            <div className="md:col-span-5 space-y-6 text-left">
              <a href="#inicio" className="flex items-center gap-3 group">
                <div className="relative h-18 w-80">
                  <Image
                    src={assetPath("/logo-full-white.svg")}
                    alt="Logo TF Footer"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </a>

              <p className="text-xs text-silver-400 leading-relaxed font-light max-w-sm">
                Escritório comprometido com a excelência técnica, clareza processual e atuação estritamente ética na prevenção e defesa de seus direitos.
              </p>
              
              <div className="pt-2">
                <button
                  onClick={() => handleSelectArea("Geral")}
                  className="flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                >
                  <MessageSquare size={14} className="text-royal-300" />
                  <span>WhatsApp do Escritório</span>
                </button>
              </div>
            </div>

            {/* Col 2: Navigation Links (3 cols) */}
            <div className="md:col-span-3 space-y-4 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-royal-400">Navegação</h4>
              <ul className="space-y-2.5 text-xs text-silver-400 font-light">
                <li>
                  <a href="#inicio" className="hover:text-white transition-colors">Início</a>
                </li>
                <li>
                  <a href="#escritorio" className="hover:text-white transition-colors">Escritório</a>
                </li>
                <li>
                  <a href="#areas" className="hover:text-white transition-colors">Áreas de Atuação</a>
                </li>
                <li>
                  <a href="#diferenciais" className="hover:text-white transition-colors">Diferenciais</a>
                </li>
                <li>
                  <a href="#contato" className="hover:text-white transition-colors">Contato</a>
                </li>
              </ul>
            </div>

            {/* Col 3: Areas (4 cols) */}
            <div className="md:col-span-4 space-y-4 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-royal-400">{"\u00c1reas de Atendimento"}</h4>
              <ul className="space-y-2.5 text-xs text-silver-400 font-light">
                <li>
                  <button onClick={() => handleSelectArea("Direito Trabalhista")} className="hover:text-white text-left transition-colors cursor-pointer">
                    {"Direito Trabalhista \u0028Destaque Empregados\u0029"}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectArea("Direito Cível")} className="hover:text-white text-left transition-colors cursor-pointer">
                    {"Direito C\u00edvel \u0028Sa\u00fade e Contratos\u0029"}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectArea("Direito Administrativo")} className="hover:text-white text-left transition-colors cursor-pointer">
                    {"Direito Administrativo \u0028Sa\u00fade e Pareceres\u0029"}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectArea("Consultivo Jurídico")} className="hover:text-white text-left transition-colors cursor-pointer">
                    {"Consultivo Jur\u00eddico Preventivo"}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Delicate divider with central Monogram mark as visual closer */}
          <div className="mt-16 flex items-center justify-center gap-4">
            <div className="flex-1 h-[1px] bg-white/5" />
            <div className="opacity-25 shrink-0 select-none pointer-events-none relative h-8 w-8">
              <Image src={assetPath("/logo-mark-white.svg")} alt="TF Monograma" fill className="object-contain" />
            </div>
            <div className="flex-1 h-[1px] bg-white/5" />
          </div>

          {/* Bottom Copyright Bar */}
          <div className="mt-8 pt-4 flex flex-col items-center justify-center gap-2 text-[11px] text-silver-400 font-light text-center">
            <p>© 2026 Trajano e Ferro Advogados. Todos os direitos reservados.</p>
            <p className="flex items-center gap-1.5 justify-center">
              <span>Desenvolvido por</span>
              <a
                href="https://moralessolucoes.com.br/tecnologia"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-silver-300 hover:text-royal-400 transition-colors inline-flex items-center gap-0.5"
              >
                Morales Soluções
                <ExternalLink size={10} className="inline opacity-60" />
              </a>
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
