import React from "react";
import Link from "next/link";
import Image from "next/image";

import LogoMarca from "@/public/logo-png/Artboard-1.png";
import { Dictionary } from "@/src/i18n/dictionaries";
import { type Locale, withLocale } from "@/src/i18n/config";
import { LazyMap } from "./LazyMap";

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

interface FooterProps {
  locale: Locale;
  dictionary: Dictionary;
}

export function Footer({ locale, dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/automecportasautomaticas",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/automecportas",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/user/AutomecPortas",
    },
  ];

  return (
    <footer className="bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      <div className="bg-neutral-50">
        <div
          className="
          container mx-auto grid min-w-0 grid-cols-1 gap-8
          px-4 py-8 text-sm
          sm:px-6
          lg:grid-cols-[1.15fr_1fr_1.15fr]
          lg:gap-6 lg:px-8 lg:py-10
          xl:gap-8
        "
        >
          {/* Contatos */}
          <div
            className="
            min-w-0 space-y-5 pb-8
            lg:pb-0 lg:pr-6
            xl:pr-8
          "
          >
            <Link
              href={withLocale(locale, "/")}
              className="flex items-center"
            >
              <Image
                src={LogoMarca}
                alt="Automec"
                width={160}
                height={40}
                className="h-auto w-[120px] sm:w-[140px]"
              />
            </Link>

            <div
              className="
              grid grid-cols-1 items-center gap-8
              sm:grid-cols-2
              lg:grid-cols-1
              xl:grid-cols-2
            "
            >
              {/* Informações de contato */}
              <div>
                <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-black">
                  {dictionary.footer.contactsTitle}
                </h4>

                <p className="text-neutral-600">
                  <span className="block">
                    {dictionary.footer.contactsText}
                  </span>

                  <strong className="mt-1 block whitespace-nowrap text-[clamp(0.7rem,3.8vw,0.875rem)] text-black">
                    {dictionary.common.email}
                  </strong>
                </p>

                <a
                  href="tel:08007717775"
                  className="
                  mt-3 block text-lg font-black tracking-tight
                  text-brand-red-500 transition-colors
                  hover:text-brand-red-600
                "
                >
                  0800-771-77-75
                </a>

                <a
                  href="tel:1932138251"
                  className="
                  mt-2 block text-lg font-black tracking-tight
                  text-brand-red-500 transition-colors
                  hover:text-brand-red-600
                "
                >
                  (19) 3213-8251
                </a>

                <h4 className="mb-2 mt-5 text-xs font-bold uppercase tracking-widest text-black">
                  {dictionary.footer.hoursTitle}
                </h4>

                <p className="text-neutral-600">
                  {dictionary.footer.hoursText}{" "}
                  <strong className="text-black">
                    {dictionary.footer.hoursValue}
                  </strong>
                </p>
              </div>

              {/* Imagem 35 anos reduzida */}
              <div
                className="
                 mx-auto flex w-full max-w-[140px]
                items-center justify-center
                 sm:max-w-[160px]
                 lg:max-w-[140px]
                 xl:max-w-[160px]
              "
              >
                
              </div>
            </div>
          </div>

          {/* Endereço e mapa */}
          <div
            className="
            min-w-0 space-y-5 pb-8
            lg:pb-0 lg:pr-8
            xl:pr-10
          "
          >
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-black">
                {dictionary.footer.addressTitle}
              </h4>

              <p className="max-w-[30ch] text-neutral-600 leading-relaxed">
                <span className="block">{dictionary.footer.addressLine1}</span>
                <span className="block">{dictionary.footer.addressLine2}</span>
              </p>
            </div>

            <div className="overflow-hidden rounded-xl bg-white">
              <LazyMap
                title="Localização da Automec Portas Automáticas"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14706.809156150564!2d-47.090868564738926!3d-22.850501468143122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c703df8a0725%3A0xe3ff1d1ffa1bec7b!2sAutomec%20Portas%20Autom%C3%A1ticas!5e0!3m2!1spt-BR!2sbr!4v1785872348589!5m2!1spt-BR!2sbr"
                className="h-[200px] w-full sm:h-[230px] lg:h-[210px]"
              />
            </div>
          </div>

          {/* Links rápidos e normas técnicas */}
          <div
            className="
            min-w-0 grid grid-cols-1 items-center gap-8
            sm:grid-cols-2
            lg:grid-cols-1
            xl:-mt-10 xl:grid-cols-2
          "
          >
            {/* Links rápidos */}
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-black">
                {dictionary.footer.quickLinksTitle}
              </h4>

              <ul className="space-y-3">
                {dictionary.footer.quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={withLocale(locale, link.href)}
                      className="
                      inline-block text-base text-neutral-600
                      transition-colors hover:text-brand-red-500
                    "
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {socialLinks.map(({ icon: Icon, href }, index) => (
                  <Link
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Acessar rede social ${index + 1}`}
                    className="
                     flex h-9 w-9 items-center justify-center
                    rounded-lg bg-brand-red-500 text-white
                    transition-colors hover:bg-brand-red-600
                  "
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Imagem normas técnicas reduzida */}
            <div
              className="
               relative mx-auto min-h-[120px] w-full
               max-w-[160px] overflow-hidden
               sm:min-h-[150px] sm:max-w-[180px]
               lg:min-h-[140px] lg:max-w-[160px]
               xl:min-h-[170px] xl:max-w-[180px]
            "
            >
              <Image
                src="https://res.cloudinary.com/dpgslwy15/image/upload/v1785876636/Normas_t%C3%A9cnicas_wvlkr7.webp"
                alt="Normas técnicas para portas automáticas"
                fill
                sizes="
                (max-width: 640px) 190px,
                (max-width: 1024px) 220px,
                230px
              "
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="bg-black py-4">
        <div
          className="
          container mx-auto flex flex-col items-center
          justify-between gap-2 px-5 text-center text-xs
          sm:px-6
          md:flex-row md:text-left
        "
        >
          <p className="text-white/70">
            Automec Portas Automáticas © {currentYear} -{" "}
            {dictionary.footer.rights}
          </p>

          <p className="text-white/50">
            {dictionary.footer.developedBy}
          </p>
        </div>
      </div>
    </footer>
  );
}
