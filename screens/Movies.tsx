import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  View,
  Text,
  RefreshControl,
  useColorScheme,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";

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

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = async () => {
    setRefreshing(true); // 아래 refreshControl 에서 refreshing prop이 true 이면 스크롤뷰를 잡아당겼을때 위에 계속 스피닝이 돌고있다.
    await getData();
    setRefreshing(false); // 로딩이 끝나면 false를 해줌으로써 스피닝이 안돔
  };

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
          data={trending}
          horizontal
          keyExtractor={(item) => item.id + ""}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 30 }}
          ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          renderItem={({ item }) => (
            <VMedia
              posterPath={item.poster_path}
              Vtitle={item.title}
              voteAverage={item.vote_average}
              isDark={isDark}
            />
          )}
        />
      </ListContainer>
      <ComingSoonTitle isDark={isDark}>Coming soon</ComingSoonTitle>
      {upcoming.map((movie) => (
        <HMedia
          key={movie.id}
          isDark={isDark}
          posterPath={movie.poster_path}
          Htitle={movie.title}
          overview={movie.overview}
          releaseDate={movie.release_date}
        />
      ))}
    </Container>
  );
};

export default Movies;
