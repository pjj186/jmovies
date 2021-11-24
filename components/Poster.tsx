import React from "react";
import styled from "styled-components/native";
import { makeImagePath } from "../utils";

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

interface PosterProps {
  path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => (
  <Image source={{ uri: makeImagePath(path) }} />
);

export default Poster;
