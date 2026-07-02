import { SimuladorItem } from "../types";

export const simuladoresMock: SimuladorItem[] = [
  {
    id: "k-200r",
    image: "/produtos/K-200R®.png",
    categoryKey: "sliding",
    model: "K-200R®",
    href: "https://cdn.soft8soft.com/AROAJSY2GOEHMOFUVPIOE:3e6f3a68b1/Automec_Porta_K200R/index.html",
  },
  {
    id: "k-500r",
    image: "/produtos/K-500R®.png",
    categoryKey: "sliding",
    model: "K-500R®",
    href: "https://cdn.soft8soft.com/AROAJSY2GOEHMOFUVPIOE:3e6f3a68b1/Automec_Porta_K500R/index.html",
  },
  {
    id: "sts-20",
    image: "/produtos/STS-20®.png",
    categoryKey: "antipanic",
    model: "STS-20®",
    href: "https://cdn.soft8soft.com/AROAJSY2GOEHMOFUVPIOE:3e6f3a68b1/Automec_Porta_Sts20_b/index.html",
  },
  {
    id: "sth-70",
    image: "/produtos/STH-70®.png",
    categoryKey: "controlled",
    model: "STH-70®",
    href: "https://cdn.soft8soft.com/AROAJSY2GOEHMOFUVPIOE:3e6f3a68b1/Automec_Porta_Sth70/index.html",
  },
  {
    id: "stc-40",
    image: "/produtos/STC-40®.png",
    categoryKey: "telescopic",
    model: "STC-40®",
    href: "https://cdn.soft8soft.com/AROAJSY2GOEHMOFUVPIOE:3e6f3a68b1/Automec_Porta_STC40/index.html",
  },
  {
    id: "b120-b300",
    image: "/produtos/B-120T®  B-300T®.png",
    categoryKey: "sliding",
    model: "B-120T® / B-300T®",
    href: "https://cdn.soft8soft.com/AROAJSY2GOEHMOFUVPIOE:3e6f3a68b1/Automec_Porta_B300T/index.html",
  },
];

export const getSimuladores = async (): Promise<SimuladorItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(simuladoresMock), 100);
  });
};
