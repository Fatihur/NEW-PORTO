import React from 'react';
import { Project, Service, NavigationItem, ExperienceItem } from './types';
import { Layers, Box, Layout, Terminal } from 'lucide-react';

export const NAV_ITEMS: NavigationItem[] = [
  { label: 'Work', href: '#work', type: 'link' },
  { label: 'Services', href: '#services', type: 'link' },
  { label: 'Experience', href: '#experience', type: 'link' },
  { label: 'About', href: '#about', type: 'link' },
  { label: 'Contact', href: '#contact', type: 'link' },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 1,
    role: "Senior Frontend Engineer",
    company: "TechFlow Solutions",
    period: "2023 — Present",
    description: "Leading the frontend migration of a legacy monolithic application to a micro-frontend architecture using React and Module Federation. Improved build times by 60% and established a new internal design system.",
    skills: ["React", "Micro-frontends", "TypeScript", "CI/CD"]
  },
  {
    id: 2,
    role: "Product Designer & Dev",
    company: "Creative Studio X",
    period: "2021 — 2023",
    description: "Bridged the gap between design and engineering. Responsible for high-fidelity prototyping in Figma and direct implementation in Next.js. Launched 12+ client websites winning 3 Awwwards mentions.",
    skills: ["Next.js", "Framer Motion", "Figma", "WebGL"]
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "StartUp Inc",
    period: "2019 — 2021",
    description: "Core member of the team building a SaaS dashboard for financial analytics. Optimized data visualization components to handle thousands of real-time data points without dropping frames.",
    skills: ["Vue.js", "D3.js", "SASS", "Jest"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "Web Application",
    description: "A comprehensive financial analytics platform focusing on data visualization and real-time trading metrics.",
    longDescription: "Built for a leading proprietary trading firm, this dashboard aggregates millisecond-level data into actionable insights. The challenge was rendering thousands of data points without compromising the 60fps frame rate. We utilized WebGL for charting and WebSockets for real-time streaming.",
    image: "https://picsum.photos/800/600?random=1",
    gallery: [
      "https://picsum.photos/800/600?random=10",
      "https://picsum.photos/800/600?random=11",
      "https://picsum.photos/800/600?random=12"
    ],
    year: "2024",
    link: "#",
    techStack: ["React", "TypeScript", "WebGL", "WebSockets", "D3.js"],
    client: "AlphaTrade Corp"
  },
  {
    id: 2,
    title: "Architecture Firm",
    category: "Brand Identity & Web",
    description: "Minimalist portfolio for a leading architecture studio. The design emphasizes negative space.",
    longDescription: "A digital presence that mirrors the firm's physical philosophy: Brutalism meets Sustainability. The site features smooth scroll animations, large typography, and an immersive project gallery that lets the imagery speak for itself.",
    image: "https://picsum.photos/800/600?random=2",
    gallery: [
      "https://picsum.photos/800/600?random=20",
      "https://picsum.photos/800/600?random=21"
    ],
    year: "2023",
    link: "#",
    techStack: ["Next.js", "Framer Motion", "Sanity CMS"],
    client: "Studio Kroma"
  },
  {
    id: 3,
    title: "E-Commerce Core",
    category: "System Design",
    description: "Headless commerce solution providing modular frontend components for scalable retail applications.",
    longDescription: "We architected a component library used across 5 different sub-brands. The focus was on accessibility (WCAG 2.1 AA) and bundle size optimization. This core system reduced time-to-market for new product lines by 40%.",
    image: "https://picsum.photos/800/600?random=3",
    gallery: [
      "https://picsum.photos/800/600?random=30",
      "https://picsum.photos/800/600?random=31"
    ],
    year: "2023",
    link: "#",
    techStack: ["React", "Storybook", "Tailwind CSS", "Jest"],
    client: "GlobalRetail Inc"
  },
  {
    id: 4,
    title: "Urban Data Viz",
    category: "Data Visualization",
    description: "Mapping city transit patterns in real-time using public API data.",
    image: "https://picsum.photos/800/600?random=4",
    year: "2022",
    link: "#",
    techStack: ["Mapbox GL", "React", "Python"],
    client: "City Planning Bureau"
  },
  {
    id: 5,
    title: "Museo Digital",
    category: "Mobile App",
    description: "Augmented reality guide for modern art museums.",
    image: "https://picsum.photos/800/600?random=5",
    year: "2022",
    link: "#",
    techStack: ["React Native", "ViroReact", "Firebase"],
    client: "National Gallery"
  },
  {
    id: 6,
    title: "Crypto Exchange",
    category: "Fintech",
    description: "Secure and fast crypto exchange interface.",
    image: "https://picsum.photos/800/600?random=6",
    year: "2024",
    link: "#",
    techStack: ["Vue.js", "Nuxt", "Go"],
    client: "CoinVault"
  }
];

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "Frontend Engineering",
    description: "Scalable React architectures, performance optimization, and accessible DOM structures.",
    icon: <Terminal className="w-6 h-6" strokeWidth={1.5} />
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Wireframing, prototyping, and high-fidelity interface design with a focus on usability.",
    icon: <Layout className="w-6 h-6" strokeWidth={1.5} />
  },
  {
    id: 3,
    title: "Design Systems",
    description: "Creating unified component libraries to ensure consistency across digital products.",
    icon: <Box className="w-6 h-6" strokeWidth={1.5} />
  },
  {
    id: 4,
    title: "Technical Strategy",
    description: "Consulting on tech stack choices, deployment pipelines, and code quality standards.",
    icon: <Layers className="w-6 h-6" strokeWidth={1.5} />
  }
];