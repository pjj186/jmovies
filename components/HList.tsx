import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";

const ListContainer = styled.View`
  margin-bottom: 30px;
`;

const ListTitle = styled.Text<{ isDark: boolean }>`
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

export const HListSeperator = styled.View`
  width: 20px;
`;

interface HListProps {
  title: string;
  data: any[];
  isDark: boolean;
}

const HList: React.FC<HListProps> = ({ title, data, isDark }) => (
  <ListContainer>
    <ListTitle isDark={isDark}>{title}</ListTitle>
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 30 }}
      ItemSeparatorComponent={HListSeperator}
      keyExtractor={(item) => item.id + ""}
      renderItem={({ item }) => (
        <VMedia
          isDark={isDark}
          posterPath={item.poster_path}
          originalTitle={item.title ?? item.name}
          voteAverage={item.vote_average}
        />
      )}
    />
  </ListContainer>
);

export default HList;
