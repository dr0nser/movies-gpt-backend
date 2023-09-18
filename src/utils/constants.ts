import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

export const CONFIG = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
  },
};

export const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});
