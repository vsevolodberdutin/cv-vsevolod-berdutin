/**
 * CV Entity Types
 * Defines the data structure for the CV/Resume information
 */

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
  location?: string;
  description: string[];
  technologies: string[];
  achievements?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  period: string;
  location?: string;
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
  whatsapp?: string;
  github?: string;
  website?: string;
}
