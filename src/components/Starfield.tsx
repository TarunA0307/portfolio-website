'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface StarfieldProps {
  className?: string;
  starCount?: number;
  maxConnections?: number;
  connectionDistance?: number;
  repelRadius?: number;
}

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  brightness: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ConnectionCandidate {
  i: number;
  j: number;
  dist: number;
}

export const Starfield: React.FC<StarfieldProps> = ({
  className,
  starCount = 200,
  maxConnections = 50,
  connectionDistance = 150,
  repelRadius = 200,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Track mouse position with window listener
    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
    };

    // Configure canvas resolution with devicePixelRatio for sharp rendering
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();

    // Generate 200 stars with random positions, sizes (0.5-2px), brightness, and drift velocities
    const stars: Star[] = Array.from({ length: starCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.08 + Math.random() * 0.2; // Gentle floating speed

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        // radius between 0.5px and 1.5px (translates to 0.5-2px visual dots)
        radius: 0.5 + Math.random() * 0.9,
        brightness: 0.35 + Math.random() * 0.65,
        twinkleSpeed: 0.01 + Math.random() * 0.02,
        twinklePhase: Math.random() * Math.PI * 2,
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const connDistSq = connectionDistance * connectionDistance;
    const repelDistSq = repelRadius * repelRadius;
    const candidates: ConnectionCandidate[] = [];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Update star positions & apply gentle cursor repulsion
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (mouse.active) {
          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          // Stars within 200px gently repel away from cursor
          if (distSq < repelDistSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = 1 - dist / repelRadius; // 1 at center, 0 at outer boundary
            const nx = dx / dist;
            const ny = dy / dist;

            // Gentle repulsion nudge
            const repelStrength = force * 1.8;
            star.x += nx * repelStrength;
            star.y += ny * repelStrength;
          }
        }

        // Natural drifting with random velocity
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around viewport edges smoothly
        if (star.x < -10) star.x = width + 10;
        else if (star.x > width + 10) star.x = -10;

        if (star.y < -10) star.y = height + 10;
        else if (star.y > height + 10) star.y = -10;
      }

      // 2. Compute connection lines (neural mesh effect)
      // Connect nearby stars within 150px, capped at 50 closest pairs
      candidates.length = 0;
      for (let i = 0; i < stars.length; i++) {
        const s1 = stars[i];
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          const dx = s1.x - s2.x;
          if (Math.abs(dx) > connectionDistance) continue;
          const dy = s1.y - s2.y;
          if (Math.abs(dy) > connectionDistance) continue;

          const distSq = dx * dx + dy * dy;
          if (distSq < connDistSq) {
            candidates.push({
              i,
              j,
              dist: Math.sqrt(distSq),
            });
          }
        }
      }

      // Sort by distance to prioritize closest star pairings
      candidates.sort((a, b) => a.dist - b.dist);

      // Draw up to 50 connection lines in violet (#7C3AED) with distance-based opacity
      const drawLimit = Math.min(candidates.length, maxConnections);
      for (let k = 0; k < drawLimit; k++) {
        const candidate = candidates[k];
        const s1 = stars[candidate.i];
        const s2 = stars[candidate.j];

        // Opacity scales smoothly from ~0.24 down to 0 at connectionDistance
        const lineOpacity = (1 - candidate.dist / connectionDistance) * 0.22;

        ctx.strokeStyle = `rgba(124, 58, 237, ${lineOpacity.toFixed(3)})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(s1.x, s1.y);
        ctx.lineTo(s2.x, s2.y);
        ctx.stroke();
      }

      // 3. Draw stars - white with slight cyan tint and subtle twinkling
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.15;
        const starAlpha = Math.min(1, Math.max(0.18, star.brightness + twinkle));

        // White with slight cyan tint (deep violet/cyan palette)
        ctx.fillStyle = `rgba(224, 248, 255, ${starAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Clean up animation frame and event listeners on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [starCount, maxConnections, connectionDistance, repelRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        'fixed inset-0 z-0 pointer-events-none h-full w-full',
        className
      )}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
};

export default Starfield;
