'use client';

import React from 'react';
import { Button } from '@/shared/ui';
import { downloadCV } from '../lib/downloadPDF';

export interface DownloadButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  className,
  variant = 'primary',
}) => {
  return (
    <Button
      onClick={downloadCV}
      variant={variant}
      size="lg"
      className={className}
      aria-label="Download CV as PDF"
    >
      <span className="flex items-center gap-2">
        <span aria-hidden="true">📄</span>
        <span>Download CV as PDF</span>
      </span>
    </Button>
  );
};

DownloadButton.displayName = 'DownloadButton';
