import { Request, Response } from "express";
import Applicant from "../models/Applicant";
import Job from "../models/Job";

// Fetch all jobs for the recruiter
export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch jobs." });
  }
};

// Fetch ranked candidates for a specific job
export const getShortlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const { jobId } = req.params;
    
    // Find all applicants for this job and sort by AI score descending
    const applicants = await Applicant.find({ jobId }).sort({ "aiEvaluation.score": -1 });
    
    res.status(200).json({ success: true, data: applicants });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch shortlist." });
  }
};