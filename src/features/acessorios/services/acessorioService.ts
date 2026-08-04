import {Acessorio} from "../types/acessorio";

export const acessoriosMock: Acessorio[] = [
    {
        title: "Botoeiras de Acionamento",
        description: "Desenvolvidas para aplicações industriais com alta durabilidade e excelente acabamento.",
        category: "Controle",
        image: "/acessorios/Botoeiras de Acionamento.webp"
    },
    {
        title: "Trinco Eletríma AS-4",
        description: "O trinco eletroímã é utilizado em portas de batente para a segurança em ambientes que necessitam do fechamento da porta.",
        category: "Segurança",
        image: "/acessorios/Trinco Eletríma AS-4.webp"
    },
    {
        title: "Sensor de Presença AT-1",
        description: "Sensor de detecção de movimento com tecnologia por micro-ondas e hiperfrequência. Altura de montagem 2500mm.",
        category: "Sensores",
        image: "https://res.cloudinary.com/dpgslwy15/image/upload/v1785868066/SENSOR_DE_PRESEN%C3%87A_AT-1_kfkine.webp"
    },
    {
        title: "Sensor de Dupla Detecção AT-2",
        description: "Sensor de detecção de movimento e presença com tecnologia por micro-ondas com duplo radar e infravermelho analítico.",
        category: "Sensores",
        image: "https://res.cloudinary.com/dpgslwy15/image/upload/v1785868066/SENSOR_DE_DUPLA_DETEC%C3%87%C3%83O_AT-2_z7doz8.webp"
    },
    {
        title: "Seletor de Funções AT-7",
        description: "O Seletor oferece a possibilidade de controlar através de 4 funções essenciais a operação do automatizador.",
        category: "Controle",
        image: "/acessorios/Seletor de Funções AT-7.webp"
    },
    {
        title: "Trinco e Manípulo AS-3",
        description: "O trinco eletromecânico é necessário para a segurança de ambientes que precisam manter o fechamento da porta.",
        category: "Segurança",
        image: "https://res.cloudinary.com/dpgslwy15/image/upload/v1785868066/TRINCO_E_MAN%C3%8DPULO_DE_SEGURAN%C3%87A_AS-3_lrn29o.webp"
    },
    {
        title: "Controle Transmissor AT-6",
        description: "O Controle Transmissor Automec possui um design único e permite abrir e fechar a porta automática em até 50 metros.",
        category: "Acessórios",
        image: "/acessorios/Controle Transmissor AT-6.webp"
    },
    {
        title: "Barreira infravermelha AS-2",
        description: "A barreira forma um campo de luz infravermelha de 94 feixes que garante segurança extra ao usuário.",
        category: "Segurança",
        image: "/acessorios/Barreira infravermelha AS-2.webp"
    },
    {
        title: "Sensor No-Touch sem fio AT-22\n",
        description: "Sensor de abertura para portas automáticas NO Touch (aproximação manual) com tecnologia infravermelho.\n" + "\n",
        category: "Segurança",
        image: "/acessorios/Sensor No-Touch sem fio AT-22.webp"
    },
    {
        title: "Teclado de SenhaAT-5\n",
        description: "Para obter maior segurança no controle de acesso, uma excelente opção é o Teclado de Senha, que possibilita além da senha de acesso, também o controle por cartão de proximidade.\n" + "\n",
        category: "Segurança",
        image: "/acessorios/Teclado de SenhaAT-5.webp"
    },
    {
        title: "Controle de Acesso Biométrico AT-4\n",
        description: "O Controlador de Acesso Biométrico é capaz controlar com eficiência e rapidez a entrada e saída de pessoas. Cada um de seus recursos foi concebido com as mais modernas tecnologias para tornar a sua operação mais fácil e intuitiva.\n" + "\n",
        category: "Segurança",
        image: "https://res.cloudinary.com/dpgslwy15/image/upload/v1785868065/CONTROLE_DE_ACESSO_BIOM%C3%89TRICO_AT-4_wish5o.webp"
    },
    {
        title: "Bateria - Dispositivo Antipânico\n",
        description: "Dispositivo responsável em caso de queda de energia elétrica. Sua função é manter a abertura total da porta para rota de fuga.\n" + "\n",
        category: "Segurança",
        image: "/acessorios/Bateria - Dispositivo Antipânico.webp"
    },
    {
        title: "Sensor No-Touch AT-3\n",
        description: "Sensor de abertura para portas automáticas No Touch (aproximação manual) com tecnologia infravermelha e LED.\n" + "\n",
        category: "Segurança",
        image: "/acessorios/Sensor No-Touch AT-3.webp"
    },


];

export const fetchAcessorios = async (): Promise<Acessorio[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(acessoriosMock), 100);
    });
};
