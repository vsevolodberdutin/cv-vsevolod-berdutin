import React from 'react';
import { Card } from '@/shared/ui';
import { DownloadButton } from '@/features/download-cv';
import { cvData } from '@/entities/cv';

/**
 * Footer Widget
 * Displays contact information and download CV button
 */
export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 py-12">
      <div className="space-y-8">
        {/* Contact Information */}
        <Card className="p-6">
          <h3 className="mb-4 text-xl font-bold text-text-primary">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Phone */}
            <a
              href={`tel:${cvData.contact.phone}`}
              className="flex items-center gap-3 rounded-lg p-3
                transition duration-300
                hover:bg-background-secondary
                focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              <span className="text-2xl" aria-hidden="true">📱</span>
              <div>
                <p className="text-sm text-text-secondary">Phone</p>
                <p className="font-semibold text-text-primary">
                  {cvData.contact.phone}
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${cvData.contact.email}`}
              className="flex items-center gap-3 rounded-lg p-3
                transition duration-300
                hover:bg-background-secondary
                focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              <span className="text-2xl" aria-hidden="true">📧</span>
              <div>
                <p className="text-sm text-text-secondary">Email</p>
                <p className="font-semibold text-text-primary">
                  {cvData.contact.email}
                </p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href={cvData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg p-3
                transition duration-300
                hover:bg-background-secondary
                focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              <span className="text-2xl" aria-hidden="true">💼</span>
              <div>
                <p className="text-sm text-text-secondary">LinkedIn</p>
                <p className="font-semibold text-text-primary">
                  /in/vsevolodberdutin
                </p>
              </div>
            </a>

            {/* Telegram */}
            <a
              href={cvData.contact.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg p-3
                transition duration-300
                hover:bg-background-secondary
                focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              <span className="text-2xl" aria-hidden="true">✈️</span>
              <div>
                <p className="text-sm text-text-secondary">Telegram</p>
                <p className="font-semibold text-text-primary">
                  @vsevolodberdutin
                </p>
              </div>
            </a>

            {/* GitHub */}
            {cvData.contact.github && (
              <a
                href={cvData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg p-3
                  transition duration-300
                  hover:bg-background-secondary
                  focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                <span className="text-2xl" aria-hidden="true">🐙</span>
                <div>
                  <p className="text-sm text-text-secondary">GitHub</p>
                  <p className="font-semibold text-text-primary">
                    @vsevolodberdutin
                  </p>
                </div>
              </a>
            )}
          </div>
        </Card>

        {/* Download CV Button */}
        <div className="flex justify-center">
          <DownloadButton />
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-text-secondary">
          <p>
            © {new Date().getFullYear()} Vsevolod Berdutin. Built with Next.js,
            TypeScript & Tailwind CSS
          </p>
          <p className="mt-1">
            Powered by Feature-Sliced Design architecture
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
