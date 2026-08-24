"use client";

import Script from "next/script";

declare global {
    interface Window {
        grecaptcha?: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

const DEFAULT_TEST_SITE_KEY = "6LeIdx0UAAAAAFF9-uuFUPhdZ_Kd52FSeiWn9q3T";

export function ReCaptchaProvider() {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || DEFAULT_TEST_SITE_KEY;

    return (
        <Script
            src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
            strategy="afterInteractive"
        />
    );
}

export async function executeReCaptcha(action: string): Promise<string | null> {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || DEFAULT_TEST_SITE_KEY;
    if (typeof window === "undefined" || !window.grecaptcha) {
        return null;
    }

    return new Promise((resolve) => {
        window.grecaptcha?.ready(async () => {
            try {
                const token = await window.grecaptcha?.execute(siteKey, { action });
                resolve(token || null);
            } catch (err) {
                console.error("Erro ao gerar token do reCAPTCHA v3:", err);
                resolve(null);
            }
        });
    });
}
