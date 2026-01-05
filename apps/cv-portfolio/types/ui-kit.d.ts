/**
 * TypeScript declarations for ui-kit
 * Provides type safety for components and utilities imported from ui-kit
 */

declare module 'ui_kit' {
  import { FC, InputHTMLAttributes } from 'react';
  import { ClassValue } from 'clsx';

  // Button Component
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
  }
  export const Button: FC<ButtonProps>;

  // Input Component
  export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    helperText?: string;
    className?: string;
  }
  export const Input: FC<InputProps>;

  // Card Component
  export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outlined' | 'elevated';
    children: React.ReactNode;
  }
  export const Card: FC<CardProps>;

  // Badge Component
  export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'ssg' | 'ssr' | 'isr';
    children: React.ReactNode;
  }
  export const Badge: FC<BadgeProps>;

  // Spinner Component
  export interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
  }
  export const Spinner: FC<SpinnerProps>;

  // Utility Functions
  export function cn(...inputs: ClassValue[]): string;
  export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string;
  export function formatTime(date: Date): string;
  export function isValidEmail(email: string): boolean;
  export function isValidUrl(url: string): boolean;

  // Hooks
  export function useDebounce<T>(value: T, delay: number): T;
  export function useMediaQuery(query: string): boolean;
  export function useClickOutside<T extends HTMLElement>(
    ref: React.RefObject<T>,
    handler: () => void
  ): void;
}
