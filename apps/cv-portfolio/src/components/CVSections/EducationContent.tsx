'use client';

import React from 'react';
import { Education, Language } from '@/data/types';

interface EducationContentProps {
  education: Education[];
  languages: Language[];
}

export const EducationContent: React.FC<EducationContentProps> = ({
  education,
  languages,
}) => {
  return (
    <div className="space-y-6">
      {/* Education */}
      <div>
        <h4 className="mb-4 text-lg font-semibold text-text-primary">
          Education
        </h4>
        {education.map((edu, index) => (
          <div key={index} className="border-l-2 border-accent pl-6">
            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h5 className="font-bold text-text-primary">{edu.degree}</h5>
                <p className="text-sm text-accent">{edu.institution}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-text-secondary">
                  {edu.period}
                </p>
                {edu.location && (
                  <p className="text-xs text-text-secondary">{edu.location}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Languages */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="mb-4 text-lg font-semibold text-text-primary">
          Languages
        </h4>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="rounded-lg border border-gray-200 bg-background-secondary p-3 text-center"
            >
              <p className="font-semibold text-text-primary">{lang.name}</p>
              <p className="text-sm text-text-secondary">{lang.level}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

EducationContent.displayName = 'EducationContent';
