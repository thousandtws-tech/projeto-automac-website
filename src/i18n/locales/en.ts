import { dictionary as ptBR } from "./pt-BR";

export const dictionary = {
  ...ptBR,
  metadata: {
    title: "Automec Automatic Doors | Secure access engineering",
    description:
      "Automatic doors with advanced technology, safety and technical support for projects throughout Brazil and South America.",
  },
  common: {
    ...ptBR.common,
    budget: "Quote",
    requestBudget: "Request a Quote",
  },
  nav: [
    { name: "Home", href: "/" },
    { name: "Products", href: "/produtos" },
    { name: "Simulator", href: "/simulador" },
    { name: "Accessories", href: "/acessorios" },
    { name: "About Us", href: "/sobre" },
    { name: "Clients", href: "/clientes" },
    { name: "Maintenance", href: "/manutencao" },
    { name: "Contact", href: "/contato" },
  ],
  home: {
    title: "Our Services",
    description: "Discover how we can transform your space with cutting-edge technology.",
  },
  hero: {
    heading: "Secure and intelligent access engineering",
    subheading:
      "We design, manufacture and install automatic doors with proprietary technology, specialized technical support and service across Brazil.",
    ctaPrimary: "Get a Quote",
    ctaSecondary: "Watch Video",
    metrics: [
      { value: "25+", label: "Years of\nexperience" },
      { value: "3,000+", label: "Projects\ndelivered" },
      { value: "100%", label: "National\ntechnology" },
      { value: "24h", label: "Technical\nsupport" },
    ],
  },
  produtos: {
    header: {
      titleLine1: "AVAILABLE",
      titleLine2: "MODELS",
      description:
        "Explore our complete range of automatic doors, developed with cutting-edge technology to meet different segments and architectural needs.",
    },
    cardBadge: "Premium Product",
    cardAction: "View Details",
    ctaTitle: "ACCESS",
    ctaHighlight: "SOLUTIONS",
    ctaDescription: "Technology, safety and design for your automation project.",
    ctaButton: "Request a Quote",
  },
  simulador: {
    header: {
      badge: "Immersive Experience",
      titleLine1: "INTERACTIVE",
      titleLine2: "3D SIMULATOR",
      description:
        "View our systems operating in real conditions through advanced 3D technology. Choose a model below to start the simulation.",
    },
    cardBadge: "3D Simulator",
    cardAction: "Open Simulator",
    ctaTitle: "NEED",
    ctaHighlight: "SUPPORT?",
    ctaDescription: "Our technical team is ready to help configure your project.",
    ctaButton: "Contact Engineering",
  },
  acessorios: {
    header: {
      titleLine1: "COMPONENTS",
      titleLine2: "& ACCESSORIES",
      description: "The perfect integration between high-performance hardware and minimalist design for access systems.",
    },
    toolbar: {
      filter: "Filter",
      searchPlaceholder: "SEARCH...",
      categories: {
        Todos: "All",
        Controle: "Control",
        Segurança: "Safety",
        Sensores: "Sensors",
        Acessórios: "Accessories",
      },
    },
    items: [
      {
        title: "Activation Push Buttons",
        description: "Developed for industrial applications with high durability and excellent finish.",
      },
      {
        title: "AS-4 Electromagnetic Lock",
        description: "The electromagnetic lock is used on swing doors to provide security in environments that require the door to remain closed.",
      },
      {
        title: "AT-1 Presence Sensor",
        description: "Motion detection sensor with microwave and high-frequency technology. Mounting height 2500mm.",
      },
      {
        title: "AT-2 Dual Detection Sensor",
        description: "Motion and presence detection sensor with dual microwave radar and analytical infrared technology.",
      },
      {
        title: "AT-7 Function Selector",
        description: "The selector allows control through 4 essential functions for automatic door operator operation.",
      },
      {
        title: "AS-3 Lock and Handle",
        description: "The electromechanical lock is required for the safety of environments that need to keep the door closed.",
      },
      {
        title: "AT-6 Remote Transmitter",
        description: "The Automec remote transmitter has a unique design and allows opening and closing the automatic door from up to 50 meters.",
      },
      {
        title: "AS-2 Infrared Barrier",
        description: "The barrier creates a 94-beam infrared light field that ensures extra safety for users.",
      },
    ],
    cta: {
      title: "CUSTOM",
      highlight: "PROJECTS",
      description: "We provide tailored solutions for complex access engineering challenges.",
      button: "Talk to a Specialist",
    },
  },
  footer: {
    ...ptBR.footer,
    contactsTitle: "Contacts",
    contactsText: "If you have any questions, contact us at",
    addressTitle: "Address",
    hoursTitle: "Business Hours",
    hoursText: "Monday to Friday from",
    serviceTitle: "Support",
    quickLinksTitle: "Quick Links",
    rights: "All rights reserved.",
    developedBy: "Developed by Agencia Clarituz",
    quickLinks: [
      { name: "Automatic Doors", href: "/produtos" },
      { name: "Accessories", href: "/acessorios" },
      { name: "Maintenance", href: "/acessorios" },
      { name: "360º Simulator", href: "/simulador" },
    ],
  },
} as const;
