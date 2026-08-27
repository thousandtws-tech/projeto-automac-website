"use client";

import React, { useState } from "react";
import { Send, CheckCircle, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import {CtaBlock} from "@shared/components/CtaBlock";
import type { Dictionary } from "@/src/i18n/dictionaries";
import { executeReCaptcha } from "@shared/components/ReCaptcha";

export function ContatoForm({ dictionary }: { dictionary: Dictionary }) {
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
      const recaptchaToken = await executeReCaptcha("contact_form_submit");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
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
      <section className="mt-[98px] min-h-dvh bg-white lg:mt-10">
        <FadeIn direction="up" delay={0.2} className="flex min-h-dvh">
          <div className="flex w-full items-center justify-center px-5 py-16 sm:px-12 lg:px-16 lg:py-24">
            <div className="w-full max-w-3xl">
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
                      className="h-14 border border-neutral-300 bg-white px-5 text-sm text-black shadow-[0_3px_12px_rgba(0,0,0,0.04)] placeholder:text-neutral-400 focus:border-brand-red-600 focus:outline-none focus:shadow-[0_4px_16px_rgba(0,0,0,0.07)]"
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
                      className="h-14 border border-neutral-300 bg-white px-5 text-sm text-black shadow-[0_3px_12px_rgba(0,0,0,0.04)] placeholder:text-neutral-400 focus:border-brand-red-600 focus:outline-none focus:shadow-[0_4px_16px_rgba(0,0,0,0.07)]"
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
                        className="h-14 border border-neutral-300 bg-white px-5 text-sm text-black shadow-[0_3px_12px_rgba(0,0,0,0.04)] placeholder:text-neutral-400 focus:border-brand-red-600 focus:outline-none focus:shadow-[0_4px_16px_rgba(0,0,0,0.07)]"
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
                        className="h-14 border border-neutral-300 bg-white px-5 text-sm text-black shadow-[0_3px_12px_rgba(0,0,0,0.04)] placeholder:text-neutral-400 focus:border-brand-red-600 focus:outline-none focus:shadow-[0_4px_16px_rgba(0,0,0,0.07)]"
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
                      className="h-14 cursor-pointer border border-neutral-300 bg-white px-5 text-sm text-black shadow-[0_3px_12px_rgba(0,0,0,0.04)] focus:border-brand-red-600 focus:outline-none focus:shadow-[0_4px_16px_rgba(0,0,0,0.07)]"
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
                      className="resize-none border border-neutral-300 bg-white p-5 text-sm text-black shadow-[0_3px_12px_rgba(0,0,0,0.04)] placeholder:text-neutral-400 focus:border-brand-red-600 focus:outline-none focus:shadow-[0_4px_16px_rgba(0,0,0,0.07)]"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-brand-red-600 font-medium mt-2">{error}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black hover:bg-red-700 cursor-pointer text-white font-bold uppercase tracking-widest h-14 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                    {isSubmitting ? "Enviando…" : c.submitButton}
                  </Button>

                  <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-neutral-500 font-medium">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-neutral-700" />
                    <span>
                      Protegido por reCAPTCHA —{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-black font-semibold"
                      >
                        Privacidade
                      </a>{" "}
                      e{" "}
                      <a
                        href="https://policies.google.com/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-black font-semibold"
                      >
                        Termos
                      </a>
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </FadeIn>
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
