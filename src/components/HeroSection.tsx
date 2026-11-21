'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowRight } from 'lucide-react';
import { personalInfo, focusAreas, socialLinks } from '@/data/portfolio';
import TiltCard from '@/components/TiltCard';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMousePos({ x, y });
  };

  const handleProjectsClick = () => {
    const el = document.querySelector('#projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    const el = document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Parallax multipliers & float oscillation configs for the 4 HUD cards
  const hudConfigs = [
    {
      // Card 0: Top-Left
      parallax: { x: -20, y: -16 },
      floatDuration: 4.6,
      floatDelay: 0,
      yRange: [-7, 7, -7],
      desktopPosition: 'md:left-2 lg:left-6 md:top-6 lg:top-8',
      dataLine: 'M 180 80 Q 240 140 280 180',
    },
    {
      // Card 1: Top-Right
      parallax: { x: 22, y: -14 },
      floatDuration: 5.2,
      floatDelay: 0.4,
      yRange: [6, -8, 6],
      desktopPosition: 'md:right-2 lg:right-6 md:top-6 lg:top-8',
      dataLine: 'M 420 80 Q 360 140 320 180',
    },
    {
      // Card 2: Bottom-Left
      parallax: { x: -16, y: 18 },
      floatDuration: 4.8,
      floatDelay: 0.8,
      yRange: [-6, 8, -6],
      desktopPosition: 'md:left-2 lg:left-6 md:bottom-8 lg:bottom-12',
      dataLine: 'M 180 320 Q 240 260 280 220',
    },
    {
      // Card 3: Bottom-Right
      parallax: { x: 24, y: 16 },
      floatDuration: 5.6,
      floatDelay: 1.2,
      yRange: [8, -6, 8],
      desktopPosition: 'md:right-2 lg:right-6 md:bottom-8 lg:bottom-12',
      dataLine: 'M 420 320 Q 360 260 320 220',
    },
  ];

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden bg-[#05030A] flex flex-col items-center justify-between pt-24 sm:pt-28 md:pt-32 pb-16 px-4 selection:bg-[#00F0FF]/30 selection:text-white"
    >
      {/* Background Cybernetic Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#00F0FF]/10 via-[#8B5CF6]/15 to-transparent blur-[140px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-[#00F0FF]/5 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#8B5CF6]/10 blur-[130px]" />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 1 — GIANT BACKGROUND TYPOGRAPHY (z-10)
         ───────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[14%] sm:top-[16%] md:top-[18%] left-1/2 -translate-x-1/2 z-10 w-full text-center select-none"
      >
        <div className="relative inline-block w-full">
          {/* Dual-layer effect: Subtle cyan/violet stroke */}
          <span
            className="block font-mono font-black text-[22vw] sm:text-[19vw] md:text-[18vw] leading-none tracking-tighter uppercase select-none opacity-40 blur-[0.5px]"
            style={{
              WebkitTextStroke: '1.5px rgba(0, 240, 255, 0.35)',
              color: 'transparent',
              textShadow: '0 0 45px rgba(139, 92, 246, 0.25)',
            }}
          >
            TARUN
          </span>
          {/* Metallic translucent gradient fill layer */}
          <span className="absolute inset-0 block font-mono font-black text-[22vw] sm:text-[19vw] md:text-[18vw] leading-none tracking-tighter uppercase select-none bg-clip-text text-transparent bg-gradient-to-b from-white/[0.18] via-white/[0.05] to-transparent">
            TARUN
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          CENTRAL CONTAINER FOR LAYERS 2 & 3 (Portrait & Orbiting HUD)
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-5xl flex flex-col items-center justify-center my-auto py-4 sm:py-6">
        {/* Animated Connecting SVG Data Lines (Desktop) */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden md:block h-full w-full z-15"
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="hudLineGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="hudLineGradViolet" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {hudConfigs.map((cfg, idx) => (
            <motion.path
              key={`dataline-${idx}`}
              d={cfg.dataLine}
              fill="none"
              stroke={idx % 2 === 0 ? 'url(#hudLineGradCyan)' : 'url(#hudLineGradViolet)'}
              strokeWidth="1.2"
              strokeDasharray="4 6"
              initial={{ strokeDashoffset: 0, opacity: 0.3 }}
              animate={{
                strokeDashoffset: idx % 2 === 0 ? -40 : 40,
                opacity: [0.25, 0.5, 0.25],
              }}
              transition={{
                strokeDashoffset: { repeat: Infinity, duration: 3, ease: 'linear' },
                opacity: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
              }}
            />
          ))}
        </svg>

        {/* ─────────────────────────────────────────────────────────────
            LAYER 2 — CENTRAL PORTRAIT WITH SMART FALLBACK (z-20)
           ───────────────────────────────────────────────────────────── */}
        <div className="relative z-20 flex items-center justify-center">
          {/* Outer glow rings around portrait container */}
          <div className="relative">
            {/* Concentric ambient pulse rings */}
            <motion.div
              aria-hidden="true"
              className="absolute -inset-4 rounded-full border border-cyan-400/20 pointer-events-none"
              animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full border border-violet-500/15 pointer-events-none"
              animate={{ scale: [1.05, 1, 1.05], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Central Circular Portrait Container */}
            <div
              className={cn(
                'relative h-60 w-60 sm:h-72 sm:w-72 md:h-80 md:w-80 rounded-full overflow-hidden border transition-all duration-500',
                'bg-radial from-[#0e0720] via-[#070414] to-[#05030A] border-cyan-400/40'
              )}
              style={{
                boxShadow:
                  '0 0 35px rgba(0, 240, 255, 0.35), 0 0 70px rgba(139, 92, 246, 0.25), inset 0 0 30px rgba(0, 240, 255, 0.2)',
              }}
            >
              {/* Image Loading Attempt */}
              {!imageError && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src="/profile.png"
                  alt={personalInfo.name}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  className={cn(
                    'h-full w-full object-cover transition-opacity duration-700',
                    imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  )}
                />
              )}

              {/* Holographic Cyber Silhouette Fallback (when image fails or loading) */}
              {(imageError || !imageLoaded) && (
                <div className="relative h-full w-full flex items-center justify-center select-none">
                  {/* Cyber Holographic SVG */}
                  <svg
                    viewBox="0 0 300 300"
                    className="h-full w-full p-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="holoBeam" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00F0FF" stopOpacity="0" />
                        <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="wireframeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00F0FF" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                      <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Concentric Glowing Rings in Violet and Cyan */}
                    <motion.circle
                      cx="150"
                      cy="150"
                      r="135"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="1.2"
                      strokeDasharray="14 18 36 12"
                      opacity="0.6"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                      style={{ transformOrigin: '150px 150px' }}
                    />
                    <motion.circle
                      cx="150"
                      cy="150"
                      r="120"
                      fill="none"
                      stroke="#00F0FF"
                      strokeWidth="1"
                      strokeDasharray="6 12"
                      opacity="0.45"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                      style={{ transformOrigin: '150px 150px' }}
                    />

                    {/* Depth Rings Pulsing Outward */}
                    <motion.circle
                      cx="150"
                      cy="150"
                      r="70"
                      fill="none"
                      stroke="#00F0FF"
                      strokeWidth="1.5"
                      initial={{ r: 60, opacity: 0.8 }}
                      animate={{ r: 140, opacity: 0 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <motion.circle
                      cx="150"
                      cy="150"
                      r="70"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="1.5"
                      initial={{ r: 60, opacity: 0.8 }}
                      animate={{ r: 140, opacity: 0 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 1.5 }}
                    />

                    {/* 3D Wireframe Cyber Silhouette: Head, Neck, Shoulders */}
                    <g filter="url(#cyanGlow)">
                      {/* Shoulders & Torso Wireframe */}
                      <motion.path
                        d="M 50 260 C 70 230, 105 210, 125 205 L 125 180 L 175 180 L 175 205 C 195 210, 230 230, 250 260 Z"
                        fill="none"
                        stroke="#00F0FF"
                        strokeWidth="1.8"
                        strokeDasharray="8 4"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -40 }}
                        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                      />

                      {/* Head Outline */}
                      <motion.path
                        d="M 150 75 C 120 75, 112 105, 115 135 C 118 158, 132 178, 150 188 C 168 178, 182 158, 185 135 C 188 105, 180 75, 150 75 Z"
                        fill="none"
                        stroke="#00F0FF"
                        strokeWidth="2"
                        strokeDasharray="10 5"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: 50 }}
                        transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
                      />

                      {/* Geometric Facial / Visor Wireframe Details */}
                      <path
                        d="M 125 125 L 175 125"
                        stroke="#00F0FF"
                        strokeWidth="1.5"
                        opacity="0.8"
                      />
                      <path
                        d="M 130 145 L 150 162 L 170 145"
                        stroke="#8B5CF6"
                        strokeWidth="1.2"
                        fill="none"
                        opacity="0.75"
                      />
                      <path
                        d="M 150 82 L 150 184"
                        stroke="#00F0FF"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                        opacity="0.6"
                      />

                      {/* Collarbone / Chest Grid lines */}
                      <path
                        d="M 90 240 L 150 220 L 210 240"
                        stroke="#8B5CF6"
                        strokeWidth="1.2"
                        fill="none"
                        opacity="0.7"
                      />
                      <path
                        d="M 70 255 L 150 235 L 230 255"
                        stroke="#00F0FF"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        fill="none"
                        opacity="0.6"
                      />

                      {/* Glowing Node Points */}
                      <circle cx="150" cy="75" r="2.5" fill="#00F0FF" />
                      <circle cx="125" cy="125" r="2.5" fill="#00F0FF" />
                      <circle cx="175" cy="125" r="2.5" fill="#00F0FF" />
                      <circle cx="150" cy="162" r="2" fill="#8B5CF6" />
                      <circle cx="150" cy="188" r="2.5" fill="#00F0FF" />
                      <circle cx="125" cy="205" r="2.5" fill="#00F0FF" />
                      <circle cx="175" cy="205" r="2.5" fill="#00F0FF" />
                      <circle cx="90" cy="240" r="2" fill="#8B5CF6" />
                      <circle cx="210" cy="240" r="2" fill="#8B5CF6" />
                    </g>

                    {/* Monospace HUD telemetry stamps */}
                    <text
                      x="40"
                      y="45"
                      fill="#00F0FF"
                      fontSize="7"
                      fontFamily="monospace"
                      opacity="0.7"
                    >
                      SYS.HOLO // 0x7E
                    </text>
                    <text
                      x="40"
                      y="55"
                      fill="#8B5CF6"
                      fontSize="6"
                      fontFamily="monospace"
                      opacity="0.6"
                    >
                      AI.STUDENT // SYNC
                    </text>
                    <text
                      x="200"
                      y="45"
                      fill="#00F0FF"
                      fontSize="7"
                      fontFamily="monospace"
                      opacity="0.7"
                    >
                      GRID // 99.4%
                    </text>
                    <text
                      x="200"
                      y="55"
                      fill="#8B5CF6"
                      fontSize="6"
                      fontFamily="monospace"
                      opacity="0.6"
                    >
                      NODE.ONLINE
                    </text>

                    {/* Crosshair Target Markers */}
                    <path
                      d="M 25 35 L 35 35 M 30 30 L 30 40"
                      stroke="#00F0FF"
                      strokeWidth="1"
                      opacity="0.5"
                    />
                    <path
                      d="M 265 35 L 275 35 M 270 30 L 270 40"
                      stroke="#00F0FF"
                      strokeWidth="1"
                      opacity="0.5"
                    />
                  </svg>

                  {/* Vertical Scanning Light Beam */}
                  <motion.div
                    aria-hidden="true"
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent shadow-[0_0_15px_#00F0FF] pointer-events-none z-30"
                    animate={{
                      top: ['2%', '96%', '2%'],
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <div className="absolute -top-3 left-0 right-0 h-7 bg-gradient-to-b from-[#00F0FF]/25 to-transparent blur-[3px]" />
                  </motion.div>
                </div>
              )}

              {/* Dark Gradient Fade at bottom of portrait container */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[#05030A]/70 to-[#05030A] pointer-events-none z-30"
              />
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            LAYER 3 — ORBITING HUD CARDS (z-30)
           ───────────────────────────────────────────────────────────── */}
        {/* Desktop Orbiting Layout (Arc around portrait) */}
        <div className="hidden md:block">
          {focusAreas.map((area, index) => {
            const cfg = hudConfigs[index];
            const parallaxX = mousePos.x * cfg.parallax.x;
            const parallaxY = mousePos.y * cfg.parallax.y;

            return (
              <motion.div
                key={area.id}
                className={cn('absolute z-30 w-56 lg:w-64', cfg.desktopPosition)}
                animate={{
                  y: cfg.yRange,
                  x: parallaxX,
                }}
                transition={{
                  y: {
                    duration: cfg.floatDuration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: cfg.floatDelay,
                  },
                  x: { type: 'spring', stiffness: 120, damping: 25 },
                }}
                style={{
                  translateY: parallaxY,
                }}
              >
                <TiltCard maxTilt={14} className="w-full">
                  <div className="relative rounded-lg border border-white/[0.12] bg-white/[0.03] p-3.5 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:border-cyan-400/40 hover:bg-white/[0.06] transition-colors duration-300 group">
                    {/* HUD Corner Brackets in monospace */}
                    <span className="absolute top-1 left-1.5 font-mono text-[11px] text-cyan-400/60 select-none group-hover:text-cyan-300">
                      ┌
                    </span>
                    <span className="absolute top-1 right-1.5 font-mono text-[11px] text-cyan-400/60 select-none group-hover:text-cyan-300">
                      ┐
                    </span>
                    <span className="absolute bottom-1 left-1.5 font-mono text-[11px] text-cyan-400/60 select-none group-hover:text-cyan-300">
                      └
                    </span>
                    <span className="absolute bottom-1 right-1.5 font-mono text-[11px] text-cyan-400/60 select-none group-hover:text-cyan-300">
                      ┘
                    </span>

                    {/* Card Content */}
                    <div className="flex flex-col gap-1 px-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold tracking-wider text-[#00F0FF] drop-shadow-[0_0_6px_rgba(0,240,255,0.4)]">
                          [{area.code}]
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/80 animate-ping" />
                      </div>
                      <p className="text-xs font-semibold text-neutral-200 tracking-wide line-clamp-1 group-hover:text-white">
                        {area.title}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile 2x2 Grid Layout (Below Portrait) */}
        <div className="grid grid-cols-2 gap-2.5 w-full mt-6 md:hidden z-30 px-2">
          {focusAreas.map((area) => (
            <TiltCard key={area.id} maxTilt={8} className="w-full">
              <div className="relative rounded-lg border border-white/[0.12] bg-white/[0.03] p-3 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                {/* HUD Corner Brackets */}
                <span className="absolute top-1 left-1.5 font-mono text-[10px] text-cyan-400/60 select-none">
                  ┌
                </span>
                <span className="absolute top-1 right-1.5 font-mono text-[10px] text-cyan-400/60 select-none">
                  ┐
                </span>
                <span className="absolute bottom-1 left-1.5 font-mono text-[10px] text-cyan-400/60 select-none">
                  └
                </span>
                <span className="absolute bottom-1 right-1.5 font-mono text-[10px] text-cyan-400/60 select-none">
                  ┘
                </span>

                <div className="flex flex-col gap-1 px-1">
                  <span className="font-mono text-[10px] font-bold text-[#00F0FF]">
                    [{area.code}]
                  </span>
                  <p className="text-[11px] font-medium text-neutral-200 leading-tight">
                    {area.title}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 4 — FOREGROUND TEXT & CTAS (z-40)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-40 w-full max-w-4xl text-center flex flex-col items-center mt-4 sm:mt-6"
      >
        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-mono text-cyan-300 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.15)] select-none"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00F0FF] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
          </span>
          <span>{personalInfo.location}</span>
        </motion.div>

        {/* Name & Role */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-3 space-y-1"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-white/90">
            {personalInfo.name}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-cyan-400/90 tracking-wider uppercase">
            {personalInfo.role}
          </p>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-2 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white"
        >
          <span className="bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            {personalInfo.headline}
          </span>
        </motion.h1>

        {/* Subtext Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-slate-300/80 mx-auto px-4"
        >
          {personalInfo.subtext}
        </motion.p>

        {/* 3 Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full"
        >
          {/* Button 1: View My Projects */}
          <button
            onClick={handleProjectsClick}
            className="group relative rounded-full p-[1px] font-semibold text-black transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_28px_rgba(0,240,255,0.4)] hover:shadow-[0_0_36px_rgba(0,240,255,0.6)] cursor-pointer"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#9d4edd] to-[#8B5CF6] transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-black tracking-wide transition-all group-hover:brightness-110">
              <span>View My Projects</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>

          {/* Button 2: View Resume */}
          <a
            href={socialLinks.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] backdrop-blur-md px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-neutral-200 transition-all duration-300 hover:border-white/35 hover:bg-white/[0.1] hover:text-white hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          >
            <Eye className="h-4 w-4 text-cyan-400 transition-colors group-hover:text-white" />
            <span>View Resume</span>
          </a>

          {/* Button 3: Contact Me */}
          <button
            onClick={handleContactClick}
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-neutral-300 transition-all duration-300 hover:border-white/50 hover:bg-white/[0.06] hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Contact Me</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
