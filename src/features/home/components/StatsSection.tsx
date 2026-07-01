import React from "react";
import { Award, Globe2, Cpu } from "lucide-react";

export function StatsSection() {
  const stats = [
    { 
      title: "+ de 30 anos", 
      description: "Fazendo História",
      icon: Award
    },
    { 
      title: "Atendemos", 
      description: "Todo o Brasil e América do Sul",
      icon: Globe2
    },
    { 
      title: "Tecnologia", 
      description: "Avançada",
      icon: Cpu
    },
  ];

  return (
    <section className="border-b border-black bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 border border-black">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center p-10 md:p-12 border-r border-black last:border-r-0 transition-colors hover:bg-neutral-50"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center bg-black text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-black mb-2">
                  {stat.title}
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
