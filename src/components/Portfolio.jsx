import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Chrome,
  Code2,
  Cpu,
  Database,
  Download,
  Github,
  Layers3,
  Mail,
  Menu,
  MessageSquare,
  Moon,
  Server,
  Sun,
  X,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Badge, ButtonLink, MagneticCard, Section } from "./ui";
import { profile, services, stats, timeline } from "../data/portfolio";
import { loadCollection } from "../lib/storage";

const navItems = ["About", "Projects", "Skills", "Journey", "Services", "Contact"];

// Mapping technology names to suitable icons
const TechIcon = React.memo(({ name }) => {
  const n = name.toLowerCase();
  if (n.includes("react") || n.includes("javascript") || n.includes("frontend")) return <Chrome size={16} />;
  if (n.includes("python") || n.includes("django") || n.includes("node") || n.includes("backend")) return <Server size={16} />;
  if (n.includes("db") || n.includes("sql") || n.includes("postgres")) return <Database size={16} />;
  return <Cpu size={16} />;
});

function Navbar({ darkMode, setDarkMode, activeSection }) {
  const [open, setOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
  }, [open]);

  return (
    <header className={`site-nav ${open ? "menu-is-open" : ""}`}>
      <a className="brand-mark" href="#home">
        <span>DT</span>
        <strong>{profile.brand}</strong>
      </a>
      <nav className={open ? "open" : ""}>
        {navItems.map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            className={activeSection === item.toLowerCase() ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {item}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <button className="icon-button" type="button" onClick={() => setDarkMode((value) => !value)} aria-label="Toggle theme">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="icon-button mobile-menu" type="button" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
    </header>
  );
}

function PremiumTypewriter({ text }) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleType = () => {
      const fullText = text;
      const updatedText = isDeleting
        ? fullText.substring(0, displayText.length - 1)
        : fullText.substring(0, displayText.length + 1);

      setDisplayText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        setTypingSpeed(2000); // Pause at end
        setIsDeleting(true);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setTypingSpeed(500);
      } else {
        setTypingSpeed(isDeleting ? 40 : 100);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, typingSpeed, text]);

  return (
    <span className="typewriter-container">
      <span className="typewriter-text">{displayText}</span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="typewriter-cursor"
      />
    </span>
  );
}

function Hero({ projects }) {
  const featured = useMemo(() => projects.find((p) => p.featured) || projects[0], [projects]);

  return (
    <section className="hero-section" id="home">
      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero-kicker">
            <Code2 size={16} />
            <PremiumTypewriter text="Hazzan Adedotun — Full-Stack Developer" />
          </span>
          <h1>
            <PremiumTypewriter text="Building premium digital products with clarity, speed, and craft." />
          </h1>
          <p>{profile.summary}</p>
          <div className="hero-actions">
            <ButtonLink href="#projects">Explore projects</ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              Contact me
            </ButtonLink>
          </div>
          <div className="stats-row">
            {stats.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero-console"
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          <div className="console-top">
            <span />
            <span />
            <span />
            <b>current-build.tsx</b>
          </div>
          <div className="profile-orbit">
            <img src={profile.avatar} alt={profile.name} />
            <div>
              <strong>{profile.name}</strong>
              <span>{profile.role}</span>
            </div>
          </div>
          <div className="current-project">
            <img src={featured?.images?.[0] || featured?.image} alt={featured?.title} />
            <div>
              <span>Current showcase</span>
              <strong>{featured?.title}</strong>
              <p>{featured?.description}</p>
            </div>
          </div>
          <div className="code-lines">
            <span>const stack = ["React", "Django", "PostgreSQL"];</span>
            <span>{'ship(product.with({ polish: "premium" }));'}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <MagneticCard className="project-card">
      <div className="project-image">
        <img src={project.images?.[0] || project.image} alt={project.title} />
        {project.featured && <span>Featured</span>}
      </div>
      <div className="project-body">
        <small>{project.category}</small>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="badge-row">
          {project.technologies.map((tech) => (
            <Badge key={tech}>
              <TechIcon name={tech} />
              {tech}
            </Badge>
          ))}
        </div>
        <div className="project-actions">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              <Github size={16} />
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              <ArrowUpRight size={16} />
              Live demo
            </a>
          )}
        </div>
      </div>
    </MagneticCard>
  );
}

