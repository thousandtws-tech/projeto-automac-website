import { Acessorio } from "../types/acessorio";

export const acessoriosMock: Acessorio[] = [
  {
    title: "Botoeiras de Acionamento",
    description: "Desenvolvidas para aplicações industriais com alta durabilidade e excelente acabamento.",
    category: "Controle",
    image: "/acessorios/betoneiras.png"
  },
  {
    title: "Trinco Eletríma AS-4",
    description: "O trinco eletroímã é utilizado em portas de batente para a segurança em ambientes que necessitam do fechamento da porta.",
    category: "Segurança",
    image: "/acessorios/betoneiras.png"
  },
  {
    title: "Sensor de Presença AT-1",
    description: "Sensor de detecção de movimento com tecnologia por micro-ondas e hiperfrequência. Altura de montagem 2500mm.",
    category: "Sensores",
    image: "/acessorios/betoneiras.png"
  },
  {
    title: "Sensor de Dupla Detecção AT-2",
    description: "Sensor de detecção de movimento e presença com tecnologia por micro-ondas com duplo radar e infravermelho analítico.",
    category: "Sensores",
    image: "/acessorios/betoneiras.png"
  },
  {
    title: "Seletor de Funções AT-7",
    description: "O Seletor oferece a possibilidade de controlar através de 4 funções essenciais a operação do automatizador.",
    category: "Controle",
    image: "/acessorios/betoneiras.png"
  },
  {
    title: "Trinco e Manípulo AS-3",
    description: "O trinco eletromecânico é necessário para a segurança de ambientes que precisam manter o fechamento da porta.",
    category: "Segurança",
    image: "/acessorios/betoneiras.png"
  },
  {
    title: "Controle Transmissor AT-6",
    description: "O Controle Transmissor Automec possui um design único e permite abrir e fechar a porta automática em até 50 metros.",
    category: "Acessórios",
    image: "/acessorios/betoneiras.png"
  },
  {
    title: "Barreira infravermelha AS-2",
    description: "A barreira forma um campo de luz infravermelha de 94 feixes que garante segurança extra ao usuário.",
    category: "Segurança",
    image: "/acessorios/betoneiras.png"
  }
];

export const fetchAcessorios = async (): Promise<Acessorio[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(acessoriosMock), 100);
  });
};
