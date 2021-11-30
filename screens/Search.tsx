import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { movieAPI, tvApi } from "../api";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], movieAPI.search, {
    // 원래는 component가 마운트 되는 순간 이 query가 바로 실행되는데, 이를 동작하지않게 하는 옵션
    // 왜냐면 search 버튼을 누르고 나서 데이터를 받아와야하니깐
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, {
    enabled: false,
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
    </Container>
  );
};
export default Search;
