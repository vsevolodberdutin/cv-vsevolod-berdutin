# Implementation Plan: Interactive CV Portfolio with DeFi Dashboard

## 📋 Project Overview

This is a comprehensive step-by-step implementation plan for building a modern, interactive portfolio application showcasing Vsevolod Berdutin's professional experience through two micro-frontend applications using Feature-Sliced Design (FSD) architecture.

---

## Phase 0: Project Foundation & FSD Setup (Days 1-2)

### Step 1: Initialize Project Structure
```bash
# Create monorepo structure
mkdir cv-vsevolod-berdutin
cd cv-vsevolod-berdutin
yarn init -w

# Create app directories
mkdir -p apps/cv-portfolio apps/defi-dashboard backend docs
```

### Step 2: Set Up Next.js Applications
```bash
# CV Portfolio App
cd apps/cv-portfolio
yarn create next-app . --typescript --tailwind --app --no-src-dir
cd ../..

# DeFi Dashboard App
cd apps/defi-dashboard
yarn create next-app . --typescript --tailwind --app --no-src-dir
cd ../..
```

### Step 3: Implement FSD Folder Structure
Create the Feature-Sliced Design structure in both apps:
```bash
# For each app (cv-portfolio and defi-dashboard)
mkdir -p src/{app,pages,widgets,features,entities,shared}
mkdir -p src/shared/{ui,lib,api,config}
mkdir -p src/shared/lib/{hooks,utils,constants}
```

### Step 4: Configure TypeScript Path Aliases
Set up `tsconfig.json` with FSD path aliases:
```json
{
  "compilerOptions": {
    "paths": {
      "@/app/*": ["./src/app/*"],
      "@/pages/*": ["./src/pages/*"],
      "@/widgets/*": ["./src/widgets/*"],
      "@/features/*": ["./src/features/*"],
      "@/entities/*": ["./src/entities/*"],
      "@/shared/*": ["./src/shared/*"]
    }
  }
}
```

### Step 5: Install Core Dependencies
```bash
# CV Portfolio dependencies
cd apps/cv-portfolio
yarn add zustand openai framer-motion
yarn add -D @types/node

# DeFi Dashboard dependencies
cd ../defi-dashboard
yarn add zustand recharts ws
yarn add -D @types/ws
```

---

## Phase 1: Shared Layer Development (Days 3-4)

### Step 6: Create Base UI Components (`shared/ui`)
Build reusable components:
- `Button` - Primary, secondary, ghost variants
- `Input` - Text input with validation states
- `Card` - Container component
- `Modal` - Dialog component
- `Badge` - Labels and tags
- `Spinner` - Loading indicator

**File structure:**
```
shared/ui/
├── Button/
│   ├── Button.tsx
│   ├── Button.module.css
│   └── index.ts
├── Input/
│   ├── Input.tsx
│   └── index.ts
├── Card/
│   ├── Card.tsx
│   └── index.ts
├── Modal/
├── Badge/
├── Spinner/
└── index.ts
```

### Step 7: Set Up Utility Functions (`shared/lib`)
- `cn.ts` - className utility (clsx + tailwind-merge)
- `formatDate.ts` - Date formatting
- `validators.ts` - Input validation
- Custom hooks: `useDebounce`, `useMediaQuery`, `useClickOutside`

### Step 8: Configure Design System
Create Tailwind config with color palette:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        'background-secondary': '#F7F7F8',
        'text-primary': '#2D2D2D',
        'text-secondary': '#6B6B6B',
        accent: '#D97706', // amber-600
        border: '#E5E5E5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
}
```

---

## Phase 2: CV Portfolio - Entities & Features (Days 5-7)

### Step 9: Create CV Entity (`entities/cv`)
```typescript
// entities/cv/model/types.ts
export interface CV {
  name: string;
  title: string;
  summary: string;
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  languages: Language[];
  contact: Contact;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Contact {
  phone: string;
  email: string;
  linkedin: string;
  telegram: string;
}

// entities/cv/model/cvData.ts
// Import CV data from docs/CV_CONTENT.md

// entities/cv/ui/CVPreview.tsx
// UI component for displaying CV

// entities/cv/lib/formatExperience.ts
// Utility functions for formatting CV data

// entities/cv/index.ts
export { CVPreview } from './ui/CVPreview';
export { cvData } from './model/cvData';
export type { CV, Experience, SkillCategory } from './model/types';
```

### Step 10: Create Message Entity (`entities/message`)
```typescript
// entities/message/model/types.ts
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// entities/message/ui/MessageCard.tsx
import { Message } from '../model/types';

export const MessageCard: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div className={`message ${message.role}`}>
      <div className="message-avatar">
        {message.role === 'user' ? '👤' : '🤖'}
      </div>
      <div className="message-content">
        <p>{message.content}</p>
        <span className="message-time">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

// entities/message/index.ts
export { MessageCard } from './ui/MessageCard';
export type { Message } from './model/types';
```

### Step 11: Build Toggle Section Feature (`features/toggle-section`)
```typescript
// features/toggle-section/model/useToggleSection.ts
import { useState, useCallback } from 'react';

export const useToggleSection = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, toggle, open, close };
};

// features/toggle-section/ui/ToggleButton.tsx
import { Button } from '@/shared/ui';

interface ToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  label: string;
  icon?: string;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  isOpen,
  onToggle,
  label,
  icon,
}) => {
  return (
    <Button
      onClick={onToggle}
      className="flex items-center justify-between w-full p-4
        rounded-lg border border-gray-300 bg-white
        transition duration-300
        hover:border-accent hover:shadow-md"
    >
      <span className="flex items-center gap-3">
        {icon && <span className="text-2xl">{icon}</span>}
        <span className="font-semibold text-lg">{label}</span>
      </span>
      <span className="text-gray-500">
        {isOpen ? '▼' : '▶'}
      </span>
    </Button>
  );
};

