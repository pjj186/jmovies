//모든 데이터를 fetch 해주는 함수들이 모여있는 파일
const API_KEY = "0c6f3c84d4564ed4f2afcb7aa3744089";
const BASE_URL = "https://api.themoviedb.org/3";

export const trending = () =>
  fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
  ).then((res) => res.json());

export const upcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
  ).then((res) => res.json());

export const nowPlaying = () =>
  fetch(
    `${BASE_URL}/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
  ).then((res) => res.json());
