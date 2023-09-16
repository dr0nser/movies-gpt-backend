import axios from "axios";
import { AXIOS_REQ_CONFIG } from "./constants";
import { Logo, Video } from "./types";

export const getBannerVideo = async () => {
  const nowPlayingList = await axios.get(
    "https://api.themoviedb.org/3/movie/now_playing",
    AXIOS_REQ_CONFIG
  );
  const nowPlayingMovie = await nowPlayingList.data.results[
    getRandomIndexBetween(0, 19)
  ];
  return nowPlayingMovie;
};

export const getMovieDetailsById = async (id: number) => {
  const details = await axios.get(
    `
    https://api.themoviedb.org/3/movie/${id}`,
    AXIOS_REQ_CONFIG
  );
  return details.data;
};

export const getMovieTrailerById = async (id: number) => {
  const videos = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/videos`,
    AXIOS_REQ_CONFIG
  );
  const trailer = videos.data.results.filter(
    (video: Video) => video.site === "YouTube" && video.type === "Trailer"
  );
  if (trailer.length > 0) return trailer[0];
  return videos.data.results.filter(
    (video: Video) => video.site === "YouTube" && video.type === "Teaser"
  )[0];
};

export const getMovieLogoById = async (id: number) => {
  const images = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/images`,
    AXIOS_REQ_CONFIG
  );
  const image = images.data.logos.filter(
    (logo: Logo) => logo.iso_639_1 === "en"
  )[0];
  return image;
};

const getRandomIndexBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

function getDaySuffix(day: number) {
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
}

export const formatMovieDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let result = "";

  if (hours > 0) {
    result += `${hours}hr`;
    if (hours > 1) {
      result += "s"; // Plural form
    }
    result += " ";
  }

  if (remainingMinutes > 0) {
    result += `${remainingMinutes}min`;
    if (remainingMinutes > 1) {
      result += "s"; // Plural form
    }
  }

  return result.trim();
};
