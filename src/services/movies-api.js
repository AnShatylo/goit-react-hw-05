import axios from 'axios';

const trendingUrl =
  'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDY0Y2Y1NjU2MGE4ZTE5NWQwZTcwNGI3MDYzODhhOCIsIm5iZiI6MTcyNTM5Mzc1MC4zMDAwNjYsInN1YiI6IjY2ZDU4YzRmYTc5ZGRjNWZhYzQ1YWYwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ItGpS84ccmsMI7vhH2owqeCjAbnmablWOpx8H6Vzf_w',
  },
};

export const getMovies = async () => {
  const response = await axios.get(trendingUrl, options);
  return response.data.results;
};

export const searchMovies = async movieName => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data.results;
};

export const getMovieDetails = async movieId => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );
  return response.data;
};

export const getMovieCast = async movieId => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    options
  );
  return response.data;
};

export const getMovieReviews = async movieId => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  return response.data;
};
