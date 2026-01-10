import React from 'react';
import { Link } from 'react-router-dom';
import { cvData } from '@/data/cvData';

/**
 * Header Component
 * Sticky header displaying professional name and title
 */
export const Header: React.FC = () => {
  return (
    <header
      className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm
        transition duration-300"
    >
      <div className="mx-auto max-w-3xl px-6 py-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
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

          {/* Navigation to DeFi Dashboard App */}
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-accent bg-white px-4 py-2
              text-sm font-semibold text-accent shadow-sm
              transition duration-300
              hover:bg-accent hover:text-white hover:shadow-md"
          >
            <span>🚀</span>
            <span>DeFi Dashboard</span>
          </a>
        </div>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
