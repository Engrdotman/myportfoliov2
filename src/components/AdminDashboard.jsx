import { motion } from "framer-motion";
import { ImagePlus, LayoutDashboard, Lock, LogOut, Plus, Save, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { profile } from "../data/portfolio";
import { loadCollection, saveCollection } from "../lib/storage";

const blankProject = {
  title: "",
  category: "Web Platform",
  featured: false,
  images: ["", "", "", "", ""],
  description: "",
  technologies: [],
  githubUrl: "",
  liveUrl: "",
};

function TextInput({ label, value, onChange, textarea = false, type = "text" }) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const API_URL = import.meta.env.VITE_API_URL || "https://myportfolio-backendready.onrender.com";

    try {
      // Points to our new Express login endpoint
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.access) {
        localStorage.setItem("portfolio.adminToken", data.access);
        onLogin();
      } else {
        setError(data.detail || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Could not connect to the authentication server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login">
      <motion.form
        className="admin-login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
      >
        <span>
          <Lock size={18} />
          Admin access
        </span>
        <h1>Manage {profile.brand}</h1>
        <p>Enter your credentials to manage your portfolio content.</p>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(event) => setUsername(event.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Admin password" 
          value={password} 
          onChange={(event) => setPassword(event.target.value)} 
          required 
        />
        {error && <p style={{ color: "#ff4d4d", fontSize: "0.85rem", marginTop: "0.5rem" }}>{error}</p>}
        <button className="btn primary" disabled={loading}>
          {loading ? "Authenticating..." : "Enter dashboard"}
        </button>
      </motion.form>
    </main>
  );
}

export default function AdminDashboard({ onExit }) {
  const [authed, setAuthed] = useState(Boolean(localStorage.getItem("portfolio.adminToken")));
  const [tab, setTab] = useState("projects");
  const [projects, setProjects] = useState(() => loadCollection("projects"));
  const [skills, setSkills] = useState(() => loadCollection("skills"));
  const [testimonials, setTestimonials] = useState(() => loadCollection("testimonials"));
  const [selectedProject, setSelectedProject] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("portfolio.adminToken");
    setAuthed(false);
  };

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  function persist(key, value, setter) {
    setter(value);
    saveCollection(key, value);
    window.dispatchEvent(new Event("portfolio-data"));
  }

  const project = projects[selectedProject] || blankProject;

  return (
    <main className="admin-app">
      <aside className="admin-sidebar">
        <div className="brand-mark">
          <span>DT</span>
          <strong>Admin</strong>
        </div>
        {["projects", "skills", "testimonials", "content"].map((item) => (
          <button className={tab === item ? "active" : ""} key={item} onClick={() => setTab(item)}>
            <LayoutDashboard size={17} />
            {item}
          </button>
        ))}
        <button onClick={handleLogout}>
          <LogOut size={17} />
          Logout
        </button>
        <button onClick={onExit}>View portfolio</button>
      </aside>

      <section className="admin-main">
        <header className="admin-header">
          <div>
            <span>Portfolio CMS</span>
            <h1>Manage dynamic portfolio content</h1>
          </div>
          <button
            className="btn primary"
            onClick={() => {
              const next = [...projects, { ...blankProject, id: `project-${Date.now()}`, image: projects[0]?.image || "" }];
              persist("projects", next, setProjects);
              setSelectedProject(next.length - 1);
              setTab("projects");
            }}
          >
            <Plus size={16} />
            New project
          </button>
        </header>

        {tab === "projects" && (
          <div className="admin-grid">
            <div className="admin-list">
              {projects.map((item, index) => (
                <button className={index === selectedProject ? "active" : ""} key={item.id} onClick={() => setSelectedProject(index)}>
                  <img src={item.images?.[0] || item.image} alt="" />
                  <span>
                    <strong>{item.title || "Untitled project"}</strong>
                    <small>{item.category}</small>
                  </span>
                </button>
              ))}
            </div>
            <form
              className="admin-editor"
              onSubmit={(event) => {
                event.preventDefault();
                persist("projects", projects, setProjects);
              }}
            >
              <TextInput
                label="Project title"
                value={project.title}
                onChange={(value) =>
                  setProjects((items) => items.map((item, index) => (index === selectedProject ? { ...item, title: value } : item)))
                }
              />
              <TextInput
                label="Category"
                value={project.category}
                onChange={(value) =>
                  setProjects((items) => items.map((item, index) => (index === selectedProject ? { ...item, category: value } : item)))
                }
              />
              <TextInput
                label="Description"
                textarea
                value={project.description}
                onChange={(value) =>
                  setProjects((items) => items.map((item, index) => (index === selectedProject ? { ...item, description: value } : item)))
                }
              />
              <TextInput
                label="Technologies, comma separated"
                value={project.technologies.join(", ")}
                onChange={(value) =>
                  setProjects((items) =>
                    items.map((item, index) =>
                      index === selectedProject
                        ? { ...item, technologies: value.split(",").map((tech) => tech.trim()).filter(Boolean) }
                        : item,
                    ),
                  )
                }
              />
              <TextInput
                label="GitHub URL"
                value={project.githubUrl}
                onChange={(value) =>
                  setProjects((items) => items.map((item, index) => (index === selectedProject ? { ...item, githubUrl: value } : item)))
                }
              />
              <TextInput
                label="Live demo URL"
                value={project.liveUrl}
                onChange={(value) =>
                  setProjects((items) => items.map((item, index) => (index === selectedProject ? { ...item, liveUrl: value } : item)))
                }
              />
              <div className="admin-field">
                <span>Project Images (5 Slots)</span>
                <div style={{ display: "grid", gap: "8px" }}>
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <input
                      key={idx}
                      placeholder={`Image URL ${idx + 1}`}
                      value={project.images?.[idx] || ""}
                      onChange={(e) => {
                        const newImages = [...(project.images || ["", "", "", "", ""])];
                        newImages[idx] = e.target.value;
                        setProjects((items) => items.map((item, index) => (index === selectedProject ? { ...item, images: newImages } : item)));
                      }}
                    />
                  ))}
                </div>
              </div>

              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={project.featured}
                  onChange={(event) =>
                    setProjects((items) =>
                      items.map((item, index) => (index === selectedProject ? { ...item, featured: event.target.checked } : item)),
                    )
                  }
                />
                Mark as featured
              </label>
              <label className="upload-drop">
                <ImagePlus size={19} />
                <span>Image uploads are ready for Django media endpoints. Local preview uses existing asset URLs.</span>
              </label>
              <div className="admin-actions">
                <button className="btn primary">
                  <Save size={16} />
                  Save project
                </button>
                <button
                  className="btn danger"
                  type="button"
                  onClick={() => {
                    const next = projects.filter((_, index) => index !== selectedProject);
                    persist("projects", next, setProjects);
                    setSelectedProject(0);
                  }}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </form>
          </div>
        )}

        {tab === "skills" && (
          <SimpleManager
            title="Skills"
            items={skills}
            onSave={(value) => persist("skills", value, setSkills)}
            fields={["name", "group", "level"]}
            blank={{ name: "New skill", group: "Frontend", level: 80 }}
          />
        )}

        {tab === "testimonials" && (
          <SimpleManager
            title="Testimonials"
            items={testimonials}
            onSave={(value) => persist("testimonials", value, setTestimonials)}
            fields={["name", "role", "quote"]}
            blank={{ name: "New client", role: "Founder", quote: "A polished and thoughtful engineering partner." }}
          />
        )}

        {tab === "content" && (
          <div className="admin-empty">
            <h2>Django integration path</h2>
            <p>
              Connect this dashboard to DRF endpoints: JWT login, project CRUD, skill CRUD, testimonial CRUD, rich text
              fields, and media uploads. The frontend already isolates content in collection managers for that swap.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function SimpleManager({ title, items, onSave, fields, blank }) {
  const [draft, setDraft] = useState(items);
  return (
    <div className="simple-manager">
      <header>
        <h2>{title}</h2>
        <button className="btn secondary" onClick={() => setDraft((value) => [...value, blank])}>
          <Plus size={16} />
          Add
        </button>
      </header>
      {draft.map((item, index) => (
        <div className="manager-row" key={`${title}-${index}`}>
          {fields.map((field) => (
            <TextInput
              key={field}
              label={field}
              value={String(item[field] ?? "")}
              onChange={(value) =>
                setDraft((rows) => rows.map((row, rowIndex) => (rowIndex === index ? { ...row, [field]: field === "level" ? Number(value) : value } : row)))
              }
            />
          ))}
          <button className="icon-button" onClick={() => setDraft((rows) => rows.filter((_, rowIndex) => rowIndex !== index))}>
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button className="btn primary" onClick={() => onSave(draft)}>
        <Save size={16} />
        Save {title}
      </button>
    </div>
  );
}
