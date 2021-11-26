// Votes Component
import React, { Children } from "react";
import styled from "styled-components/native";

const Ratings = styled.Text<{ isDark: boolean }>`
  font-size: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;

interface VotesProps {
  isDark: boolean;
  voteAverage: number;
}

const Votes: React.FC<VotesProps> = ({ isDark, voteAverage }) => {
  return (
    <Ratings isDark={isDark}>
      {voteAverage > 0 ? `⭐️ ${voteAverage}/10` : `Coming soon`}
    </Ratings>
  );
};

export default Votes;
