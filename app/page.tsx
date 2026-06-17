"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion, Variants, TargetAndTransition } from "framer-motion";
import { ArrowRight, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, ExternalLink, Code2, Layers, Sparkles, Star, CheckCircle, Download, ChevronRight, Terminal, Layout, Activity } from 'lucide-react';
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_EMAIL,
  SITE_GITHUB,
  SITE_LINKEDIN,
  SITE_TWITTER,
} from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline Data ────────────────────────────────────────────────────────────

const projects = [
  {
    slug: "luminary-ai",
    title: "Luminary AI",
    description:
      "A real-time AI writing assistant that helps teams craft compelling content 10× faster. Built with Next.js, OpenAI, and a custom streaming pipeline.",
    tech: ["Next.js", "TypeScript", "OpenAI", "Prisma", "Tailwind"],
    image: "https://media.licdn.com/dms/image/v2/D4E0BAQEOQylQTBHOkw/company-logo_200_200/company-logo_200_200/0/1698785515213/luminaryai_logo?e=2147483647&v=beta&t=DyFKfFFvzySoXmpoa-u94tHaHp3Kb83lCQT6QM2x6mI",
    liveUrl: "https://luminary.ai",
    githubUrl: "https://github.com/alexmorgan/luminary-ai",
    featured: true,
  },
  {
    slug: "orbit-design",
    title: "Orbit Design System",
    description:
      "A comprehensive component library and design system powering 12 production apps. Includes 80+ accessible components, dark mode, and full Storybook docs.",
    tech: ["React", "TypeScript", "Radix UI", "Storybook", "Vitest"],
    image: "https://s3-alpha.figma.com/hub/file/2243587999456758553/75e4372a-8462-487a-9eef-232cbcde11ad-cover.png",
    liveUrl: "https://orbit.design",
    githubUrl: "https://github.com/alexmorgan/orbit",
    featured: true,
  },
  {
    slug: "pulse-analytics",
    title: "Pulse Analytics",
    description:
      "An open-source web analytics platform that respects user privacy. Self-hostable, GDPR-compliant, and blazing fast with edge-rendered dashboards.",
    tech: ["Next.js", "ClickHouse", "tRPC", "Recharts", "Docker"],
    image: "https://media.licdn.com/dms/image/v2/C560BAQFE9hgXdIuk8g/company-logo_200_200/company-logo_200_200/0/1630666773600/pulsedigital_logo?e=2147483647&v=beta&t=bZmZ1PqmRtJYH98AP9oD8heKWwDkKZXGbUyBxAe-vy0",
    liveUrl: "https://usepulse.io",
    githubUrl: "https://github.com/alexmorgan/pulse",
    featured: true,
  },
];

const skills = [
  { name: "React / Next.js", level: 96, category: "frontend" },
  { name: "TypeScript", level: 93, category: "frontend" },
  { name: "Tailwind CSS", level: 95, category: "frontend" },
  { name: "Node.js", level: 88, category: "backend" },
  { name: "PostgreSQL", level: 82, category: "backend" },
  { name: "GraphQL / tRPC", level: 85, category: "backend" },
  { name: "Figma", level: 90, category: "design" },
  { name: "Docker / CI/CD", level: 78, category: "tooling" },
];

const categoryColors: Record<string, string> = {
  frontend: "from-indigo-500 to-violet-500",
  backend: "from-emerald-500 to-teal-500",
  design: "from-pink-500 to-rose-500",
  tooling: "from-amber-500 to-orange-500",
};

const categoryBadge: Record<string, string> = {
  frontend: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  backend: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  design: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  tooling: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO at Luminary",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Sarah_Chen_%E9%99%88%E6%B7%91%E6%A1%A6_1986_Malaysia_Concert_Live_Photo_Original_%28cropped%29.jpg",
    quote:
      "Alex delivered a production-ready platform in 6 weeks that our previous team couldn't ship in 6 months. The code quality and attention to UX detail is exceptional.",
    stars: 5,
  },
  {
    id: 2,
    name: "Marcus Webb",
    role: "Founder at Orbit Labs",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/JMarcus_Webb.JPG/960px-JMarcus_Webb.JPG",
    quote:
      "Working with Alex felt like having a senior engineer and a product designer in one. The design system he built has saved us hundreds of hours.",
    stars: 5,
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Lead Engineer at Pulse",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    quote:
      "Alex's open-source analytics tool is the best I've seen. Clean architecture, great docs, and he's incredibly responsive to community feedback.",
    stars: 5,
  },
];

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "40+", label: "Projects Shipped" },
  { value: "12", label: "Happy Clients" },
  { value: "8k+", label: "GitHub Stars" },
];

