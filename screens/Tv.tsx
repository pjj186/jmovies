import React from "react";
import { RefreshControl, ScrollView, useColorScheme } from "react-native";
import { useQuery } from "react-query";
import { tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";
import { useQueryClient } from "react-query";

const Tv = () => {
  const queryClient = useQueryClient();

  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
  } = useQuery(["tv", "today"], tvApi.airingToday);
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
  } = useQuery(["tv", "top"], tvApi.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery(["tv", "trending"], tvApi.trending);

  const isDark = useColorScheme() === "dark";

  const onRefresh = () => {
    queryClient.refetchQueries(["tv"]);
  };

  const loading = todayLoading || topLoading || trendingLoading;

  const refreshing = todayRefetching || topRefetching || trendingRefetching;

  if (loading) {
    return <Loader />;
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      <HList title="Trending TV" data={trendingData.results} isDark={isDark} />
      <HList title="Airing Today" data={todayData.results} isDark={isDark} />
      <HList title="Top Rated TV" data={topData.results} isDark={isDark} />
    </ScrollView>
  );
};

export default Tv;
