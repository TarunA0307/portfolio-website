'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Copy,
  Check,
  Send,
  ExternalLink,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { personalInfo, socialLinks } from '@/data/portfolio';
import { cn } from '@/lib/utils';

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

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface FormDataState {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [copied, setCopied] = useState<boolean>(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    message: '',
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/tarun.ak0307@gmail.com',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `New Portfolio Mail from ${formData.name}`,
          }),
        }
      );

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[140px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-0 w-[450px] h-[450px] bg-[#00F0FF]/5 rounded-full blur-[140px] -z-10"
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-14 md:mb-16"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-sm tracking-wider text-[#00F0FF] uppercase">
            // 04 — INITIALIZE CONNECTION
          </span>
          <span className="h-px w-12 bg-gradient-to-r from-[#00F0FF]/50 to-transparent" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          {personalInfo.contactHeading}
        </h2>
        <p className="mt-4 text-slate-400 text-base md:text-lg max-w-2xl">
          {personalInfo.contactSubtext}
        </p>
      </motion.div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Channels */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-5 flex flex-col gap-5"
        >
          {/* Email Card */}
          <div
            className={cn(
              'group relative backdrop-blur-md bg-white/[0.03] border border-white/[0.1] rounded-2xl p-6',
              'transition-all duration-300 hover:border-[#00F0FF]/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.12)]'
            )}
          >
            {/* HUD Corner Accents */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-2.5 left-2.5 h-2 w-2 border-l border-t border-[#00F0FF]/40 group-hover:border-[#00F0FF] transition-colors"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2.5 right-2.5 h-2 w-2 border-r border-b border-[#00F0FF]/40 group-hover:border-[#00F0FF] transition-colors"
            />

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/25 text-[#00F0FF]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block">
                    Direct Email
                  </span>
                  <span className="font-medium text-white text-sm sm:text-base break-all">
                    tarun.ak0307@gmail.com
                  </span>
                </div>
              </div>

              <a
                href={socialLinks.email}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send direct email via client"
                className="text-slate-400 hover:text-[#00F0FF] p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#00F0FF]/40 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <button
                type="button"
                onClick={handleCopyEmail}
                className={cn(
                  'w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-mono text-xs uppercase tracking-wider',
                  'transition-all duration-200 cursor-pointer',
                  copied
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-white/[0.05] text-slate-300 border border-white/[0.1] hover:bg-white/[0.1] hover:text-white hover:border-[#00F0FF]/40'
                )}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied to clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400 group-hover:text-white" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* LinkedIn Card */}
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group relative backdrop-blur-md bg-white/[0.03] border border-white/[0.1] rounded-2xl p-6',
              'transition-all duration-300 hover:border-[#00F0FF]/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.12)]',
              'flex items-center justify-between'
            )}
          >
            {/* HUD Corner Accents */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-2.5 left-2.5 h-2 w-2 border-l border-t border-[#00F0FF]/40 group-hover:border-[#00F0FF] transition-colors"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2.5 right-2.5 h-2 w-2 border-r border-b border-[#00F0FF]/40 group-hover:border-[#00F0FF] transition-colors"
            />

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-400 group-hover:text-[#00F0FF] group-hover:border-[#00F0FF]/40 transition-colors">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block">
                  Professional Network
                </span>
                <span className="font-semibold text-white group-hover:text-[#00F0FF] transition-colors">
                  LinkedIn Profile
                </span>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-400 group-hover:text-[#00F0FF] group-hover:border-[#00F0FF]/40 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group relative backdrop-blur-md bg-white/[0.03] border border-white/[0.1] rounded-2xl p-6',
              'transition-all duration-300 hover:border-[#00F0FF]/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.12)]',
              'flex items-center justify-between'
            )}
          >
            {/* HUD Corner Accents */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-2.5 left-2.5 h-2 w-2 border-l border-t border-[#00F0FF]/40 group-hover:border-[#00F0FF] transition-colors"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2.5 right-2.5 h-2 w-2 border-r border-b border-[#00F0FF]/40 group-hover:border-[#00F0FF] transition-colors"
            />

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-400 group-hover:text-[#00F0FF] group-hover:border-[#00F0FF]/40 transition-colors">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block">
                  Code &amp; Architecture
                </span>
                <span className="font-semibold text-white group-hover:text-[#00F0FF] transition-colors">
                  GitHub Profile
                </span>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-400 group-hover:text-[#00F0FF] group-hover:border-[#00F0FF]/40 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>
        </motion.div>

        {/* Right Column: 3D Glass Terminal Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="lg:col-span-7"
        >
          <div
            className={cn(
              'group relative backdrop-blur-md bg-white/[0.03] border border-white/[0.12] rounded-2xl p-6 sm:p-8',
              'shadow-[0_8px_32px_rgba(0,0,0,0.37)] transition-colors duration-300'
            )}
          >
            {/* HUD Corner Brackets */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-3 left-3 h-3 w-3 border-l-2 border-t-2 border-[#00F0FF]/40 group-hover:border-[#00F0FF] transition-colors duration-300"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-3 right-3 h-3 w-3 border-r-2 border-t-2 border-[#00F0FF]/40 group-hover:border-[#00F0FF] transition-colors duration-300"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-[#00F0FF]/40 group-hover:border-[#00F0FF] transition-colors duration-300"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-[#00F0FF]/40 transition-colors duration-300 group-hover:border-[#00F0FF]"
            />

            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-slate-300 ml-2">
                  TRANSMIT MESSAGE
                </span>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-0.5 rounded border border-[#00F0FF]/30">
                SSL_ENCRYPTED
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Field 1: Your Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                >
                  Your Name <span className="text-[#00F0FF]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/30 transition-all text-sm"
                />
              </div>

              {/* Field 2: Your Email ID */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                >
                  Your Email ID <span className="text-[#00F0FF]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. alex@example.com"
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/30 transition-all text-sm"
                />
              </div>

              {/* Field 3: Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                >
                  Message <span className="text-[#00F0FF]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Project specifications, ideas, internship queries, or collaboration proposals..."
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/30 transition-all text-sm resize-none"
                />
              </div>

              {/* Submit Button & Status States */}
              <div className="pt-2">
                {status === 'idle' && (
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg font-semibold text-black bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] hover:opacity-95 shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all duration-300 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Transmission</span>
                  </button>
                )}

                {status === 'sending' && (
                  <button
                    type="submit"
                    disabled
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg font-semibold text-white bg-white/[0.08] border border-white/[0.15] opacity-80 cursor-not-allowed transition-all duration-300"
                  >
                    <Loader2 className="w-4 h-4 animate-spin text-[#00F0FF]" />
                    <span>Sending Transmission...</span>
                  </button>
                )}

                {status === 'success' && (
                  <button
                    type="button"
                    disabled
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg font-semibold text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all duration-300"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Mail Sent Successfully!</span>
                  </button>
                )}

                {status === 'error' && (
                  <div className="space-y-3">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg font-semibold text-red-300 bg-red-500/20 border border-red-500/40 hover:bg-red-500/30 transition-all duration-300 cursor-pointer"
                    >
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span>Transmission Failed — Click to Retry</span>
                    </button>

                    <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span>Unable to reach endpoint automatically.</span>
                      <a
                        href={`mailto:tarun.ak0307@gmail.com?subject=Contact%20from%20Portfolio&body=${encodeURIComponent(
                          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-white font-medium underline hover:text-[#00F0FF] transition-colors"
                      >
                        Send via Mail Client <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
