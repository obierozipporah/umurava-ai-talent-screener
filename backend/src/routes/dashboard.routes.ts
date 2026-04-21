import { Router } from "express";
import { getJobs, getShortlist } from "../controllers/dashboard.controller";

const router = Router();

// GET /api/jobs
router.get("/jobs", getJobs);

// GET /api/jobs/:jobId/shortlist
router.get("/jobs/:jobId/shortlist", getShortlist);

export default router;