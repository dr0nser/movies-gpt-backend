import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { GalleryResponse, MovieResponse } from "../utils/types";
import {
  getBannerVideo,
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
    const bannerVideo = await getBannerVideo();
    if (!bannerVideo) return res.status(404).json({ error: "No movies found" });
    res.status(200).json(bannerVideo);
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

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = req.query.query?.toString();
    if (!query) return res.status(400).json({ error: "Query not found" });
    const movies: MovieResponse[] = await getMoviesFromQuery(query);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Unexpected error occurred" });
  }
});

export default router;
