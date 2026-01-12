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

Designed and orchestrated a multi-agent AI system (Claude Opus 4.5) with 4 specialized sub-agents, enabling iterative code generation, review, and task execution via automated loops.

Languages:
English (C1) • Hebrew (B1/B2) • Russian (Native)`,

  skills: [
    {
      category: 'Core Frontend',
      items: ['React 18', 'Next.js 16', 'TypeScript', 'Redux', 'Zustand', 'HTML5', 'CSS3'],
    },
    {
      category: 'Styling & UI',
      items: ['Tailwind CSS', 'Material-UI'],
    },
    {
      category: 'Backend & APIs',
      items: ['Node.js', 'Python', 'GraphQL', 'REST'],
    },
    {
      category: 'Architecture & Tools',
      items: ['Micro-frontends (Module Federation)', 'UI Kit', 'Vite', 'Webpack'],
    },
    {
      category: 'Testing & QA',
      items: ['Jest'],
    },
    {
      category: 'DevOps & Cloud',
      items: ['AWS', 'Docker', 'CI/CD (GitHub Actions, Jenkins)'],
    },
    {
      category: 'Monitoring',
      items: ['Datadog RUM', 'Lighthouse'],
    },
    {
      category: 'AI Integration',
      items: ['Claude Opus 4.5', 'OpenAI GPT', 'GigaChat API'],
    },
    {
      category: 'Soft Skills',
      items: [
        'Team Leadership',
        'Technical Documentation',
        'Process Standardization',
        'Mentoring',
        'Cross-functional Communication',
      ],
    },
  ],

  experience: [
    {
      company: 'Sberbank-Technology',
      position: 'Senior Frontend Developer & Team Lead',
      period: 'Dec 2024 - Present',
      location: 'Remote',
      description: [
        'Led a distributed frontend team (3-5 developers)',
        'Architected and implemented AI-driven features using GigaChat API to generate dynamic content templates',
        'Established development processes, code review standards, and CI/CD pipelines, reducing defects per release by ~50%',
        'Developed internal presentation and commercial proposal builder for corporate sales division',
      ],
      technologies: ['React', 'TypeScript', 'Redux', 'GigaChat API', 'CI/CD'],
      achievements: [
        'Reduced presentation preparation time from 8 hours to ~1 hour (–87%) through AI templates',
        'Improved application loading speed by ≈40% through performance optimization',
        'Doubled the success rate of internal production releases by implementing standardized processes',
      ],
    },
    {
      company: 'Krayon',
      position: 'Full-stack Developer',
      period: 'Jul 2023 - Aug 2024',
      location: 'Tel Aviv, Israel',
      description: [
        'Developed a UI kit from scratch',
        "Engineered key user-facing features: 'Gas Station', 'Sub-account', 'Transaction Simulator', 'Batch Payments', 'Recurring Transfers'",
        'Built an intelligent FAQ chat system using OpenAI GPT, reducing support tickets by ≈35%',
        'Worked on MPC (Multi-Party Computation) wallet for secure digital asset management',
      ],
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'zustand' ,'OpenAI GPT', 'Python', 'GraphQL', 'AWS', 'Datadog'],
      achievements: [
        'Accelerated feature development speed by 25% through implementation of unified UI kit',
        'Improved deployment reliability – automated testing covers ~85% of critical user flows',
        '30% of active users adopted new features within first month post-release',
      ],
    },
    {
      company: 'Coinmama',
      position: 'Senior Frontend Developer',
      period: 'Feb 2022 - May 2023',
      location: 'Tel Aviv, Israel',
      description: [
        'Led the migration from monolithic PHP/CSS codebase to modern micro-frontend architecture using Module Federation',
        'Resolved critical full-stack bugs across the application',
        'Developed and maintained KYC/AML forms for different regulatory regions (US, EU, Israel)',
      ],
      technologies: ['React', 'TypeScript', 'Module Federation', 'Webpack', 'PHP', 'Docker', 'AWS'],
      achievements: [
        'Reduced deployment time by 50% through isolated releases',
        'Increased automated test coverage to catch ≈80% of bugs before production',
      ],
    },
    {
      company: 'Be The Bank',
      position: 'Frontend Developer',
      period: '2019 - Feb 2022',
      location: 'Tel Aviv, Israel',
      description: [
        'Spearheaded the migration from Angular to React',
        'Developed a secure KYC system',
        'Built a new MVP for African market credit transaction and goods accounting app',
      ],
      technologies: ['React', 'TypeScript', 'Angular', 'Material-UI', 'MongoDB'],
      achievements: [
        'Increased feature development speed by 40% after technology migration',
        'Reduced user verification errors by 25% through improved UX and system design',
      ],
    },
    {
      company: 'Morizo Digital',
      position: 'Frontend Web Developer',
      period: '2016 - 2019',
      location: 'Nizhny Novgorod, Russia',
      description: [
        'Developed and maintained frontends for various client projects',
        'Built government city portal and e-commerce sites',
        'Full-service digital agency specializing in web development, design, and online marketing',
      ],
      technologies: ['React', 'TypeScript', 'JavaScript', 'jQuery', 'MySQL'],
      achievements: [],
    },
    {
      company: 'Livesocionics',
      position: 'Webmaster & SEO Specialist',
      period: '2011 - 2015',
      location: 'Nizhny Novgorod, Russia',
      description: [
        'Full website development, support, and SEO/SMM management',
        'PPC campaign setup (Yandex Direct, Google AdWords)',
        'Online studio focused on sociocultural projects',
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'SEO', 'SMM'],
      achievements: [],
    },
  ],

  education: [
    {
      institution: 'State University of Nizhny Novgorod (UNN)',
      degree: 'MSc in Computer Software Engineering',
      period: '2004 - 2010',
      location: 'Nizhny Novgorod, Russia',
      field: 'Computer Software Engineering',
    },
    {
      institution: 'Tel-Ran Educational Center',
      degree: 'Software Development Integration Course',
      period: '2019',
      location: 'Rehovot, Israel',
      field: 'Software Development',
    },
  ],

  languages: [
    {
      name: 'Russian',
      level: 'Native - C2',
    },
    {
      name: 'English',
      level: 'Advanced - C1',
    },
    {
      name: 'Hebrew',
      level: 'Intermediate - B1/B2',
    },
  ],

  contact: {
    phone: '+972 555 07 8880',
    email: 'vsevolodberdutin@gmail.com',
    linkedin: 'https://linkedin.com/in/vsevolodberdutin',
    telegram: 'https://t.me/vsevolodberdutin',
    whatsapp: 'https://wa.me/972555078880',
    github: 'https://github.com/vsevolodberdutin',
  },
};
