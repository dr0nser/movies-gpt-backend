import axios from "axios";
import {
  Genre,
  Logo,
  Movie,
  MovieDetails,
  MovieResponse,
  Video,
} from "./types";
import { CONFIG } from "./constants";

const getMovieTrailerUrlById = async (
  movieId: number
): Promise<string | null> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/videos`,
    CONFIG
  );
  if (response.data.results.length === 0) return null;
  const trailers: Video[] = await response.data.results.filter(
    (video: Video) =>
      video.site === "YouTube" &&
      (video.type === "Trailer" || video.type === "Teaser")
  );
  if (!trailers) return null;
  return `https://www.youtube.com/watch?v=${trailers[0].key}`;
};

const getMovieLogoByIdAndLanguage = async (
  movieId: number,
  lang: string
): Promise<string | null> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/images`,
    CONFIG
  );
  if (response.data.logos.length === 0) return null;
  const logo: Logo = await response.data.logos.filter(
    (logo: Logo) => logo.iso_639_1 === lang
  );
  if (!logo) return null;
  return `https://image.tmdb.org/t/p/w500${logo.file_path}`;
};

const formatGenres = (genres: Genre[]): string[] => {
  const result: string[] = [];
  genres.forEach((genre: Genre) => {
    result.push(genre.name);
  });
  return result;
};

const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  let result = "";
  if (hours > 0) {
    result += `${hours}hr`;
    if (hours > 1) {
      result += "s"; // for plural
    }
    result += " ";
  }
  if (remainingMinutes > 0) {
    result += `${remainingMinutes}min`;
    if (remainingMinutes > 1) {
      result += "s"; // for plural
    }
  }
  return result.trim();
};

export const formatDate = (inputDate: string): string => {
  const date = new Date(inputDate);
  const day = date.getDate();
  const year = date.getFullYear();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const daySuffix = getDaySuffix(day);
  return `${day}${daySuffix} ${month}, ${year}`;
};

const getDaySuffix = (day: number): string => {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const getMovieDetailsById = async (movieId: number): Promise<MovieResponse> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    CONFIG
  );
  const details: MovieDetails = response.data;
  const {
    id,
    genres,
    overview,
    poster_path,
    backdrop_path,
    runtime,
    title,
    release_date,
    vote_average,
    vote_count,
    original_language, // needed to fetch the actual logo
  } = details;
  const trailerUrl: string | null = await getMovieTrailerUrlById(movieId);
  const logoUrl: string | null = await getMovieLogoByIdAndLanguage(
    movieId,
    original_language
  );

  const result: MovieResponse = {
    id,
    title,
    overview,
    poster_path: `https://image.tmdb.org/t/p/w500${poster_path}`,
    backdropUrl: `https://image.tmdb.org/t/p/w500${backdrop_path}`,
    genres: formatGenres(genres),
    duration: formatDuration(runtime),
    release_date: formatDate(release_date),
    rating: vote_average,
    total_ratings: vote_count,
    trailerUrl,
    logoUrl,
  };

  return result;
};

const getNowPlaying = async (): Promise<MovieResponse[]> => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=IN",
      CONFIG
    );
    const movies: Movie[] = await response.data.results;
    const upcomingMovies: MovieResponse[] = await Promise.all(
      movies.map((movie: Movie) => getMovieDetailsById(movie.id))
    );
    return upcomingMovies;
  } catch (error) {
    console.error(error);
  }
};

const getPopular = async (): Promise<MovieResponse[]> => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&region=IN",
      CONFIG
    );
    const movies: Movie[] = await response.data.results;
    const upcomingMovies: MovieResponse[] = await Promise.all(
      movies.map((movie: Movie) => getMovieDetailsById(movie.id))
    );
    return upcomingMovies;
  } catch (error) {
    console.error(error);
  }
};

const getTopRated = async (): Promise<MovieResponse[]> => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&region=IN",
      CONFIG
    );
    const movies: Movie[] = await response.data.results;
    const upcomingMovies: MovieResponse[] = await Promise.all(
      movies.map((movie: Movie) => getMovieDetailsById(movie.id))
    );
    return upcomingMovies;
  } catch (error) {
    console.error(error);
  }
};

const getUpcoming = async (): Promise<MovieResponse[]> => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=IN",
      CONFIG
    );
    const movies: Movie[] = await response.data.results;
    const upcomingMovies: MovieResponse[] = await Promise.all(
      movies.map((movie: Movie) => getMovieDetailsById(movie.id))
    );
    return upcomingMovies;
  } catch (error) {
    console.error(error);
  }
};

export { getNowPlaying, getPopular, getTopRated, getUpcoming };
