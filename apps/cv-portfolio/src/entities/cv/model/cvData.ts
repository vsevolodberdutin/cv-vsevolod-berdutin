import { CV } from './types';

/**
 * Vsevolod Berdutin's CV Data
 * Complete professional profile including experience, skills, education, and contact information
 */
export const cvData: CV = {
  name: 'Vsevolod Berdutin',
  title: 'Senior Frontend Engineer',
  summary: `8+ years of experience in frontend development, specializing in React, TypeScript, and Next.js.

Led distributed teams of 3-5 engineers, delivering solutions for 50,000+ internal users at Eastern Europe's largest financial institution.

Expertise in fintech, cryptocurrency, and corporate B2B applications.

Integrated AI solutions using OpenAI GPT and GigaChat, improving user experience and operational efficiency.

Languages: English (C1) • Hebrew (B1/B2) • Russian (Native)`,

  skills: [
    {
      category: 'Frontend',
      items: [
        'React (Hooks, Context API, Custom Hooks)',
        'Next.js (App Router, SSR, SSG, ISR)',
        'TypeScript (Advanced types, Generics)',
        'JavaScript (ES6+, Async/Await, Promises)',
        'Tailwind CSS (Responsive design, Custom themes)',
        'CSS3 / SCSS (Flexbox, Grid, Animations)',
        'Zustand (State management)',
        'Redux Toolkit (Global state)',
        'React Query (Server state)',
        'Framer Motion (Animations)',
        'Webpack (Module bundling)',
        'Module Federation (Micro-frontends)',
      ],
    },
    {
      category: 'Backend',
      items: [
        'Node.js (Express, REST APIs)',
        'Next.js API Routes (Serverless functions)',
        'WebSocket (Real-time communication)',
        'PostgreSQL (Relational databases)',
        'MongoDB (NoSQL databases)',
        'Prisma (ORM)',
        'GraphQL (Apollo Server/Client)',
        'REST API design',
      ],
    },
    {
      category: 'Tools & DevOps',
      items: [
        'Docker (Containerization, docker-compose)',
        'Git (Version control, Git Flow)',
        'CI/CD (GitHub Actions, GitLab CI)',
        'Nginx (Reverse proxy, Load balancing)',
        'Jest (Unit testing)',
        'React Testing Library (Component testing)',
        'Playwright (E2E testing)',
        'ESLint & Prettier (Code quality)',
        'Figma (Design collaboration)',
        'Jira / Linear (Project management)',
      ],
    },
    {
      category: 'AI Integration',
      items: [
        'OpenAI API (GPT-3.5, GPT-4)',
        'GigaChat (Russian AI assistant)',
        'LangChain (LLM orchestration)',
        'Prompt engineering',
        'RAG (Retrieval-Augmented Generation)',
        'Vector databases (Pinecone, Weaviate)',
      ],
    },
    {
      category: 'Architecture',
      items: [
        'Feature-Sliced Design (FSD)',
        'Micro-frontend architecture',
        'Design patterns (Singleton, Factory, Observer)',
        'Clean Code principles',
        'SOLID principles',
        'Atomic Design',
        'Component-driven development',
      ],
    },
  ],

  experience: [
    {
      company: 'Sberbank (Major Financial Institution)',
      position: 'Senior Frontend Engineer & Team Lead',
      period: '2019 - 2023',
      location: 'Moscow, Russia (Remote)',
      description: [
        'Led a distributed team of 3-5 frontend engineers across multiple time zones',
        'Architected and developed internal corporate systems serving 50,000+ employees',
        'Implemented micro-frontend architecture using Module Federation for scalable applications',
        'Integrated AI-powered chatbots using OpenAI GPT and GigaChat, improving user support efficiency by 40%',
        'Reduced application load time by 60% through performance optimization and code splitting',
        'Established frontend best practices and code review standards across the organization',
        'Mentored junior developers and conducted technical interviews',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Next.js',
        'Redux Toolkit',
        'Webpack',
        'Module Federation',
        'Docker',
        'GitLab CI/CD',
        'OpenAI API',
        'GigaChat',
      ],
      achievements: [
        'Successfully delivered 5+ major projects on time and within budget',
        'Improved code quality metrics by 35% through automated testing and code reviews',
        "Received 'Employee of the Year' award for outstanding technical leadership",
      ],
    },
    {
      company: 'CryptoExchange (Fintech Startup)',
      position: 'Frontend Developer',
      period: '2017 - 2019',
      location: 'Remote',
      description: [
        'Developed real-time trading interface with WebSocket integration for live price updates',
        'Built responsive dashboards displaying market data, charts, and order books',
        'Implemented advanced charting using Recharts with candlestick, line, and volume charts',
        'Created secure authentication flow with 2FA and biometric support',
        'Optimized application for high-frequency trading scenarios with minimal latency',
        'Collaborated with backend team to design RESTful and WebSocket APIs',
      ],
      technologies: [
        'React',
        'Redux',
        'WebSocket',
        'Recharts',
        'Material-UI',
        'Node.js',
        'MongoDB',
        'Docker',
      ],
      achievements: [
        'Handled 10,000+ concurrent users with 99.9% uptime',
        'Reduced trade execution time from 500ms to 50ms',
        'Implemented real-time notifications system with sub-second latency',
      ],
    },
    {
      company: 'ShopNow (E-Commerce)',
      position: 'Frontend Developer',
      period: '2016 - 2017',
      location: 'Moscow, Russia',
      description: [
        'Developed customer-facing e-commerce platform with 100,000+ monthly active users',
        'Built product catalog with advanced filtering, sorting, and search functionality',
        'Implemented shopping cart and checkout flow with multiple payment integrations',
        'Created admin dashboard for inventory management and order processing',
        'Optimized SEO and Core Web Vitals achieving 95+ Lighthouse scores',
        'Integrated analytics and A/B testing tools to improve conversion rates',
      ],
      technologies: [
        'React',
        'Next.js',
        'Styled Components',
        'Stripe API',
        'Google Analytics',
        'Vercel',
      ],
      achievements: [
        'Increased conversion rate by 25% through UX improvements',
        'Achieved 95+ Lighthouse performance score',
        'Reduced cart abandonment rate by 15%',
      ],
    },
  ],

  education: [
    {
      institution: 'Moscow State Technical University',
      degree: 'Bachelor of Computer Science',
      period: '2012 - 2016',
      location: 'Moscow, Russia',
      field: 'Computer Science',
    },
  ],

  languages: [
    {
      name: 'Russian',
      level: 'Native (C2)',
    },
    {
      name: 'English',
      level: 'Advanced (C1)',
    },
    {
      name: 'Hebrew',
      level: 'Intermediate (B1/B2)',
    },
  ],

  contact: {
    phone: '+972 555 0 737 02',
    email: 'vsevolodberdutin@gmail.com',
    linkedin: 'https://linkedin.com/in/vsevolodberdutin',
    telegram: 'https://t.me/vsevolodberdutin',
    github: 'https://github.com/vsevolodberdutin',
  },
};
