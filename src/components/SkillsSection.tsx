'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '@/data/portfolio';
import TiltCard from '@/components/TiltCard';
import { cn } from '@/lib/utils';

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background cyber accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F0FF]/5 rounded-full blur-[140px] -z-10"
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
            // 03 — TECHNICAL ARSENAL
          </span>
          <span className="h-px w-12 bg-gradient-to-r from-[#00F0FF]/50 to-transparent" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Tools &amp; Technologies.
        </h2>
        <p className="mt-4 text-slate-400 text-base md:text-lg max-w-2xl">
          A high-performance technical stack spanning artificial intelligence, modern full-stack web engineering, and enterprise database systems.
        </p>
      </motion.div>

      {/* 4-Quadrant 3D Glass Bento Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 [perspective:1200px]">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
            className="h-full"
          >
            <TiltCard
              tiltIntensity={12}
              containerClassName="h-full"
              className={cn(
                'group relative h-full flex flex-col justify-between',
                'backdrop-blur-md bg-white/[0.03] border border-white/[0.12] rounded-2xl p-6 md:p-8',
                'hover:border-[#00F0FF]/40 transition-colors duration-300'
              )}
            >
              {/* HUD corner brackets at corners */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-3 left-3 h-3 w-3 border-l-2 border-t-2 border-[#00F0FF]/40 transition-colors duration-300 group-hover:border-[#00F0FF]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-3 right-3 h-3 w-3 border-r-2 border-t-2 border-[#00F0FF]/40 transition-colors duration-300 group-hover:border-[#00F0FF]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-[#00F0FF]/40 transition-colors duration-300 group-hover:border-[#00F0FF]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-[#00F0FF]/40 transition-colors duration-300 group-hover:border-[#00F0FF]"
              />

              {/* Card Main Body */}
              <div className="relative z-10">
                {/* Category number + title header */}
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold text-white text-xl md:text-2xl tracking-wide flex items-baseline gap-2">
                    <span className="font-mono text-base md:text-lg text-[#00F0FF] font-semibold">
                      {category.number}.
                    </span>
                    <span>{category.title}</span>
                  </h3>
                  <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.08] tracking-widest hidden sm:inline-block">
                    MATRIX_{category.number}
                  </span>
                </div>

                {/* Thin horizontal line separator */}
                <div className="bg-gradient-to-r from-[#00F0FF]/50 to-transparent h-px my-5" />

                {/* Skills interactive badges in flex-wrap layout */}
                <div className="flex flex-wrap gap-2.5 [transform-style:preserve-3d]">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="[transform-style:preserve-3d] transition-all duration-300 hover:[transform:translateZ(20px)]"
                    >
                      <span
                        className={cn(
                          'inline-block bg-white/[0.05] border border-white/[0.1] rounded-lg px-4 py-2 text-sm text-slate-300',
                          'transition-all duration-300 cursor-default select-none',
                          'hover:border-[#00F0FF]/50 hover:text-white hover:shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                        )}
                      >
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status footer for cyberpunk terminal aesthetic */}
              <div className="relative z-10 mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                  STATUS: OPERATIONAL
                </span>
                <span className="text-slate-500">
                  [{category.skills.length} MODULES]
                </span>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
