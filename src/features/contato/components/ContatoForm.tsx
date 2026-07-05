"use client";

import React, { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import {CtaBlock} from "@shared/components/CtaBlock";
import {locales} from "@/src/i18n/config";

export function ContatoForm({ dictionary }: { dictionary: any }) {
  const c = dictionary.contato;
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Erro ao enviar mensagem.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <section className="bg-brand-red-600 min-h-dvh">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-dvh items-stretch">

          <FadeIn direction="left" delay={0.1} className="flex">
            <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-20 lg:py-24 w-full">

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-black tracking-tighter leading-[1] text-white uppercase mb-10">
                {c.headline}
              </h1>

              <p className="text-base sm:text-lg text-white leading-relaxed max-w-xl mb-14">
                {c.subheadline}
              </p>

              <div className="flex flex-col gap-8 mb-14">
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

          <FadeIn direction="right" delay={0.2} className="flex">
            <div className="bg-white flex items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-20 lg:py-24 w-full">
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
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <h2 className="text-2xl font-black uppercase tracking-tight text-black pb-6">
                  </h2>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="nome" className="text-xs font-bold uppercase tracking-widest text-black">{c.labels.name}</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder={c.placeholders.name}
                      className="h-14 px-5 border border-black bg-white text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-brand-red-600"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="empresa" className="text-xs font-bold uppercase tracking-widest text-black">{c.labels.company}</label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      placeholder={c.placeholders.company}
                      className="h-14 px-5 border border-black bg-white text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-brand-red-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-black">{c.labels.email}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={c.placeholders.email}
                        className="h-14 px-5 border border-black bg-white text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-brand-red-600"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="telefone" className="text-xs font-bold uppercase tracking-widest text-black">{c.labels.phone}</label>
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        required
                        value={formData.telefone}
                        onChange={handleChange}
                        placeholder={c.placeholders.phone}
                        className="h-14 px-5 border border-black bg-white text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-brand-red-600"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="segmento" className="text-xs font-bold uppercase tracking-widest text-black">{c.labels.segment}</label>
                    <select
                      id="segmento"
                      name="segmento"
                      value={formData.segmento}
                      onChange={handleChange}
                      className="h-14 px-5 border border-black bg-white text-sm text-black focus:outline-none focus:border-brand-red-600 cursor-pointer"
                    >
                      {c.segments.map((seg: { value: string; label: string }) => (
                        <option key={seg.value} value={seg.value}>{seg.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="mensagem" className="text-xs font-bold uppercase tracking-widest text-black">{c.labels.message}</label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      rows={6}
                      required
                      value={formData.mensagem}
                      onChange={handleChange}
                      placeholder={c.placeholders.message}
                      className="p-5 border border-black bg-white text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-brand-red-600 resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-brand-red-600 font-medium mt-2">{error}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black hover:bg-neutral-800 text-white font-bold uppercase tracking-widest h-14 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                    {isSubmitting ? "Enviando…" : c.submitButton}
                  </Button>
                </form>
              )}
            </div>
          </div>
          </FadeIn>

        </div>
      </section>
      <CtaBlock
          variant="white"
          title={dictionary.produtos.ctaTitle}
          highlight={dictionary.produtos.ctaHighlight}
          description={dictionary.produtos.ctaDescription}
          buttonText={dictionary.produtos.ctaButton}
      />
    </div>
  );
}
