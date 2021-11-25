import React from "react";
import styled from "styled-components/native";
import { View, StyleSheet, useColorScheme } from "react-native";
import { makeImagePath } from "../utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";

const BgImg = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  margin-left: 20px;
  width: 60%;
`;

const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;

// 스타일 상속받기
const Votes = styled(Overview)`
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  voteAverage: number;
  originalTitle: string;
  overview: string;
}

// 타입스크립트를 곁들여 리액트 컴포넌트를 생성할 때의 형태
// <> 사이에 매개변수들의 타입을 정해준 인터페이스를 넣음으로써 타입을 체킹
const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  voteAverage,
  originalTitle,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";

  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImagePath(backdropPath) }}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={85}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            <Votes isDark={isDark}>
              {voteAverage > 0 ? `⭐️ ${voteAverage}/10` : `Coming soon`}
            </Votes>
            <Overview isDark={isDark}>{overview.slice(0, 90)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
