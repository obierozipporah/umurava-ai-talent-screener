import { Router } from "express";
import { screenCandidate } from "../controllers/screening.controllers";

const router = Router();

// POST /api/screen
router.post("/screen", screenCandidate);

export default router;