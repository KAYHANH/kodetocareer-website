'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  GlassCard                                                          */
/* ------------------------------------------------------------------ */

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Disable the hover lift + glow effect */
  disableHover?: boolean;
  /** HTML element role for accessibility */
  role?: string;
  /** Accessible label */
  'aria-label'?: string;
}

const hoverEffect = {
  scale: 1.02,
  y: -5,
  boxShadow:
    '0 0 30px rgba(37, 99, 235, 0.15), 0 0 60px rgba(37, 99, 235, 0.05)',
  transition: { duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] as const },
} as const;

export function GlassCard({
  children,
  className,
  disableHover = false,
  role,
  'aria-label': ariaLabel,
}: GlassCardProps) {
  return (
    <motion.div
      role={role}
      aria-label={ariaLabel}
      className={cn(
        // Glassmorphism base
        'relative rounded-[20px] bg-white/5 backdrop-blur-xl',
        'border border-white/[0.08]',
        // Smooth transition for box-shadow
        'transition-shadow duration-300',
        className,
      )}
      whileHover={disableHover ? undefined : hoverEffect}
    >
      {children}
    </motion.div>
  );
}
