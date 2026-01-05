import React from 'react';
import { SkillCategory } from '@/data/types';
import { Badge } from 'ui_kit';

interface SkillsContentProps {
  skills: SkillCategory[];
}

export const SkillsContent: React.FC<SkillsContentProps> = ({ skills }) => {
  return (
    <div className="space-y-6">
      {skills.map((category) => (
        <div key={category.category}>
          <h4 className="mb-3 text-lg font-semibold text-text-primary">
            {category.category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {category.items.map((skill) => (
              <Badge key={skill} variant="default">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

SkillsContent.displayName = 'SkillsContent';
