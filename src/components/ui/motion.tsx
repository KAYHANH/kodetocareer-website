'use client';

import { type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Shared config                                                      */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];
const DEFAULT_DURATION = 0.5;
const VIEWPORT_CONFIG = { once: true, margin: '-100px' as const };

/* ------------------------------------------------------------------ */
/*  FadeUp                                                             */
/* ------------------------------------------------------------------ */

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeUp({
  children,
  delay = 0,
  duration = DEFAULT_DURATION,
  className,
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  FadeIn                                                             */
/* ------------------------------------------------------------------ */

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  duration = DEFAULT_DURATION,
  className,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  ScaleIn                                                            */
/* ------------------------------------------------------------------ */

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScaleIn({
  children,
  delay = 0,
  duration = DEFAULT_DURATION,
  className,
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SlideIn                                                            */
/* ------------------------------------------------------------------ */

type Direction = 'left' | 'right' | 'up' | 'down';

const directionOffset: Record<Direction, { x: number; y: number }> = {
  left: { x: -60, y: 0 },
  right: { x: 60, y: 0 },
  up: { x: 0, y: -60 },
  down: { x: 0, y: 60 },
};

interface SlideInProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
}

export function SlideIn({
  children,
  direction = 'left',
  delay = 0,
  duration = DEFAULT_DURATION,
  className,
}: SlideInProps) {
  const offset = directionOffset[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  StaggerContainer + StaggerItem                                     */
/* ------------------------------------------------------------------ */

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

const containerVariants = (staggerDelay: number): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DEFAULT_DURATION, ease: EASE },
  },
};

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={containerVariants(staggerDelay)}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  ScrollReveal                                                       */
/* ------------------------------------------------------------------ */

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  className,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: DEFAULT_DURATION, delay, ease: EASE }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
