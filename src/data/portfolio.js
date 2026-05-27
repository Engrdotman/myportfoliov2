const image = (name) => new URL(`../../client/image/${name}`, import.meta.url).href;

export const profile = {
  name: "Hazzan Adedotun",
  brand: "DT 'Tech",
  role: "Full-Stack Developer",
  headline: "I build polished, scalable web products with React, Django, and PostgreSQL.",
  summary:
    "Software engineer focused on building modern web platforms, real-time experiences, dashboards, and product systems that feel fast, beautiful, and reliable.",
  email: "dotmanhazzan@gmail.com",
  phone: "+234 816 559 6993",
  location: "Nigeria",
  avatar: image("portfolio.jpeg"),
  aboutImage: image("aboutpic.jfif"),
  resumeUrl: "#",
  socials: [
    { label: "GitHub", href: "https://github.com/Engrdotman" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/hazzan-lawal-434326354" },
    { label: "Twitter", href: "https://x.com/engrdotman_" },
  ],
};

export const stats = [
  { label: "Projects shipped", value: "12+" },
  { label: "Core stack", value: "React + Django" },
  { label: "Focus", value: "Product UX" },
  { label: "Database", value: "PostgreSQL" },
];

export const skills = [
  { name: "React", level: 92, group: "Frontend" },
  { name: "JavaScript", level: 90, group: "Frontend" },
  { name: "Tailwind CSS", level: 88, group: "Frontend" },
  { name: "Python", level: 90, group: "Backend" },
  { name: "Django", level: 86, group: "Backend" },
  { name: "Django REST Framework", level: 82, group: "Backend" },
  { name: "PostgreSQL", level: 80, group: "Database" },
  { name: "Node.js", level: 74, group: "Backend" },
  { name: "Git/GitHub", level: 84, group: "Workflow" },
];

export const projects = [
  {
    id: "connect-chat",
    title: ".connect Chat Platform",
    category: "Realtime Product",
    featured: true,
    image: image("chatappic.png"),
    description:
      "A real-time chat application with Django, WebSockets, media sharing, groups, stories, and a premium React interface.",
    technologies: ["React", "Django", "Channels", "WebSocket", "PostgreSQL"],
    githubUrl: "",
    liveUrl: "",
  },
  {
    id: "portfolio-platform",
    title: "Full-Stack Portfolio Platform",
    category: "SaaS Portfolio",
    featured: true,
    image: image("myportf.png"),
    description:
      "A premium portfolio platform with dynamic content, admin management, project CRUD, and scalable API architecture.",
    technologies: ["React", "Vite", "Tailwind", "Django REST", "PostgreSQL"],
    githubUrl: "https://github.com/Engrdotman",
    liveUrl: "https://myportfolio-beta-seven-60.vercel.app",
  },
  {
    id: "university-landing",
    title: "University Landing Page",
    category: "Marketing Site",
    featured: true,
    image: image("project1pic.png"),
    description:
      "A responsive university landing page with modern sections, clean visual hierarchy, and polished interactions.",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/Engrdotman/University-Landing-Page-Executive-Education-",
    liveUrl: "",
  },
  {
    id: "quiz-app",
    title: "Quiz App",
    category: "Desktop App",
    featured: false,
    image: image("quizpic.png"),
    description:
      "A simple quiz application with multiple-choice questions, scoring logic, and clean interface structure.",
    technologies: ["Python", "Tkinter"],
    githubUrl: "https://github.com/Engrdotman/quizapp",
    liveUrl: "",
  },
  {
    id: "guessing-game",
    title: "Number Guessing Game",
    category: "Desktop App",
    featured: false,
    image: image("guessgame.png"),
    description:
      "A Python number guessing game focused on simple game logic, input validation, and a friendly user flow.",
    technologies: ["Python", "Tkinter"],
    githubUrl: "https://github.com/Engrdotman/authentication-webpage",
    liveUrl: "",
  },
];

export const timeline = [
  {
    period: "Now",
    title: "Building product-grade full-stack platforms",
    body: "Designing scalable React experiences with API-first Django architecture, dynamic admin workflows, and PostgreSQL-backed content.",
  },
  {
    period: "2026",
    title: "Realtime communication systems",
    body: "Developed chat app features around sessions, messages, uploads, group spaces, stories, and realtime interactions.",
  },
  {
    period: "Foundation",
    title: "Frontend and Python foundations",
    body: "Built landing pages, games, portfolio interfaces, and Python GUI projects while strengthening product UI judgment.",
  },
];

export const services = [
  "Full-stack web app development",
  "React dashboards and admin systems",
  "Django REST API design",
  "PostgreSQL data modeling",
  "Portfolio and SaaS landing pages",
  "Realtime chat and collaboration features",
];

export const testimonials = [
  {
    name: "Product Founder",
    role: "Early-stage SaaS",
    quote:
      "Hazzan brings strong product instincts to engineering work. The UI felt polished, focused, and easy to extend.",
  },
  {
    name: "Project Collaborator",
    role: "Web platform build",
    quote:
      "The work was clean, responsive, and practical. He thinks about both the user experience and the backend structure.",
  },
];
