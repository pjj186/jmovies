import React, { useState } from "react";
import { RefreshControl, ScrollView, useColorScheme } from "react-native";
import { tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";
import { useQueryClient, useInfiniteQuery } from "react-query";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const {
    isLoading: todayLoading,
    data: todayData,
    hasNextPage: todayHasNextpage,
    fetchNextPage: todayFetchNextPage,
  } = useInfiniteQuery(["tv", "today"], tvApi.airingToday, {
    getNextPageParam: (currentPage) => {
      if (currentPage.page === undefined) {
        currentPage.page = 1;
      }
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });
  const {
    isLoading: topLoading,
    data: topData,
    hasNextPage: topHasNextPage,
    fetchNextPage: topFetchNextPage,
  } = useInfiniteQuery(["tv", "top"], tvApi.topRated, {
    getNextPageParam: (currentPage) => {
      if (currentPage.page === undefined) {
        currentPage.page = 1;
      }
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });
  const {
    isLoading: trendingLoading,
    data: trendingData,
    hasNextPage: trendingHasNextPage,
    fetchNextPage: trendingFetchNextPage,
  } = useInfiniteQuery(["tv", "trending"], tvApi.trending, {
    getNextPageParam: (currentPage) => {
      if (currentPage.page === undefined) {
        currentPage.page = 1;
      }
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const isDark = useColorScheme() === "dark";

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  const loading = todayLoading || topLoading || trendingLoading;

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
      <HList
        title="Trending TV"
        data={trendingData?.pages.map((page) => page.results).flat()}
        isDark={isDark}
        hasnextpage={trendingHasNextPage}
        fetchnextpage={trendingFetchNextPage}
      />
      <HList
        title="Airing Today"
        data={todayData?.pages.map((page) => page.results).flat()}
        isDark={isDark}
        hasnextpage={todayHasNextpage}
        fetchnextpage={todayFetchNextPage}
      />
      <HList
        title="Top Rated TV"
        data={topData?.pages.map((page) => page.results).flat()}
        isDark={isDark}
        hasnextpage={topHasNextPage}
        fetchnextpage={topFetchNextPage}
      />
    </ScrollView>
  );
};

export default Tv;
