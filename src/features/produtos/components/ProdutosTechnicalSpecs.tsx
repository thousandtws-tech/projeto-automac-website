"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Dictionary } from "@/src/i18n/dictionaries";
import { ProdutoTechnicalSpec } from "../types";
import { FormattedTrademark } from "@shared/components/FormattedTrademark";

interface ProdutosTechnicalSpecsProps {
  dictionary: Dictionary;
  specs?: ProdutoTechnicalSpec[];
  model?: string;
}

export function ProdutosTechnicalSpecs({ dictionary, specs, model }: ProdutosTechnicalSpecsProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!specs || specs.length === 0) return null;

  const t = dictionary.produtos.detail;

  return (
    <section className="border-b border-black">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="border-b border-black py-8">
          <h2 className="text-2xl md:text-3xl font-black tracking-[-0.02em] text-black uppercase">
            {t.technicalSpecs}
          </h2>
        </div>

        {/* Tabs */}
        {specs.length > 1 && (
          <div className="flex border-b border-black">
            {specs.map((spec, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "px-8 py-5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors border-b-2 -mb-px",
                  activeTab === index
                    ? "border-brand-red-500 text-brand-red-500 bg-neutral-50"
                    : "border-transparent text-neutral-400 hover:text-black hover:bg-neutral-50"
                )}
              >
                <FormattedTrademark text={spec.tabLabel} />
              </button>
            ))}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {specs[activeTab].specs.map((spec, index) => (
                <tr
                  key={index}
                  className="border-b border-neutral-200 last:border-b-0"
                >
                  <td className="py-5 px-8 text-[13px] font-bold text-black whitespace-nowrap w-[300px] bg-neutral-50 border-r border-neutral-200">
                    {spec.label}
                  </td>
                  <td className="py-5 px-8 text-[13px] leading-relaxed text-neutral-700">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
