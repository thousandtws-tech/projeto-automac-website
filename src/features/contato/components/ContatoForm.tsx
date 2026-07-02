"use client";

import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";

export function ContatoForm({ dictionary }: { dictionary: any }) {
  const c = dictionary.contato;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    mensagem: "",
    segmento: "Comercial",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full mt-30">
      {/* Main Contact Section - Red Background */}
      <section className="bg-brand-red-600 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

          {/* Left Column - Info */}
          <FadeIn direction="left" delay={0.1} className="h-full">
            <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-20 lg:py-0 h-full">

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-black tracking-tighter leading-[1] text-white uppercase mb-8">
                {c.headline}
              </h1>

              <p className="text-base sm:text-lg text-white leading-relaxed max-w-xl mb-12">
                {c.subheadline}
              </p>

              <div className="flex flex-col gap-6 mb-12">
                <div className="flex items-center gap-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-white w-20">{c.emailLabel}</span>
                  <a href="mailto:contato@automec.com.br" className="text-white font-bold hover:text-white/80 transition-colors">
                    contato@automec.com.br
                  </a>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-white w-20">{c.phoneLabel}</span>
                  <a href="tel:+551932138251" className="text-white font-bold hover:text-white/80 transition-colors">
                    +55 19 3213-8251
                  </a>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-white w-20">{c.factoryLabel}</span>
                  <span className="text-white font-bold">{c.factoryLocation}</span>
                </div>
              </div>

              <div className="border-l-2 border-white pl-6">
                <p className="text-sm text-white italic leading-relaxed">
                  {c.ps}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right Column - Form */}
          <FadeIn direction="right" delay={0.2} className="h-full">
            <div className="bg-white flex items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-20 lg:py-0 h-full">
              <div className="w-full max-w-xl">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <CheckCircle className="h-16 w-2xl text-[#25D366] mb-6" />
                  <h3 className="text-2xl font-black uppercase text-black mb-2">{c.successTitle}</h3>
                  <p className="text-neutral-600 max-w-sm mb-8">
                    {c.successMessage}
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="bg-black hover:bg-neutral-800 text-white font-bold uppercase tracking-widest px-8 h-12"
                  >
                    {c.sendNewMessage}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <h2 className="text-xl font-black uppercase tracking-tight text-black border-b border-black pb-4">
                    {c.formTitle}
                  </h2>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="nome" className="text-xs font-bold uppercase tracking-widest text-black">{c.labels.name}</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder={c.placeholders.name}
                      className="h-12 px-4 border border-black bg-white text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-brand-red-600"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="empresa" className="text-xs font-bold uppercase tracking-widest text-black">{c.labels.company}</label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      placeholder={c.placeholders.company}
                      className="h-12 px-4 border border-black bg-white text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-brand-red-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-black">{c.labels.email}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={c.placeholders.email}
                        className="h-12 px-4 border border-black bg-white text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-brand-red-600"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="telefone" className="text-xs font-bold uppercase tracking-widest text-black">{c.labels.phone}</label>
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        required
                        value={formData.telefone}
                        onChange={handleChange}
                        placeholder={c.placeholders.phone}
                        className="h-12 px-4 border border-black bg-white text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-brand-red-600"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="segmento" className="text-xs font-bold uppercase tracking-widest text-black">{c.labels.segment}</label>
                    <select
                      id="segmento"
                      name="segmento"
                      value={formData.segmento}
                      onChange={handleChange}
                      className="h-12 px-4 border border-black bg-white text-sm text-black focus:outline-none focus:border-brand-red-600 cursor-pointer"
                    >
                      {c.segments.map((seg: { value: string; label: string }) => (
                        <option key={seg.value} value={seg.value}>{seg.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="mensagem" className="text-xs font-bold uppercase tracking-widest text-black">{c.labels.message}</label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      rows={5}
                      required
                      value={formData.mensagem}
                      onChange={handleChange}
                      placeholder={c.placeholders.message}
                      className="p-4 border border-black bg-white text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-brand-red-600 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black hover:bg-neutral-800 text-white font-bold uppercase tracking-widest h-13 flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {c.submitButton}
                  </Button>
                </form>
              )}
            </div>
          </div>
          </FadeIn>

        </div>
      </section>
    </div>
  );
}
