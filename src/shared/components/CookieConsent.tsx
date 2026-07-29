"use client";

import { useState, useSyncExternalStore } from "react";
import { getCookie, setCookie } from "cookies-next/client";
import { Cookie, Settings2, ShieldCheck, X } from "lucide-react";
import type { Locale } from "@/src/i18n/config";

const consentCookieName = "automec_cookie_consent";
const oneYear = 60 * 60 * 24 * 365;

interface ConsentPreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  version: 1;
}

const copy = {
  "pt-BR": {
    eyebrow: "Privacidade Automec",
    title: "Sua privacidade importa",
    description:
      "Usamos cookies necessários para o funcionamento do site e, com sua autorização, cookies de análise e marketing para melhorar sua experiência.",
    accept: "Aceitar todos",
    reject: "Somente necessários",
    customize: "Personalizar",
    settings: "Preferências de cookies",
    preferencesTitle: "Controle seus cookies",
    preferencesDescription:
      "Escolha quais categorias opcionais a Automec pode utilizar neste dispositivo.",
    necessary: "Cookies necessários",
    necessaryDescription:
      "Essenciais para segurança, navegação e funcionamento do site. Não podem ser desativados.",
    analytics: "Análise e desempenho",
    analyticsDescription:
      "Ajudam a entender como o site é utilizado e onde podemos melhorar.",
    marketing: "Marketing",
    marketingDescription:
      "Permitem apresentar comunicações e campanhas mais relevantes.",
    alwaysActive: "Sempre ativos",
    save: "Salvar preferências",
    close: "Fechar",
  },
  en: {
    eyebrow: "Automec Privacy",
    title: "Your privacy matters",
    description:
      "We use essential cookies to operate the website and, with your permission, analytics and marketing cookies to improve your experience.",
    accept: "Accept all",
    reject: "Essential only",
    customize: "Customize",
    settings: "Cookie preferences",
    preferencesTitle: "Control your cookies",
    preferencesDescription:
      "Choose which optional categories Automec may use on this device.",
    necessary: "Essential cookies",
    necessaryDescription:
      "Required for security, navigation and website operation. They cannot be disabled.",
    analytics: "Analytics and performance",
    analyticsDescription:
      "Help us understand how the website is used and where we can improve.",
    marketing: "Marketing",
    marketingDescription:
      "Allow us to present more relevant communications and campaigns.",
    alwaysActive: "Always active",
    save: "Save preferences",
    close: "Close",
  },
  es: {
    eyebrow: "Privacidad Automec",
    title: "Tu privacidad importa",
    description:
      "Utilizamos cookies necesarias para el funcionamiento del sitio y, con tu autorización, cookies de análisis y marketing para mejorar tu experiencia.",
    accept: "Aceptar todas",
    reject: "Solo necesarias",
    customize: "Personalizar",
    settings: "Preferencias de cookies",
    preferencesTitle: "Controla tus cookies",
    preferencesDescription:
      "Elige qué categorías opcionales puede utilizar Automec en este dispositivo.",
    necessary: "Cookies necesarias",
    necessaryDescription:
      "Esenciales para la seguridad, navegación y funcionamiento del sitio. No se pueden desactivar.",
    analytics: "Análisis y rendimiento",
    analyticsDescription:
      "Ayudan a entender cómo se utiliza el sitio y dónde podemos mejorar.",
    marketing: "Marketing",
    marketingDescription:
      "Permiten presentar comunicaciones y campañas más relevantes.",
    alwaysActive: "Siempre activas",
    save: "Guardar preferencias",
    close: "Cerrar",
  },
} as const;

const subscribe = () => () => undefined;

function readStoredConsent(): ConsentPreferences | null {
  const value = getCookie(consentCookieName);

  if (typeof value !== "string") return null;

  try {
    const parsed = JSON.parse(value) as Partial<ConsentPreferences>;
    if (parsed.version !== 1 || parsed.necessary !== true) return null;

    return {
      necessary: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      version: 1,
    };
  } catch {
    return null;
  }
}

