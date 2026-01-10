import { useState } from 'react';
import { Button } from './atoms/Button';
import { Card } from './molecules/Card';
import { Badge } from './atoms/Badge';
import { Spinner } from './atoms/Spinner';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme === 'dark' ? 'dark' : '');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-text-primary">
            UI Kit - Component Library
          </h1>
          <Button onClick={toggleTheme} variant="secondary">
            Toggle Theme ({theme})
          </Button>
        </div>

        <p className="text-text-secondary">
          Shared components for cv-portfolio and defi-dashboard via Module Federation
        </p>

        {/* Buttons */}
        <Card className="p-6">
          <h2 className="mb-4 text-2xl font-semibold text-text-primary">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </Card>

        {/* Cards */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-text-primary">Cards</h2>
          <div className="grid grid-cols-3 gap-4">
            <Card variant="default" className="p-4">
              <h3 className="font-semibold text-text-primary">Default Card</h3>
              <p className="text-sm text-text-secondary">With border</p>
            </Card>
            <Card variant="outlined" className="p-4">
              <h3 className="font-semibold text-text-primary">Outlined Card</h3>
              <p className="text-sm text-text-secondary">Thicker border</p>
            </Card>
            <Card variant="elevated" className="p-4">
              <h3 className="font-semibold text-text-primary">Elevated Card</h3>
              <p className="text-sm text-text-secondary">With shadow</p>
            </Card>
          </div>
        </div>

        {/* Badges */}
        <Card className="p-6">
          <h2 className="mb-4 text-2xl font-semibold text-text-primary">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="ssg">SSG</Badge>
            <Badge variant="ssr">SSR</Badge>
            <Badge variant="isr">ISR</Badge>
          </div>
        </Card>

        {/* Spinners */}
        <Card className="p-6">
          <h2 className="mb-4 text-2xl font-semibold text-text-primary">Spinners</h2>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Spinner size="sm" />
              <span className="text-xs text-text-secondary">Small</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" />
              <span className="text-xs text-text-secondary">Medium</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="lg" />
              <span className="text-xs text-text-secondary">Large</span>
            </div>
          </div>
        </Card>

        {/* Theme Info */}
        <Card className="bg-accent p-6 text-white">
          <h2 className="mb-2 text-xl font-semibold">Current Theme: {theme}</h2>
          <p className="text-sm opacity-90">
            This card uses the accent color CSS variable, which changes based on the theme.
          </p>
        </Card>
      </div>
    </div>
  );
}

export default App;
