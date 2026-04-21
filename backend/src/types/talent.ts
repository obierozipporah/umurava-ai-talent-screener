// Based on the provided Talent Profile Schema Specification

export interface Skill {
  name: string; // [cite: 21]
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"; // [cite: 21]
  yearsOfExperience: number; // [cite: 21]
}

export interface Language {
  name: string; // [cite: 23]
  proficiency: "Basic" | "Conversational" | "Fluent" | "Native"; // [cite: 23]
}

export interface WorkExperience {
  company: string; // [cite: 27]
  role: string; // [cite: 27]
  startDate: string; // [cite: 27]
  endDate: string; // [cite: 27]
  description: string; // [cite: 27]
  technologies: string[]; // [cite: 27]
  isCurrent: boolean; // [cite: 27]
}

export interface Education {
  institution: string; // [cite: 31]
  degree: string; // [cite: 31]
  fieldOfStudy: string; // [cite: 31]
  startYear: number; // [cite: 31]
  endYear: number; // [cite: 31]
}

export interface Certification {
  name: string; // [cite: 35]
  issuer: string; // [cite: 35]
  issueDate: string; // [cite: 35]
}

export interface Project {
  name: string; // [cite: 39]
  description: string; // [cite: 39]
  technologies: string[]; // [cite: 39]
  role: string; // [cite: 39]
  link?: string; // [cite: 39]
  startDate: string; // [cite: 39]
  endDate: string; // [cite: 39]
}

export interface Availability {
  status: "Available" | "Open to Opportunities" | "Not Available"; // [cite: 43]
  type: "Full-time" | "Part-time" | "Contract"; // [cite: 43]
  startDate?: string; // [cite: 43]
}

export interface SocialLinks {
  linkedin?: string; // [cite: 48]
  github?: string; // [cite: 48]
  portfolio?: string; // [cite: 48]
}

export interface TalentProfile {
  firstName: string; // [cite: 17]
  lastName: string; // [cite: 17]
  email: string; // [cite: 17]
  headline: string; // [cite: 17]
  bio?: string; // [cite: 17]
  location: string; // [cite: 17]
  skills: Skill[]; // [cite: 19]
  languages?: Language[]; // [cite: 19]
  experience: WorkExperience[]; // [cite: 25]
  education: Education[]; // [cite: 29]
  certifications?: Certification[]; // [cite: 33]
  projects: Project[]; // [cite: 37]
  availability: Availability; // [cite: 41]
  socialLinks?: SocialLinks; // [cite: 45]
}