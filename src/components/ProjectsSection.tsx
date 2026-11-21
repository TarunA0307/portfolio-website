'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import TiltCard from '@/components/TiltCard';
import { projects, type Project } from '@/data/portfolio';
import { cn } from '@/lib/utils';

// ─── Custom Interactive HUD Preview 1: Cybersecurity Radar ───

function CyberRadarHud() {
  return (
    <div className="relative w-full h-full min-h-[280px] md:min-h-[320px] flex items-center justify-center p-2 select-none overflow-hidden">
      <svg
        viewBox="0 0 460 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[340px]"
      >
        <defs>
          {/* Radar Sector Gradient */}
          <linearGradient id="radar-sweep-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
          </linearGradient>

          {/* Bar Gradients */}
          <linearGradient id="bar-crit-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F87171" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="bar-high-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="bar-triaged-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* ── Background Grid & Calibration Rings ── */}
        <circle cx="150" cy="130" r="100" stroke="#7C3AED" strokeWidth="1.2" strokeOpacity="0.3" />
        <circle cx="150" cy="130" r="70" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 4" />
        <circle cx="150" cy="130" r="40" stroke="#00F0FF" strokeWidth="0.8" strokeOpacity="0.2" />
        <circle cx="150" cy="130" r="10" stroke="white" strokeWidth="0.6" strokeOpacity="0.15" />
        <circle cx="150" cy="130" r="2.5" fill="#00F0FF" />

        {/* Crosshair Axes */}
        <line x1="40" y1="130" x2="260" y2="130" stroke="#00F0FF" strokeWidth="0.8" strokeOpacity="0.2" />
        <line x1="150" y1="20" x2="150" y2="240" stroke="#00F0FF" strokeWidth="0.8" strokeOpacity="0.2" />
        <line x1="79" y1="59" x2="221" y2="201" stroke="#7C3AED" strokeWidth="0.6" strokeOpacity="0.15" strokeDasharray="2 3" />
        <line x1="79" y1="201" x2="221" y2="59" stroke="#7C3AED" strokeWidth="0.6" strokeOpacity="0.15" strokeDasharray="2 3" />

        {/* Distance Range Markers */}
        <text x="154" y="38" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="monospace">100m</text>
        <text x="154" y="68" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="monospace">70m</text>
        <text x="154" y="98" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="monospace">40m</text>

        {/* ── Rotating Radar Sweep Line & Sector ── */}
        <g className="radar-sweep-spin" style={{ transformOrigin: '150px 130px' }}>
          {/* Sweep Sector */}
          <path
            d="M 150 130 L 150 30 A 100 100 0 0 1 220 59 Z"
            fill="url(#radar-sweep-grad)"
          />
          {/* Sweep Leading Line */}
          <line
            x1="150"
            y1="130"
            x2="150"
            y2="30"
            stroke="#00F0FF"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* ── 3 Severity Nodes around Radar ── */}
        {/* 1. CRITICAL Node (Top Right) */}
        <g transform="translate(210, 80)">
          <circle r="12" fill="none" stroke="#EF4444" strokeWidth="1" className="radar-pulse-crit" />
          <circle r="4" fill="#EF4444" className="radar-dot-glow-red" />
          <line x1="4" y1="-4" x2="16" y2="-12" stroke="#EF4444" strokeWidth="0.8" opacity="0.6" />
          <line x1="16" y1="-12" x2="62" y2="-12" stroke="#EF4444" strokeWidth="0.8" opacity="0.6" />
          <text x="18" y="-16" fill="#EF4444" fontSize="9" fontFamily="monospace" fontWeight="bold">
            CRITICAL
          </text>
          <text x="18" y="-4" fill="#FCA5A5" fontSize="7" fontFamily="monospace">
            CVE-9.8 RCE
          </text>
        </g>

        {/* 2. HIGH Node (Bottom Left) */}
        <g transform="translate(90, 180)">
          <circle r="11" fill="none" stroke="#F59E0B" strokeWidth="1" className="radar-pulse-high" />
          <circle r="3.5" fill="#F59E0B" />
          <line x1="-4" y1="4" x2="-14" y2="12" stroke="#F59E0B" strokeWidth="0.8" opacity="0.6" />
          <line x1="-14" y1="12" x2="-56" y2="12" stroke="#F59E0B" strokeWidth="0.8" opacity="0.6" />
          <text x="-56" y="8" fill="#F59E0B" fontSize="9" fontFamily="monospace" fontWeight="bold">
            HIGH
          </text>
          <text x="-56" y="20" fill="#FCD34D" fontSize="7" fontFamily="monospace">
            AUTH-BYPASS
          </text>
        </g>

        {/* 3. TRIAGED Node (Bottom Right) */}
        <g transform="translate(205, 185)">
          <circle r="11" fill="none" stroke="#00F0FF" strokeWidth="1" className="radar-pulse-triaged" />
          <circle r="3.5" fill="#00F0FF" />
          <line x1="4" y1="4" x2="16" y2="12" stroke="#00F0FF" strokeWidth="0.8" opacity="0.6" />
          <line x1="16" y1="12" x2="62" y2="12" stroke="#00F0FF" strokeWidth="0.8" opacity="0.6" />
          <text x="18" y="8" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
            TRIAGED
          </text>
          <text x="18" y="20" fill="#7DD3FC" fontSize="7" fontFamily="monospace">
            PATCH READY
          </text>
        </g>

        {/* ── Telemetry Side Box (Top Right) ── */}
        <g transform="translate(285, 25)">
          <rect
            x="0"
            y="0"
            width="165"
            height="115"
            rx="6"
            fill="rgba(11, 7, 25, 0.7)"
            stroke="rgba(0, 240, 255, 0.2)"
            strokeWidth="1"
          />
          <text x="10" y="18" fill="#00F0FF" fontSize="8" fontFamily="monospace" fontWeight="bold">
            [SYS_RADAR // ACTIVE]
          </text>
          <line x1="10" y1="24" x2="155" y2="24" stroke="rgba(255,255,255,0.1)" />

          <text x="10" y="40" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">TARGETS:</text>
          <text x="80" y="40" fill="#F8FAFC" fontSize="8" fontFamily="monospace">1,420 ENDPTS</text>

          <text x="10" y="56" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">SCAN FREQ:</text>
          <text x="80" y="56" fill="#00F0FF" fontSize="8" fontFamily="monospace">2.4 GHz</text>

          <text x="10" y="72" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">STATUS:</text>
          <text x="80" y="72" fill="#EF4444" fontSize="8" fontFamily="monospace" fontWeight="bold">MITIGATING</text>

          <text x="10" y="88" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">AUTO-PATCH:</text>
          <text x="80" y="88" fill="#10B981" fontSize="8" fontFamily="monospace">ACTIVE</text>

          <text x="10" y="104" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">THREAT IDX:</text>
          <text x="80" y="104" fill="#00F0FF" fontSize="8" fontFamily="monospace">94.6% CALC</text>
        </g>

        {/* ── Horizontal Risk-Priority Bars below Radar ── */}
        <g transform="translate(15, 250)">
          <text x="10" y="10" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">
            RISK PRIORITY QUEUE:
          </text>

          {/* Bar 1: Critical */}
          <g transform="translate(10, 18)">
            <text x="0" y="8" fill="#EF4444" fontSize="8" fontFamily="monospace" fontWeight="bold">
              CRIT // RCE
            </text>
            <rect x="75" y="0" width="345" height="10" rx="3" fill="rgba(255,255,255,0.05)" />
            <rect x="75" y="0" height="10" rx="3" fill="url(#bar-crit-grad)" className="bar-crit-anim" />
          </g>

          {/* Bar 2: High */}
          <g transform="translate(10, 34)">
            <text x="0" y="8" fill="#F59E0B" fontSize="8" fontFamily="monospace" fontWeight="bold">
              HIGH // AUTH
            </text>
            <rect x="75" y="0" width="345" height="10" rx="3" fill="rgba(255,255,255,0.05)" />
            <rect x="75" y="0" height="10" rx="3" fill="url(#bar-high-grad)" className="bar-high-anim" />
          </g>

          {/* Bar 3: Triaged */}
          <g transform="translate(10, 50)">
            <text x="0" y="8" fill="#00F0FF" fontSize="8" fontFamily="monospace" fontWeight="bold">
              TRIAGED // XSS
            </text>
            <rect x="75" y="0" width="345" height="10" rx="3" fill="rgba(255,255,255,0.05)" />
            <rect x="75" y="0" height="10" rx="3" fill="url(#bar-triaged-grad)" className="bar-triaged-anim" />
          </g>
        </g>
      </svg>

      <style jsx>{`
        .radar-sweep-spin {
          animation: radar-rotation 4s linear infinite;
        }
        @keyframes radar-rotation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .radar-pulse-crit {
          animation: pulse-crit-kf 2s ease-out infinite;
        }
        @keyframes pulse-crit-kf {
          0% {
            r: 4;
            opacity: 0.9;
          }
          100% {
            r: 18;
            opacity: 0;
          }
        }

        .radar-pulse-high {
          animation: pulse-high-kf 2.4s ease-out infinite 0.6s;
        }
        @keyframes pulse-high-kf {
          0% {
            r: 3.5;
            opacity: 0.9;
          }
          100% {
            r: 16;
            opacity: 0;
          }
        }

        .radar-pulse-triaged {
          animation: pulse-triaged-kf 2.2s ease-out infinite 1.2s;
        }
        @keyframes pulse-triaged-kf {
          0% {
            r: 3.5;
            opacity: 0.9;
          }
          100% {
            r: 16;
            opacity: 0;
          }
        }

        .bar-crit-anim {
          animation: bar-crit-kf 3.5s ease-in-out infinite;
        }
        @keyframes bar-crit-kf {
          0%, 100% { width: 220px; }
          50% { width: 310px; }
        }

        .bar-high-anim {
          animation: bar-high-kf 4s ease-in-out infinite;
        }
        @keyframes bar-high-kf {
          0%, 100% { width: 170px; }
          50% { width: 240px; }
        }

        .bar-triaged-anim {
          animation: bar-triaged-kf 3s ease-in-out infinite;
        }
        @keyframes bar-triaged-kf {
          0%, 100% { width: 260px; }
          50% { width: 335px; }
        }
      `}</style>
    </div>
  );
}

