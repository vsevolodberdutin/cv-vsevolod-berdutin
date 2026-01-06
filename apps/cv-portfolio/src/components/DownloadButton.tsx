import React from 'react';
import { Button } from 'ui_kit';
import { downloadCV, downloadCVWord } from '@/utils/downloadCV';

export interface DownloadButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  format?: 'pdf' | 'word';
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  className,
  variant = 'primary',
  format = 'pdf',
}) => {
  const handleDownload = format === 'word' ? downloadCVWord : downloadCV;
  const label = format === 'word' ? 'Download CV as Word' : 'Download CV as PDF';

  return (
    <Button
      onClick={handleDownload}
      variant={variant}
      size="lg"
      className={className}
      aria-label={label}
    >
      <span className="flex items-center gap-2">
        <span aria-hidden="true">📄</span>
        <span>{label}</span>
      </span>
    </Button>
  );
};

DownloadButton.displayName = 'DownloadButton';
