import { dictionary as ptBR } from "./pt-BR";

export const dictionary = {
  ...ptBR,
  metadata: {
    title: "Automec Puertas Automáticas | Ingeniería de acceso seguro",
    description:
      "Puertas automáticas con tecnología avanzada, seguridad y soporte técnico para proyectos en Brasil y América del Sur.",
  },
  common: {
    ...ptBR.common,
    budget: "Presupuesto",
    requestBudget: "Solicitar Presupuesto",
  },
  nav: [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "/produtos" },
    { name: "Simulador", href: "/simulador" },
    { name: "Accesorios", href: "/acessorios" },
    { name: "Sobre Nosotros", href: "/sobre" },
    { name: "Clientes", href: "/clientes" },
    { name: "Mantenimiento", href: "/manutencao" },
    { name: "Contacto", href: "/contato" },
  ],
  home: {
    title: "Nuestros Servicios",
    description: "Descubre cómo podemos transformar tu espacio con tecnología de punta.",
  },
  hero: {
    heading: "Ingeniería de acceso seguro e inteligente",
    subheading:
      "Diseñamos, fabricamos e instalamos puertas automáticas con tecnología propia, soporte técnico especializado y servicio en todo Brasil.",
    ctaPrimary: "Presupuesto",
    ctaSecondary: "Ver Video",
    metrics: [
      { value: "25+", label: "Años de\nexperiencia" },
      { value: "3.000+", label: "Proyectos\nentregados" },
      { value: "100%", label: "Tecnología\nnacional" },
      { value: "24h", label: "Soporte\ntécnico" },
    ],
  },
  produtos: {
    header: {
      titleLine1: "MODELOS",
      titleLine2: "DISPONIBLES",
      description:
        "Conoce nuestra gama completa de puertas automáticas, desarrolladas con tecnología de punta para atender diversos segmentos y necesidades arquitectónicas.",
    },
    cardBadge: "Producto Premium",
    cardAction: "Ver Detalles",
    ctaTitle: "SOLUCIONES DE",
    ctaHighlight: "ACCESO",
    ctaDescription: "Tecnología, seguridad y diseño para tu proyecto de automatización.",
    ctaButton: "Solicitar Presupuesto",
  },
  simulador: {
    header: {
      badge: "Experiencia Inmersiva",
      titleLine1: "SIMULADOR",
      titleLine2: "INTERACTIVO 3D",
      description:
        "Visualiza nuestros sistemas en operación real mediante tecnología 3D avanzada. Elige un modelo abajo para iniciar la simulación.",
    },
    cardBadge: "Simulador 3D",
    cardAction: "Abrir Simulador",
    ctaTitle: "¿NECESITAS",
    ctaHighlight: "SOPORTE?",
    ctaDescription: "Nuestro equipo técnico está listo para ayudar en la configuración de tu proyecto.",
    ctaButton: "Contactar Ingeniería",
  },
  acessorios: {
    header: {
      titleLine1: "COMPONENTES",
      titleLine2: "& ACCESORIOS",
      description:
        "La integración perfecta entre hardware de alto rendimiento y diseño minimalista para sistemas de acceso.",
    },
    toolbar: {
      filter: "Filtrar",
      searchPlaceholder: "BUSCAR...",
      categories: {
        Todos: "Todos",
        Controle: "Control",
        Segurança: "Seguridad",
        Sensores: "Sensores",
        Acessórios: "Accesorios",
      },
    },
    items: [
      {
        title: "Botoneras de Accionamiento",
        description: "Desarrolladas para aplicaciones industriales con alta durabilidad y excelente acabado.",
      },
      {
        title: "Cerradura Electromagnética AS-4",
        description: "La cerradura electromagnética se utiliza en puertas batientes para la seguridad en ambientes que necesitan mantener la puerta cerrada.",
      },
      {
        title: "Sensor de Presencia AT-1",
        description: "Sensor de detección de movimiento con tecnología de microondas e hiperfrecuencia. Altura de montaje 2500mm.",
      },
      {
        title: "Sensor de Doble Detección AT-2",
        description: "Sensor de detección de movimiento y presencia con tecnología de microondas con doble radar e infrarrojo analítico.",
      },
      {
        title: "Selector de Funciones AT-7",
        description: "El selector ofrece la posibilidad de controlar mediante 4 funciones esenciales la operación del automatizador.",
      },
      {
        title: "Cerradura y Manija AS-3",
        description: "La cerradura electromecánica es necesaria para la seguridad de ambientes que deben mantener la puerta cerrada.",
      },
      {
        title: "Control Transmisor AT-6",
        description: "El control transmisor Automec posee un diseño único y permite abrir y cerrar la puerta automática hasta 50 metros.",
      },
      {
        title: "Barrera Infrarroja AS-2",
        description: "La barrera forma un campo de luz infrarroja de 94 haces que garantiza seguridad adicional al usuario.",
      },
    ],
    cta: {
      title: "PROYECTOS",
      highlight: "PERSONALIZADOS",
      description: "Tenemos soluciones personalizadas para desafíos complejos de ingeniería de acceso.",
      button: "Hablar con Especialista",
    },
  },
  footer: {
    ...ptBR.footer,
    contactsTitle: "Contactos",
    contactsText: "Si tienes alguna pregunta, contáctanos en",
    addressTitle: "Dirección",
    hoursTitle: "Horario de Atención",
    hoursText: "Lunes a viernes de",
    serviceTitle: "Atención",
    quickLinksTitle: "Enlaces Rápidos",
    rights: "Todos los derechos reservados.",
    developedBy: "Desarrollado por Agencia Clarituz",
    quickLinks: [
      { name: "Puertas Automáticas", href: "/produtos" },
      { name: "Accesorios", href: "/acessorios" },
      { name: "Mantenimiento", href: "/acessorios" },
      { name: "Simulador 360º", href: "/simulador" },
    ],
  },
} as const;