// ─── Custom Interactive HUD Preview 2: Synarchis AI Neural Agent Graph ───

function SynarchisAiHud() {
  return (
    <div className="relative w-full h-full min-h-[280px] md:min-h-[320px] flex items-center justify-center p-2 select-none overflow-hidden">
      <svg
        viewBox="0 0 460 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[340px]"
      >
        <defs>
          <linearGradient id="orch-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#120A2A" />
            <stop offset="100%" stopColor="#0B0719" />
          </linearGradient>

          <radialGradient id="packet-glow-cyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="packet-glow-violet" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Cross-Mesh Synapses (background connections) */}
        <line x1="230" y1="52" x2="385" y2="160" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.18" strokeDasharray="3 4" />
        <line x1="385" y1="160" x2="230" y2="268" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.18" strokeDasharray="3 4" />
        <line x1="230" y1="268" x2="75" y2="160" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.18" strokeDasharray="3 4" />
        <line x1="75" y1="160" x2="230" y2="52" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.18" strokeDasharray="3 4" />

        {/* ── Primary Animated Connection Lines (Spokes) ── */}
        {/* Top: Orchestrator -> Agent 01 */}
        <line x1="230" y1="122" x2="230" y2="76" stroke="#00F0FF" strokeWidth="2" strokeOpacity="0.6" />
        {/* Right: Orchestrator -> Agent 02 */}
        <line x1="268" y1="160" x2="361" y2="160" stroke="#7C3AED" strokeWidth="2" strokeOpacity="0.6" />
        {/* Bottom: Orchestrator -> Agent 03 */}
        <line x1="230" y1="198" x2="230" y2="244" stroke="#00F0FF" strokeWidth="2" strokeOpacity="0.6" />
        {/* Left: Orchestrator -> Agent 04 */}
        <line x1="192" y1="160" x2="99" y2="160" stroke="#7C3AED" strokeWidth="2" strokeOpacity="0.6" />

        {/* ── Data Packets Traveling along connection lines using animateMotion ── */}
        {/* Top Packet Outbound */}
        <circle r="3.5" fill="#00F0FF">
          <animateMotion
            path="M 230 122 L 230 76"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Top Packet Inbound */}
        <circle r="3" fill="#A78BFA">
          <animateMotion
            path="M 230 76 L 230 122"
            dur="1.8s"
            begin="0.9s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Right Packet Outbound */}
        <circle r="3.5" fill="#A78BFA">
          <animateMotion
            path="M 268 160 L 361 160"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Right Packet Inbound */}
        <circle r="3" fill="#00F0FF">
          <animateMotion
            path="M 361 160 L 268 160"
            dur="2.2s"
            begin="1.1s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Bottom Packet Outbound */}
        <circle r="3.5" fill="#00F0FF">
          <animateMotion
            path="M 230 198 L 230 244"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Bottom Packet Inbound */}
        <circle r="3" fill="#A78BFA">
          <animateMotion
            path="M 230 244 L 230 198"
            dur="2.4s"
            begin="1.2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Left Packet Outbound */}
        <circle r="3.5" fill="#A78BFA">
          <animateMotion
            path="M 192 160 L 99 160"
            dur="2.0s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Left Packet Inbound */}
        <circle r="3" fill="#00F0FF">
          <animateMotion
            path="M 99 160 L 192 160"
            dur="2.0s"
            begin="1.0s"
            repeatCount="indefinite"
          />
        </circle>

        {/* ── Center Large Circle: ORCHESTRATOR ── */}
        <g transform="translate(230, 160)">
          {/* Pulsing Aura Rings */}
          <circle r="48" fill="none" stroke="#00F0FF" strokeWidth="1" strokeDasharray="4 4" className="orch-aura-spin" />
          <circle r="43" fill="none" stroke="#7C3AED" strokeWidth="1.2" strokeOpacity="0.4" className="orch-aura-pulse" />

          {/* Core Body */}
          <circle r="38" fill="url(#orch-grad)" stroke="#00F0FF" strokeWidth="2" />
          <circle r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

          {/* Node Icon & Labels */}
          <polygon
            points="0,-10 9,-5 9,5 0,10 -9,5 -9,-5"
            fill="none"
            stroke="#00F0FF"
            strokeWidth="1.5"
            opacity="0.8"
          />
          <circle r="2.5" fill="#fff" />

          <text x="0" y="19" textAnchor="middle" fill="#00F0FF" fontSize="7.5" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
            ORCHESTRATOR
          </text>
        </g>

        {/* ── 4 Surrounding Specialized Agent Circles ── */}
        {/* 1. AGENT 01: Reasoning (Top) */}
        <g transform="translate(230, 48)">
          <circle r="25" fill="#0B0719" stroke="#7C3AED" strokeWidth="1.8" />
          <circle r="21" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <text x="0" y="-4" textAnchor="middle" fill="#A78BFA" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            AGENT 01
          </text>
          <text x="0" y="7" textAnchor="middle" fill="#F8FAFC" fontSize="6.5" fontFamily="monospace">
            REASONING
          </text>
          <text x="0" y="16" textAnchor="middle" fill="#00F0FF" fontSize="5.5" fontFamily="monospace">
            GROQ // LLM
          </text>
        </g>

        {/* 2. AGENT 02: Retrieval (Right) */}
        <g transform="translate(385, 160)">
          <circle r="25" fill="#0B0719" stroke="#00F0FF" strokeWidth="1.8" />
          <circle r="21" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <text x="0" y="-4" textAnchor="middle" fill="#00F0FF" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            AGENT 02
          </text>
          <text x="0" y="7" textAnchor="middle" fill="#F8FAFC" fontSize="6.5" fontFamily="monospace">
            RETRIEVAL
          </text>
          <text x="0" y="16" textAnchor="middle" fill="#A78BFA" fontSize="5.5" fontFamily="monospace">
            VECTOR // RAG
          </text>
        </g>

        {/* 3. AGENT 03: Synthesis (Bottom) */}
        <g transform="translate(230, 272)">
          <circle r="25" fill="#0B0719" stroke="#7C3AED" strokeWidth="1.8" />
          <circle r="21" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <text x="0" y="-4" textAnchor="middle" fill="#A78BFA" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            AGENT 03
          </text>
          <text x="0" y="7" textAnchor="middle" fill="#F8FAFC" fontSize="6.5" fontFamily="monospace">
            SYNTHESIS
          </text>
          <text x="0" y="16" textAnchor="middle" fill="#00F0FF" fontSize="5.5" fontFamily="monospace">
            GEMINI // API
          </text>
        </g>

        {/* 4. AGENT 04: Execution (Left) */}
        <g transform="translate(75, 160)">
          <circle r="25" fill="#0B0719" stroke="#00F0FF" strokeWidth="1.8" />
          <circle r="21" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <text x="0" y="-4" textAnchor="middle" fill="#00F0FF" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            AGENT 04
          </text>
          <text x="0" y="7" textAnchor="middle" fill="#F8FAFC" fontSize="6.5" fontFamily="monospace">
            EXECUTION
          </text>
          <text x="0" y="16" textAnchor="middle" fill="#A78BFA" fontSize="5.5" fontFamily="monospace">
            SANDBOX // IO
          </text>
        </g>

        {/* ── HUD Telemetry Stamps ── */}
        <text x="14" y="24" fill="rgba(0, 240, 255, 0.8)" fontSize="8" fontFamily="monospace" fontWeight="bold">
          [MULTI-AGENT GRAPH // ACTIVE]
        </text>
        <text x="14" y="38" fill="rgba(255, 255, 255, 0.35)" fontSize="7" fontFamily="monospace">
          TOPOLOGY: DISTRIBUTED MESH
        </text>

        <text x="446" y="24" textAnchor="end" fill="rgba(255, 255, 255, 0.4)" fontSize="7" fontFamily="monospace">
          CONSENSUS: <tspan fill="#10B981" fontWeight="bold">99.4%</tspan>
        </text>
        <text x="446" y="38" textAnchor="end" fill="rgba(255, 255, 255, 0.4)" fontSize="7" fontFamily="monospace">
          THROUGHPUT: <tspan fill="#00F0FF">840 T/SEC</tspan>
        </text>

        <text x="14" y="306" fill="rgba(255, 255, 255, 0.35)" fontSize="7" fontFamily="monospace">
          LATENCY: 12ms // CONCURRENT AGENTS: 4/4
        </text>
      </svg>

      <style jsx>{`
        .orch-aura-spin {
          animation: spin-orch 12s linear infinite;
          transform-origin: center;
        }
        @keyframes spin-orch {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .orch-aura-pulse {
          animation: pulse-orch 3s ease-in-out infinite;
        }
        @keyframes pulse-orch {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.97);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.04);
          }
        }
      `}</style>
    </div>
  );
}

