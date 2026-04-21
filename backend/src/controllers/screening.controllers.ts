import { Request, Response } from "express";
import { evaluateCandidate } from "../services/ai.service";
import { TalentProfile } from "../types/talent";
import Applicant from "../models/Applicant";

export const screenCandidate = async (req: Request, res: Response): Promise<void> => {
  try {
    // For now, we will use a dummy jobId until we build the Job creation feature
    const jobId = req.body.jobId || "dummy-job-123"; 
    const { jobDescription, candidate } = req.body as { 
      jobDescription: string; 
      candidate: TalentProfile 
    };

    if (!jobDescription || !candidate) {
      res.status(400).json({ error: "Missing jobDescription or candidate profile." });
      return;
    }

    // 1. Evaluate with AI
    const evaluation = await evaluateCandidate(jobDescription, candidate);

    // 2. Save to Database
    const newApplicant = new Applicant({
      jobId,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
      headline: candidate.headline,
      location: candidate.location,
      skills: candidate.skills,
      experience: candidate.experience,
      education: candidate.education,
      aiEvaluation: evaluation // Save the AI results directly
    });

    await newApplicant.save();

    // 3. Return success
    res.status(200).json({
      success: true,
      message: "Candidate evaluated and saved successfully.",
      data: newApplicant,
    });
  } catch (error) {
    console.error("Screening Controller Error:", error);
    res.status(500).json({ success: false, error: "Failed to process candidate." });
  }
};