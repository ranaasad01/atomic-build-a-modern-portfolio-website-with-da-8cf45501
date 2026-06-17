"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, ArrowUp } from 'lucide-react';
import { SITE_NAME, SITE_TAGLINE, SITE_EMAIL, SITE_GITHUB, SITE_LINKEDIN, SITE_TWITTER, navLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  const handleAnchorClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  const socials = [
    { icon: Github, href: SITE_GITHUB, label: "GitHub" },
    { icon: Linkedin, href: SITE_LINKEDIN, label: "LinkedIn" },
    { icon: Twitter, href: SITE_TWITTER, label: "Twitter" },
    { icon: Mail, href: `mailto:${SITE_EMAIL}`, label: "Email" },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0a]">
      {/* Subtle gradient top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {/* Brand */}
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeInUp}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/25">
                AM
              </span>
              <span className="font-semibold text-white/90 tracking-tight">{SITE_NAME}</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              {SITE_TAGLINE}. Building thoughtful digital experiences that make a difference.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/30 flex items-center justify-center text-white/40 hover:text-indigo-400 transition-all duration-200"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.1, y: -2 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeInUp}
            className="space-y-4"
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleAnchorClick(link.href)}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-indigo-400 transition-all duration-200 rounded-full" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeInUp}
            className="space-y-4"
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">
              Get In Touch
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Open to new opportunities and interesting projects. Let&apos;s build something great together.
            </p>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200 group"
            >
              <Mail size={14} />
              <span className="group-hover:underline underline-offset-4">{SITE_EMAIL}</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} {SITE_NAME}. Crafted with care.
          </p>
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors duration-200 group"
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
          >
            Back to top
            <span className="w-6 h-6 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors duration-200">
              <ArrowUp size={12} />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}