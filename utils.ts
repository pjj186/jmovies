// API로 부터 받은 이미지를 입력하는 함수, 사이즈 기본값: w500
export const makeImagePath = (img: string, width: string = "w500") =>
  `https://image.tmdb.org/t/p/${width}${img}`;