// ─── Custom Interactive HUD Preview 3: Hack-To-Feed Geolocation Map HUD ───

function GeoMapHud() {
  return (
    <div className="relative w-full h-full min-h-[280px] md:min-h-[320px] flex items-center justify-center p-2 select-none overflow-hidden">
      <svg
        viewBox="0 0 460 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[340px]"
      >
        <defs>
          <linearGradient id="hub-violet-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* ── Simplified Map Grid Lines ── */}
        {/* Horizontal grid lines */}
        {[30, 60, 90, 120, 150, 180, 210, 240, 270, 300].map((y) => (
          <line
            key={`h-${y}`}
            x1="20"
            y1={y}
            x2="440"
            y2={y}
            stroke="#7C3AED"
            strokeWidth="0.6"
            strokeOpacity="0.12"
            strokeDasharray="2 4"
          />
        ))}

        {/* Vertical grid lines */}
        {[30, 70, 110, 150, 190, 230, 270, 310, 350, 390, 430].map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1="20"
            x2={x}
            y2="300"
            stroke="#7C3AED"
            strokeWidth="0.6"
            strokeOpacity="0.12"
            strokeDasharray="2 4"
          />
        ))}

        {/* Coordinate Crosshairs at Key Intersections */}
        {[[110, 90], [350, 90], [110, 240], [350, 240], [230, 150]].map(([x, y]) => (
          <g key={`cross-${x}-${y}`}>
            <line x1={x - 4} y1={y} x2={x + 4} y2={y} stroke="#00F0FF" strokeWidth="0.8" opacity="0.3" />
            <line x1={x} y1={y - 4} x2={x} y2={y + 4} stroke="#00F0FF" strokeWidth="0.8" opacity="0.3" />
          </g>
        ))}

        {/* ── Inter-Hub Logistics Trunk Line ── */}
        <line
          x1="170"
          y1="120"
          x2="320"
          y2="210"
          stroke="#8B5CF6"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          strokeOpacity="0.4"
        />

        {/* ── Animated Delivery Route Lines between Donors and NGOs ── */}
        {/* Route 1: Donor 1 (65, 65) -> NGO Hub Alpha (170, 120) */}
        <path
          d="M 65 65 Q 115 80, 170 120"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          className="route-flow-1"
        />
        {/* Vehicle 1 Transit Indicator */}
        <circle r="3" fill="#FFFFFF">
          <animateMotion
            path="M 65 65 Q 115 80, 170 120"
            dur="2.8s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Route 2: Donor 2 (270, 50) -> NGO Hub Alpha (170, 120) */}
        <path
          d="M 270 50 Q 230 100, 170 120"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          className="route-flow-2"
        />
        {/* Vehicle 2 Transit Indicator */}
        <circle r="3" fill="#00F0FF">
          <animateMotion
            path="M 270 50 Q 230 100, 170 120"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Route 3: Donor 3 (85, 250) -> NGO Hub Beta (320, 210) */}
        <path
          d="M 85 250 Q 190 270, 320 210"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          className="route-flow-3"
        />
        {/* Vehicle 3 Transit Indicator */}
        <circle r="3" fill="#A78BFA">
          <animateMotion
            path="M 85 250 Q 190 270, 320 210"
            dur="3.2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Route 4: Donor 4 (395, 110) -> NGO Hub Beta (320, 210) */}
        <path
          d="M 395 110 Q 380 175, 320 210"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          className="route-flow-4"
        />
        {/* Vehicle 4 Transit Indicator */}
        <circle r="3" fill="#00F0FF">
          <animateMotion
            path="M 395 110 Q 380 175, 320 210"
            dur="2.6s"
            repeatCount="indefinite"
          />
        </circle>

        {/* ── 2 NGO Hub Markers (Larger Violet Diamonds) ── */}
        {/* Hub Alpha (170, 120) */}
        <g transform="translate(170, 120)">
          {/* Pulsing Beacon Wave */}
          <circle r="24" fill="none" stroke="#8B5CF6" strokeWidth="1" className="hub-beacon-pulse" />
          {/* Diamond Shape */}
          <polygon
            points="0,-16 16,0 0,16 -16,0"
            fill="url(#hub-violet-grad)"
            stroke="#8B5CF6"
            strokeWidth="2"
          />
          <circle r="4" fill="#A78BFA" />
          <circle r="1.5" fill="#fff" />
          <text x="0" y="-22" textAnchor="middle" fill="#A78BFA" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
            NGO HUB [ALPHA]
          </text>
          <text x="0" y="27" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="6.5" fontFamily="monospace">
            METRO RELIEF CTR
          </text>
        </g>

        {/* Hub Beta (320, 210) */}
        <g transform="translate(320, 210)">
          {/* Pulsing Beacon Wave */}
          <circle r="24" fill="none" stroke="#8B5CF6" strokeWidth="1" className="hub-beacon-pulse-alt" />
          {/* Diamond Shape */}
          <polygon
            points="0,-16 16,0 0,16 -16,0"
            fill="url(#hub-violet-grad)"
            stroke="#8B5CF6"
            strokeWidth="2"
          />
          <circle r="4" fill="#A78BFA" />
          <circle r="1.5" fill="#fff" />
          <text x="0" y="-22" textAnchor="middle" fill="#A78BFA" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
            NGO HUB [BETA]
          </text>
          <text x="0" y="27" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="6.5" fontFamily="monospace">
            REGIONAL DEPOT
          </text>
        </g>

        {/* ── 4 Donor Pin Markers (Cyan Circles) ── */}
        {/* Donor 01 (65, 65) */}
        <g transform="translate(65, 65)">
          <circle r="10" fill="none" stroke="#00F0FF" strokeWidth="0.8" strokeOpacity="0.5" className="donor-pulse" />
          <circle r="5" fill="#00F0FF" />
          <circle r="2" fill="#fff" />
          <text x="0" y="-12" textAnchor="middle" fill="#00F0FF" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            DONOR #01
          </text>
          <text x="0" y="-4" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace">
            BAKERY [+45KG]
          </text>
        </g>

        {/* Donor 02 (270, 50) */}
        <g transform="translate(270, 50)">
          <circle r="10" fill="none" stroke="#00F0FF" strokeWidth="0.8" strokeOpacity="0.5" className="donor-pulse" />
          <circle r="5" fill="#00F0FF" />
          <circle r="2" fill="#fff" />
          <text x="0" y="-12" textAnchor="middle" fill="#00F0FF" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            DONOR #02
          </text>
          <text x="0" y="-4" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace">
            MARKET [+120KG]
          </text>
        </g>

        {/* Donor 03 (85, 250) */}
        <g transform="translate(85, 250)">
          <circle r="10" fill="none" stroke="#00F0FF" strokeWidth="0.8" strokeOpacity="0.5" className="donor-pulse" />
          <circle r="5" fill="#00F0FF" />
          <circle r="2" fill="#fff" />
          <text x="0" y="-12" textAnchor="middle" fill="#00F0FF" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            DONOR #03
          </text>
          <text x="0" y="-4" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace">
            HOTEL [+80 MEALS]
          </text>
        </g>

        {/* Donor 04 (395, 110) */}
        <g transform="translate(395, 110)">
          <circle r="10" fill="none" stroke="#00F0FF" strokeWidth="0.8" strokeOpacity="0.5" className="donor-pulse" />
          <circle r="5" fill="#00F0FF" />
          <circle r="2" fill="#fff" />
          <text x="0" y="-12" textAnchor="middle" fill="#00F0FF" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            DONOR #04
          </text>
          <text x="0" y="-4" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="monospace">
            CAFE [+65 MEALS]
          </text>
        </g>

        {/* ── Geolocation HUD Telemetry ── */}
        <g transform="translate(14, 18)">
          <text x="0" y="8" fill="#00F0FF" fontSize="8" fontFamily="monospace" fontWeight="bold">
            [GEO_DISPATCH // LIVE ROUTING]
          </text>
          <text x="0" y="20" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">
            COORDS: 13.0827° N, 80.2707° E
          </text>
        </g>

        <g transform="translate(446, 296)">
          <text x="0" y="0" textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">
            IMPACT: <tspan fill="#10B981" fontWeight="bold">2,400+ MEALS SAVED</tspan>
          </text>
          <text x="0" y="12" textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="monospace">
            ACTIVE ROUTES: <tspan fill="#00F0FF">4 VEHICLES IN TRANSIT</tspan>
          </text>
        </g>
      </svg>

      <style jsx>{`
        .route-flow-1 {
          animation: route-anim 1.6s linear infinite;
        }
        .route-flow-2 {
          animation: route-anim 1.4s linear infinite;
        }
        .route-flow-3 {
          animation: route-anim 2s linear infinite;
        }
        .route-flow-4 {
          animation: route-anim 1.8s linear infinite;
        }
        @keyframes route-anim {
          to {
            stroke-dashoffset: -20;
          }
        }

        .hub-beacon-pulse {
          animation: hub-beacon-kf 2.5s ease-out infinite;
        }
        .hub-beacon-pulse-alt {
          animation: hub-beacon-kf 2.5s ease-out infinite 1.25s;
        }
        @keyframes hub-beacon-kf {
          0% {
            r: 10;
            opacity: 0.9;
          }
          100% {
            r: 32;
            opacity: 0;
          }
        }

        .donor-pulse {
          animation: donor-kf 2s ease-in-out infinite;
        }
        @keyframes donor-kf {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.9);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.15);
          }
        }
      `}</style>
    </div>
  );
}

