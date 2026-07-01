import { ProdutoItem } from "../types";

export const produtosMock: ProdutoItem[] = [
  {
    id: "k-200r",
    image: "/produtos/K-200R®.png",
    title: "Porta Automática Deslizante",
    model: "K-200R®",
    href: "#",
  },
  {
    id: "k-500r",
    image: "/produtos/K-500R®.png",
    title: "Porta Automática Deslizante",
    model: "K-500R®",
    href: "#",
  },
  {
    id: "sts-20",
    image: "/produtos/STS-20®.png",
    title: "Porta Automática Antipânico",
    model: "STS-20®",
    href: "#",
  },
  {
    id: "sth-70",
    image: "/produtos/STH-70®.png",
    title: "Porta Automática Ambientes Controlados",
    model: "STH-70®",
    href: "#",
  },
  {
    id: "stc-40",
    image: "/produtos/STC-40®.png",
    title: "Porta Automática Telescópica",
    model: "STC-40®",
    href: "#",
  },
  {
    id: "b120-b300",
    image: "/produtos/B-120T®  B-300T®.png",
    title: "Porta Automática Deslizante",
    model: "B-120T® / B-300T®",
    href: "#",
  },
];

export const getProdutos = async (): Promise<ProdutoItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(produtosMock), 100);
  });
};
