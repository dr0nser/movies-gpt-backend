export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Logo {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface MovieResponse {
  id: number;
  title: string;
  overview: string;
  poster_path?: string;
  genres: string[];
  duration: string;
  release_date: string;
  rating: number;
  total_ratings: number;
  trailer: string;
  movieLogo?: string;
}

export interface Genre {
  id: number;
  name: string;
}