export function CookieConsent({ locale }: { locale: Locale }) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const [sessionConsent, setSessionConsent] =
    useState<ConsentPreferences | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const text = copy[locale];
  const storedConsent = mounted ? readStoredConsent() : null;
  const consent = sessionConsent ?? storedConsent;

  const saveConsent = (preferences: ConsentPreferences) => {
    setCookie(consentCookieName, JSON.stringify(preferences), {
      maxAge: oneYear,
      path: "/",
      sameSite: "lax",
      secure: window.location.protocol === "https:",
    });
    setSessionConsent(preferences);
    setPreferencesOpen(false);
    window.dispatchEvent(
      new CustomEvent("automec:cookie-consent", { detail: preferences }),
    );
  };

  const openPreferences = () => {
    setAnalytics(consent?.analytics ?? false);
    setMarketing(consent?.marketing ?? false);
    setPreferencesOpen(true);
  };

  if (!mounted) return null;

  return (
    <>
      {!consent && !preferencesOpen && (
        <section
          aria-label={text.settings}
          className="fixed inset-x-3 bottom-3 z-[100] overflow-hidden border border-black bg-white shadow-[0_14px_45px_rgba(0,0,0,0.24)] sm:inset-x-6 sm:bottom-5 lg:left-1/2 lg:right-auto lg:w-[min(920px,calc(100%-3rem))] lg:-translate-x-1/2"
        >
          <div className="h-1 bg-brand-red-600" />
          <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-6">
            <div className="max-w-3xl">
              <div className="mb-2 flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                  <Cookie className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-brand-red-600">
                  {text.eyebrow}
                </span>
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-black sm:text-2xl">
                {text.title}
              </h2>
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-neutral-600 sm:text-sm">
                {text.description}
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-3 lg:w-[420px]">
              <button
                type="button"
                onClick={() =>
                  saveConsent({
                    necessary: true,
                    analytics: false,
                    marketing: false,
                    version: 1,
                  })
                }
                className="h-10 border border-black bg-white px-3 text-[10px] font-black uppercase tracking-wider text-black transition-colors hover:bg-neutral-100"
              >
                {text.reject}
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className="h-10 border border-black bg-black px-3 text-[10px] font-black uppercase tracking-wider text-white transition-colors hover:bg-neutral-800"
              >
                {text.customize}
              </button>
              <button
                type="button"
                onClick={() =>
                  saveConsent({
                    necessary: true,
                    analytics: true,
                    marketing: true,
                    version: 1,
                  })
                }
                className="h-10 bg-brand-red-600 px-3 text-[10px] font-black uppercase tracking-wider text-white transition-colors hover:bg-brand-red-700"
              >
                {text.accept}
              </button>
            </div>
          </div>
        </section>
      )}

      {consent && !preferencesOpen && (
        <button
          type="button"
          onClick={openPreferences}
          aria-label={text.settings}
          title={text.settings}
          className="fixed bottom-4 left-4 z-[90] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black text-white shadow-lg transition-transform hover:scale-105 hover:bg-brand-red-600"
        >
          <Cookie className="h-5 w-5" aria-hidden="true" />
        </button>
      )}

      {preferencesOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-black bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-black bg-black p-5 text-white sm:p-7">
              <div className="pr-6">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-brand-red-500">
                  {text.eyebrow}
                </span>
                <h2
                  id="cookie-preferences-title"
                  className="text-2xl font-black uppercase tracking-tight sm:text-3xl"
                >
                  {text.preferencesTitle}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {text.preferencesDescription}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreferencesOpen(false)}
                aria-label={text.close}
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/30 transition-colors hover:bg-white hover:text-black"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="divide-y divide-black/15">
              <PreferenceRow
                icon={<ShieldCheck className="h-5 w-5" />}
                title={text.necessary}
                description={text.necessaryDescription}
                status={text.alwaysActive}
              />
              <PreferenceRow
                icon={<Settings2 className="h-5 w-5" />}
                title={text.analytics}
                description={text.analyticsDescription}
                checked={analytics}
                onChange={setAnalytics}
              />
              <PreferenceRow
                icon={<Settings2 className="h-5 w-5" />}
                title={text.marketing}
                description={text.marketingDescription}
                checked={marketing}
                onChange={setMarketing}
              />
            </div>

            <div className="grid gap-2 border-t border-black p-5 sm:grid-cols-2 sm:p-7">
              <button
                type="button"
                onClick={() =>
                  saveConsent({
                    necessary: true,
                    analytics: false,
                    marketing: false,
                    version: 1,
                  })
                }
                className="h-12 border border-black px-5 text-xs font-black uppercase tracking-widest transition-colors hover:bg-neutral-100"
              >
                {text.reject}
              </button>
              <button
                type="button"
                onClick={() =>
                  saveConsent({
                    necessary: true,
                    analytics,
                    marketing,
                    version: 1,
                  })
                }
                className="h-12 bg-brand-red-600 px-5 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-brand-red-700"
              >
                {text.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PreferenceRow({
  icon,
  title,
  description,
  status,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  status?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-4 p-5 sm:p-7">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-black uppercase tracking-wide text-black">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-neutral-600">
          {description}
        </p>
      </div>
      {status ? (
        <span className="shrink-0 text-[10px] font-black uppercase tracking-wider text-brand-red-600">
          {status}
        </span>
      ) : (
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={title}
          onClick={() => onChange?.(!checked)}
          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
            checked ? "bg-brand-red-600" : "bg-neutral-300"
          }`}
        >
          <span
            className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              checked ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      )}
    </div>
  );
}
