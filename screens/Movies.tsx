import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  useColorScheme,
  FlatList,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { useQuery, useQueryClient } from "react-query";
import { movieAPI, MovieResponse } from "../api";

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
` as unknown as typeof FlatList;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const VSeperator = styled.View`
  width: 20px;
`;

const HSeperator = styled.View`
  height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();

  // useQuery!!
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], movieAPI.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>(["movies", "upcoming"], movieAPI.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>(["movies", "trending"], movieAPI.trending);
  // useQuery!!

  const isDark = useColorScheme() === "dark";

  const onRefresh = async () => {
    queryClient.refetchQueries(["movies"]);
  };

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;
  // isRefetching : 리패칭 상태를 boolean 타입으로 반환함. 리패칭이 끝나면 false, 리패칭 중이면 true

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : upcomingData ? (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
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
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                voteAverage={movie.vote_average}
                originalTitle={movie.title}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle isDark={isDark}>Trending Movies</ListTitle>
            {trendingData ? (
              <TrendingScroll
                data={trendingData.results}
                horizontal
                keyExtractor={(item) => item.id + ""}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 30 }}
                ItemSeparatorComponent={VSeperator}
                renderItem={({ item }) => (
                  <VMedia
                    posterPath={item.poster_path || ""}
                    Vtitle={item.title || ""}
                    voteAverage={item.vote_average}
                    isDark={isDark}
                  />
                )}
              />
            ) : null}
          </ListContainer>
          <ComingSoonTitle isDark={isDark}>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={(item) => item.id + ""}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={HSeperator}
      renderItem={({ item }) => (
        <HMedia
          isDark={isDark}
          posterPath={item.poster_path || ""}
          Htitle={item.title}
          overview={item.overview || ""}
          releaseDate={item.release_date}
        />
      )}
    />
  ) : null;
};

export default Movies;
