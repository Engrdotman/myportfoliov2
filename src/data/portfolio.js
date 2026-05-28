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
    { label: "WhatsApp", href: "https://wa.me/2348165596993" },
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
    period: "Frontend",
    title: "Interactive UI/UX",
    points: [
      "Building responsive web applications using React",
      "Creating reusable component architectures and scalable systems",
      "Developing modern UI/UX with Tailwind CSS and Framer Motion",
      "Implementing real-time features and dynamic interfaces",
    ],
  },
  {
    period: "Backend",
    title: "API & Infrastructure",
    points: [
      "Building REST APIs with Django REST Framework",
      "Developing realtime systems using Django Channels and WebSockets",
      "Managing authentication, databases, and server-side integrations",
    ],
  },
  {
    period: "Product",
    title: "Full-Stack Solutions",
    points: [
      "Developing '.connect' — a realtime communication platform",
      "Building multi-tenant receipt management systems",
      "Focusing on usability, performance, and clean system design",
    ],
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
    avatar: "https://i.pravatar.cc/150?u=founder",
    quote:
      "Hazzan brings strong product instincts to engineering work. The UI felt polished, focused, and easy to extend.",
  },
  {
    name: "Project Collaborator",
    role: "Web platform build",
    avatar: "https://i.pravatar.cc/150?u=collab",
    quote:
      "The work was clean, responsive, and practical. He thinks about both the user experience and the backend structure.",
  },
];
