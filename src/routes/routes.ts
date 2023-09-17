import express, { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import dotenv from "dotenv";
import { GalleryResponse, MovieResponse } from "../utils/types";
import {
  getNowPlaying,
  getPopular,
  getTopRated,
  getUpcoming,
} from "../utils/functions";
dotenv.config();

const router = express.Router();

router.get("/gallery", async (req: Request, res: Response) => {
  const userId: string = req.query.userId.toString();
  try {
    const user = await getAuth().getUser(userId);
    if (user) {
      const nowPlaying: MovieResponse[] = await getNowPlaying();
      const topRated: MovieResponse[] = await getTopRated();
      const popular: MovieResponse[] = await getPopular();
      const upcomingMovies: MovieResponse[] = await getUpcoming();

      const result: GalleryResponse[] = [
        { name: "Trending", data: nowPlaying },
        { name: "Top Rated", data: topRated },
        { name: "Popular", data: popular },
        { name: "Upcoming", data: upcomingMovies },
      ];
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

export default router;
