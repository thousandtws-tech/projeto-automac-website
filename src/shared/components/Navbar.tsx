"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";

import Image from "next/image";
import LogoMarca from "@/public/logo-png/Artboard-1.png";
import Logo35Anos from "@/public/logo-35-anos.png";
import { Dictionary } from "@/src/i18n/dictionaries";
import { localeLabels, locales, type Locale, withLocale } from "@/src/i18n/config";

const localeFlagCodes: Record<Locale, string> = {
  "pt-BR": "br",
  en: "us",
  es: "es",
};

interface NavbarProps {
  locale: Locale;
  dictionary: Dictionary;
}

export function Navbar({ locale, dictionary }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname.replace(/^\/(pt-BR|en|es)/, "") || "/";

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

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full bg-white transition-all duration-300",
        scrolled ? "shadow-sm" : ""
      )}
    >
      <div className="bg-black">
        <div className="container mx-auto flex h-10 flex-row items-center justify-end gap-2 px-4 text-[10px] font-medium uppercase tracking-wide sm:justify-between sm:px-6 sm:text-[11px] sm:tracking-wider">
          <div className="hidden items-center gap-2 text-white/80 md:flex">
            <MapPin className="h-3 w-3" />
            <span>{dictionary.common.addressShort}</span>
          </div>
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <a href="mailto:atendimento@automec.com.br" className="hidden whitespace-nowrap text-white/70 transition-colors hover:text-white sm:inline">
              {dictionary.common.email}
            </a>
            <span className="hidden h-3 w-px bg-white/20 sm:block" />
            <a href="tel:+551932138251" className="whitespace-nowrap text-white/70 transition-colors hover:text-white">
              {dictionary.common.phone}
            </a>
            <span className="h-3 w-px bg-white/20" />
            <div className="flex items-center gap-1">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={withLocale(l, currentPath)}
                  aria-label={localeLabels[l].label}
                  className={cn(
                    "flex h-5 w-7 items-center justify-center border-0 p-0.5 transition-opacity",
                    l === locale ? "opacity-100" : "opacity-70 hover:opacity-100",
                  )}
                >
                  <img
                    src={`https://flagcdn.com/w40/${localeFlagCodes[l]}.png`}
                    alt={localeLabels[l].label}
                    width={28}
                    height={20}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-neutral-200 shadow-[0_3px_12px_rgba(0,0,0,0.025)]">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href={withLocale(locale, "/")} className="flex items-center">
            <Image src={LogoMarca} alt="Automec" width={160} height={40} style={{ width: "auto", height: "45px" }} loading="eager" />
          </Link>

          <Image src="https://res.cloudinary.com/dpgslwy15/image/upload/v1788281615/35_anos_header_eab0rq.webp" alt="35" width={100} height={100} quality={100}/>

        
          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-5 2xl:gap-8">
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
              className="animate-budget-blink inline-flex h-10 items-center justify-center gap-2 rounded-md bg-brand-red-500 px-5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-red-600"
            >
              <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
              {dictionary.common.budget}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="flex min-h-11 min-w-11 items-center justify-center p-2 text-slate-900 hover:text-brand-red-500 xl:hidden"
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
          "fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-white transition-transform duration-300 ease-in-out xl:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ top: "112px" }}
      >
        <div className="flex flex-col p-6">
          <nav className="flex flex-col divide-y divide-neutral-100 border-b border-neutral-100">
            {dictionary.nav.map((item) => (
              <Link
                key={item.name}
                href={withLocale(locale, item.href)}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center justify-between py-4 text-sm font-bold uppercase tracking-widest transition-colors",
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
              className="flex h-12 w-full items-center justify-center rounded-md bg-brand-red-500 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-red-600"
            >
              {dictionary.common.requestBudget}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
