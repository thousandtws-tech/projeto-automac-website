"use client";

import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";

export function ContatoForm() {
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
    <div className="w-full">
      {/* Main Contact Section - Red Background */}
      <section className="bg-brand-red-600 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

          {/* Left Column - Info */}
          <FadeIn direction="left" delay={0.1} className="h-full">
            <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-20 lg:py-0 h-full">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/70 mb-4 block">
                Contato & Orçamento
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.9] text-white uppercase mb-8">
                Seu projeto não pode depender de fornecedores que fazem promessas que não podem cumprir.
              </h1>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl mb-12">
                Envie seus projetos e receba uma análise técnica de quem fabrica com precisão industrial — do corte CNC à instalação final em obra.
              </p>

              <div className="flex flex-col gap-6 mb-12">
                <div className="flex items-center gap-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60 w-20">E-mail</span>
                  <a href="mailto:contato@automec.com.br" className="text-white font-bold hover:text-white/80 transition-colors">
                    contato@automec.com.br
                  </a>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60 w-20">Telefone</span>
                  <a href="tel:+551932138251" className="text-white font-bold hover:text-white/80 transition-colors">
                    +55 19 3213-8251
                  </a>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60 w-20">Fábrica</span>
                  <span className="text-white font-bold">Campinas, SP - Brasil</span>
                </div>
              </div>

              <div className="border-l-2 border-white/30 pl-6">
                <p className="text-sm text-white/70 italic leading-relaxed">
                  PS: Atrasos em projetos nunca são apenas uma questão de prazo — significam multas, reputação abalada e o próximo projeto que pode nunca vir. Envie seus projetos e experimente a diferença entre contratar uma promessa e contratar um processo.
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
                  <h3 className="text-2xl font-black uppercase text-black mb-2">Mensagem Enviada!</h3>
                  <p className="text-neutral-600 max-w-sm mb-8">
                    Agradecemos seu contato. Nossa equipe técnica analisará sua solicitação e entrará em contato em breve.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="bg-black hover:bg-neutral-800 text-white font-bold uppercase tracking-widest px-8 h-12"
                  >
                    Enviar Nova Mensagem
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <h2 className="text-xl font-black uppercase tracking-tight text-black border-b border-black pb-4">
                    Formulário de Solicitação
                  </h2>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="nome" className="text-xs font-bold uppercase tracking-widest text-black">Nome Completo</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      className="h-12 px-4 border border-black bg-white text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-brand-red-600"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="empresa" className="text-xs font-bold uppercase tracking-widest text-black">Empresa</label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      placeholder="Sua construtora ou escritório de arquitetura"
                      className="h-12 px-4 border border-black bg-white text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-brand-red-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-black">E-mail</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com.br"
                        className="h-12 px-4 border border-black bg-white text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-brand-red-600"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="telefone" className="text-xs font-bold uppercase tracking-widest text-black">Telefone / WhatsApp</label>
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        required
                        value={formData.telefone}
                        onChange={handleChange}
                        placeholder="+55 19 99999-9999"
                        className="h-12 px-4 border border-black bg-white text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-brand-red-600"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="segmento" className="text-xs font-bold uppercase tracking-widest text-black">Segmento do Projeto</label>
                    <select
                      id="segmento"
                      name="segmento"
                      value={formData.segmento}
                      onChange={handleChange}
                      className="h-12 px-4 border border-black bg-white text-sm text-black focus:outline-none focus:border-brand-red-600 cursor-pointer"
                    >
                      <option value="Comercial">Comercial (Lojas, Prédios comerciais)</option>
                      <option value="Hospitalar">Hospitalar (Clínicas, Hospitais)</option>
                      <option value="Industrial">Industrial (Docas, Galpões)</option>
                      <option value="Residencial">Residencial (Condomínios, Casas)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="mensagem" className="text-xs font-bold uppercase tracking-widest text-black">Mensagem / Notas</label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      rows={5}
                      required
                      value={formData.mensagem}
                      onChange={handleChange}
                      placeholder="Descreva prazos específicos, dimensões de abertura ou necessidades especiais do projeto..."
                      className="p-4 border border-black bg-white text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-brand-red-600 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black hover:bg-neutral-800 text-white font-bold uppercase tracking-widest h-13 flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Enviar Projeto para Análise
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
