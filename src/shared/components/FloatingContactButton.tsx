'use client'

import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'
import { useState } from 'react'

export default function Whatsapp() {
    const [isHovered, setIsHovered] = useState(false)

    const message = encodeURIComponent('Olá! gostaria de receber um orçamento de portas automáticas. Pode me ajudar?')

    return (
        <div className="fixed right-4 bottom-4 z-50 sm:right-5 sm:bottom-5">
            <div className="pointer-events-none absolute right-0 bottom-0 h-12 w-12 sm:h-16 sm:w-16">
                <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ backgroundColor: '#25D366' }}
                ></span>
            </div>

            {isHovered && (
                <div
                    className="animate-fade-in absolute right-20 bottom-4 flex w-max max-w-[220px] items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm whitespace-nowrap text-gray-800 shadow-lg">
                    <span>Fale com nossa equipe!</span>
                </div>
            )}

            <Link
                href={`https://api.whatsapp.com/send?phone=551932138251&text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="animate-slow-pulse relative flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl transition-transform hover:scale-105 sm:h-16 sm:w-16"
                style={{ backgroundColor: '#25D366' }}
                aria-label="Fale com a Thousand TWS no WhatsApp"
            >
                <FaWhatsapp className="h-7 w-7 sm:h-10 sm:w-10" />
            </Link>
        </div>
    )
}