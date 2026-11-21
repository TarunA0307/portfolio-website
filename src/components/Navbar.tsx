'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navLinks, socialLinks } from '@/data/portfolio';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll position & active section observer
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section detection
      const scrollPos = window.scrollY + 200;
      const sectionIds = navLinks.map((link) => link.href.replace('#', ''));

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            return;
          }
        }
      }

      if (window.scrollY < 120) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver for precision detection
    const targets = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);

    let observer: IntersectionObserver | null = null;
    if (targets.length > 0) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0.1,
        }
      );
      targets.forEach((target) => observer?.observe(target));
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer?.disconnect();
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(href.replace('#', ''));
    }
    setMobileMenuOpen(false);
  };

  const handleTalkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setActiveSection('contact');
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-4 pt-4 sm:pt-6 pointer-events-none"
    >
      <nav
        aria-label="Main Navigation"
        className={cn(
          'pointer-events-auto w-full max-w-5xl rounded-full border px-4 py-2.5 sm:px-6 transition-all duration-300',
          'backdrop-blur-xl bg-black/50 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
          scrolled && 'border-white/15 bg-black/70 shadow-[0_8px_32px_rgba(0,240,255,0.06)]'
        )}
      >
        <div className="flex items-center justify-between">
          {/* Left: TARUN wordmark with glowing cyan dot */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('');
            }}
            className="group flex items-center select-none font-mono text-base sm:text-lg font-black tracking-wider text-white transition-opacity hover:opacity-90"
          >
            <span>TARUN</span>
            <span
              className="text-[#00F0FF] drop-shadow-[0_0_8px_#00F0FF] text-xl leading-none ml-0.5 inline-block animate-pulse"
              style={{
                textShadow: '0 0 10px #00F0FF, 0 0 20px #00F0FF',
              }}
            >
              .
            </span>
          </a>

          {/* Center: Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const linkId = link.href.replace('#', '');
              const isActive = activeSection === linkId;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={cn(
                    'relative px-3.5 py-1.5 text-xs lg:text-sm font-medium transition-all duration-200 rounded-full select-none',
                    isActive
                      ? 'text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]'
                      : 'text-neutral-400 hover:text-white'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-cyan-500/15 border border-cyan-400/40 shadow-[0_0_14px_rgba(0,240,255,0.3)] -z-10"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* View Resume button */}
            <a
              href={socialLinks.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs sm:text-sm font-medium text-neutral-300 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white active:scale-95"
            >
              <span>View Resume</span>
              <ExternalLink className="h-3.5 w-3.5 text-neutral-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </a>

            {/* Let's Talk button */}
            <button
              onClick={handleTalkClick}
              className="relative group rounded-full overflow-hidden p-[1px] transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,240,255,0.45)] active:scale-95 cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] via-[#9d4edd] to-[#8B5CF6] opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative block rounded-full bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] px-4 py-1.5 text-xs sm:text-sm font-bold text-black tracking-wide transition-all duration-300 group-hover:brightness-110">
                Let&apos;s Talk
              </span>
            </button>
          </div>

          {/* Mobile Actions: Let's Talk + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleTalkClick}
              className="rounded-full bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] px-3 py-1 text-xs font-bold text-black active:scale-95"
            >
              Talk
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-neutral-300 hover:text-white transition active:scale-95"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto mt-2 w-full max-w-5xl rounded-2xl border border-white/10 bg-black/85 p-5 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.8)] md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const linkId = link.href.replace('#', '');
                const isActive = activeSection === linkId;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-cyan-500/15 text-[#00F0FF] border border-cyan-500/30 font-semibold'
                        : 'text-neutral-300 hover:bg-white/[0.05] hover:text-white'
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                    )}
                  </a>
                );
              })}

              <div className="pt-3 mt-1 border-t border-white/10 flex flex-col gap-2.5">
                <a
                  href={socialLinks.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-xs font-semibold text-neutral-200 transition hover:bg-white/[0.08]"
                >
                  <span>View Resume</span>
                  <ExternalLink className="h-3.5 w-3.5 text-neutral-400" />
                </a>

                <button
                  onClick={handleTalkClick}
                  className="w-full rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] py-2.5 text-xs font-bold text-black tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.3)] transition hover:brightness-110 active:scale-[0.99]"
                >
                  Let&apos;s Talk
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
