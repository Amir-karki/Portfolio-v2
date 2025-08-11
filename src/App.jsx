import React, { useLayoutEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  ExternalLink,
  Moon,
  Sun,
  ChevronRight,
  Search,
  Tag,
} from "lucide-react";

// -----------------------
// Editable content (just tweak these objects and you're done)
// -----------------------
const PROFILE = {
  name: "Amir Karki",
  title: "Data Scientist & Machine Learning Enthusiast",
  subtitle:
    "Exploring data, models, and delightful interfaces. Frontend-curious with hands-on projects.",
  email: "Karkiamir417@gmail.com",
  location: "Vancouver, British Columbia, Canada",
  socials: {
    github: "https://github.com/Amir-karki",


    linkedin: "https://www.linkedin.com/in/amir-karki-133903214/", // TODO: add your LinkedIn URL
    instagram: "https://www.instagram.com/a_for.amir/", // TODO: add your Instagram URL
  },
};

const PROJECTS = [
  {
    title: "Web Scraping with BeautifulSoup",
    blurb:
      "Collected structured data from the web using Python, requests, and BeautifulSoup; cleaned and exported for downstream analysis.",
    tags: ["Python", "Web Scraping", "BeautifulSoup"],
    href:
      "https://github.com/Amir-karki/Learning-Machine-Learning/blob/main/Web-Scraping.ipynb",
  },
  {
    title: "Quiz Management System (MySQL)",
    blurb:
      "Designed relational schema for questions, users, and scoring. Implemented basic CRUD flows and result tracking.",
    tags: ["MySQL", "PHP", "Database"],
    href: "https://github.com/Amir-karki/Database",
  },
  {
    title: "PoS Visualization with Tableau",
    blurb:
      "Interactive visuals on sales, profit, and shipping using Tableau Public (Superstore-style analyses).",
    tags: ["Tableau", "Visualization", "Analytics"],
    href:
      "https://public.tableau.com/app/profile/amir.karki/viz/TableauDashboard_17318863055700/SuperstoreDashboard?publish=yes",
  },
  {
    title: "Titanic Survival Prediction",
    blurb:
      "Classic ML classification project experimenting with logistic regression, trees, and ensembles on Kaggle's Titanic dataset.",
    tags: ["Machine Learning", "scikit-learn", "Classification"],
    href: "#", // TODO: add repo link if available
  },
];

const SKILLS = [
  {
    group: "Programming Languages",
    items: ["Python", "Java", "JavaScript"],
  },
  {
    group: "Frontend",
    items: ["HTML", "CSS", "React"],
  },
  {
    group: "Databases",
    items: ["MySQL", "MongoDB"],
  },
  {
    group: "Web Scraping",
    items: ["BeautifulSoup"],
  },
  {
    group: "Visualization",
    items: ["Tableau", "Matplotlib", "Seaborn"],
  },
  {
    group: "Python Ecosystem",
    items: ["NumPy", "Pandas", "scikit-learn"],
  },
  {
    group: "Mathematics",
    items: ["Discrete Math", "Probability & Statistics", "Calculus"],
  },
  {
    group: "Machine Learning",
    items: [
      "Linear/Logistic Regression",
      "Decision Trees",
      "Random Forest",
      "SVM",
      "Naive Bayes",
      "KNN",
    ],
  },
];

const LEARNING = [
  "Deep Learning",
  "LLMs & Prompting",
  "MLOps fundamentals",
  "Generative AI for analytics",
];

// -----------------------
// Helpers
// -----------------------
const cn = (...classes) => classes.filter(Boolean).join(" ");

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const gradientText =
  "bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent";

