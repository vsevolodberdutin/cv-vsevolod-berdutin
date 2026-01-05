import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CVSections } from '@/components/CVSections';
import { ChatWidget } from '@/components/ChatWidget';
import { Footer } from '@/components/Footer';

/**
 * Home Page
 * Main page combining all components into a cohesive user experience
 */
export default function HomePage() {
  return (
    <>
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
    </>
  );
}
