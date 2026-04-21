import mongoose, { Schema, Document } from "mongoose";

export interface IApplicant extends Document {
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  headline: string;
  bio?: string;
  location: string;
  skills: any[];
  languages?: any[];
  experience: any[];
  education: any[];
  certifications?: any[];
  projects: any[];
  availability: any;
  socialLinks?: any;
  aiEvaluation?: {
    score: number;
    strengths: string[];
    gaps: string[];
    recommendation: string;
  };
}

const ApplicantSchema: Schema = new Schema(
  {
    jobId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    headline: { type: String, required: true },
    bio: { type: String },
    location: { type: String, required: true },
    skills: { type: Array, required: true },
    languages: { type: Array, default: [] },
    experience: { type: Array, required: true },
    education: { type: Array, required: true },
    certifications: { type: Array, default: [] },
    projects: { type: Array, required: true },
    availability: { type: Object, required: true },
    socialLinks: { type: Object },
    aiEvaluation: {
      score: { type: Number },
      strengths: { type: [String] },
      gaps: { type: [String] },
      recommendation: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IApplicant>("Applicant", ApplicantSchema);