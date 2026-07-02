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
    counters: {
      doorsInstalled: "Doors Installed",
      activeClients: "Active Clients",
      projectsDelivered: "Projects Delivered",
      technicalSupport: "Technical Support",
    },
    about: {
      badge: "Technology & Safety",
      titlePart1: "Innovating access with ",
      titleHighlight: "high performance",
      description: "Since 1993, Automec has developed custom solutions in sliding, telescopic and hermetic automatic doors. We combine high-precision mechanics and premium design to enhance architecture and optimize corporate flows.",
      cta: "Meet Automec",
      stats: [
        { value: "+ than 35 years", description: "Making History" },
        { value: "All of Brazil", description: "And South America" },
        { value: "100%", description: "National Technology" },
      ],
    },
    features: {
      badge: "Why Automec",
      title: "Differentials",
      items: [
        { title: "Precision Engineering", description: "Custom projects with high-performance industrial mechanics for demanding environments." },
        { title: "Certified Safety", description: "ABNT-certified doors with anti-panic systems and guaranteed hermetic sealing." },
        { title: "Continuous Maintenance", description: "24h technical support with original parts and guaranteed SLA in contract for large networks." },
        { title: "Advanced Technology", description: "Latest-generation operators with smart sensors and BMS integration." },
      ],
    },
    clients: {
      badge: "Our Partners",
      title: "Who Trusts Automec",
    },
    gallery: {
      title: "Door Models",
      viewDetails: "Learn More",
      description: "Explore our complete range of automatic doors, developed with cutting-edge technology to meet different segments and architectural needs.",
      categories: {
        sliding: "Automatic Sliding Door",
        antipanic: "Automatic Anti-panic Door",
        controlled: "Automatic Controlled Environment Door",
        telescopic: "Automatic Telescopic Door",
      },
      items: [
        { title: "K-200R®", description: "High-performance sliding door with continuous flow for various sectors." },
        { title: "K-500R®", description: "Robust sliding door for high foot traffic and heavy loads." },
        { title: "STS-20®", description: "Anti-panic system with full leaf opening for maximum evacuation safety." },
        { title: "STH-70®", description: "Absolute hermetic sealing ideal for hospitals, laboratories and clean industries." },
        { title: "STC-40®", description: "Intelligent telescopic opening for passageways with reduced lateral space." },
        { title: "B-120T® / B-300T®", description: "Classic mechanism with silent operation and unmatched durability." },
      ],
    },
    cta: {
      titlePart1: "Automatic doors with ",
      titleHighlight: "precision engineering",
    },
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
    detail: {
      backToProducts: "Products",
      automec: "Automec",
      viewFullSpec: "View full specification",
      specification: "Specification",
      accessories: "Accessories",
      accessoriesDescription: "Optional accessories for the model: Microwave Detection Sensor, Microwave and Infrared Detection Sensor, No-Touch Access Sensor, Infrared Barrier with 94 safety beams, 4-position Function Selector, Electromechanical Lock, Biometric Access Control with Touchscreen Display, Password Keypad, Transmitter Control for activation, Push buttons with or without retention.",
      viewAccessories: "View accessories catalog",
      idealFor: "Ideal for",
      resources: "Resources",
      technicalSpecs: "Technical Specifications",
      application: "Conventional Application",
      otherModels: "Other Models",
      confiraOutros: "Check out other models of",
    },
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
    categories: {
      sliding: "Automatic Sliding Door",
      antipanic: "Automatic Anti-panic Door",
      controlled: "Automatic Controlled Environment Door",
      telescopic: "Automatic Telescopic Door",
    },
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
      {
        title: "No-Touch Wireless Sensor AT-22",
        description: "Opening sensor for automatic doors NO Touch (manual approach) with infrared technology.",
      },
      {
        title: "Password Keypad AT-5",
        description: "For greater security in access control, the Password Keypad is an excellent option, enabling not only access passwords but also proximity card control.",
      },
      {
        title: "Biometric Access Control AT-4",
        description: "The Biometric Access Controller is capable of efficiently and quickly controlling people's entry and exit. Each of its features was designed with the most modern technologies to make operation easier and more intuitive.",
      },
      {
        title: "Battery - Anti-panic Device",
        description: "Device responsible in case of power outage. Its function is to maintain full door opening for escape routes.",
      },
      {
        title: "No-Touch Sensor AT-3",
        description: "Opening sensor for automatic doors No Touch (manual approach) with infrared and LED technology.",
      },
    ],
    viewDetails: "View Details",
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
