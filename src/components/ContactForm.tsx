"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { MessageSquare } from "lucide-react";
import { whatsAppHref } from "@/lib/site";

interface FormState {
  name: string;
  phone: string;
  area: string;
  description: string;
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    phone: "",
    area: "",
    description: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    setFormState((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formState.name || !formState.phone || !formState.area) {
      alert("Por favor, preencha os campos obrigatórios (Nome, Telefone e Área de Interesse).");
      return;
    }

    const message = `Olá, vim pelo site da Trajano e Ferro Advogados e gostaria de atendimento jurídico.

Nome: ${formState.name}
Telefone: ${formState.phone}
Área de interesse: ${formState.area}
Descrição do caso: ${formState.description || "Não informada."}`;

    window.open(whatsAppHref(message), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

        <div className="flex flex-col space-y-1.5 text-left sm:col-span-2">
          <label htmlFor="area" className="text-xs font-bold text-silver-300">
            Área de Interesse <span className="text-red-500">*</span>
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
              backgroundPosition: "right 16px center",
              backgroundSize: "16px 16px",
              backgroundRepeat: "no-repeat",
            }}
          >
            <option value="" disabled className="text-silver-500 bg-[#08111f]">
              Selecione uma área
            </option>
            <option value="Direito Trabalhista" className="text-white bg-[#08111f]">
              Direito Trabalhista
            </option>
            <option value="Direito Civil" className="text-white bg-[#08111f]">
              Direito Civil
            </option>
            <option value="Processo Ético-Disciplinar" className="text-white bg-[#08111f]">
              Processo Ético-Disciplinar
            </option>
            <option value="Consultivo Jurídico" className="text-white bg-[#08111f]">
              Consultivo Jurídico
            </option>
          </select>
        </div>

        <div className="flex flex-col space-y-1.5 text-left sm:col-span-2">
          <label htmlFor="description" className="text-xs font-bold text-silver-300">
            Resumo do Caso (Opcional)
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
  );
}
