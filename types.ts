export interface ServiceInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
  capabilities: string[];
  process: string[];
  techStack: string[];
  cta: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  challenge: string;
  solution: string;
  results: string[];
  tech: string[];
  quote: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experienceLevel: 'Fresher' | 'Experienced' | 'Internship';
  description: string[];
}

export enum Page {
  Home = '/',
  Services = '/services',
  Training = '/training',
  CaseStudies = '/case-studies',
  About = '/about',
  Careers = '/careers',
  Contact = '/contact'
}

export type UserRole = 'ADMIN' | 'EMPLOYEE' | 'STUDENT';

export interface UserSession {
  id: string;
  userName: string;
  role: UserRole;
  lastLogin: string;
  token?: string;
}

export interface PortalTask {
  id: string;
  title: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  dueDate: string;
}