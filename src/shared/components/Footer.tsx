import React from "react";
import Link from "next/link";
import Image from "next/image";

import LogoMarca from "@/public/logo-png/Artboard-1.png";
import { Dictionary } from "@/src/i18n/dictionaries";
import { type Locale, withLocale } from "@/src/i18n/config";

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
    <footer className="border-t border-black bg-white">
      <div className="border-b border-black bg-neutral-50">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-6 py-12 text-sm md:grid-cols-3">
          <div className="space-y-6 md:border-r md:border-black md:pr-10">
            <Link href={withLocale(locale, "/")} className="flex items-center">
              <Image src={LogoMarca} alt="Automec" width={160} height={40} />
            </Link>
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-black">
                {dictionary.footer.contactsTitle}
              </h4>
              <p className="text-neutral-600">
                {dictionary.footer.contactsText} <strong className="text-black">{dictionary.common.email}</strong>
              </p>
              <a href="tel:08007717775" className="mt-4 block text-xl font-black tracking-tight text-brand-red-500 hover:text-brand-red-600">
                (19) 3213-8251
              </a>
            </div>
          </div>

          <div className="space-y-5 md:border-r md:border-black md:pr-10">
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-black">
                {dictionary.footer.addressTitle}
              </h4>
              <p className="text-neutral-600">
                {dictionary.footer.addressLine1}<br />
                {dictionary.footer.addressLine2}
              </p>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-black">
                {dictionary.footer.hoursTitle}
              </h4>
              <p className="text-neutral-600">
                {dictionary.footer.hoursText} <strong className="text-black">{dictionary.footer.hoursValue}</strong>
              </p>
            </div>
           
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-black">
              {dictionary.footer.quickLinksTitle}
            </h4>
            <ul className="space-y-2">
              {dictionary.footer.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={withLocale(locale, link.href)}
                    className="text-neutral-600 transition-colors hover:text-brand-red-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href }, index) => (
                  <Link
                      key={index}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-red-500 text-white transition-colors hover:bg-brand-red-600"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black py-3">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-6 text-xs md:flex-row">
          <p className="text-white/70">
            Automec Portas Automáticas © {currentYear} - {dictionary.footer.rights}
          </p>
          <p className="text-white/50">{dictionary.footer.developedBy}</p>
        </div>
      </div>
    </footer>
  );
}
