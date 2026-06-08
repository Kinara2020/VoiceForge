// Defines VoiceForge voice cloning and speech generation API routes.
import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { cloneVoice, speak, streamSpeech, getStatus } from "../controllers/voiceController.js";
import upload from "../middleware/upload.js";

const router = Router();

// Stricter limiter for resource-intensive /speak endpoint
const speakLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 20,
	standardHeaders: true,
	legacyHeaders: false,
	handler: (_req, res) =>
		res.status(429).json({ error: "Too Many Requests" })
});

router.get("/status", getStatus);
router.post("/clone", upload.single("audio"), cloneVoice);
router.post("/speak", speakLimiter, speak);
router.get("/speak/stream/:speechId", streamSpeech);

export default router;
