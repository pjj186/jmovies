//모든 데이터를 fetch 해주는 함수들이 모여있는 파일
const API_KEY = "0c6f3c84d4564ed4f2afcb7aa3744089";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[]; // results는 Movie타입 배열
}

export const movieAPI = {
  trending: () =>
    fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
    ).then((res) => res.json()),
  upcoming: () =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
    ).then((res) => res.json()),
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
    ).then((res) => res.json()),
};

export const tvApi = {
  trending: () =>
    fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
    ).then((res) => res.json()),
  airingToday: () =>
    fetch(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko-KR&page=1`
    ).then((res) => res.json()),
  topRated: () =>
    fetch(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
    ).then((res) => res.json()),
};
