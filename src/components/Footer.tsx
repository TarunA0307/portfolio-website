'use client';

import React from 'react';
import { personalInfo, socialLinks } from '@/data/portfolio';
import { Mail, ExternalLink } from 'lucide-react';

// Brand icons formatted to Lucide stroke specification
function Github({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface FooterSocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export default function Footer() {
  const currentYear = 2026;

  const links: FooterSocialLink[] = [
    {
      name: 'GitHub',
      href: socialLinks.github,
      icon: Github,
      label: 'GitHub Profile',
    },
    {
      name: 'LinkedIn',
      href: socialLinks.linkedin,
      icon: Linkedin,
      label: 'LinkedIn Profile',
    },
    {
      name: 'Email',
      href: socialLinks.email,
      icon: Mail,
      label: 'Email Contact',
    },
    {
      name: 'Resume',
      href: socialLinks.resumePath,
      icon: ExternalLink,
      label: 'Resume Document',
    },
  ];

  return (
    <footer className="relative bg-black/30 backdrop-blur-sm border-t border-white/[0.05] overflow-hidden">
      {/* Glowing top line */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-[#00F0FF]/50 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Side: Tarun Anantha Kumar em-dash AI & Data Science */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm text-slate-400">
            <span className="font-semibold text-white tracking-wide">
              {personalInfo.name}
            </span>
            <span className="text-slate-600">—</span>
            <span className="text-[#00F0FF]/80 font-mono text-xs md:text-sm">
              AI &amp; Data Science
            </span>
          </div>

          {/* Right Side: Icon links to GitHub, LinkedIn, Email, Resume */}
          <div className="flex items-center gap-3">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="group relative p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-400 transition-all duration-300 hover:text-[#00F0FF] hover:border-[#00F0FF]/40 hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                >
                  <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="sr-only">{item.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom: Copyright centered */}
        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-xs text-slate-500 font-mono">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