// features/toggle-section/index.ts
export { ToggleButton } from './ui/ToggleButton';
export { useToggleSection } from './model/useToggleSection';
```

### Step 12: Build Download CV Feature (`features/download-cv`)
```typescript
// features/download-cv/lib/downloadPDF.ts
export const downloadCV = () => {
  const link = document.createElement('a');
  link.href = '/CV_Berdutin_Vsevolod.pdf';
  link.download = 'CV_Berdutin_Vsevolod_Senior_Frontend.pdf';
  link.click();
};

// features/download-cv/ui/DownloadButton.tsx
import { Button } from '@/shared/ui';
import { downloadCV } from '../lib/downloadPDF';

export const DownloadButton = () => {
  return (
    <Button
      onClick={downloadCV}
      className="flex items-center gap-2 px-6 py-3
        bg-accent text-white font-semibold rounded-lg
        transition duration-300
        hover:bg-amber-700 hover:shadow-lg"
    >
      <span>📄</span>
      <span>Download CV as PDF</span>
    </Button>
  );
};

// features/download-cv/index.ts
export { DownloadButton } from './ui/DownloadButton';
```

### Step 13: Build Send Message Feature (`features/send-message`)
```typescript
// features/send-message/api/sendMessage.ts
import { Message } from '@/entities/message';

export const sendMessage = async (
  message: string,
  history: Message[]
): Promise<string> => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  const data = await response.json();
  return data.reply;
};

// features/send-message/model/useSendMessage.ts
import { useState } from 'react';
import { sendMessage as apiSendMessage } from '../api/sendMessage';
import { Message } from '@/entities/message';

export const useSendMessage = (
  onMessageSent: (userMessage: Message, assistantMessage: Message) => void
) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (e: React.FormEvent, history: Message[]) => {
    e.preventDefault();

    if (!message.trim()) return;

    setIsLoading(true);
    setError(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    try {
      const reply = await apiSendMessage(message, history);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      };

      onMessageSent(userMessage, assistantMessage);
      setMessage('');
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { message, setMessage, sendMessage, isLoading, error };
};

// features/send-message/ui/SendMessageForm.tsx
import { Button, Input } from '@/shared/ui';
import { Message } from '@/entities/message';

interface SendMessageFormProps {
  message: string;
  setMessage: (message: string) => void;
  onSubmit: (e: React.FormEvent, history: Message[]) => void;
  isLoading: boolean;
  history: Message[];
}

export const SendMessageForm: React.FC<SendMessageFormProps> = ({
  message,
  setMessage,
  onSubmit,
  isLoading,
  history,
}) => {
  return (
    <form
      onSubmit={(e) => onSubmit(e, history)}
      className="flex gap-2 p-4 border-t"
    >
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me about my experience..."
        disabled={isLoading}
        className="flex-1"
      />
      <Button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="px-6 py-2 bg-accent text-white rounded-lg
          transition duration-300
          hover:bg-amber-700
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? '...' : '➤'}
      </Button>
    </form>
  );
};

// features/send-message/index.ts
export { SendMessageForm } from './ui/SendMessageForm';
export { useSendMessage } from './model/useSendMessage';
```

---

## Phase 3: CV Portfolio - Widgets & Pages (Days 8-10)

### Step 14: Build Header Widget (`widgets/header`)
```tsx
// widgets/header/ui/Header.tsx
export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200
      backdrop-blur-sm bg-opacity-95">
      <div className="max-w-3xl mx-auto px-6 py-6">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          VSEVOLOD BERDUTIN
        </h1>
        <p className="text-xl text-text-secondary font-semibold mb-1">
          Senior Frontend Engineer
        </p>
        <p className="text-sm text-text-secondary font-mono">
          React • TypeScript • Next.js • Team Leadership
        </p>
      </div>
    </header>
  );
};

// widgets/header/index.ts
export { Header } from './ui/Header';
```

### Step 15: Build Hero Section Widget (`widgets/hero-section`)
```tsx
// widgets/hero-section/ui/HeroSection.tsx
import { Card } from '@/shared/ui';

export const HeroSection = () => {
  return (
    <section className="py-12">
      <Card className="p-8 bg-gradient-to-br from-background to-background-secondary">
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          About Me
        </h2>
        <div className="space-y-3 text-text-secondary leading-relaxed">
          <p>
            <strong className="text-text-primary">8+ years of experience</strong> in frontend development,
            specializing in React, TypeScript, and Next.js.
          </p>
          <p>
            Led distributed teams of <strong className="text-text-primary">3-5 engineers</strong>,
            delivering solutions for <strong className="text-text-primary">50,000+ internal users</strong> at
            Eastern Europe's largest financial institution.
          </p>
          <p>
            Expertise in <strong className="text-text-primary">fintech, cryptocurrency, and corporate B2B</strong> applications.
          </p>
          <p>
            Integrated AI solutions using <strong className="text-text-primary">OpenAI GPT and GigaChat</strong>,
            improving user experience and operational efficiency.
          </p>
          <p className="pt-2 border-t border-gray-300 mt-4">
            <strong className="text-text-primary">Languages:</strong>{' '}
            English (C1) • Hebrew (B1/B2) • Russian (Native)
          </p>
        </div>
      </Card>
    </section>
  );
};

