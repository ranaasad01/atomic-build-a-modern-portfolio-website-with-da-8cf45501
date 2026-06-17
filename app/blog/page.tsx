"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, ArrowRight } from 'lucide-react';
import Link from "next/link";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Blog Post Data ──────────────────────────────────────────────────────────

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  tags: string[];
  category: string;
}

const posts: BlogPost[] = [
  {
    slug: "building-design-systems",
    title: "Building Scalable Design Systems with React & TypeScript",
    excerpt:
      "Design systems are the backbone of consistent UI. In this post, I walk through the architecture decisions behind Orbit — from token structure to component APIs — and share lessons learned shipping to 12 production apps.",
    date: "June 12, 2025",
    readingTime: 8,
    tags: ["React", "TypeScript", "Design"],
    category: "Design",
  },
  {
    slug: "nextjs-performance",
    title: "Next.js Performance Patterns You Should Know in 2025",
    excerpt:
      "From Partial Prerendering to the new caching model, Next.js 15 ships with powerful primitives. Here is how I use them to hit 100 Lighthouse scores on real production sites.",
    date: "May 28, 2025",
    readingTime: 6,
    tags: ["React", "Performance"],
    category: "Performance",
  },
  {
    slug: "typescript-tips",
    title: "10 TypeScript Tricks That Will Change How You Code",
    excerpt:
      "After years of TypeScript in production, these are the patterns I reach for every day — from discriminated unions to template literal types and beyond.",
    date: "May 10, 2025",
    readingTime: 5,
    tags: ["TypeScript"],
    category: "TypeScript",
  },
  {
    slug: "ux-micro-animations",
    title: "The Art of Micro-Animations: UX That Feels Alive",
    excerpt:
      "Subtle motion design is the difference between an app that feels polished and one that feels flat. I explore the principles behind great micro-animations and how to implement them with Framer Motion.",
    date: "April 22, 2025",
    readingTime: 7,
    tags: ["Design", "React"],
    category: "Design",
  },
  {
    slug: "career-senior-engineer",
    title: "What Nobody Tells You About Becoming a Senior Engineer",
    excerpt:
      "Technical skills get you to mid-level. What takes you further is a mix of communication, system thinking, and knowing when not to code. Here is what I wish I had known earlier.",
    date: "April 5, 2025",
    readingTime: 9,
    tags: ["Career"],
    category: "Career",
  },
  {
    slug: "postgres-at-scale",
    title: "PostgreSQL at Scale: Indexing Strategies That Actually Work",
    excerpt:
      "When your Postgres queries start slowing down, the answer is rarely \"just add an index\". I break down partial indexes, covering indexes, and query planning to help you diagnose and fix real bottlenecks.",
    date: "March 18, 2025",
    readingTime: 10,
    tags: ["Performance", "TypeScript"],
    category: "Performance",
  },
];

const ALL_FILTERS = ["All", "React", "TypeScript", "Design", "Performance", "Career"] as const;
type Filter = (typeof ALL_FILTERS)[number];

// ─── Tag colour helpers ───────────────────────────────────────────────────────

const tagColour: Record<string, string> = {
  React: "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20",
  TypeScript: "bg-violet-500/15 text-violet-300 border border-violet-500/20",
  Design: "bg-pink-500/15 text-pink-300 border border-pink-500/20",
  Performance: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20",
  Career: "bg-amber-500/15 text-amber-300 border border-amber-500/20",
};

const categoryColour: Record<string, string> = {
  React: "bg-indigo-500/20 text-indigo-300",
  TypeScript: "bg-violet-500/20 text-violet-300",
  Design: "bg-pink-500/20 text-pink-300",
  Performance: "bg-emerald-500/20 text-emerald-300",
  Career: "bg-amber-500/20 text-amber-300",
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const shouldReduceMotion = useReducedMotion();

  const filteredPosts =
    activeFilter === "All"
      ? posts
      : posts.filter((p) => p.tags.includes(activeFilter));

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-start justify-center"
        >
          <div className="w-[600px] h-[400px] rounded-full bg-indigo-600/10 blur-[120px] -translate-y-1/4" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center gap-6"
          >
            {/* Badge */}
            <motion.div variants={shouldReduceMotion ? undefined : fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium tracking-wide">
                ✦ Writing
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              Thoughts &amp;{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Articles
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="max-w-xl text-white/50 text-lg leading-relaxed"
            >
              Sharing insights on web development, design systems, and the craft
              of building great products — one post at a time.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Filter Bar ───────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeIn}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2 justify-center"
          >
            {ALL_FILTERS.map((filter) => (
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
        </div>
      </section>

      {/* ── Articles Grid ────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            key={activeFilter}
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts.map((post) => (
              <motion.div
                key={post.slug}
                variants={shouldReduceMotion ? undefined : scaleIn}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col h-full bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5"
                >
                  {/* Top row: category badge + reading time */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                        categoryColour[post.category] ??
                        "bg-indigo-500/20 text-indigo-300"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-white/30 text-xs">
                      <Clock size={12} />
                      {post.readingTime} min read
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-white font-semibold text-lg leading-snug mb-3 group-hover:text-indigo-300 transition-colors duration-200">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-white/50 text-sm leading-relaxed flex-1 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Date */}
                  <p className="text-white/30 text-xs mb-4">{post.date}</p>

                  {/* Bottom row: tags + arrow */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            tagColour[tag] ??
                            "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-white/30 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 ml-2"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty state */}
          {filteredPosts.length === 0 && (
            <motion.div
              variants={shouldReduceMotion ? undefined : fadeIn}
              initial="hidden"
              animate="visible"
              className="text-center py-24 text-white/30"
            >
              <p className="text-lg">No articles found for this filter.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
