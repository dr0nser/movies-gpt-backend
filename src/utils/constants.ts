import dotenv from "dotenv";
dotenv.config();

export const AXIOS_REQ_CONFIG = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
  },
};
