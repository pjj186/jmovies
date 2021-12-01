// Horizontal Media
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const Hcolumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Release = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? "rgba(255,255,255,0.5)" : props.theme.textColor};
  font-weight: 600;
  font-size: 12px;
  margin-vertical: 10px;
`;

const Overview = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? "rgba(255,255,255,0.5)" : props.theme.textColor};
  width: 80%;
`;

const Title = styled.Text<{ isDark: boolean }>`
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;

interface HMediaProps {
  isDark: boolean;
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
}

const HMedia: React.FC<HMediaProps> = ({
  isDark,
  posterPath,
  originalTitle,
  overview,
  releaseDate,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        originalTitle,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <HMovie>
        <Poster path={posterPath} />
        <Hcolumn>
          <Title isDark={isDark}>{originalTitle}</Title>
          {releaseDate ? (
            <Release isDark={isDark}>
              개봉일:
              {new Date(releaseDate).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Release>
          ) : null}
          <Overview isDark={isDark}>
            {overview !== "" && overview.length > 140
              ? overview.slice(0, 140) + "..."
              : overview}
          </Overview>
        </Hcolumn>
      </HMovie>
    </TouchableOpacity>
  );
};

export default HMedia;
