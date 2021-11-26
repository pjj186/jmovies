// Vertical Media
import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const Movie = styled.View`
  align-items: center;
`;

const Title = styled.Text<{ isDark: boolean }>`
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;

interface VMediaProps {
  posterPath: string;
  Vtitle: string;
  voteAverage: number;
  isDark: boolean;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  Vtitle,
  voteAverage,
  isDark,
}) => {
  return (
    <Movie>
      <Poster path={posterPath} />
      <Title isDark={isDark}>
        {Vtitle.slice(0, 7)}
        {Vtitle.length > 7 ? "..." : null}
      </Title>
      <Votes isDark={isDark} voteAverage={voteAverage} />
    </Movie>
  );
};

export default VMedia;
