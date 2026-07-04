'use client';

import {
  type ReactNode,
  type ButtonHTMLAttributes,
  useRef,
  useState,
  useCallback,
} from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Variant styles                                                     */
/* ------------------------------------------------------------------ */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-gradient-to-r from-primary to-primary-light text-white',
    'shadow-lg shadow-primary/25',
    'hover:shadow-xl hover:shadow-primary/30',
  ),
  secondary: cn(
    'bg-white/5 backdrop-blur-xl text-white',
    'border border-white/[0.08]',
    'hover:bg-white/10',
  ),
  ghost: cn(
    'bg-transparent text-white',
    'hover:bg-white/5',
  ),
  outline: cn(
    'bg-transparent text-white',
    'border border-white/[0.15]',
    'hover:bg-white/5 hover:border-white/25',
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  default: 'h-[52px] px-8 text-sm',
  sm: 'h-10 px-5 text-xs',
  lg: 'h-14 px-10 text-base',
  icon: 'h-[52px] w-[52px] p-0',
};

/* ------------------------------------------------------------------ */
/*  Button component                                                   */
/* ------------------------------------------------------------------ */

interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children' | 'className'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Enable magnetic hover effect (subtle translate toward cursor) */
  magnetic?: boolean;
  /** Disable the button */
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'default',
  className,
  magnetic = true,
  disabled = false,
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  /* ---- Magnetic hover -------------------------------------------- */

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Strength factor: how far the button follows the cursor
      const strength = 0.15;
      const offsetX = (e.clientX - centerX) * strength;
      const offsetY = (e.clientY - centerY) * strength;

      setMagneticOffset({ x: offsetX, y: offsetY });
    },
    [magnetic],
  );

  const handleMouseLeave = useCallback(() => {
    setMagneticOffset({ x: 0, y: 0 });
  }, []);

  return (
    <motion.button
      ref={ref}
      disabled={disabled}
      className={cn(
        // Base
        'relative inline-flex items-center justify-center gap-2',
        'rounded-[14px] font-medium font-body',
        'transition-colors duration-200',
        'cursor-pointer select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:pointer-events-none disabled:opacity-50',
        // Variant + size
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      animate={{
        x: magneticOffset.x,
        y: magneticOffset.y,
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
        mass: 0.5,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
