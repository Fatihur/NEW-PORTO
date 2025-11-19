import React from 'react';

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  image: string;
  gallery?: string[];
  year: string;
  link: string;
  techStack?: string[];
  client?: string;
  // New Fields
  role?: string;
  challenge?: string; // HTML content
  keyFeatures?: string; // HTML content
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

export interface NavigationItem {
  label: string;
  href: string;
  type?: 'link' | 'action'; // type to distinguish scroll links vs page switches
}