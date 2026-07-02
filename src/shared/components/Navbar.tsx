"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

import Image from "next/image";
import LogoMarca from "@/public/logo-png/Artboard-1.png";
import { Dictionary } from "@/src/i18n/dictionaries";
import { localeLabels, locales, type Locale, withLocale } from "@/src/i18n/config";

interface NavbarProps {
  locale: Locale;
  dictionary: Dictionary;
}

export function Navbar({ locale, dictionary }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname.replace(/^\/(pt-BR|en|es)/, "") || "/";

  // Lenis-compatible scroll detection
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full bg-white transition-all duration-300",
        scrolled ? "shadow-sm" : ""
      )}
    >
      {/* Top bar */}
      <div className="bg-black">
        <div className="container mx-auto flex h-10 flex-row items-center justify-between px-6 text-[11px] font-medium uppercase tracking-wider">
          <div className="flex items-center gap-2 text-white/80">
            <MapPin className="h-3 w-3" />
            <span className="hidden md:inline">{dictionary.common.addressShort}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:atendimento@automec.com.br" className="text-white/70 hover:text-white transition-colors">
              {dictionary.common.email}
            </a>
            <span className="h-3 w-px bg-white/20" />
            <a href="tel:+551932138251" className="text-white/70 hover:text-white transition-colors">
              {dictionary.common.phone}
            </a>
            <span className="h-3 w-px bg-white/20" />
            <div className="flex items-center gap-1">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={withLocale(l, currentPath)}
                  className={cn("text-sm leading-none", l === locale ? "opacity-100" : "opacity-50 hover:opacity-80")}
                >
                  {localeLabels[l].flag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-black">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href={withLocale(locale, "/")} className="flex items-center">
            <Image src={LogoMarca} alt="Automec" width={160} height={40} style={{ width: "auto", height: "auto" }} loading="eager" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {dictionary.nav.map((item) => (
              <Link
                key={item.name}
                href={withLocale(locale, item.href)}
                className={cn(
                  "text-xs font-bold uppercase tracking-widest transition-colors",
                  currentPath === item.href
                    ? "text-brand-red-500"
                    : "text-slate-700 hover:text-brand-red-500"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={withLocale(locale, "/contato")}
              className="inline-flex h-10 items-center justify-center bg-brand-red-500 px-5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-red-600"
            >
              {dictionary.common.budget}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-slate-900 hover:text-brand-red-500"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white md:hidden overflow-y-auto transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ top: "116px" }}
      >
        <div className="flex flex-col p-6">
          <nav className="flex flex-col gap-0">
            {dictionary.nav.map((item) => (
              <Link
                key={item.name}
                href={withLocale(locale, item.href)}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center justify-between border-b border-neutral-100 py-4 text-sm font-bold uppercase tracking-widest transition-colors",
                  currentPath === item.href
                    ? "text-brand-red-500"
                    : "text-slate-800 hover:text-brand-red-500"
                )}
              >
                <span>{item.name}</span>
                <ChevronRight className="h-4 w-4 opacity-40" />
              </Link>
            ))}
          </nav>
          <div className="mt-8">
            <Link
              href={withLocale(locale, "/contato")}
              onClick={() => setIsOpen(false)}
              className="flex h-12 w-full items-center justify-center bg-brand-red-500 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-red-600"
            >
              {dictionary.common.requestBudget}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
