/**
 * Download CV as PDF
 * Creates a download link and triggers the download
 */
export function downloadCV() {
  const link = document.createElement('a');
  link.href = '/CV_Berdutin_Vsevolod.pdf';
  link.download = 'CV_Berdutin_Vsevolod_Senior_Frontend.pdf';
  link.click();
}