// -----------------------
// Main component
// -----------------------
export default function Portfolio() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState("All");

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const allTags = useMemo(() => {
    const t = new Set(["All"]);
    PROJECTS.forEach((p) => p.tags.forEach((x) => t.add(x)));
    return Array.from(t);
  }, []);

  const shownProjects = useMemo(() => {
    let list = PROJECTS;
    if (tagFilter !== "All") list = list.filter((p) => p.tags.includes(tagFilter));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.blurb.toLowerCase().includes(q) ||
          p.tags.join(" ").toLowerCase().includes(q)
      );
    }
    return list;
  }, [query, tagFilter]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <SiteChrome theme={theme} setTheme={setTheme} />

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-60 blur-3xl">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-400/30" />
          <div className="absolute top-32 -right-12 h-80 w-80 rounded-full bg-sky-400/20" />
          <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-400/20" />
        </div>
        <div className="container mx-auto px-4 pb-20 pt-28 md:pt-36">
          <motion.p {...fadeIn} className="mb-4 text-sm tracking-widest text-neutral-600 dark:text-neutral-400">
            PORTFOLIO — 2025
          </motion.p>
          <motion.h1
            {...fadeIn}
            className={cn(
              "text-balance text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl",
              gradientText
            )}
          >
            {PROFILE.name}
          </motion.h1>
          <motion.h2
            {...fadeIn}
            transition={{ delay: 0.05, duration: 0.6 }}
            className="mt-4 text-xl text-neutral-700 dark:text-neutral-300 sm:text-2xl"
          >
            {PROFILE.title}
          </motion.h2>
          <motion.p
            {...fadeIn}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 max-w-2xl text-neutral-600 dark:text-neutral-400"
          >
            {PROFILE.subtitle}
          </motion.p>

          <motion.div
            {...fadeIn}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 rounded-2xl bg-neutral-900 px-4 py-2 text-white shadow-sm transition hover:shadow-md dark:bg-white dark:text-neutral-900"
            >
              <Mail className="h-4 w-4" /> Contact
            </a>
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 px-4 py-2 text-sm transition hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <span className="inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
              <MapPin className="h-4 w-4" /> {PROFILE.location}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <InfoCard label="Open‑source repos" value="10" hint="on GitHub" />
          <InfoCard label="Focus" value="Data • ML • Viz" hint="Python, SQL, Tableau" />
          <InfoCard label="Exploring" value="LLMs & MLOps" hint="learning journey" />
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="container mx-auto px-4 py-16">
        <SectionHeader kicker="Selected Work" title="Projects" />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              className="w-64 rounded-2xl border border-neutral-300 bg-white/70 py-2 pl-9 pr-3 text-sm shadow-sm outline-none transition placeholder:text-neutral-400 focus:ring-2 focus:ring-sky-300 dark:border-neutral-800 dark:bg-neutral-900/70 dark:focus:ring-sky-700"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setTagFilter(t)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-2xl border px-3 py-1.5 text-xs shadow-sm transition",
                  tagFilter === t
                    ? "border-sky-400 bg-sky-50 text-sky-700 dark:border-sky-600 dark:bg-sky-900/40 dark:text-sky-200"
                    : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
                )}
              >
                <Tag className="h-3.5 w-3.5" /> {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {shownProjects.map((p, i) => (
            <motion.a
              {...fadeIn}
              transition={{ delay: 0.05 * i, duration: 0.6 }}
              key={p.title}
              href={p.href}
              target={p.href?.startsWith("http") ? "_blank" : undefined}
              rel={p.href?.startsWith("http") ? "noreferrer" : undefined}
              className="group rounded-2xl border border-neutral-200 bg-white/70 p-5 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/70"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{p.blurb}</p>
                </div>
                <ExternalLink className="mt-1 h-4 w-4 text-neutral-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="container mx-auto px-4 py-16">
        <SectionHeader kicker="Toolkit" title="Skills & Technologies" />
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SKILLS.map((g, i) => (
            <motion.div
              {...fadeIn}
              transition={{ delay: 0.03 * i, duration: 0.5 }}
              key={g.group}
              className="rounded-2xl border border-neutral-200 bg-white/70 p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70"
            >
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                {g.group}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((x) => (
                  <span
                    key={x}
                    className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently Learning */}
        <div className="mt-10 rounded-2xl border border-neutral-200 bg-gradient-to-r from-neutral-50 to-white p-6 shadow-sm dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950">
          <h3 className="text-base font-semibold">Currently exploring</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Topics I'm actively learning and experimenting with:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {LEARNING.map((x) => (
              <span
                key={x}
                className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
              >
                {x}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container mx-auto px-4 py-16">
        <SectionHeader kicker="Say hello" title="Contact" />
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <ContactCard
            icon={<Mail className="h-5 w-5" />}
            label="Email"
            value={PROFILE.email}
            href={`mailto:${PROFILE.email}`}
          />
          <ContactCard
            icon={<Github className="h-5 w-5" />}
            label="GitHub"
            value="Amir-karki"
            href={PROFILE.socials.github}
          />
          <ContactCard
            icon={<Linkedin className="h-5 w-5" />}
            label="LinkedIn"
            value="a_for.amir"
            href={PROFILE.socials.linkedin}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200/70 py-10 text-sm text-neutral-500 dark:border-neutral-800/70">
        <div className="container mx-auto px-4 flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={PROFILE.socials.github}
              className="inline-flex items-center gap-2 hover:text-neutral-800 dark:hover:text-neutral-300"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href={PROFILE.socials.linkedin}
              className="inline-flex items-center gap-2 hover:text-neutral-800 dark:hover:text-neutral-300"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href={PROFILE.socials.instagram}
              className="inline-flex items-center gap-2 hover:text-neutral-800 dark:hover:text-neutral-300"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>
      </footer>

      {/* SEO schema (optional) */}
      <script
        type="application/ld+json"
        // @ts-ignore – injecting JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: PROFILE.name,
            jobTitle: PROFILE.title,
            email: PROFILE.email,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Vancouver",
              addressRegion: "BC",
              addressCountry: "Canada",
            },
            sameAs: [PROFILE.socials.github].filter(Boolean),
          }),
        }}
      />
    </div>
  );
}

// -----------------------
// UI building blocks
// -----------------------
function SiteChrome({ theme, setTheme }) {
  const nav = [
    { href: "#home", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-950/50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#home" className="group inline-flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-white shadow-sm transition group-hover:scale-105 dark:bg-white dark:text-neutral-900">
            AK
          </div>
          <span className="sr-only">Go to home</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-neutral-700 transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white/70 px-3 py-2 text-sm shadow-sm transition hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:bg-neutral-800"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4" /> Light
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" /> Dark
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function SectionHeader({ kicker, title }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold tracking-widest text-neutral-500 dark:text-neutral-400">
        {kicker}
      </p>
      <h2 className={cn("mt-2 text-3xl font-semibold md:text-4xl", gradientText)}>{title}</h2>
    </div>
  );
}

function InfoCard({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white/70 p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70">
      <p className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{value}</p>
      {hint && <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{hint}</p>}
    </div>
  );
}

function ContactCard({ icon, label, value, href }) {
  const Content = (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{label}</p>
        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="rounded-2xl border border-neutral-200 bg-white/70 p-5 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/70"
    >
      {Content}
    </a>
  ) : (
    <div className="rounded-2xl border border-neutral-200 bg-white/70 p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70">
      {Content}
    </div>
  );
}
