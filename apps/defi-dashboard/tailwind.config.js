/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0F1419',
        'bg-secondary': '#1A1F26',
        'text-primary': '#E7E9EA',
        'text-secondary': '#8B98A5',
        'green-positive': '#00D46A',
        'red-negative': '#F6465D',
        'chart-grid': '#2F3336',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
