import React from 'react';
import { Experience } from '@/data/types';
import { Badge } from 'ui_kit';

interface ExperienceContentProps {
  experiences: Experience[];
}

export const ExperienceContent: React.FC<ExperienceContentProps> = ({ experiences }) => {
  return (
    <div className="space-y-8">
      {experiences.map((exp, index) => (
        <div key={index} className="border-l-2 border-accent pl-6">
          <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
            <div>
              <h4 className="text-lg font-bold text-text-primary">
                {exp.position}
              </h4>
              <p className="text-md font-semibold text-accent">
                {exp.company}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-text-secondary">
                {exp.period}
              </p>
              {exp.location && (
                <p className="text-xs text-text-secondary">{exp.location}</p>
              )}
            </div>
          </div>

          <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-text-secondary">
            {exp.description.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          {exp.achievements && exp.achievements.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 text-sm font-semibold text-text-primary">
                Key Achievements:
              </p>
              <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <Badge key={tech} variant="info">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

ExperienceContent.displayName = 'ExperienceContent';
