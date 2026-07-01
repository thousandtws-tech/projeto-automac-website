import { Gallery4, type Gallery4Props } from "@/components/ui/gallery4";

const demoData: Gallery4Props = {
  title: "Modelos de Portas",
  description:
    "Conheça nossa gama completa de portas automáticas, desenvolvidas com tecnologia de ponta para atender aos mais diversos segmentos e necessidades arquitetônicas.",
  items: [
    {
      id: "k-200r",
      category: "Porta Automática Deslizante",
      title: "K-200R®",
      description: "Porta deslizante de alta performance e fluxo contínuo para diversos setores.",
      href: "#",
      image: "/produtos/K-200R®.png",
    },
    {
      id: "k-500r",
      category: "Porta Automática Deslizante",
      title: "K-500R®",
      description: "Porta deslizante robusta para alto fluxo de pessoas e cargas pesadas.",
      href: "#",
      image: "/produtos/K-500R®.png",
    },
    {
      id: "sts-20",
      category: "Porta Automática Antipânico",
      title: "STS-20®",
      description: "Sistema antipânico de abertura integral das folhas para máxima segurança de evacuação.",
      href: "#",
      image: "/produtos/STS-20®.png",
    },
    {
      id: "sth-70",
      category: "Porta Automática Ambientes Controlados",
      title: "STH-70®",
      description: "Vedação hermética absoluta ideal para hospitais, laboratórios e indústrias limpas.",
      href: "#",
      image: "/produtos/STH-70®.png",
    },
    {
      id: "stc-40",
      category: "Porta Automática Telescópica",
      title: "STC-40®",
      description: "Abertura telescópica inteligente para vãos de passagem com espaço lateral reduzido.",
      href: "#",
      image: "/produtos/STC-40®.png",
    },
    {
      id: "b120-b300",
      category: "Porta Automática Deslizante",
      title: "B-120T® / B-300T®",
      description: "Mecanismo clássico de funcionamento silencioso e durabilidade inigualável.",
      href: "#",
      image: "/produtos/B-120T®  B-300T®.png",
    },
  ],
};

function Gallery4Demo() {
  return <Gallery4 {...demoData} />;
}

export { Gallery4Demo };
