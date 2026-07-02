import Image from "next/image";
import { Dictionary } from "@/src/i18n/dictionaries";
import { ProdutoApplication } from "../types";

interface ProdutosApplicationsProps {
  dictionary: Dictionary;
  applications?: ProdutoApplication[];
}

export function ProdutosApplications({ dictionary, applications }: ProdutosApplicationsProps) {
  if (!applications || applications.length === 0) return null;

  const t = dictionary.produtos.detail;

  return (
    <section className="border-b border-black bg-neutral-50">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="border-b border-black py-8">
          <h2 className="text-2xl md:text-3xl font-black tracking-[-0.02em] text-brand-red-500 uppercase">
            {t.application}
          </h2>
        </div>

        {/* Applications grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black">
          {applications.map((app, index) => (
            <div key={index} className="flex flex-col items-center p-8 md:p-12 group">
              <div className="relative w-full max-w-sm aspect-[3/2] mb-8 bg-white border border-neutral-200">
                <Image
                  src={app.image}
                  alt={app.label || ""}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-contain p-6"
                />
              </div>
              <p className="text-[13px] font-bold text-black text-center uppercase tracking-[0.1em]">
                {app.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
