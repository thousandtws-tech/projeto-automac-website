"use client";

import React from "react";

export function FloatingContactButton() {
  const whatsappUrl = "https://wa.me/551932138251?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento%20para%20portas%20automáticas.";

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex items-center select-none group">
      <span className="absolute right-18 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px] font-bold uppercase tracking-widest bg-black text-white px-3 py-2 whitespace-nowrap pointer-events-none">
        Fale Conosco
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
        className="flex h-14 w-14 items-center justify-center bg-[#25D366] hover:bg-[#20ba59] text-white transition-all active:scale-95 duration-300 relative"
      >
        <span className="absolute inset-0 bg-[#25D366]/35 animate-ping pointer-events-none" />
        
        <svg 
          className="h-7 w-7 fill-current relative z-10" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.017 14.077.99 11.52.99c-5.443 0-9.87 4.372-9.874 9.802-.001 1.762.48 3.486 1.393 5.011l-.997 3.642 3.734-.979zm11.758-7.25c-.276-.135-1.631-.79-1.884-.88-.252-.09-.437-.135-.62.135-.184.27-.714.88-.875 1.06-.16.183-.323.205-.6.07-2.813-1.393-4.634-3.08-5.45-4.485-.218-.374-.022-.577.167-.765.17-.168.375-.434.562-.652.19-.217.252-.361.378-.602.127-.24.062-.45-.03-.585-.09-.135-.62-1.49-.85-2.03-.223-.53-.448-.46-.62-.469-.158-.008-.338-.01-.52-.01-.18 0-.476.067-.723.33-.248.263-.947.91-.947 2.22 0 1.312.97 2.58 1.102 2.755.135.176 1.907 2.87 4.62 4.024.647.275 1.15.44 1.542.563.65.204 1.242.175 1.71.107.522-.076 1.63-.655 1.859-1.285.228-.63.228-1.17.16-1.285-.07-.11-.252-.2-.53-.33z"/>
        </svg>
      </a>

    </div>
  );
}
