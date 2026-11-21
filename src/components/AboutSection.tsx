'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from '@/components/TiltCard';
import { personalInfo, education, focusAreas } from '@/data/portfolio';
import { cn } from '@/lib/utils';

// ─── Custom Animated HUD Graphics for Focus Areas ───

function WebHudGraphic() {
  return (
    <div className="relative w-full h-[150px] bg-black/40 rounded-xl p-3 border border-white/5 overflow-hidden flex flex-col justify-between">
      {/* Mini Browser Window Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/[0.05] border border-white/10 font-mono text-[9px] text-[#00F0FF]/80">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
          <span>https://sys.core/ui-runtime</span>
        </div>
        <div className="font-mono text-[9px] text-white/30">200 OK</div>
      </div>

      {/* Wireframe Mockup Canvas */}
      <div className="relative flex-1 pt-2">
        <svg
          viewBox="0 0 280 85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Sidebar Wireframe */}
          <rect
            x="4"
            y="4"
            width="44"
            height="76"
            rx="4"
            fill="rgba(124, 58, 237, 0.08)"
            stroke="rgba(124, 58, 237, 0.3)"
            strokeWidth="1"
          />
          <line x1="12" y1="16" x2="38" y2="16" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <line x1="12" y1="28" x2="32" y2="28" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
          <line x1="12" y1="38" x2="34" y2="38" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
          <line x1="12" y1="48" x2="28" y2="48" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />

          {/* Main Top Header Wireframe */}
          <rect
            x="56"
            y="4"
            width="220"
            height="18"
            rx="4"
            fill="rgba(0, 240, 255, 0.05)"
            stroke="rgba(0, 240, 255, 0.25)"
            strokeWidth="1"
          />
          <line x1="68" y1="13" x2="130" y2="13" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
          <circle cx="260" cy="13" r="3" fill="#7C3AED" />

          {/* Interactive UI Wireframe Cards */}
          <rect
            x="56"
            y="28"
            width="104"
            height="52"
            rx="4"
            fill="rgba(255, 255, 255, 0.02)"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
          <rect
            x="172"
            y="28"
            width="104"
            height="52"
            rx="4"
            fill="rgba(255, 255, 255, 0.02)"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />

          {/* Animated Pulsing Code Lines with stroke-dashoffset */}
          <line
            x1="66"
            y1="40"
            x2="148"
            y2="40"
            stroke="#00F0FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 4"
            className="about-dash-flow"
          />
          <line
            x1="66"
            y1="50"
            x2="130"
            y2="50"
            stroke="#7C3AED"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="8 5"
            className="about-dash-flow-slow"
          />
          <line
            x1="66"
            y1="60"
            x2="110"
            y2="60"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />

          <line
            x1="182"
            y1="40"
            x2="264"
            y2="40"
            stroke="#7C3AED"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="7 4"
            className="about-dash-flow"
          />
          <line
            x1="182"
            y1="50"
            x2="240"
            y2="50"
            stroke="#00F0FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="5 3"
            className="about-dash-flow-slow"
          />
          <line
            x1="182"
            y1="60"
            x2="220"
            y2="60"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>

      <style jsx>{`
        .about-dash-flow {
          animation: about-dash 1.8s linear infinite;
        }
        .about-dash-flow-slow {
          animation: about-dash 2.8s linear infinite reverse;
        }
        @keyframes about-dash {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>
    </div>
  );
}

function DataHudGraphic() {
  return (
    <div className="relative w-full h-[150px] bg-black/40 rounded-xl p-3 border border-white/5 overflow-hidden flex flex-col justify-between">
      {/* Top telemetry tag */}
      <div className="flex items-center justify-between font-mono text-[9px] border-b border-white/10 pb-1.5">
        <span className="text-[#00F0FF] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
          STREAM // TELEMETRY
        </span>
        <span className="text-white/40">DELTA: +34.8%</span>
      </div>

      {/* SVG Animated Bar Chart */}
      <div className="relative flex-1 flex items-center justify-center pt-2">
        <svg
          viewBox="0 0 280 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="bar-grad-cyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="bar-grad-violet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="20" y1="20" x2="260" y2="20" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 3" />
          <line x1="20" y1="45" x2="260" y2="45" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 3" />
          <line x1="20" y1="70" x2="260" y2="70" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 3" />
          <line x1="20" y1="78" x2="260" y2="78" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="1" />

          {/* 6 Animated Bars */}
          {/* Bar 1 */}
          <rect
            x="32"
            width="24"
            rx="3"
            fill="url(#bar-grad-cyan)"
            className="bar-anim-1"
          />
          {/* Bar 2 */}
          <rect
            x="72"
            width="24"
            rx="3"
            fill="url(#bar-grad-violet)"
            className="bar-anim-2"
          />
          {/* Bar 3 */}
          <rect
            x="112"
            width="24"
            rx="3"
            fill="url(#bar-grad-cyan)"
            className="bar-anim-3"
          />
          {/* Bar 4 */}
          <rect
            x="152"
            width="24"
            rx="3"
            fill="url(#bar-grad-violet)"
            className="bar-anim-4"
          />
          {/* Bar 5 */}
          <rect
            x="192"
            width="24"
            rx="3"
            fill="url(#bar-grad-cyan)"
            className="bar-anim-5"
          />
          {/* Bar 6 */}
          <rect
            x="232"
            width="24"
            rx="3"
            fill="url(#bar-grad-violet)"
            className="bar-anim-6"
          />
        </svg>
      </div>

      <style jsx>{`
        .bar-anim-1 {
          animation: bar-kf-1 3s ease-in-out infinite;
        }
        .bar-anim-2 {
          animation: bar-kf-2 2.6s ease-in-out infinite;
        }
        .bar-anim-3 {
          animation: bar-kf-3 3.4s ease-in-out infinite;
        }
        .bar-anim-4 {
          animation: bar-kf-4 2.8s ease-in-out infinite;
        }
        .bar-anim-5 {
          animation: bar-kf-5 3.2s ease-in-out infinite;
        }
        .bar-anim-6 {
          animation: bar-kf-6 2.5s ease-in-out infinite;
        }

        @keyframes bar-kf-1 {
          0%, 100% { y: 35px; height: 43px; }
          50% { y: 15px; height: 63px; }
        }
        @keyframes bar-kf-2 {
          0%, 100% { y: 22px; height: 56px; }
          50% { y: 48px; height: 30px; }
        }
        @keyframes bar-kf-3 {
          0%, 100% { y: 44px; height: 34px; }
          50% { y: 12px; height: 66px; }
        }
        @keyframes bar-kf-4 {
          0%, 100% { y: 18px; height: 60px; }
          50% { y: 38px; height: 40px; }
        }
        @keyframes bar-kf-5 {
          0%, 100% { y: 50px; height: 28px; }
          50% { y: 25px; height: 53px; }
        }
        @keyframes bar-kf-6 {
          0%, 100% { y: 26px; height: 52px; }
          50% { y: 14px; height: 64px; }
        }
      `}</style>
    </div>
  );
}

function CloudHudGraphic() {
  return (
    <div className="relative w-full h-[150px] bg-black/40 rounded-xl p-3 border border-white/5 overflow-hidden flex flex-col justify-between">
      {/* Top telemetry tag */}
      <div className="flex items-center justify-between font-mono text-[9px] border-b border-white/10 pb-1.5">
        <span className="text-[#8B5CF6] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
          MESH // DISTRIBUTED
        </span>
        <span className="text-white/40">NODES: 3/3 SYNCED</span>
      </div>

      {/* SVG Server Cluster with glowing connections */}
      <div className="relative flex-1 flex items-center justify-center">
        <svg
          viewBox="0 0 280 95"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Triangular Connection Lines */}
          <line
            x1="140"
            y1="22"
            x2="65"
            y2="72"
            stroke="#00F0FF"
            strokeWidth="1.5"
            className="cloud-conn-1"
          />
          <line
            x1="140"
            y1="22"
            x2="215"
            y2="72"
            stroke="#7C3AED"
            strokeWidth="1.5"
            className="cloud-conn-2"
          />
          <line
            x1="65"
            y1="72"
            x2="215"
            y2="72"
            stroke="#00F0FF"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="cloud-conn-3"
          />

          {/* Node 1: Top Center Server */}
          <g transform="translate(140, 22)">
            <circle r="18" fill="rgba(11, 7, 25, 0.95)" stroke="#00F0FF" strokeWidth="1.5" />
            <rect x="-8" y="-7" width="16" height="4" rx="1" fill="#00F0FF" opacity="0.8" />
            <rect x="-8" y="-1" width="16" height="4" rx="1" fill="#00F0FF" opacity="0.6" />
            <rect x="-8" y="5" width="16" height="4" rx="1" fill="#00F0FF" opacity="0.4" />
            <circle cx="5" cy="-5" r="1" fill="#fff" />
            <circle cx="5" cy="1" r="1" fill="#fff" />
            <circle cx="5" cy="7" r="1" fill="#fff" />
          </g>

          {/* Node 2: Bottom-Left Database */}
          <g transform="translate(65, 72)">
            <circle r="17" fill="rgba(11, 7, 25, 0.95)" stroke="#8B5CF6" strokeWidth="1.5" />
            <rect x="-8" y="-6" width="16" height="3" rx="1" fill="#8B5CF6" opacity="0.8" />
            <rect x="-8" y="-1" width="16" height="3" rx="1" fill="#8B5CF6" opacity="0.6" />
            <rect x="-8" y="4" width="16" height="3" rx="1" fill="#8B5CF6" opacity="0.4" />
            <circle cx="-5" cy="-4.5" r="1" fill="#00F0FF" />
            <circle cx="-5" cy="0.5" r="1" fill="#00F0FF" />
            <circle cx="-5" cy="5.5" r="1" fill="#00F0FF" />
          </g>

          {/* Node 3: Bottom-Right Database */}
          <g transform="translate(215, 72)">
            <circle r="17" fill="rgba(11, 7, 25, 0.95)" stroke="#00F0FF" strokeWidth="1.5" />
            <rect x="-8" y="-6" width="16" height="3" rx="1" fill="#00F0FF" opacity="0.8" />
            <rect x="-8" y="-1" width="16" height="3" rx="1" fill="#00F0FF" opacity="0.6" />
            <rect x="-8" y="4" width="16" height="3" rx="1" fill="#00F0FF" opacity="0.4" />
            <circle cx="-5" cy="-4.5" r="1" fill="#8B5CF6" />
            <circle cx="-5" cy="0.5" r="1" fill="#8B5CF6" />
            <circle cx="-5" cy="5.5" r="1" fill="#8B5CF6" />
          </g>
        </svg>
      </div>

      <style jsx>{`
        .cloud-conn-1 {
          animation: conn-glow 2s ease-in-out infinite;
        }
        .cloud-conn-2 {
          animation: conn-glow 2.5s ease-in-out infinite 0.5s;
        }
        .cloud-conn-3 {
          animation: conn-glow 2.2s ease-in-out infinite 1s;
        }
        @keyframes conn-glow {
          0%, 100% {
            opacity: 0.3;
            stroke-width: 1.2;
          }
          50% {
            opacity: 0.9;
            stroke-width: 2.2;
          }
        }
      `}</style>
    </div>
  );
}

function ArchHudGraphic() {
  return (
    <div className="relative w-full h-[150px] bg-black/40 rounded-xl p-3 border border-white/5 overflow-hidden flex flex-col justify-between">
      {/* Top telemetry tag */}
      <div className="flex items-center justify-between font-mono text-[9px] border-b border-white/10 pb-1.5">
        <span className="text-[#00F0FF] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
          PIPELINE // OPTIMIZER
        </span>
        <span className="text-white/40">LATENCY: 0.8ms</span>
      </div>

      {/* SVG Pipeline + Speedometer / Gauge */}
      <div className="relative flex-1 flex items-center justify-between px-2 pt-1">
        {/* Left: Horizontal Pipeline Flow Bar */}
        <div className="w-[58%] flex flex-col gap-2">
          <div className="flex items-center justify-between font-mono text-[8px] text-white/50">
            <span>BUFFER_FILL</span>
            <span className="text-[#00F0FF]">ACTIVE</span>
          </div>

          {/* Pipeline Track 1 */}
          <div className="relative w-full h-3 bg-white/[0.04] rounded-full border border-white/10 overflow-hidden">
            <div className="pipe-fill-1 h-full rounded-full bg-gradient-to-r from-[#7C3AED] via-[#00F0FF] to-[#00F0FF]" />
          </div>

          {/* Pipeline Track 2 */}
          <div className="relative w-full h-2 bg-white/[0.04] rounded-full border border-white/10 overflow-hidden">
            <div className="pipe-fill-2 h-full rounded-full bg-gradient-to-r from-[#00F0FF] to-[#7C3AED]" />
          </div>

          <div className="font-mono text-[8px] text-white/30 truncate">
            &gt; IO_THROUGHPUT: 10GB/S
          </div>
        </div>

        {/* Right: Circular Gauge / Speedometer */}
        <div className="w-[38%] flex flex-col items-center justify-center">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg viewBox="0 0 70 70" className="w-full h-full -rotate-90">
              {/* Outer gauge track */}
              <circle
                cx="35"
                cy="35"
                r="28"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="4"
                strokeDasharray="130 50"
              />
              {/* Active animated gauge arc */}
              <circle
                cx="35"
                cy="35"
                r="28"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="130 50"
                className="gauge-arc-anim"
              />
            </svg>

            {/* Rotating Gauge Needle */}
            <div className="absolute inset-0 flex items-center justify-center gauge-needle-anim pointer-events-none">
              <div className="w-1 h-7 bg-gradient-to-t from-transparent via-[#00F0FF] to-white rounded-full -translate-y-2" />
            </div>

            {/* Center Gauge Hub */}
            <div className="absolute w-4 h-4 rounded-full bg-[#05030A] border border-[#00F0FF] flex items-center justify-center shadow-[0_0_8px_#00F0FF]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
            </div>
          </div>
          <span className="font-mono text-[9px] text-[#00F0FF] mt-1 font-bold">99.9% OPT</span>
        </div>
      </div>

      <style jsx>{`
        .pipe-fill-1 {
          animation: pipe-anim-1 3s ease-in-out infinite;
        }
        .pipe-fill-2 {
          animation: pipe-anim-2 2.2s ease-in-out infinite;
        }
        @keyframes pipe-anim-1 {
          0% { width: 15%; }
          50% { width: 95%; }
          100% { width: 15%; }
        }
        @keyframes pipe-anim-2 {
          0% { width: 85%; }
          50% { width: 25%; }
          100% { width: 85%; }
        }
        .gauge-arc-anim {
          animation: arc-pulse 3s ease-in-out infinite;
        }
        @keyframes arc-pulse {
          0%, 100% { stroke-dashoffset: 60; stroke: #00F0FF; }
          50% { stroke-dashoffset: 15; stroke: #8B5CF6; }
        }
        .gauge-needle-anim {
          animation: needle-rotate 4s ease-in-out infinite;
        }
        @keyframes needle-rotate {
          0%, 100% { transform: rotate(-50deg); }
          50% { transform: rotate(110deg); }
        }
      `}</style>
    </div>
  );
}

// Map focus area IDs to their respective custom HUD graphic
function renderFocusGraphic(id: string) {
  switch (id) {
    case 'web':
      return <WebHudGraphic />;
    case 'data':
      return <DataHudGraphic />;
    case 'cloud':
      return <CloudHudGraphic />;
    case 'arch':
      return <ArchHudGraphic />;
    default:
      return <WebHudGraphic />;
  }
}

// ─── Main AboutSection Component ───

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 bg-[#05030A] text-white overflow-hidden"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#7C3AED]/10 blur-[130px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#00F0FF]/5 blur-[120px] rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="font-mono text-sm text-[#00F0FF] tracking-widest uppercase">
              // 01 — ABOUT
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            {personalInfo.aboutHeading}
          </h2>
        </motion.div>

        {/* Bento Grid Layout (12-column responsive layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* ──────────────── Card 1: Main Bio (Spans 8 cols on desktop / 2 cols equivalent) ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-1 md:col-span-2 lg:col-span-8 flex flex-col"
          >
            <TiltCard
              maxTilt={8}
              glare={true}
              className="h-full backdrop-blur-md bg-white/[0.03] border border-white/[0.12] hover:border-[#00F0FF]/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between transition-all duration-300"
            >
              {/* HUD corner brackets */}
              <span
                aria-hidden="true"
                className="absolute top-3.5 left-4 font-mono text-xs text-white/20 select-none pointer-events-none"
              >
                ┌ [SYS.BIO]
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-3.5 right-4 font-mono text-xs text-white/20 select-none pointer-events-none"
              >
                [ARCH.CORE] ┘
              </span>

              {/* Card Header & Status Indicator */}
              <div className="pt-4 pb-6">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
                    <span className="font-mono text-xs text-[#00F0FF]/60 uppercase tracking-widest">
                      // SYS.ACTIVE.2026
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-white/40 border border-white/10 px-2 py-0.5 rounded">
                    PROTOCOL: PRIMARY
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {personalInfo.headline}
                  </h3>
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
                    {personalInfo.aboutBio}
                  </p>
                </div>
              </div>

              {/* Bottom Cybernetic Telemetry Bar */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/40">
                <div className="flex items-center gap-3">
                  <span className="text-[#00F0FF]">&gt; SPECIALIZATION:</span>
                  <span className="text-slate-300">{personalInfo.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00F0FF]">&gt; LOCATION:</span>
                  <span className="text-slate-300">{personalInfo.location}</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* ──────────────── Card 2: Education (Spans 4 cols on desktop / 1 col equivalent) ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col"
          >
            <TiltCard
              maxTilt={8}
              glare={true}
              className="h-full backdrop-blur-md bg-white/[0.03] border border-white/[0.12] hover:border-[#00F0FF]/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between transition-all duration-300 holo-border"
            >
              {/* HUD corner brackets */}
              <span
                aria-hidden="true"
                className="absolute top-3.5 left-4 font-mono text-xs text-white/20 select-none pointer-events-none"
              >
                ┌ [SYS.SPEC]
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-3.5 right-4 font-mono text-xs text-white/20 select-none pointer-events-none"
              >
                [ACAD.01] ┘
              </span>

              {/* Header */}
              <div className="pt-4 pb-4">
                <div className="flex items-center gap-2 font-mono text-sm text-[#00F0FF] tracking-wider uppercase mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                  <span>EDUCATION</span>
                </div>

                {/* Field Label + Value Pairs styled like terminal output */}
                <div className="space-y-4 font-mono text-xs sm:text-sm">
                  <div className="p-3 rounded-lg bg-black/30 border border-white/5 space-y-1">
                    <div className="text-[#00F0FF]/80 uppercase tracking-wider text-[11px]">
                      &gt; DEGREE:
                    </div>
                    <div className="text-slate-200 font-sans text-sm font-medium">
                      {education.degree}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-black/30 border border-white/5 space-y-1">
                    <div className="text-[#00F0FF]/80 uppercase tracking-wider text-[11px]">
                      &gt; LOCATION:
                    </div>
                    <div className="text-slate-200 font-sans text-sm">
                      {education.location}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-black/30 border border-white/5 space-y-1">
                    <div className="text-[#00F0FF]/80 uppercase tracking-wider text-[11px]">
                      &gt; STATUS:
                    </div>
                    <div className="flex items-center gap-2 text-slate-200 font-sans text-sm font-medium">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                      </span>
                      <span>{education.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel Status Line */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/30">
                <span>MEM_ALLOC: DEDICATED</span>
                <span>STATUS: VERIFIED</span>
              </div>
            </TiltCard>
          </motion.div>

          {/* ──────────────── Cards 3-6: Four Core Focus Areas (Each spans 3 cols on desktop) ──────────────── */}
          {focusAreas.map((focus, index) => (
            <motion.div
              key={focus.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
              className="col-span-1 md:col-span-1 lg:col-span-3 flex flex-col"
            >
              <TiltCard
                maxTilt={10}
                glare={true}
                className="h-full backdrop-blur-md bg-white/[0.03] border border-white/[0.12] hover:border-[#00F0FF]/30 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between transition-all duration-300 group"
              >
                {/* HUD corner brackets */}
                <span
                  aria-hidden="true"
                  className="absolute top-2.5 left-2.5 font-mono text-xs text-white/20 select-none pointer-events-none group-hover:text-[#00F0FF]/50 transition-colors"
                >
                  ┌
                </span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-2.5 right-2.5 font-mono text-xs text-white/20 select-none pointer-events-none group-hover:text-[#00F0FF]/50 transition-colors"
                >
                  ┘
                </span>

                {/* Top portion: Custom Animated SVG/Canvas HUD graphic */}
                <div className="w-full mb-4">
                  {renderFocusGraphic(focus.id)}
                </div>

                {/* Bottom portion: Focus Area Code & Title */}
                <div className="pt-2 border-t border-white/10">
                  <div className="font-mono text-xs text-[#00F0FF] tracking-wider uppercase font-semibold">
                    {focus.code}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white mt-1 group-hover:text-[#00F0FF] transition-colors line-clamp-2">
                    {focus.title}
                  </h4>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