export default function Portfolio({ openAdmin }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const [projects, setProjects] = useState(() => loadCollection("projects"));
  const [skills, setSkills] = useState(() => loadCollection("skills"));
  const [testimonials, setTestimonials] = useState(() => loadCollection("testimonials"));
  const [activeSection, setActiveSection] = useState("");
  const [status, setStatus] = useState({ submitting: false, success: null });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const ids = ["about", "projects", "skills", "journey", "services", "contact"];
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: null });
    const data = Object.fromEntries(new FormData(e.target));
    const API_URL = import.meta.env.VITE_API_URL || "https://myportfolio-backendready.onrender.com";
    
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setStatus({ submitting: false, success: result.success });
      if (result.success) e.target.reset();
    } catch {
      setStatus({ submitting: false, success: false });
    }
  };

  useEffect(() => {
    const sync = () => {
      setProjects(loadCollection("projects"));
      setSkills(loadCollection("skills"));
      setTestimonials(loadCollection("testimonials"));
    };
    window.addEventListener("storage", sync);
    window.addEventListener("portfolio-data", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("portfolio-data", sync);
    };
  }, []);

  const featured = useMemo(() => projects.filter((project) => project.featured), [projects]);

  return (
    <main className={darkMode ? "portfolio-app dark" : "portfolio-app light"}>
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        activeSection={activeSection} 
      />
      <Hero projects={projects} />

      <Section id="about" eyebrow="About" title="Engineer with product taste and full-stack execution.">
        <div className="about-grid">
          <MagneticCard>
            <img className="about-image" src={profile.aboutImage} alt={profile.name} />
          </MagneticCard>
          <div className="about-copy">
          <div className="about-bio">
            <p>
              I’m <strong>{profile.name}</strong>, a software developer focused on building modern, scalable, and
              user-centered web applications. I enjoy transforming ideas into real products with clean architecture,
              responsive interfaces, and smooth user experiences.
            </p>
            <p>
              My primary stack includes <strong>React</strong> for frontend development and <strong>Django</strong> for
              backend systems, with experience building real-time applications using WebSockets and modern APIs. I’m
              passionate about creating products that are not only functional but also visually polished.
            </p>
            <p>
              I enjoy working on projects involving real-time communication, SaaS platforms, and interactive web
              experiences. Currently, I’m actively building and improving <strong>".connect"</strong> — a modern
              communication platform designed with scalability and premium user experience in mind.
            </p>
            <p>
              I’m constantly learning, experimenting with new technologies, and improving my development workflow to build production-ready applications that solve real problems.
            </p>
          </div>
            <div className="capability-grid">
              <span>
                <Code2 /> Frontend systems
              </span>
              <span>
                <Database /> Backend APIs
              </span>
              <span>
                <Layers3 /> Admin dashboards
              </span>
            </div>
          </div>
        </div>
      </Section>

      <Section id="projects" eyebrow="Featured work" title="Interactive project showcase with premium cards.">
        <div className="project-grid">
          {(featured.length ? featured : projects).map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </Section>

      <Section id="skills" eyebrow="Stack" title="A practical stack for product-grade full-stack builds.">
        <div className="skills-grid">
          {skills.map((skill) => (
            <MagneticCard className="skill-card" key={skill.name}>
              <div className="skill-header">
                <TechIcon name={skill.name} />
                <div>
                  <strong>{skill.name}</strong>
                  <span>{skill.group}</span>
                </div>
              </div>
              <i>
                <b style={{ width: `${skill.level}%` }} />
              </i>
            </MagneticCard>
          ))}
        </div>
      </Section>

      <Section id="journey" eyebrow="Experience" title="Technical expertise and product development.">
        <div className="timeline">
          {timeline.map((item) => (
            <MagneticCard className="timeline-item" key={item.title}>
              <span>{item.period}</span>
              <div className="experience-content">
                <h3>{item.title}</h3>
                {item.points ? (
                  <ul className="experience-list">
                    {item.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{item.body}</p>
                )}
              </div>
            </MagneticCard>
          ))}
        </div>
      </Section>

      <Section id="services" eyebrow="Services" title="Ways I can help teams and founders build better.">
        <div className="service-grid">
          {services.map((service) => (
            <MagneticCard key={service}>
              <h3>{service}</h3>
            </MagneticCard>
          ))}
        </div>
      </Section>

      <Section id="testimonials" eyebrow="Proof" title="What collaborators notice.">
        <div className="testimonial-grid">
          {testimonials.map((item, idx) => (
            <MagneticCard 
              key={item.name} 
              className="testimonial-card"
              initial={{ opacity: 0, rotateX: -20, y: 30 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="testimonial-header">
                <img src={item.avatar} alt={item.name} className="commenter-thumb" />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
              <p className="testimonial-quote">"{item.quote}"</p>
            </MagneticCard>
          ))}
        </div>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Have a product idea or role in mind?">
        <div className="contact-panel">
          <div>
            <p>
              Reach out for collaborations, freelance builds, dashboard systems, portfolio platforms, or full-stack
              product work.
            </p>
            <div className="social-row">
              {profile.socials.map((social) => (
                <a href={social.href} target="_blank" rel="noreferrer" key={social.label}>
                  {social.label}
                </a>
              ))}
            </div>
          </div>
          <form onSubmit={handleContactSubmit}>
            <div className="contact-quick-links">
              <a href={`mailto:${profile.email}`} className="quick-link"><Mail size={16}/> {profile.email}</a>
              <a href="https://wa.me/2348165596993" target="_blank" rel="noreferrer" className="quick-link whatsapp"><MessageSquare size={16}/> WhatsApp Chat</a>
            </div>
            <input name="name" placeholder="Your name" required />
            <input name="email" type="email" placeholder="Email address" required />
            <textarea name="message" placeholder="Tell me what you want to build" required />
            <button className="btn primary" type="submit" disabled={status.submitting}>
              <Mail size={16} />
              {status.submitting ? "Sending..." : "Send message"}
            </button>
            {status.success === true && <p style={{ color: "green", marginTop: "1rem" }}>Message sent! ✅</p>}
            {status.success === false && <p style={{ color: "red", marginTop: "1rem" }}>Failed to send. Try again.</p>}
            <a className="resume-link" href={profile.resumeUrl}>
              <Download size={16} />
              Download resume
            </a>
          </form>
        </div>
      </Section>
      <footer className="simple-footer">
        <p>&copy; {new Date().getFullYear()} {profile.name}</p>
        <a href="#admin" onClick={(e) => { e.preventDefault(); openAdmin(); }} className="admin-trigger">Admin Access</a>
      </footer>
    </main>
  );
}
