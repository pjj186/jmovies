// Horizontal Media
import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
  margin-bottom: 30px;
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
  Htitle: string;
  overview: string;
  releaseDate: string;
}

const HMedia: React.FC<HMediaProps> = ({
  isDark,
  posterPath,
  Htitle,
  overview,
  releaseDate,
}) => {
  return (
    <HMovie>
      <Poster path={posterPath} />
      <Hcolumn>
        <Title isDark={isDark}>{Htitle}</Title>
        <Release isDark={isDark}>
          개봉일:{" "}
          {new Date(releaseDate).toLocaleDateString("ko", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Release>
        <Overview isDark={isDark}>
          {overview !== "" && overview.length > 140
            ? overview.slice(0, 140) + "..."
            : overview}
        </Overview>
      </Hcolumn>
    </HMovie>
  );
};

export default HMedia;