// widgets/hero-section/index.ts
export { HeroSection } from './ui/HeroSection';
```

### Step 16: Build CV Sections Widget (`widgets/cv-sections`)
```tsx
// widgets/cv-sections/model/sectionsData.ts
export const sections = [
  {
    id: 'stack',
    label: 'Tech Stack',
    icon: '🛠️',
    content: {
      categories: [
        {
          category: 'Frontend',
          items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Redux'],
        },
        {
          category: 'Backend',
          items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'WebSocket'],
        },
        {
          category: 'Tools & DevOps',
          items: ['Docker', 'Git', 'CI/CD', 'Webpack', 'Module Federation'],
        },
        {
          category: 'AI Integration',
          items: ['OpenAI API', 'GigaChat', 'LangChain'],
        },
      ],
    },
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: '💼',
    content: {
      // Will be populated from CV_CONTENT.md
    },
  },
  {
    id: 'education',
    label: 'Education',
    icon: '🎓',
    content: {
      // Will be populated from CV_CONTENT.md
    },
  },
];

// widgets/cv-sections/ui/CVSections.tsx
import { useState } from 'react';
import { ToggleButton } from '@/features/toggle-section';
import { Card } from '@/shared/ui';
import { sections } from '../model/sectionsData';

export const CVSections = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setOpenSections(prev =>
      prev.includes(id)
        ? prev.filter(sectionId => sectionId !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-8 space-y-6">
      {sections.map((section) => (
        <div key={section.id}>
          <ToggleButton
            isOpen={openSections.includes(section.id)}
            onToggle={() => toggleSection(section.id)}
            label={section.label}
            icon={section.icon}
          />

          {openSections.includes(section.id) && (
            <Card className="mt-4 p-6 animate-slideDown">
              {/* Render section content based on section.id */}
              <pre>{JSON.stringify(section.content, null, 2)}</pre>
            </Card>
          )}
        </div>
      ))}
    </section>
  );
};

// widgets/cv-sections/index.ts
export { CVSections } from './ui/CVSections';
```

### Step 17: Build Chat Widget (`widgets/chat-widget`)
```typescript
// widgets/chat-widget/model/useChatStore.ts
import { create } from 'zustand';
import { Message } from '@/entities/message';

interface ChatStore {
  messages: Message[];
  isLoading: boolean;
  addMessage: (message: Message) => void;
  addMessages: (userMessage: Message, assistantMessage: Message) => void;
  setLoading: (isLoading: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isLoading: false,
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  addMessages: (userMessage, assistantMessage) =>
    set((state) => ({
      messages: [...state.messages, userMessage, assistantMessage],
    })),
  setLoading: (isLoading) => set({ isLoading }),
  clearMessages: () => set({ messages: [] }),
}));

// widgets/chat-widget/ui/ChatWidget.tsx
import { Card } from '@/shared/ui';
import { MessageCard } from '@/entities/message';
import { SendMessageForm, useSendMessage } from '@/features/send-message';
import { useChatStore } from '../model/useChatStore';

const SUGGESTED_PROMPTS = [
  "What projects have you led?",
  "Tell me about your AI integration work",
  "What's your experience with crypto/fintech?",
  "Describe your team leadership approach",
];

