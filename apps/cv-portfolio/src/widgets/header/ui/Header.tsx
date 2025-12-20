import React from 'react';
import { cvData } from '@/entities/cv';

/**
 * Header Widget
 * Sticky header displaying professional name and title
 */
export const Header: React.FC = () => {
  return (
    <header
      className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm
        transition duration-300"
    >
      <div className="mx-auto max-w-3xl px-6 py-6">
        <h1 className="mb-2 text-3xl font-bold text-text-primary">
          {cvData.name.toUpperCase()}
        </h1>
        <p className="mb-1 text-xl font-semibold text-text-secondary">
          {cvData.title}
        </p>
        <p className="font-mono text-sm text-text-secondary">
          React • TypeScript • Next.js • Team Leadership
        </p>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
