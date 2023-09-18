## Introduction

This is the REST API for [MoviesGPT](https://github.com/whyucode/movies-gpt) application. The purpose of this API is to organize the data coming from **TMDB API** and **OPEN AI** and send only the required data to the frontend.

## Routes

### 1. `/api/banner`

It takes a user id as query parameter and validates it. Upon success, it responds with an object having movie data for the banner video in [MoviesGPT](https://github.com/whyucode/movies-gpt) .

#### Request

##### Query Parameters

- `userId: string`

#### Response Payload Format

```json
{
    id: number;
    title: string;
    overview: string;
    poster_path ? : string; // required for cards display in gallery
    genres: string[];
    duration: string;
    release_date: string;
    rating: number;
    total_ratings: number;
    trailerUrl: string;
    logoUrl ? : string; // required for banner
    backdropUrl ? : string; // required for movie details if trailer unavailable
}
```

### 2. `/api/gallery`

It takes a user id as query parameter and validates it. Upon success, it responds with an array of objects where each object has name for the section and corresponding list of movie details. It is used to get data for various sections like Trending, Popular, etc. in [MoviesGPT](https://github.com/whyucode/movies-gpt) .

#### Request

##### Query Parameters

- `userId: string`

#### Response Payload Format

```json
[
    name: string;
    data: [
        {
            id: number;
            title: string;
            overview: string;
            poster_path ? : string; // required for cards display in gallery
            genres: string[];
            duration: string;
            release_date: string;
            rating: number;
            total_ratings: number;
            trailerUrl: string;
            logoUrl ? : string; // required for banner
            backdropUrl ? : string; // required for movie details if trailer unavailable
        }
    ]
]

```

### 3. `/api/chat`

It takes a user id and query as query parameters and validates the user id. Upon success, it uses the **Open AI GPT 3.5 Turbo model** to get movie names based on the query. Then the movie details are requested from the **TMDB API** and an array of movies is returned. This is for the AI suggested movies search in [MoviesGPT](https://github.com/whyucode/movies-gpt) .

#### Request

##### Query Parameters

- `userId: string`
- `query: string`

#### Response Payload Format

```json
[
    {
        id: number;
        title: string;
        overview: string;
        poster_path ? : string; // required for cards display in gallery
        genres: string[];
        duration: string;
        release_date: string;
        rating: number;
        total_ratings: number;
        trailerUrl: string;
        logoUrl ? : string; // required for banner
        backdropUrl ? : string; // required for movie details if trailer unavailable
    }
]
```
