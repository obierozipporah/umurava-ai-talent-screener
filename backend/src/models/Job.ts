import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  department: string;
  description: string;
  requirements: string[];
}

const JobSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    department: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<IJob>("Job", JobSchema);