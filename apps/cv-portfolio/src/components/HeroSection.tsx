import React from 'react';
import { Card } from 'ui_kit';
import { cvData } from '@/data/cvData';

/**
 * Hero Section Component
 * Displays professional summary and key highlights
 */
export const HeroSection: React.FC = () => {
  return (
    <section className="py-12">
      <Card className="bg-gradient-to-br from-background to-background-secondary p-8" variant="elevated">
        <h2 className="mb-4 text-2xl font-bold text-text-primary">
          About Me
        </h2>
        <div className="space-y-3 leading-relaxed text-text-secondary">
          <p>
            <strong className="text-text-primary">8+ years of experience</strong> in frontend development,
            specializing in React, TypeScript, and Next.js.
          </p>
          <p>
            Led distributed teams of <strong className="text-text-primary">3-5 engineers</strong>,
            delivering solutions for <strong className="text-text-primary">50,000+ internal users</strong> at
            Eastern Europe&apos;s largest financial institution.
          </p>
          <p>
            Expertise in <strong className="text-text-primary">fintech, cryptocurrency, and corporate B2B</strong> applications.
          </p>
          <p>
            Integrated AI solutions using <strong className="text-text-primary">OpenAI GPT and GigaChat</strong>,
            improving user experience and operational efficiency.
          </p>
          <p className="mt-4 border-t border-gray-300 pt-4">
            <strong className="text-text-primary">Languages:</strong>{' '}
            <br/>
            {cvData.languages.map((lang, index) => (
              <span key={lang.name}>
                {lang.name} ({lang.level})
                {index < cvData.languages.length - 1 ? ' • ' : ''}
              </span>
            ))}
          </p>
        </div>
      </Card>
    </section>
  );
};

HeroSection.displayName = 'HeroSection';