const services = [
  {
    icon: Layout,
    title: "Frontend Engineering",
    description:
      "Pixel-perfect, performant UIs built with React and Next.js. From design systems to complex data-heavy dashboards.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    icon: Terminal,
    title: "Full-Stack Development",
    description:
      "End-to-end product development — REST & GraphQL APIs, database design, auth, and cloud deployment on Vercel or AWS.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Sparkles,
    title: "UI/UX Design",
    description:
      "High-fidelity Figma prototypes, design systems, and interaction design that bridges the gap between design and code.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
  },
  {
    icon: Activity,
    title: "Performance & Audits",
    description:
      "Core Web Vitals optimization, bundle analysis, and accessibility audits to bring your app to a 100 Lighthouse score.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
];

// ─── Contact Form State ──────────────────────────────────────────────────────

const defaultForm = { name: "", email: "", message: "" };

// ─── Component ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [form, setForm] = useState(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [activeSkillCat, setActiveSkillCat] = useState<string>("all");

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm(defaultForm);
  };

  const filteredSkills =
    activeSkillCat === "all"
      ? skills
      : skills.filter((s) => s.category === activeSkillCat);

  const mv = (variants: Variants): Variants | undefined =>
    shouldReduceMotion ? undefined : variants;

  const mvTarget = (target: TargetAndTransition): TargetAndTransition | undefined =>
    shouldReduceMotion ? undefined : target;

  return (
    <main className="bg-[#0f0f0f] text-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        {/* Background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-indigo-600/10 blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/8 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-violet-600/8 blur-[100px]" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            variants={mv(staggerContainer)}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={mv(fadeInUp)} className="flex justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Available for new projects
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={mv(fadeInUp)}
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08]"
            >
              <span className="text-white">Hi, I'm </span>
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                {SITE_NAME}
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={mv(fadeInUp)}
              className="text-xl sm:text-2xl text-white/50 font-light tracking-wide"
            >
              {SITE_TAGLINE}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={mv(fadeInUp)}
              className="max-w-2xl mx-auto text-base sm:text-lg text-white/40 leading-relaxed"
            >
              I craft high-performance web applications and beautiful interfaces
              that users love. Specialising in React, Next.js, and modern
              full-stack architecture — from idea to production.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={mv(fadeInUp)}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 hover:-translate-y-0.5"
                whileHover={mvTarget({ scale: 1.03 })}
                whileTap={mvTarget({ scale: 0.97 })}
              >
                View My Work
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </motion.a>
              <motion.a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
                whileHover={mvTarget({ scale: 1.03 })}
                whileTap={mvTarget({ scale: 0.97 })}
              >
                <Download size={16} />
                Download CV
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={mv(fadeInUp)}
              className="flex items-center justify-center gap-4 pt-2"
            >
              {[
                { icon: Github, href: SITE_GITHUB, label: "GitHub" },
                { icon: Linkedin, href: SITE_LINKEDIN, label: "LinkedIn" },
                { icon: Twitter, href: SITE_TWITTER, label: "Twitter" },
                {
                  icon: Mail,
                  href: `mailto:${SITE_EMAIL}`,
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/30 flex items-center justify-center text-white/40 hover:text-indigo-400 transition-all duration-200"
                  whileHover={mvTarget({ scale: 1.1, y: -2 })}
                  whileTap={mvTarget({ scale: 0.95 })}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="text-xs text-white/20 tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={mv(staggerContainer)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={mv(scaleIn)}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              variants={mv(slideInLeft)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0">
                <img
                  src="https://media.licdn.com/dms/image/v2/C5603AQE-oMdEA4-lZg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1516522176575?e=2147483647&v=beta&t=NNza9NbD-soKscrNPIBTk-qTQ2z583NAZI6yUgYwXZ0"
                  alt="Alex Morgan — Full-Stack Developer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/60 via-transparent to-transparent" />
              </div>
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 lg:right-8 bg-[#1a1a2e] border border-indigo-500/30 rounded-2xl px-5 py-4 shadow-2xl shadow-indigo-500/10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <Code2 size={18} className="text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      Open to Work
                    </div>
                    <div className="text-white/40 text-xs">
                      Freelance & Full-time
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Text side */}
            <motion.div
              variants={mv(staggerContainer)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              <motion.div variants={mv(fadeInUp)}>
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                  About Me
                </span>
                <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
                  Turning ideas into{" "}
                  <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    digital reality
                  </span>
                </h2>
              </motion.div>

              <motion.p
                variants={mv(fadeInUp)}
                className="text-white/50 leading-relaxed text-lg"
              >
                I'm a full-stack developer and designer with 5+ years of
                experience building products that live at the intersection of
                great engineering and thoughtful design. I've worked with
                early-stage startups and scale-ups across fintech, SaaS, and
                developer tooling.
              </motion.p>

              <motion.p
                variants={mv(fadeInUp)}
                className="text-white/40 leading-relaxed"
              >
                When I'm not shipping code, I'm contributing to open source,
                writing about web performance on my blog, or exploring the
                mountains with a camera in hand. I believe the best products
                come from teams that care deeply about craft.
              </motion.p>

              <motion.div
                variants={mv(fadeInUp)}
                className="grid grid-cols-2 gap-4 pt-2"
              >
                {[
                  "React & Next.js expert",
                  "TypeScript advocate",
                  "Design systems builder",
                  "Open source contributor",
                  "Performance obsessed",
                  "Remote-first mindset",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-white/50"
                  >
                    <CheckCircle
                      size={15}
                      className="text-indigo-400 flex-shrink-0"
                    />
                    {item}
                  </div>
                ))}
              </motion.div>

              <motion.div variants={mv(fadeInUp)} className="pt-2">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium text-sm group transition-colors duration-200"
                >
                  Let's work together
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={mv(staggerContainer)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-16"
          >
            <motion.div
              variants={mv(fadeInUp)}
              className="text-center max-w-2xl mx-auto"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                What I Do
              </span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
                Services I offer
              </h2>
              <p className="mt-4 text-white/40 text-lg leading-relaxed">
                From rapid prototypes to production-grade systems — I cover the
                full spectrum of modern web development.
              </p>
            </motion.div>

            <motion.div
              variants={mv(staggerContainer)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  variants={mv(scaleIn)}
                  whileHover={mvTarget({ y: -4, scale: 1.01 })}
                  className={`group relative p-7 rounded-2xl border ${service.border} bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 cursor-default`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center mb-5`}
                  >
                    <service.icon size={22} className={service.color} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" className="py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={mv(staggerContainer)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-14"
          >
            <motion.div
              variants={mv(fadeInUp)}
              className="text-center max-w-2xl mx-auto"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                Expertise
              </span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
                Skills & Technologies
              </h2>
              <p className="mt-4 text-white/40 text-lg leading-relaxed">
                A curated set of tools I use to build fast, accessible, and
                maintainable products.
              </p>
            </motion.div>

            {/* Category filter */}
            <motion.div
              variants={mv(fadeInUp)}
              className="flex flex-wrap justify-center gap-2"
            >
              {["all", "frontend", "backend", "design", "tooling"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveSkillCat(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                      activeSkillCat === cat
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                        : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10 border border-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </motion.div>

            {/* Skill bars */}
            <motion.div
              variants={mv(staggerContainer)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={mv(fadeInUp)}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white/80">
                        {skill.name}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border capitalize ${
                          categoryBadge[skill.category] ??
                          "bg-white/5 text-white/40 border-white/10"
                        }`}
                      >
                        {skill.category}
                      </span>
                    </div>
                    <span className="text-xs text-white/30">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${
                        categoryColors[skill.category] ??
                        "from-indigo-500 to-violet-500"
                      }`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section
        id="projects"
        className="py-28 px-4 sm:px-6 lg:px-8 bg-white/[0.015]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={mv(staggerContainer)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-16"
          >
            <motion.div
              variants={mv(fadeInUp)}
              className="text-center max-w-2xl mx-auto"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                Portfolio
              </span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
                Featured Projects
              </h2>
              <p className="mt-4 text-white/40 text-lg leading-relaxed">
                A selection of work I'm proud of — each one a story of
                problem-solving, craft, and collaboration.
              </p>
            </motion.div>

            <motion.div
              variants={mv(staggerContainer)}
              className="grid grid-cols-1 lg:grid-cols-3 gap-7"
            >
              {projects.map((project) => (
                <motion.article
                  key={project.slug}
                  variants={mv(scaleIn)}
                  whileHover={mvTarget({ y: -6 })}
                  className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/5 bg-white/[0.03] hover:border-indigo-500/30 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/20 to-transparent" />
                    {/* Links overlay */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View on GitHub"
                          className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                        >
                          <Github size={14} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View live site"
                          className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed flex-1">
                      {project.description}
                    </p>
                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-white/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            <motion.div variants={mv(fadeInUp)} className="text-center">
              <a
                href={SITE_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
              >
                <Github size={16} />
                See all projects on GitHub
                <ArrowRight size={14} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={mv(staggerContainer)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-16"
          >
            <motion.div
              variants={mv(fadeInUp)}
              className="text-center max-w-2xl mx-auto"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                Testimonials
              </span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
                What clients say
              </h2>
            </motion.div>

            <motion.div
              variants={mv(staggerContainer)}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {testimonials.map((t) => (
                <motion.div
                  key={t.id}
                  variants={mv(fadeInUp)}
                  whileHover={mvTarget({ y: -4 })}
                  className="relative p-7 rounded-2xl border border-white/5 bg-white/[0.03] hover:border-indigo-500/20 transition-all duration-300"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {t.name}
                      </div>
                      <div className="text-xs text-white/30">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-28 px-4 sm:px-6 lg:px-8 bg-white/[0.015]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <motion.div
              variants={mv(staggerContainer)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-8"
            >
              <motion.div variants={mv(fadeInUp)}>
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                  Get In Touch
                </span>
                <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
                  Let's build something{" "}
                  <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    great together
                  </span>
                </h2>
              </motion.div>

              <motion.p
                variants={mv(fadeInUp)}
                className="text-white/40 text-lg leading-relaxed"
              >
                Whether you have a project in mind, want to discuss a
                collaboration, or just want to say hi — my inbox is always open.
                I typically respond within 24 hours.
              </motion.p>

              <motion.div variants={mv(staggerContainer)} className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: SITE_EMAIL,
                    href: `mailto:${SITE_EMAIL}`,
                  },
                  {
                    icon: Github,
                    label: "GitHub",
                    value: "github.com/alexmorgan",
                    href: SITE_GITHUB,
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    value: "linkedin.com/in/alexmorgan",
                    href: SITE_LINKEDIN,
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    variants={mv(fadeInUp)}
                    whileHover={mvTarget({ x: 4 })}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.03] hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-xs text-white/30 mb-0.5">
                        {label}
                      </div>
                      <div className="text-sm text-white/70 group-hover:text-white transition-colors duration-200">
                        {value}
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className="ml-auto text-white/20 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-200"
                    />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              variants={mv(slideInRight)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.03]">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto">
                      <CheckCircle size={32} className="text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      Message sent!
                    </h3>
                    <p className="text-white/40 text-sm">
                      Thanks for reaching out. I'll get back to you within 24
                      hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleFormChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleFormChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleFormChange}
                        placeholder="Tell me about your project..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all duration-200 resize-none"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={mvTarget({ scale: 1.02, y: -1 })}
                      whileTap={mvTarget({ scale: 0.98 })}
                      className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      Send Message
                      <ArrowRight size={16} />
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
