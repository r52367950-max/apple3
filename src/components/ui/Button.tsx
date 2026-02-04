'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

type ButtonProps = ButtonBaseProps & Omit<HTMLMotionProps<'button'>, keyof ButtonBaseProps>;

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-neutral-900 text-white hover:bg-neutral-700',
  secondary: 'bg-transparent text-sumire-600 border border-sumire-600 hover:bg-sumire-50',
  ghost: 'bg-transparent text-sumire-600 hover:text-sumire-700',
  link: 'bg-transparent text-sumire-600 hover:text-sumire-700 underline-offset-4 hover:underline',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, children, className = '', ...props }, ref) => {
    const baseClasses = `
      inline-flex items-center justify-center gap-2
      font-medium rounded-full
      transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sumire-500 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:pointer-events-none
    `;

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

// Arrow Icon for CTAs
export function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

// CTA Button with Arrow
export function CTAButton({
  children,
  href,
  variant = 'primary',
  className = '',
}: {
  children: React.ReactNode;
  href: string;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Button href={href} variant={variant} className={`group ${className}`}>
      {children}
      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
    </Button>
  );
}
