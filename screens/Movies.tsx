import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, useColorScheme } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

const API_KEY = "0c6f3c84d4564ed4f2afcb7aa3744089";

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text<{ isDark: boolean }>`
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text<{ isDark: boolean }>`
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;

const Votes = styled.Text<{ isDark: boolean }>`
  font-size: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
  margin-bottom: 30px;
`;

const Hcolumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? "rgba(255,255,255,0.5)" : props.theme.textColor};
  width: 80%;
`;

const Release = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? "rgba(255,255,255,0.5)" : props.theme.textColor};
  font-weight: 600;
  font-size: 12px;
  margin-vertical: 10px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const isDark = useColorScheme() === "dark";

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
      )
    ).json();
    setTrending(results);
  };
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
      )
    ).json();
    setUpcoming(results);
  };
  const getNowPlaying = async () => {
    // URL fetch function
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
  };

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{
          marginBottom: 30,
          width: "100%",
          height: SCREEN_HEIGHT / 4,
        }}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            voteAverage={movie.vote_average}
            originalTitle={movie.title}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListContainer>
        <ListTitle isDark={isDark}>Trending Movies</ListTitle>
        <TrendingScroll
          contentContainerStyle={{ paddingLeft: 30 }} // 스크롤뷰는 스타일을 줄 때 style prop 보다는 contentContainerStyle prop을 이용하여 주는게 좋다.
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {trending.map((movie) => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title isDark={isDark}>
                {movie.title.slice(0, 13)}
                {movie.title.length > 13 ? "..." : null}
              </Title>
              <Votes isDark={isDark}>
                {movie.vote_average > 0
                  ? `⭐️ ${movie.vote_average}/10`
                  : `Coming soon`}
              </Votes>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ComingSoonTitle isDark={isDark}>Coming soon</ComingSoonTitle>
      {upcoming.map((movie) => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <Hcolumn>
            <Title isDark={isDark}>{movie.title}</Title>
            <Release isDark={isDark}>
              개봉일:{" "}
              {new Date(movie.release_date).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Release>
            <Overview isDark={isDark}>
              {movie.overview !== "" && movie.overview.length > 140
                ? movie.overview.slice(0, 140) + "..."
                : movie.overview}
            </Overview>
          </Hcolumn>
        </HMovie>
      ))}
    </Container>
  );
};

export default Movies;
