import { projects, skills, testimonials } from "../data/portfolio";

const defaults = {
  projects,
  skills,
  testimonials,
};

export function loadCollection(key) {
  try {
    const stored = localStorage.getItem(`portfolio.${key}`);
    return stored ? JSON.parse(stored) : defaults[key];
  } catch {
    return defaults[key];
  }
}

export function saveCollection(key, value) {
  localStorage.setItem(`portfolio.${key}`, JSON.stringify(value));
}

export async function apiRequest(path, options = {}) {
  const base = import.meta.env.VITE_API_URL;
  if (!base) return null;
  const token = localStorage.getItem("portfolio.adminToken");
  const response = await fetch(`${base}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  if (!response.ok) throw new Error("API request failed");
  return response.json();
}
