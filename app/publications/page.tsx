"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, ExternalLink, Calendar, Tag, FileText, Award, Users, Quote } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: "journal" | "conference" | "workshop" | "preprint";
  abstract: string;
  doi?: string;
  url?: string;
  tags: string[];
  featured?: boolean;
  citations?: number;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const publications: Publication[] = [
  {
    id: "pub-1",
    title: "Adaptive UI Generation with Large Language Models: A Human-Centered Approach",
    authors: ["Alex Morgan", "Sarah Chen", "Priya Nair"],
    venue: "ACM CHI 2024",
    year: 2024,
    type: "conference",
    abstract:
      "We present a novel framework for generating adaptive user interfaces using large language models, guided by human-centered design principles. Our system dynamically adjusts layout, typography, and interaction patterns based on user context and accessibility needs, achieving a 38% improvement in task completion rates over static UI baselines.",
    doi: "10.1145/3613904.3642001",
    url: "https://dl.acm.org/doi/10.1145/3613904.3642001",
    tags: ["AI", "UI Generation", "LLMs", "Accessibility"],
    featured: true,
    citations: 47,
  },
  {
    id: "pub-2",
    title: "TypeScript at Scale: Type-Safe Architecture Patterns for Large Codebases",
    authors: ["Alex Morgan", "Tom Nakamura"],
    venue: "IEEE Software",
    year: 2023,
    type: "journal",
    abstract:
      "This paper examines architectural patterns that leverage TypeScript's advanced type system to enforce correctness in large-scale web applications. We analyze discriminated unions, branded types, and template literal types across five open-source codebases exceeding 100k lines of code, identifying patterns that reduce runtime errors by up to 62%.",
    doi: "10.1109/MS.2023.3291847",
    url: "https://ieeexplore.ieee.org/document/10182847",
    tags: ["TypeScript", "Software Architecture", "Type Safety"],
    featured: true,
    citations: 89,
  },
  {
    id: "pub-3",
    title: "Glassmorphism and Perceived Depth: A Perceptual Study of Modern UI Aesthetics",
    authors: ["Alex Morgan", "Lena Fischer", "Marcus Webb"],
    venue: "UIST 2023",
    year: 2023,
    type: "conference",
    abstract:
      "We conducted a perceptual study with 240 participants to evaluate how glassmorphism design patterns affect perceived depth, visual hierarchy, and cognitive load in web interfaces. Results indicate that well-implemented glassmorphism reduces time-to-target by 14% while maintaining aesthetic appeal across light and dark themes.",
    doi: "10.1145/3586183.3606834",
    url: "https://dl.acm.org/doi/10.1145/3586183.3606834",
    tags: ["Design Systems", "UX Research", "Visual Design"],
    featured: true,
    citations: 31,
  },
  {
    id: "pub-4",
    title: "Edge-First Web Performance: Measuring the Impact of Distributed Rendering",
    authors: ["Alex Morgan", "James Okafor"],
    venue: "Web Performance Conference 2024",
    year: 2024,
    type: "workshop",
    abstract:
      "We benchmark edge rendering strategies across 12 production Next.js applications, measuring Time to First Byte, Largest Contentful Paint, and Interaction to Next Paint. Our findings show that edge-first architectures reduce global median TTFB by 73% compared to traditional server-side rendering from a single region.",
    doi: "10.1145/3589335.3651234",
    url: "https://webperf.dev/papers/edge-first-2024",
    tags: ["Web Performance", "Edge Computing", "Next.js"],
    citations: 18,
  },
  {
    id: "pub-5",
    title: "Towards Accessible Design Tokens: A Systematic Review of Color Contrast in Design Systems",
    authors: ["Alex Morgan", "Amara Diallo", "Sarah Chen"],
    venue: "ACM ASSETS 2023",
    year: 2023,
    type: "conference",
    abstract:
      "Design tokens are increasingly used to manage visual consistency across products, yet accessibility considerations are often an afterthought. We review 30 public design systems and propose a token taxonomy that encodes WCAG 2.2 contrast requirements directly into the token naming convention, enabling automated accessibility audits at build time.",
    doi: "10.1145/3597638.3608421",
    url: "https://dl.acm.org/doi/10.1145/3597638.3608421",
    tags: ["Accessibility", "Design Systems", "WCAG"],
    citations: 24,
  },
  {
    id: "pub-6",
    title: "PrivacyFirst Analytics: A Privacy-Preserving Web Telemetry Architecture",
    authors: ["Alex Morgan"],
    venue: "arXiv preprint",
    year: 2025,
    type: "preprint",
    abstract:
      "We propose PrivacyFirst Analytics, an open-source web analytics architecture that collects actionable telemetry without storing personally identifiable information. The system uses differential privacy, k-anonymity grouping, and on-device aggregation to deliver accurate traffic insights while remaining fully GDPR and CCPA compliant.",
    url: "https://arxiv.org/abs/2501.12345",
    tags: ["Privacy", "Analytics", "GDPR", "Differential Privacy"],
    citations: 5,
  },
  {
    id: "pub-7",
    title: "Component-Driven Development at Scale: Lessons from 80+ Component Libraries",
    authors: ["Alex Morgan", "Marcus Webb", "Tom Nakamura"],
    venue: "IEEE Software",
    year: 2022,
    type: "journal",
    abstract:
      "Component-driven development has become the dominant paradigm for frontend engineering, yet best practices for scaling component libraries remain poorly documented. We analyze 80 open-source component libraries to identify patterns in API design, documentation, versioning, and testing that correlate with high adoption and low issue rates.",
    doi: "10.1109/MS.2022.3168291",
    url: "https://ieeexplore.ieee.org/document/9768291",
    tags: ["Component Libraries", "React", "Software Engineering"],
    citations: 112,
  },
  {
    id: "pub-8",
    title: "Motion Design Principles for Reduced-Motion Accessibility in Web Applications",
    authors: ["Alex Morgan", "Lena Fischer"],
    venue: "Accessibility & Inclusive Design Workshop, CHI 2022",
    year: 2022,
    type: "workshop",
    abstract:
      "The prefers-reduced-motion media query provides a mechanism for users to opt out of animations, but most implementations simply disable all motion. We propose a nuanced framework that preserves functional motion (state transitions, focus indicators) while eliminating decorative motion, improving usability for users with vestibular disorders without degrading the experience for others.",
    doi: "10.1145/3491101.3519890",
    url: "https://dl.acm.org/doi/10.1145/3491101.3519890",
    tags: ["Accessibility", "Motion Design", "UX"],
    citations: 29,
  },
];

