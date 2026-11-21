// ─────────────────────────────────────────────────────────
// PORTFOLIO DATA — Edit all your details in one place
// ─────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Tarun Anantha Kumar",
  firstName: "TARUN",
  role: "AI & Data Science Student",
  headline: "Architecting Intelligence.",
  subtext:
    "I'm Tarun Anantha Kumar, an AI & Data Science student passionate about turning complex data and artificial intelligence into sleek, modern software that solves real-world challenges.",
  location: "Tamil Nadu, India",
  email: "tarun.ak0307@gmail.com",
  aboutHeading: "Engineering Smart Systems.",
  aboutBio:
    "Obsessed with building smart systems and next-level digital interfaces. I combine advanced algorithms, clean data architecture, and modern web tech to turn ambitious ideas into reality.",
  contactHeading: "Have something interesting in mind?",
  contactSubtext:
    "Whether it's an AI project, software collaboration, or internship opportunity—drop a message below and it will go straight to my inbox.",
};

export const education = {
  degree: "B.Tech / Undergraduate in Artificial Intelligence & Data Science",
  location: "Tamil Nadu, India",
  status: "Active Undergraduate Student",
};

export interface FocusArea {
  id: string;
  code: string;
  label: string;
  title: string;
}

export const focusAreas: FocusArea[] = [
  {
    id: "web",
    code: "01 // WEB",
    label: "Modern Web Development",
    title: "Modern Web Development",
  },
  {
    id: "data",
    code: "02 // DATA",
    label: "Data Visualization & Dashboard",
    title: "Data Visualization & Dashboard",
  },
  {
    id: "cloud",
    code: "03 // CLOUD",
    label: "Cloud Computing & Database Systems",
    title: "Cloud Computing & Database Systems",
  },
  {
    id: "arch",
    code: "04 // ARCH",
    label: "System Architecture & Optimization",
    title: "System Architecture & Optimization",
  },
];

export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: "vulnerability-triage",
    number: "01",
    title: "Personalised Vulnerability Triage",
    description:
      "An automated cybersecurity tool that analyzes, prioritizes, and triages software vulnerabilities based on real-world risk and system context.",
    techStack: ["Python", "FastAPI", "React"],
    githubUrl:
      "https://github.com/TarunA0307/personalised-vulnerability-triage",
    category: "CYBER",
  },
  {
    id: "synarchis-ai",
    number: "02",
    title: "Synarchis-AI",
    description:
      "A multi-agent architecture where specialized AI agents collaborate in real time to break down problems, analyze data, and deliver structured solutions.",
    techStack: ["Python", "Multi-Agent Systems", "Groq API", "Gemini API"],
    githubUrl: "https://github.com/TarunA0307/Synarchis-AI",
    category: "AI",
  },
  {
    id: "hack-to-feed",
    number: "03",
    title: "Hack-To-Feed",
    description:
      "A social-impact platform connecting surplus food donors with local NGOs and communities in real time to eliminate food waste and fight hunger.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    githubUrl: "https://github.com/TarunA0307/Hack-To-Feed",
    category: "SOCIAL",
  },
];

export interface SkillCategory {
  id: string;
  number: string;
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    number: "01",
    title: "Languages & Core",
    skills: ["Python", "SQL", "C", "C++", "Java"],
  },
  {
    id: "ai-data",
    number: "02",
    title: "AI & Data Science",
    skills: [
      "Data Analysis & Visualization",
      "Python Data Stack (Pandas, NumPy)",
      "Groq / Ollama / Gemini API",
      "Multi-Agent Systems",
    ],
  },
  {
    id: "web-frontend",
    number: "03",
    title: "Web & Frontend",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "HTML5 / CSS3",
      "Three.js / WebGL",
      "Streamlit",
    ],
  },
  {
    id: "cloud-tools",
    number: "04",
    title: "Cloud, Databases & Tools",
    skills: ["Supabase", "MySQL", "Git & GitHub"],
  },
];

export const socialLinks = {
  github: "https://github.com/TarunA0307",
  linkedin: "https://www.linkedin.com/in/tarun-a-1a6b1b372",
  email: "mailto:tarun.ak0307@gmail.com",
  resumePath: "/resume.pdf",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
