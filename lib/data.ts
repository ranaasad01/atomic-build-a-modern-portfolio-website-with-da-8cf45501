export const SITE_NAME = "Alex Morgan";
export const SITE_TAGLINE = "Full-Stack Developer & Designer";
export const SITE_EMAIL = "hello@alexmorgan.dev";
export const SITE_GITHUB = "https://github.com/alexmorgan";
export const SITE_LINKEDIN = "https://linkedin.com/in/alexmorgan";
export const SITE_TWITTER = "https://twitter.com/alexmorgan";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Blog", href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Publications", href: "/publications" },
];

export const navCTA = {
  label: "Download CV",
  href: "/resume.pdf",
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

export type Skill = {
  name: string;
  level: number; // 0–100
  category: "frontend" | "backend" | "tooling" | "design";
};