const stats = [
  { id: "total", icon: FileText, value: "8", label: "Publications" },
  { id: "citations", icon: Award, value: "355", label: "Total Citations" },
  { id: "hindex", icon: BookOpen, value: "12", label: "h-index" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

type PubType = Publication["type"];

function typeBadgeClasses(type: PubType): string {
  switch (type) {
    case "journal":
      return "bg-indigo-500/15 text-indigo-300 border border-indigo-500/25";
    case "conference":
      return "bg-purple-500/15 text-purple-300 border border-purple-500/25";
    case "workshop":
      return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25";
    case "preprint":
      return "bg-amber-500/15 text-amber-300 border border-amber-500/25";
    default:
      return "bg-white/10 text-white/60 border border-white/10";
  }
}

function typeLabel(type: PubType): string {
  switch (type) {
    case "journal":
      return "Journal";
    case "conference":
      return "Conference";
    case "workshop":
      return "Workshop";
    case "preprint":
      return "Preprint";
  }
}

const FILTERS = ["All", "Journal", "Conference", "Workshop", "Preprint"] as const;
type Filter = (typeof FILTERS)[number];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PublicationsPage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered =
    activeFilter === "All"
      ? publications
      : publications.filter(
          (p) => p.type === activeFilter.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-[#0f0f0f] relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-indigo-600/5 blur-[120px]" />
        <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] rounded-full bg-purple-600/4 blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* ── Hero ── */}
        <motion.div
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeIn}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6"
          >
            <BookOpen size={14} />
            Research & Writing
          </motion.div>

          <motion.h1
            variants={shouldReduceMotion ? undefined : fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight"
          >
            My{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Publications
            </span>
          </motion.h1>

          <motion.p
            variants={shouldReduceMotion ? undefined : fadeInUp}
            className="text-lg text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Peer-reviewed research, conference papers, and preprints on topics spanning
            AI, web performance, design systems, and accessibility.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            className="flex flex-wrap justify-center gap-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={shouldReduceMotion ? undefined : scaleIn}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 min-w-[140px]"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                  <stat.icon size={16} />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-white leading-none">{stat.value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Filter Bar ── */}
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* ── Publications List ── */}
        {filtered.length === 0 ? (
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center py-24"
          >
            <FileText size={40} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/40 text-lg">No publications found for this filter.</p>
          </motion.div>
        ) : (
          <motion.div
            key={activeFilter}
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col gap-5"
          >
            {filtered.map((pub) => (
              <motion.article
                key={pub.id}
                variants={shouldReduceMotion ? undefined : scaleIn}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 hover:bg-white/[0.08] transition-all duration-300"
              >
                {/* Top row: type badge + featured star + year */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      typeBadgeClasses(pub.type)
                    }`}
                  >
                    <Tag size={10} />
                    {typeLabel(pub.type)}
                  </span>

                  {pub.featured && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                      <Award size={10} />
                      Featured
                    </span>
                  )}

                  <span className="ml-auto flex items-center gap-1 text-xs text-white/30">
                    <Calendar size={11} />
                    {pub.year}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold text-white mb-2 leading-snug group-hover:text-indigo-200 transition-colors duration-200">
                  {pub.title}
                </h2>

                {/* Authors */}
                <p className="text-sm text-white/60 mb-1">
                  {pub.authors.join(", ")}
                </p>

                {/* Venue */}
                <p className="text-sm text-indigo-400 font-medium mb-3">
                  {pub.venue} &middot; {pub.year}
                </p>

                {/* Abstract */}
                <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-3">
                  {pub.abstract}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {pub.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/5 rounded-full px-2 py-0.5 text-xs text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer row: citations + links */}
                <div className="flex items-center justify-between gap-4 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    {pub.citations !== undefined && (
                      <span className="flex items-center gap-1 text-xs text-white/40">
                        <Quote size={11} />
                        {pub.citations} citation{pub.citations !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-indigo-500/15 border border-white/10 hover:border-indigo-500/30 text-xs text-white/50 hover:text-indigo-300 transition-all duration-200"
                      >
                        <FileText size={11} />
                        DOI
                        <ExternalLink size={10} />
                      </a>
                    )}
                    {pub.url && (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/35 border border-indigo-500/25 hover:border-indigo-500/50 text-xs text-indigo-300 hover:text-indigo-200 transition-all duration-200"
                      >
                        <BookOpen size={11} />
                        Read
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
