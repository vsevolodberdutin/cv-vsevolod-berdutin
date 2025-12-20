import React from 'react';
import { Header } from '@/widgets/header';
import { HeroSection } from '@/widgets/hero-section';
import { CVSections } from '@/widgets/cv-sections';
import { ChatWidget } from '@/widgets/chat-widget';
import { Footer } from '@/widgets/footer';

/**
 * Home Page
 * Main page composition following Feature-Sliced Design
 * Combines all widgets into a cohesive user experience
 */
export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header - Sticky at top */}
      <Header />

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-6">
        {/* Hero Section - Professional Summary */}
        <HeroSection />

        {/* CV Sections - Skills, Experience, Education */}
        <CVSections />

        {/* AI Chat Widget */}
        <ChatWidget />
      </main>

      {/* Footer - Contact Information */}
      <div className="mx-auto max-w-3xl px-6">
        <Footer />
      </div>
    </div>
  );
};

HomePage.displayName = 'HomePage';
