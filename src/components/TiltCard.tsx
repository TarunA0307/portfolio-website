'use client';

import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  tiltIntensity?: number;
  maxTilt?: number;
  glare?: boolean;
}

export const TiltCard = forwardRef<HTMLDivElement, TiltCardProps>(
  (
    {
      children,
      className,
      containerClassName,
      tiltIntensity = 15,
      maxTilt,
      glare = true,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const cardRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => cardRef.current as HTMLDivElement);

    const [isHovered, setIsHovered] = useState<boolean>(false);

    // Support both tiltIntensity and maxTilt props
    const intensity = maxTilt !== undefined ? maxTilt : tiltIntensity;

    // Mouse offsets normalized from -0.5 to 0.5
    const mouseX = useMotionValue<number>(0);
    const mouseY = useMotionValue<number>(0);

    // Spotlight cursor position within the card in pixels
    const spotlightX = useMotionValue<number>(0);
    const spotlightY = useMotionValue<number>(0);

    // Spring physics configuration
    const springConfig = { damping: 20, stiffness: 300 };
    const mouseXSpring = useSpring(mouseX, springConfig);
    const mouseYSpring = useSpring(mouseY, springConfig);

    // Calculate rotateX and rotateY based on cursor position within the card
    const rotateX = useTransform(
      mouseYSpring,
      [-0.5, 0.5],
      [intensity, -intensity]
    );
    const rotateY = useTransform(
      mouseXSpring,
      [-0.5, 0.5],
      [-intensity, intensity]
    );

    // Dynamic radial spotlight glow overlay that tracks cursor position
    const spotlightBackground = useMotionTemplate`radial-gradient(circle 320px at ${spotlightX}px ${spotlightY}px, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 75%)`;

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(true);
      onMouseEnter?.(e);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      spotlightX.set(clientX);
      spotlightY.set(clientY);

      const normX = (clientX - rect.width / 2) / rect.width;
      const normY = (clientY - rect.height / 2) / rect.height;

      mouseX.set(normX);
      mouseY.set(normY);

      if (!isHovered) {
        setIsHovered(true);
      }

      onMouseMove?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      // Spring back to 0,0 on mouse leave
      mouseX.set(0);
      mouseY.set(0);
      setIsHovered(false);
      onMouseLeave?.(e);
    };

    return (
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1200 }}
        className={cn('relative w-full [perspective:1200px]', containerClassName)}
        {...props}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className={cn(
            'relative h-full w-full [transform-style:preserve-3d]',
            className
          )}
        >
          {/* Dynamic radial spotlight glow overlay that tracks cursor position */}
          {glare && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit]"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                background: spotlightBackground,
              }}
              aria-hidden="true"
            />
          )}

          {/* Card inner content */}
          {children}
        </motion.div>
      </div>
    );
  }
);

TiltCard.displayName = 'TiltCard';

export default TiltCard;