export const ChatWidget = () => {
  const { messages, addMessages } = useChatStore();

  const { message, setMessage, sendMessage, isLoading, error } = useSendMessage(
    (userMsg, assistantMsg) => {
      addMessages(userMsg, assistantMsg);
    }
  );

  const handlePromptClick = (prompt: string) => {
    setMessage(prompt);
  };

  return (
    <section className="py-8">
      <Card className="overflow-hidden">
        <div className="bg-accent text-white p-4">
          <h3 className="text-xl font-bold">Ask Me Anything</h3>
          <p className="text-sm opacity-90">
            Powered by AI - Ask about my experience and skills
          </p>
        </div>

        {messages.length === 0 && (
          <div className="p-6 space-y-3">
            <p className="text-text-secondary text-sm mb-3">
              Try asking:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {SUGGESTED_PROMPTS.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  className="text-left p-3 text-sm border border-gray-300 rounded-lg
                    transition duration-300
                    hover:border-accent hover:bg-background-secondary"
                >
                  💬 {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <MessageCard key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-text-secondary">
              <span className="animate-pulse">●</span>
              <span className="animate-pulse delay-100">●</span>
              <span className="animate-pulse delay-200">●</span>
            </div>
          )}
        </div>

        {error && (
          <div className="px-4 py-2 bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        <SendMessageForm
          message={message}
          setMessage={setMessage}
          onSubmit={sendMessage}
          isLoading={isLoading}
          history={messages}
        />
      </Card>
    </section>
  );
};

// widgets/chat-widget/index.ts
export { ChatWidget } from './ui/ChatWidget';
```

### Step 18: Create LLM API Route (`app/api/chat/route.ts`)
```typescript
// apps/cv-portfolio/src/app/api/chat/route.ts
import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// CV Context - Load from cvData
const CV_CONTEXT = `You are Vsevolod Berdutin's AI assistant.
Answer questions about his professional background based on this CV:

Name: Vsevolod Berdutin
Title: Senior Frontend Engineer

Summary:
- 8+ years of experience in frontend development
- Led distributed teams of 3-5 engineers
- Delivered solutions for 50,000+ internal users at Eastern Europe's largest financial institution
- Expertise in fintech, cryptocurrency, and corporate B2B applications
- Integrated AI solutions using OpenAI GPT and GigaChat
- Languages: English (C1), Hebrew (B1/B2), Russian (Native)

Technical Skills:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Zustand, Redux
- Backend: Node.js, Express, PostgreSQL, MongoDB, WebSocket
- Tools: Docker, Git, CI/CD, Webpack, Module Federation
- AI: OpenAI API, GigaChat, LangChain

Be conversational, professional, and helpful.
Provide specific examples from the CV when relevant.`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const messages = [
      { role: 'system' as const, content: CV_CONTEXT },
      ...history.map((msg: any) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user' as const, content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0].message.content;

    return NextResponse.json({
      reply,
      model: 'gpt-3.5-turbo',
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
```

### Step 19: Build Footer Widget (`widgets/footer`)
```tsx
// widgets/footer/ui/Footer.tsx
import { Card } from '@/shared/ui';
import { DownloadButton } from '@/features/download-cv';

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-gray-200">
      <div className="space-y-8">
        <Card className="p-6">
          <h3 className="text-xl font-bold text-text-primary mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="tel:+972555073702"
              className="flex items-center gap-3 p-3 rounded-lg
                transition duration-300
                hover:bg-background-secondary"
            >
              <span className="text-2xl">📱</span>
              <div>
                <p className="text-sm text-text-secondary">Phone</p>
                <p className="font-semibold text-text-primary">
                  +972 555 0 737 02
                </p>
              </div>
            </a>

            <a
              href="mailto:vsevolodberdutin@gmail.com"
              className="flex items-center gap-3 p-3 rounded-lg
                transition duration-300
                hover:bg-background-secondary"
            >
              <span className="text-2xl">📧</span>
              <div>
                <p className="text-sm text-text-secondary">Email</p>
                <p className="font-semibold text-text-primary">
                  vsevolodberdutin@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/vsevolodberdutin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg
                transition duration-300
                hover:bg-background-secondary"
            >
              <span className="text-2xl">💼</span>
              <div>
                <p className="text-sm text-text-secondary">LinkedIn</p>
                <p className="font-semibold text-text-primary">
                  /in/vsevolodberdutin
                </p>
              </div>
            </a>

            <a
              href="https://t.me/vsevolodberdutin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg
                transition duration-300
                hover:bg-background-secondary"
            >
              <span className="text-2xl">✈️</span>
              <div>
                <p className="text-sm text-text-secondary">Telegram</p>
                <p className="font-semibold text-text-primary">
                  @vsevolodberdutin
                </p>
              </div>
            </a>
          </div>
        </Card>

        <div className="flex justify-center">
          <DownloadButton />
        </div>

        <div className="text-center text-text-secondary text-sm">
          <p>© 2024 Vsevolod Berdutin. Built with Next.js, TypeScript & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

// widgets/footer/index.ts
export { Footer } from './ui/Footer';
```

### Step 20: Compose Home Page (`pages/home`)
```tsx
// apps/cv-portfolio/src/pages/home/ui/HomePage.tsx
import { Header } from '@/widgets/header';
import { HeroSection } from '@/widgets/hero-section';
import { CVSections } from '@/widgets/cv-sections';
import { ChatWidget } from '@/widgets/chat-widget';
import { Footer } from '@/widgets/footer';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-3xl mx-auto px-6">
        <HeroSection />
        <CVSections />
        <ChatWidget />
      </main>
      <div className="max-w-3xl mx-auto px-6">
        <Footer />
      </div>
    </div>
  );
};

// apps/cv-portfolio/src/pages/home/index.ts
export { HomePage } from './ui/HomePage';

// apps/cv-portfolio/src/app/page.tsx
import { HomePage } from '@/pages/home';

export default function Home() {
  return <HomePage />;
}
```

---

## Phase 4: DeFi Dashboard - Entities & Features (Days 11-13)

### Step 21: Create Crypto Entity (`entities/crypto`)
```typescript
// entities/crypto/model/types.ts
export interface Crypto {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

export const CRYPTO_LIST = [
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'SOL', name: 'Solana' },
  { symbol: 'BNB', name: 'Binance Coin' },
  { symbol: 'ADA', name: 'Cardano' },
];

// entities/crypto/ui/CryptoIcon.tsx
interface CryptoIconProps {
  symbol: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CryptoIcon: React.FC<CryptoIconProps> = ({ symbol, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gray-200 flex items-center justify-center`}>
      <span className="font-bold text-xs">{symbol}</span>
    </div>
  );
};

// entities/crypto/index.ts
export { CryptoIcon } from './ui/CryptoIcon';
export type { Crypto } from './model/types';
export { CRYPTO_LIST } from './model/types';
```

### Step 22: Create Price Entity (`entities/price`)
```typescript
// entities/price/model/formatPrice.ts
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const formatChange = (change: number): string => {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
};

// entities/price/ui/PriceDisplay.tsx
import { formatPrice } from '../model/formatPrice';

interface PriceDisplayProps {
  price: number;
  size?: 'sm' | 'md' | 'lg';
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl',
  };

  return (
    <span className={`font-mono font-bold ${sizeClasses[size]}`}>
      {formatPrice(price)}
    </span>
  );
};

// entities/price/ui/PriceChange.tsx
import { formatChange } from '../model/formatPrice';

interface PriceChangeProps {
  change: number;
}

export const PriceChange: React.FC<PriceChangeProps> = ({ change }) => {
  const isPositive = change >= 0;
  const colorClass = isPositive ? 'text-green-positive' : 'text-red-negative';

  return (
    <span className={`font-mono text-sm ${colorClass}`}>
      {formatChange(change)}
    </span>
  );
};

// entities/price/index.ts
export { PriceDisplay } from './ui/PriceDisplay';
export { PriceChange } from './ui/PriceChange';
export { formatPrice, formatChange } from './model/formatPrice';
```

### Step 23: Build Subscribe Price Feature (`features/subscribe-price`)
```typescript
// features/subscribe-price/model/useSubscribePrice.ts
import { useState, useEffect } from 'react';

interface PriceData {
  [symbol: string]: number;
}

export const useSubscribePrice = (symbols: string[]) => {
  const [prices, setPrices] = useState<PriceData>({});
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/prices';
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      // Subscribe to symbols
      ws.send(JSON.stringify({ type: 'subscribe', symbols }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrices(data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [symbols.join(',')]);

  return { prices, isConnected };
};

// features/subscribe-price/index.ts
export { useSubscribePrice } from './model/useSubscribePrice';
```

### Step 24: Build Trading Pair Selector (`features/select-trading-pair`)
```typescript
// features/select-trading-pair/model/useSelectPair.ts
import { useState, useCallback } from 'react';

export const useSelectPair = (defaultPair = 'BTC/USD') => {
  const [selectedPair, setSelectedPair] = useState(defaultPair);

  const selectPair = useCallback((pair: string) => {
    setSelectedPair(pair);
  }, []);

  return { selectedPair, selectPair };
};

// features/select-trading-pair/ui/TradingPairSelector.tsx
interface TradingPairSelectorProps {
  pairs: string[];
  selectedPair: string;
  onSelectPair: (pair: string) => void;
}

export const TradingPairSelector: React.FC<TradingPairSelectorProps> = ({
  pairs,
  selectedPair,
  onSelectPair,
}) => {
  return (
    <select
      value={selectedPair}
      onChange={(e) => onSelectPair(e.target.value)}
      className="px-4 py-2 bg-bg-secondary text-text-primary border border-chart-grid rounded-lg
        focus:outline-none focus:ring-2 focus:ring-green-positive"
    >
      {pairs.map((pair) => (
        <option key={pair} value={pair}>
          {pair}
        </option>
      ))}
    </select>
  );
};

// features/select-trading-pair/index.ts
export { TradingPairSelector } from './ui/TradingPairSelector';
export { useSelectPair } from './model/useSelectPair';
```

### Step 25: Build Price Ticker Widget (`widgets/price-ticker`)
```tsx
// widgets/price-ticker/ui/PriceCard.tsx
import { CryptoIcon } from '@/entities/crypto';
import { PriceDisplay, PriceChange } from '@/entities/price';
import { Crypto } from '@/entities/crypto';

interface PriceCardProps {
  crypto: Crypto;
}

export const PriceCard: React.FC<PriceCardProps> = ({ crypto }) => {
  return (
    <div className="p-4 bg-bg-secondary rounded-lg border border-chart-grid
      transition duration-300
      hover:border-green-positive">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <CryptoIcon symbol={crypto.symbol} />
          <div>
            <h3 className="font-bold text-text-primary">{crypto.symbol}</h3>
            <p className="text-xs text-text-secondary">{crypto.name}</p>
          </div>
        </div>
        <PriceChange change={crypto.change24h} />
      </div>

      <PriceDisplay price={crypto.price} size="lg" />

      <div className="mt-3 pt-3 border-t border-chart-grid">
        <div className="flex justify-between text-xs text-text-secondary">
          <span>Volume 24h:</span>
          <span className="font-mono">${(crypto.volume24h / 1e9).toFixed(2)}B</span>
        </div>
      </div>
    </div>
  );
};

// widgets/price-ticker/ui/PriceTicker.tsx
import { useSubscribePrice } from '@/features/subscribe-price';
import { CRYPTO_LIST } from '@/entities/crypto';
import { PriceCard } from './PriceCard';

export const PriceTicker = () => {
  const symbols = CRYPTO_LIST.map(c => c.symbol);
  const { prices, isConnected } = useSubscribePrice(symbols);

  // Mock data for demonstration
  const cryptoData = CRYPTO_LIST.map(crypto => ({
    ...crypto,
    price: prices[crypto.symbol] || 0,
    change24h: Math.random() * 10 - 5,
    volume24h: Math.random() * 50e9,
    marketCap: Math.random() * 500e9,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-text-primary">Live Prices</h2>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-positive' : 'bg-red-negative'}`} />
          <span className="text-xs text-text-secondary">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cryptoData.map((crypto) => (
          <PriceCard key={crypto.symbol} crypto={crypto} />
        ))}
      </div>
    </div>
  );
};

// widgets/price-ticker/index.ts
export { PriceTicker } from './ui/PriceTicker';
```

### Step 26: Build Trading Chart Widget (`widgets/trading-chart`)
```tsx
// widgets/trading-chart/ui/TradingChart.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  time: string;
  price: number;
}

interface TradingChartProps {
  data: ChartData[];
  symbol: string;
}

export const TradingChart: React.FC<TradingChartProps> = ({ data, symbol }) => {
  return (
    <div className="p-6 bg-bg-secondary rounded-lg border border-chart-grid">
      <h3 className="text-lg font-bold text-text-primary mb-4">
        {symbol} Price Chart
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2F3336" />
          <XAxis
            dataKey="time"
            stroke="#8B98A5"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#8B98A5"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1A1F26',
              border: '1px solid #2F3336',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#E7E9EA' }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#00D46A"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// widgets/trading-chart/index.ts
export { TradingChart } from './ui/TradingChart';
```

### Step 27: Build Order Book Widget (`widgets/order-book`)
```tsx
// widgets/order-book/model/types.ts
export interface Order {
  price: number;
  amount: number;
  total: number;
}

export interface OrderBookData {
  bids: Order[];
  asks: Order[];
}

// widgets/order-book/ui/OrderRow.tsx
interface OrderRowProps {
  order: Order;
  type: 'bid' | 'ask';
  maxTotal: number;
}

export const OrderRow: React.FC<OrderRowProps> = ({ order, type, maxTotal }) => {
  const percentage = (order.total / maxTotal) * 100;
  const bgColor = type === 'bid' ? 'bg-green-positive' : 'bg-red-negative';

  return (
    <div className="relative flex justify-between py-1 px-2 text-xs font-mono">
      <div
        className={`absolute right-0 top-0 bottom-0 ${bgColor} opacity-10`}
        style={{ width: `${percentage}%` }}
      />
      <span className={type === 'bid' ? 'text-green-positive' : 'text-red-negative'}>
        {order.price.toFixed(2)}
      </span>
      <span className="text-text-primary">{order.amount.toFixed(4)}</span>
      <span className="text-text-secondary">{order.total.toFixed(2)}</span>
    </div>
  );
};

// widgets/order-book/ui/OrderBook.tsx
import { OrderBookData } from '../model/types';
import { OrderRow } from './OrderRow';

interface OrderBookProps {
  data: OrderBookData;
}

export const OrderBook: React.FC<OrderBookProps> = ({ data }) => {
  const maxTotal = Math.max(
    ...data.bids.map(b => b.total),
    ...data.asks.map(a => a.total)
  );

  return (
    <div className="p-6 bg-bg-secondary rounded-lg border border-chart-grid">
      <h3 className="text-lg font-bold text-text-primary mb-4">Order Book</h3>

      <div className="flex justify-between mb-2 px-2 text-xs text-text-secondary font-mono">
        <span>Price (USD)</span>
        <span>Amount</span>
        <span>Total</span>
      </div>

      <div className="space-y-1 mb-4">
        {data.asks.slice(0, 10).reverse().map((ask, index) => (
          <OrderRow key={index} order={ask} type="ask" maxTotal={maxTotal} />
        ))}
      </div>

      <div className="border-t border-b border-chart-grid py-2 mb-4 text-center">
        <span className="text-lg font-bold text-green-positive font-mono">
          {data.bids[0]?.price.toFixed(2)}
        </span>
      </div>

      <div className="space-y-1">
        {data.bids.slice(0, 10).map((bid, index) => (
          <OrderRow key={index} order={bid} type="bid" maxTotal={maxTotal} />
        ))}
      </div>
    </div>
  );
};

// widgets/order-book/index.ts
export { OrderBook } from './ui/OrderBook';
export type { OrderBookData } from './model/types';
```

### Step 28: Build Market Stats Widget (`widgets/market-stats`)
This will be implemented with SSG

---

## Phase 5: Rendering Strategies & Integration (Days 14-16)

### Step 29: Implement SSG Page (`app/market-overview/page.tsx`)
```typescript
// apps/defi-dashboard/src/app/market-overview/page.tsx
import { Badge } from '@/shared/ui';

async function getMarketData() {
  // Fetch from CoinGecko API or use mock data
  const data = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 43250, marketCap: 850e9 },
    { id: 2, name: 'Ethereum', symbol: 'ETH', price: 2280, marketCap: 274e9 },
    // ... more data
  ];

  return data;
}

export default async function MarketOverviewPage() {
  const data = await getMarketData();
  const generatedAt = new Date().toISOString();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Market Overview</h1>
        <Badge variant="ssg">Static Generation</Badge>
      </div>

      <p className="text-xs text-text-secondary mb-4">
        Generated at build time: {generatedAt}
      </p>

      <div className="grid gap-4">
        {data.map((crypto) => (
          <div key={crypto.id} className="p-4 bg-bg-secondary rounded-lg">
            <h3 className="font-bold">{crypto.name} ({crypto.symbol})</h3>
            <p>Price: ${crypto.price.toLocaleString()}</p>
            <p>Market Cap: ${(crypto.marketCap / 1e9).toFixed(2)}B</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Force static generation
export const dynamic = 'force-static';
```

### Step 30: Implement SSR Page (`app/trading/page.tsx`)
```typescript
// apps/defi-dashboard/src/app/trading/page.tsx
import { Badge } from '@/shared/ui';
import { PriceTicker } from '@/widgets/price-ticker';
import { TradingChart } from '@/widgets/trading-chart';
import { OrderBook } from '@/widgets/order-book';

export default async function TradingPage() {
  const fetchedAt = new Date().toISOString();

  // Mock chart data
  const chartData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    price: 43000 + Math.random() * 1000,
  }));

  // Mock order book data
  const orderBookData = {
    bids: Array.from({ length: 15 }, (_, i) => ({
      price: 43000 - i * 10,
      amount: Math.random() * 2,
      total: (43000 - i * 10) * Math.random() * 2,
    })),
    asks: Array.from({ length: 15 }, (_, i) => ({
      price: 43010 + i * 10,
      amount: Math.random() * 2,
      total: (43010 + i * 10) * Math.random() * 2,
    })),
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Live Trading</h1>
        <Badge variant="ssr">Server-Side Rendering</Badge>
      </div>

      <p className="text-xs text-text-secondary mb-6">
        Server rendered at: {fetchedAt}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PriceTicker />
          <TradingChart data={chartData} symbol="BTC/USD" />
        </div>

        <div>
          <OrderBook data={orderBookData} />
        </div>
      </div>
    </div>
  );
}

// Force server-side rendering
export const dynamic = 'force-dynamic';
```

### Step 31: Implement ISR Page (`app/analytics/page.tsx`)
```typescript
// apps/defi-dashboard/src/app/analytics/page.tsx
import { Badge } from '@/shared/ui';

async function getAnalyticsData() {
  // Fetch historical data
  const data = {
    last30Days: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      price: 40000 + Math.random() * 5000,
      volume: Math.random() * 50e9,
    })),
  };

  return data;
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();
  const generatedAt = new Date().toISOString();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Analytics</h1>
        <Badge variant="isr">Incremental Static Regeneration</Badge>
      </div>

      <p className="text-xs text-text-secondary mb-4">
        Last regenerated: {generatedAt} | Revalidates every hour
      </p>

      <div className="grid gap-6">
        <div className="p-6 bg-bg-secondary rounded-lg">
          <h3 className="text-lg font-bold mb-4">30-Day Performance</h3>
          <p>Average Price: ${(data.last30Days.reduce((sum, d) => sum + d.price, 0) / 30).toFixed(2)}</p>
          <p>Total Volume: ${(data.last30Days.reduce((sum, d) => sum + d.volume, 0) / 1e9).toFixed(2)}B</p>
        </div>
      </div>
    </div>
  );
}

// Revalidate every hour (3600 seconds)
export const revalidate = 3600;
```

### Step 32: Create Mock WebSocket Server
```typescript
// backend/src/websocket/priceStream.ts
import { WebSocketServer, WebSocket } from 'ws';

const PORT = 8080;

interface PriceData {
  [symbol: string]: number;
}

// Initial prices
const prices: PriceData = {
  BTC: 43250,
  ETH: 2280,
  SOL: 98.5,
  BNB: 315,
  ADA: 0.52,
};

function generateMockPrices(): PriceData {
  const updated: PriceData = {};

  Object.keys(prices).forEach((symbol) => {
    // Simulate price movement (-0.1% to +0.1%)
    const change = (Math.random() - 0.5) * 0.002;
    prices[symbol] = prices[symbol] * (1 + change);
    updated[symbol] = parseFloat(prices[symbol].toFixed(2));
  });

  return updated;
}

export function startWebSocketServer() {
  const wss = new WebSocketServer({ port: PORT });

  console.log(`WebSocket server started on port ${PORT}`);

  wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected');

    // Send initial prices
    ws.send(JSON.stringify(prices));

    // Send price updates every second
    const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        const updatedPrices = generateMockPrices();
        ws.send(JSON.stringify(updatedPrices));
      }
    }, 1000);

    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        if (data.type === 'subscribe') {
          console.log('Subscribed to symbols:', data.symbols);
        }
      } catch (error) {
        console.error('Invalid message:', error);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
      clearInterval(interval);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      clearInterval(interval);
    });
  });
}