// ─── Map Project ID to its respective HUD Preview ───

function renderProjectHud(id: string) {
  switch (id) {
    case 'vulnerability-triage':
      return <CyberRadarHud />;
    case 'synarchis-ai':
      return <SynarchisAiHud />;
    case 'hack-to-feed':
      return <GeoMapHud />;
    default:
      return <CyberRadarHud />;
  }
}

// ─── Main ProjectsSection Component ───

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative w-full py-24 md:py-32 bg-[#05030A] text-white overflow-hidden"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#00F0FF]/5 blur-[140px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 left-10 w-[550px] h-[550px] bg-[#7C3AED]/10 blur-[140px] rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="font-mono text-sm text-[#00F0FF] tracking-widest uppercase">
              // 02 — SELECTED WORK
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Built for Real-World Impact.
          </h2>
        </motion.div>

        {/* Project Cards Stack */}
        <div className="space-y-12 md:space-y-16">
          {projects.map((project: Project, index: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
            >
              <TiltCard
                maxTilt={6}
                className="w-full min-h-[400px] backdrop-blur-md bg-white/[0.03] border border-white/[0.12] hover:border-[#00F0FF]/30 rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden transition-all duration-300 group"
              >
                {/* HUD Corner Brackets */}
                <span
                  aria-hidden="true"
                  className="absolute top-4 left-4 font-mono text-xs text-white/20 select-none pointer-events-none group-hover:text-[#00F0FF]/40 transition-colors"
                >
                  ┌ [SYS.PRJ_{project.number}]
                </span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 right-4 font-mono text-xs text-white/20 select-none pointer-events-none group-hover:text-[#00F0FF]/40 transition-colors"
                >
                  [STATUS // DEPLOYED] ┘
                </span>

                {/* Card Inner Layout: Flex row on desktop, stack on mobile */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between h-full pt-4 pb-2">
                  {/* Left half: Custom Interactive HUD Preview */}
                  <div className="w-full lg:w-1/2 min-h-[280px] md:min-h-[320px] bg-black/40 border border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden shadow-inner">
                    {/* Subtle grid pattern background in HUD frame */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:16px_16px]"
                    />
                    {renderProjectHud(project.id)}
                  </div>

                  {/* Right half: Project info */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6">
                    <div>
                      {/* Project Number & Category Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs font-semibold tracking-wider text-[#00F0FF] uppercase px-3 py-1 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/20 shadow-[0_0_10px_rgba(0,240,255,0.15)]">
                          PROJECT {project.number}
                        </span>
                        <span className="font-mono text-xs text-white/40 tracking-widest uppercase">
                          // {project.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-[#00F0FF] transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div>
                      <div className="font-mono text-xs text-white/40 mb-2.5 uppercase tracking-wider">
                        TECH MATRIX:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="bg-white/[0.06] border border-white/[0.1] rounded-full px-3 py-1 text-xs font-mono text-[#00F0FF] hover:bg-[#00F0FF]/10 hover:border-[#00F0FF]/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* GitHub Button */}
                    <div className="pt-2 flex items-center gap-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-mono text-sm text-white bg-white/[0.05] border border-white/20 hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 hover:text-[#00F0FF] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group/btn"
                      >
                        <Github className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                        <span>VIEW SOURCE</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all" />
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
