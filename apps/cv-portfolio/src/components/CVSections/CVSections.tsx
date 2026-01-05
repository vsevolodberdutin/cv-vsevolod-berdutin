'use client';

import React, { useState } from 'react';
import { ToggleButton } from '@/components/ToggleButton';
import { Card, cn } from 'ui_kit';
import { cvData } from '@/data/cvData';
import { SkillsContent } from './SkillsContent';
import { ExperienceContent } from './ExperienceContent';
import { EducationContent } from './EducationContent';

type SectionId = 'skills' | 'experience' | 'education';

interface Section {
  id: SectionId;
  label: string;
  icon: string;
  content: React.ReactNode;
}

/**
 * CV Sections Component
 * Displays expandable/collapsible sections for Skills, Experience, and Education
 */
export const CVSections: React.FC = () => {
  const [openSections, setOpenSections] = useState<SectionId[]>([]);

  const toggleSection = (id: SectionId) => {
    setOpenSections((prev) =>
      prev.includes(id)
        ? prev.filter((sectionId) => sectionId !== id)
        : [...prev, id]
    );
  };

  const sections: Section[] = [
    {
      id: 'skills',
      label: 'Tech Stack',
      icon: '🛠️',
      content: <SkillsContent skills={cvData.skills} />,
    },
    {
      id: 'experience',
      label: 'Experience',
      icon: '💼',
      content: <ExperienceContent experiences={cvData.experience} />,
    },
    {
      id: 'education',
      label: 'Education & Languages',
      icon: '🎓',
      content: (
        <EducationContent
          education={cvData.education}
          languages={cvData.languages}
        />
      ),
    },
  ];

  return (
    <section className="space-y-6 py-8">
      {sections.map((section) => {
        const isOpen = openSections.includes(section.id);

        return (
          <div key={section.id}>
            <ToggleButton
              isOpen={isOpen}
              onToggle={() => toggleSection(section.id)}
              label={section.label}
              icon={section.icon}
            />

            {isOpen && (
              <Card
                className={cn(
                  'mt-4 p-6 animate-fadeIn',
                  'origin-top transition-all duration-300 ease-in-out'
                )}
              >
                {section.content}
              </Card>
            )}
          </div>
        );
      })}
    </section>
  );
};

CVSections.displayName = 'CVSections';