// backend/src/server.ts
import { startWebSocketServer } from './websocket/priceStream';

startWebSocketServer();
```

---

## Phase 6: Module Federation (Days 17-18)

### Step 33: Configure Module Federation for CV Portfolio
```javascript
// apps/cv-portfolio/next.config.js
const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack: (config, options) => {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'cv_portfolio',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './Header': './src/widgets/header',
            './Footer': './src/widgets/footer',
            './ChatWidget': './src/widgets/chat-widget',
          },
          remotes: {
            defi_dashboard: `defi_dashboard@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
          },
          shared: {
            react: { singleton: true, requiredVersion: '^18' },
            'react-dom': { singleton: true, requiredVersion: '^18' },
            'next': { singleton: true },
          },
        })
      );
    }

    return config;
  },
};
```

### Step 34: Configure Module Federation for DeFi Dashboard
```javascript
// apps/defi-dashboard/next.config.js
const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack: (config, options) => {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'defi_dashboard',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './Dashboard': './src/pages/dashboard',
            './PriceTicker': './src/widgets/price-ticker',
            './TradingChart': './src/widgets/trading-chart',
            './OrderBook': './src/widgets/order-book',
          },
          shared: {
            react: { singleton: true, requiredVersion: '^18' },
            'react-dom': { singleton: true, requiredVersion: '^18' },
            'next': { singleton: true },
          },
        })
      );
    }

    return config;
  },
};
```

### Step 35: Test Cross-App Component Sharing
```tsx
// Example: Import DeFi widget in CV Portfolio
import dynamic from 'next/dynamic';

const RemotePriceTicker = dynamic(
  () => import('defi_dashboard/PriceTicker').catch(() => {
    return () => <div>Price ticker unavailable</div>;
  }),
  { ssr: false }
);

export const HomePage = () => {
  return (
    <div>
      {/* CV Portfolio content */}

      <section className="py-8">
        <h2>Live Crypto Prices</h2>
        <RemotePriceTicker />
      </section>
    </div>
  );
};
```

---

## Phase 7: Docker & Deployment (Days 19-20)

### Step 36: Create Dockerfiles
```dockerfile
# apps/cv-portfolio/Dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 8080

CMD ["node", "dist/server.js"]
```

### Step 37: Create docker-compose.yml
```yaml
# docker-compose.yml
version: '3.8'

services:
  cv-portfolio:
    build:
      context: ./apps/cv-portfolio
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - NEXT_PUBLIC_WS_URL=ws://localhost:8080
    depends_on:
      - backend
    networks:
      - app-network

  defi-dashboard:
    build:
      context: ./apps/defi-dashboard
      dockerfile: Dockerfile
    ports:
      - "3001:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_WS_URL=ws://localhost:8080
    depends_on:
      - backend
    networks:
      - app-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - cv-portfolio
      - defi-dashboard
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### Step 38: Configure Nginx Reverse Proxy
```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream cv_portfolio {
        server cv-portfolio:3000;
    }

    upstream defi_dashboard {
        server defi-dashboard:3000;
    }

    upstream backend {
        server backend:8080;
    }

    server {
        listen 80;
        server_name localhost;

        # CV Portfolio (main app)
        location / {
            proxy_pass http://cv_portfolio;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # DeFi Dashboard
        location /defi {
            proxy_pass http://defi_dashboard;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # WebSocket endpoint
        location /ws {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        # Static files
        location /_next/static {
            proxy_pass http://cv_portfolio;
            proxy_cache_valid 200 60m;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

---

## Phase 8: Testing & Optimization (Days 21-23)

### Step 39: Write Unit Tests for Features
```typescript
// features/send-message/__tests__/useSendMessage.test.ts
import { renderHook, act, waitFor } from '@testing-library/react';
import { useSendMessage } from '../model/useSendMessage';

// Mock fetch
global.fetch = jest.fn();

describe('useSendMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send message and update state', async () => {
    const mockOnMessageSent = jest.fn();

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ reply: 'Test response' }),
    });

    const { result } = renderHook(() => useSendMessage(mockOnMessageSent));

    act(() => {
      result.current.setMessage('Hello');
    });

    expect(result.current.message).toBe('Hello');

    await act(async () => {
      await result.current.sendMessage(
        { preventDefault: jest.fn() } as any,
        []
      );
    });

    await waitFor(() => {
      expect(mockOnMessageSent).toHaveBeenCalled();
      expect(result.current.message).toBe('');
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should handle errors', async () => {
    const mockOnMessageSent = jest.fn();

    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useSendMessage(mockOnMessageSent));

    act(() => {
      result.current.setMessage('Hello');
    });

    await act(async () => {
      await result.current.sendMessage(
        { preventDefault: jest.fn() } as any,
        []
      );
    });

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
      expect(mockOnMessageSent).not.toHaveBeenCalled();
    });
  });
});
```

### Step 40: Optimize Bundle Size
```javascript
// Install bundle analyzer
// yarn add -D @next/bundle-analyzer

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ... existing config

  // Enable SWC minification
  swcMinify: true,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Tree shaking
  webpack: (config) => {
    config.optimization.usedExports = true;
    return config;
  },
});

// Run: ANALYZE=true yarn build
```

### Step 41: Performance Optimization
```tsx
// Lazy load heavy components
import dynamic from 'next/dynamic';

const ChatWidget = dynamic(() => import('@/widgets/chat-widget'), {
  loading: () => <ChatWidgetSkeleton />,
  ssr: false,
});

const TradingChart = dynamic(() => import('@/widgets/trading-chart'), {
  loading: () => <ChartSkeleton />,
});

// Skeleton components
const ChatWidgetSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg h-96" />
);

// Image optimization
import Image from 'next/image';

<Image
  src="/profile.jpg"
  alt="Vsevolod Berdutin"
  width={200}
  height={200}
  priority
/>
```

### Step 42: Accessibility Audit
```tsx
// Add ARIA labels
<button
  onClick={handleClick}
  aria-label="Send message"
  aria-describedby="message-input-desc"
>
  ➤
</button>

<span id="message-input-desc" className="sr-only">
  Send your message to the AI assistant
</span>

// Keyboard navigation
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSubmit();
  }
};

// Focus management
import { useEffect, useRef } from 'react';

const ChatWidget = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      inputRef.current?.focus();
    }
  }, [messages]);

  return <input ref={inputRef} />;
};

// Color contrast - ensure WCAG AA compliance
// Use tools like axe DevTools or Lighthouse
```

---

## Phase 9: Documentation & Polish (Days 24-25)

### Step 43: Create FSD Documentation
Create README files for each layer explaining the architecture and usage patterns.

### Step 44: Add Public API Documentation
Document all exported interfaces, types, and components with JSDoc comments.

### Step 45: Create Setup Guide
Comprehensive README with installation, development, and deployment instructions.

### Step 46: Final Testing
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile responsive testing (iOS, Android)
- Lighthouse audit (Performance, Accessibility, Best Practices, SEO)
- Load testing for WebSocket connections

---

## Success Checklist

### Functional Requirements
- [ ] FSD structure implemented correctly
- [ ] CV Portfolio displays all information
- [ ] Interactive sections expand/collapse smoothly
- [ ] LLM chat responds accurately
- [ ] CV download works
- [ ] DeFi Dashboard shows real-time prices
- [ ] SSG/SSR/ISR demonstrated clearly
- [ ] Module Federation working
- [ ] Docker deployment successful

### Non-Functional Requirements
- [ ] Lighthouse score > 90 on all metrics
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Bundle size < 200KB (gzipped)
- [ ] Mobile responsive (320px - 1920px)
- [ ] Cross-browser compatible
- [ ] WCAG 2.1 Level AA compliance

### Documentation
- [ ] README with setup instructions
- [ ] FSD layer documentation
- [ ] API documentation
- [ ] Architecture diagrams
- [ ] Contributing guidelines

---

## Quick Start Commands

```bash
# Development
yarn install
yarn dev

# Build
yarn build

# Docker
docker-compose up --build

# Testing
yarn test
yarn test:e2e

# Linting
yarn lint
yarn format
```

---

## Technology Stack Summary

**Frontend:**
- React 18
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Zustand (state management)
- Recharts (charts)
- Framer Motion (animations)

**Backend:**
- Node.js 18+
- Next.js API Routes
- OpenAI API
- WebSocket (ws library)

**Architecture:**
- Feature-Sliced Design (FSD)
- Module Federation
- Micro-frontends

**DevOps:**
- Docker & Docker Compose
- Nginx reverse proxy

**Development:**
- ESLint & Prettier
- Jest & React Testing Library
- TypeScript strict mode

---

## Key Resources

- [Feature-Sliced Design](https://feature-sliced.design/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Module Federation](https://module-federation.io/)
- [OpenAI API](https://platform.openai.com/docs)
- [Recharts](https://recharts.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

This plan provides a comprehensive roadmap for implementing the Interactive CV Portfolio with DeFi Dashboard using Feature-Sliced Design architecture. Follow each phase sequentially for best results.
