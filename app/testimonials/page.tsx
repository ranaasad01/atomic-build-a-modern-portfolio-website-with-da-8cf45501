"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote, Star, Users, ThumbsUp, Award } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Testimonials Data ───────────────────────────────────────────────────────

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO",
    company: "Luminary AI",
    avatar: "SC",
    quote:
      "Alex delivered our AI writing platform on time and beyond spec. The codebase is clean, the architecture is solid, and the UI is genuinely beautiful. Rare to find someone who excels at both engineering and design.",
    stars: 5,
    featured: true,
  },
  {
    id: 2,
    name: "Marcus Webb",
    role: "Product Lead",
    company: "Orbit Design",
    avatar: "MW",
    quote:
      "Working with Alex transformed how our team thinks about component APIs. The design system he built has saved us hundreds of hours and our engineers actually enjoy using it.",
    stars: 5,
    featured: false,
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Founder",
    company: "Pulse Analytics",
    avatar: "PN",
    quote:
      "Alex took our vague idea and turned it into a polished, production-ready analytics platform. His attention to performance and privacy was exactly what we needed.",
    stars: 5,
    featured: false,
  },
  {
    id: 4,
    name: "James Okafor",
    role: "Engineering Manager",
    company: "Stripe",
    avatar: "JO",
    quote:
      "I have worked with many contractors over the years. Alex stands out for his communication, his ability to self-direct, and the sheer quality of his output. Would hire again without hesitation.",
    stars: 5,
    featured: false,
  },
  {
    id: 5,
    name: "Lena Fischer",
    role: "Head of Design",
    company: "Vercel",
    avatar: "LF",
    quote:
      "Alex bridges the gap between design and engineering better than anyone I have collaborated with. He speaks both languages fluently and the results show.",
    stars: 5,
    featured: false,
  },
  {
    id: 6,
    name: "Tom Nakamura",
    role: "Senior Engineer",
    company: "Linear",
    avatar: "TN",
    quote:
      "Pair-programmed with Alex for three months on a complex data pipeline. His TypeScript skills are exceptional and he has a great instinct for when to abstract and when to keep things simple.",
    stars: 5,
    featured: false,
  },
  {
    id: 7,
    name: "Amara Diallo",
    role: "CEO",
    company: "Flowstate",
    avatar: "AD",
    quote:
      "Alex rebuilt our entire frontend in six weeks. The new site loads in under a second, our conversion rate jumped 34%, and the team can actually maintain it now. Incredible work.",
    stars: 5,
    featured: false,
  },
];

const stats = [
  {
    id: "clients",
    icon: Users,
    value: "50+",
    label: "Happy Clients",
  },
  {
    id: "rating",
    icon: Star,
    value: "4.9/5",
    label: "Average Rating",
  },
  {
    id: "success",
    icon: Award,
    value: "100%",
    label: "Project Success",
  },
];

// ─── Avatar Component ────────────────────────────────────────────────────────

function Avatar({ initials, size = "md" }: { initials: string; size?: "md" | "lg" }) {
  const sizeClasses = size === "lg" ? "w-16 h-16 text-lg" : "w-10 h-10 text-sm";
  return (
    <div
      className={`${sizeClasses} rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/25 flex-shrink-0`}
    >
      {initials}
    </div>
  );
}

// ─── Star Row ────────────────────────────────────────────────────────────────

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function TestimonialsPage() {
  const shouldReduceMotion = useReducedMotion();

  const featured = testimonials.find((t) => t.featured)!;
  const grid = testimonials.filter((t) => !t.featured);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] rounded-full bg-indigo-500/10 blur-[120px]" />
        </div>

        <motion.div
          className="relative max-w-3xl mx-auto text-center"
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6"
          >
            <Quote size={14} />
            Kind Words
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={shouldReduceMotion ? undefined : fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
          >
            What People Are{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Saying
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={shouldReduceMotion ? undefined : fadeInUp}
            className="text-lg text-white/50 leading-relaxed max-w-xl mx-auto"
          >
            I&apos;ve had the privilege of working with talented people across the globe. Here are
            some of the kind words they&apos;ve shared about our time together.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Featured Testimonial ─────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? undefined : slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-3xl p-8 md:p-12 overflow-hidden"
          >
            {/* Decorative large quotation mark */}
            <span className="absolute top-4 right-8 text-9xl font-serif text-indigo-500/20 leading-none select-none pointer-events-none">
              &ldquo;
            </span>

            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: featured.stars }).map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-white/85 leading-relaxed italic font-light mb-8 max-w-3xl">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <Avatar initials={featured.avatar} size="lg" />
              <div>
                <p className="text-white font-semibold text-lg">{featured.name}</p>
                <p className="text-white/50 text-sm">
                  {featured.role} &middot; {featured.company}
                </p>
              </div>
            </div>

            {/* Subtle corner glow */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials Grid ────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Section label */}
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              More Kind Words
            </h2>
            <p className="text-white/40 text-sm">
              From engineers, designers, founders, and leaders.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {grid.map((t) => (
              <motion.div
                key={t.id}
                variants={shouldReduceMotion ? undefined : scaleIn}
                className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300 flex flex-col"
              >
                {/* Quote icon */}
                <Quote size={20} className="text-indigo-400 mb-4 flex-shrink-0" />

                {/* Quote text */}
                <p className="text-white/70 text-sm leading-relaxed italic flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Divider */}
                <div className="border-t border-white/10 mt-4 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar initials={t.avatar} size="md" />
                      <div className="min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{t.name}</p>
                        <p className="text-white/40 text-xs truncate">
                          {t.role} &middot; {t.company}
                        </p>
                      </div>
                    </div>
                    <StarRow count={t.stars} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats / Social Proof Bar ─────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={shouldReduceMotion ? undefined : fadeInUp}
                className="flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-5 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <stat.icon size={18} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                  <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
