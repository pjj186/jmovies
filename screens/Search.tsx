import React, { useState } from "react";
import { useColorScheme } from "react-native";
import { useQuery, useInfiniteQuery } from "react-query";
import styled from "styled-components/native";
import { movieAPI, tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const isDark = useColorScheme() === "dark";
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
    hasNextPage: searchMovieHasNextPage,
    fetchNextPage: searchMovieFetchNextPage,
  } = useInfiniteQuery(["searchMovies", query], movieAPI.search, {
    // 원래는 component가 마운트 되는 순간 이 query가 바로 실행되는데, 이를 동작하지않게 하는 옵션
    // 왜냐면 search 버튼을 누르고 나서 데이터를 받아와야하니깐
    enabled: false,
    getNextPageParam: (currentPage) => {
      if (currentPage.page === undefined) {
        currentPage.page = 1;
      }
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
    hasNextPage: searchTvHasNextPage,
    fetchNextPage: searchTvFetchNextPage,
  } = useInfiniteQuery(["searchTv", query], tvApi.search, {
    enabled: false,
    getNextPageParam: (currentPage) => {
      if (currentPage.page === undefined) {
        currentPage.page = 1;
      }
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const onChangeText = (text: string) => {
    setQuery(text);
  };
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    // search버튼을 누르면 searchMovies(refetch) 메서드를 실행함으로써, 그 때 query가 동작하게 함!
    searchMovies();
    searchTv();
  };
  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or Tv Show"
        placeholderTextColor="grey"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? (
        //@ts-ignore
        <HList
          title="Movies Results"
          data={moviesData.pages.map((page) => page.results).flat()}
          isDark={isDark}
          hasnextpage={searchMovieHasNextPage}
          fetchnextpage={searchMovieFetchNextPage}
        />
      ) : null}
      {tvData ? (
        <HList
          title="Tv Results"
          data={tvData.pages.map((page) => page.results).flat()}
          isDark={isDark}
          hasnextpage={searchTvHasNextPage}
          fetchnextpage={searchTvFetchNextPage}
        />
      ) : null}
    </Container>
  );
};
export default Search;
