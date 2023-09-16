import express, { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import dotenv from "dotenv";
import { Genre, MovieResponse } from "../utils/types";
import {
  formatDate,
  formatMovieDuration,
  getBannerVideo,
  getMovieDetailsById,
  getMovieLogoById,
  getMovieTrailerById,
} from "../utils/functions";
dotenv.config();

const router = express.Router();

router.get("/banner", async (req: Request, res: Response) => {
  const userId: string = req.query.userId.toString();
  try {
    const user = await getAuth().getUser(userId);
    if (user) {
      const { id, overview, title, vote_average, vote_count, release_date } =
        await getBannerVideo();
      const { genres, runtime } = await getMovieDetailsById(id);
      const genresAsStringArray: string[] = [];
      genres.forEach((genre: Genre) => {
        genresAsStringArray.push(genre.name);
      });
      const { key } = await getMovieTrailerById(id);
      const { file_path } = await getMovieLogoById(id);

      const bannerResponse: MovieResponse = {
        id,
        title,
        overview,
        genres: genresAsStringArray,
        duration: formatMovieDuration(runtime),
        release_date: formatDate(release_date),
        rating: vote_average,
        total_ratings: vote_count,
        trailer: "https://www.youtube.com/watch?v=" + key,
        movieLogo: `https://image.tmdb.org/t/p/w500${file_path}`,
      };
      res.status(200).json(bannerResponse);
    }
  } catch (error) {
    res.json(error);
  }
});

export default router;
