import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const GUARDIAN_API_KEY = process.env.GUARDIAN_API_KEY;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const WORLD_NEWS_API_KEY = process.env.WORLD_NEWS_API_KEY;
export const LENS_API_KEY = process.env.LENS_API_KEY;
export const LENS_API_URL = process.env.LENS_API_URL;

if (!GEMINI_API_KEY || !WORLD_NEWS_API_KEY || !LENS_API_KEY || !LENS_API_URL || !GUARDIAN_API_KEY) {
    console.error("FATAL: API keys are not configured in the .env file.");
    process.exit(1);
}

export const geminiConfig = {
    model: "gemini-2.0-flash-exp"
};