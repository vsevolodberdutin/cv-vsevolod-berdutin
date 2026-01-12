import React from 'react';
import { Card } from 'ui_kit';
import { DownloadButton } from '@/components/DownloadButton';
import { cvData } from '@/data/cvData';

/**
 * Footer Component
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

            {/* WhatsApp */}
            {cvData.contact.whatsapp && (
              <a
                href={cvData.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg p-3
                  transition duration-300
                  hover:bg-background-secondary
                  focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                <span className="text-2xl" aria-hidden="true">💬</span>
                <div>
                  <p className="text-sm text-text-secondary">WhatsApp</p>
                  <p className="font-semibold text-text-primary">
                    +972 555 07 8880
                  </p>
                </div>
              </a>
            )}

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

        {/* Download CV Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <DownloadButton format="pdf" />
          <DownloadButton format="word" variant="secondary" />
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-text-secondary">
          <p>
            © {new Date().getFullYear()} Vsevolod Berdutin. Built with React, Vite,
            TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
