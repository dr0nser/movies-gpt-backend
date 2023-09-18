import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { GalleryResponse, MovieResponse } from "../utils/types";
import {
  getMoviesFromQuery,
  getNowPlaying,
  getPopular,
  getTopRated,
  getUpcoming,
} from "../utils/functions";
dotenv.config();

const router = express.Router();

router.get("/banner", async (req: Request, res: Response) => {
  try {
    const nowPlaying: MovieResponse[] = await getNowPlaying();
    const result = nowPlaying.filter(
      (movie: MovieResponse) => movie.trailerUrl !== null
    );
    if (result.length === 0)
      return res.status(404).json({ error: "No movies found" });
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Unexpected error occurred" });
  }
});

router.get("/gallery", async (req: Request, res: Response) => {
  try {
    const [nowPlaying, topRated, popular, upcomingMovies] = await Promise.all([
      getNowPlaying(),
      getTopRated(),
      getPopular(),
      getUpcoming(),
    ]);
    const result: GalleryResponse[] = [
      { name: "Trending", data: nowPlaying },
      { name: "Top Rated", data: topRated },
      { name: "Popular", data: popular },
      { name: "Upcoming", data: upcomingMovies },
    ];
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Unexpected error occurred" });
  }
});

router.get("/chat", async (req: Request, res: Response) => {
  try {
    const query = req.query.query?.toString();
    if (!query) return res.status(400).json({ error: "Query not found" });
    const movies = await getMoviesFromQuery(query);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Unexpected error occurred" });
  }
});

export default router;
