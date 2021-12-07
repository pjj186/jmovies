import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Movie, movieAPI, TV, tvApi } from "../api";
import Poster from "../components/Poster";
import {
  Dimensions,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Share,
  Platform,
} from "react-native";
import { makeImagePath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { BLACK_COLOR } from "../colors";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

const Title = styled.Text`
  color: white;
  font-size: 30px;
  align-self: flex-end;
  margin-left: 10px;
  font-weight: 500;
`;

const Data = styled.View`
  padding: 0px 20px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0px;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
const BtnText = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

type RootStackParamList = {
  // 스크린 이름 : 받는 params
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const isDark = useColorScheme() === "dark";
  const isMovie = "original_title" in params;
  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? movieAPI.detail : tvApi.detail // movieAPI.detail에 ["movies", params.id] 쿼리 키를 보냄
  );

  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android"; // 플랫폼 체크
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}/`
      : data.homepage;
    if (isAndroid) {
      // 안드로이드일 경우
      await Share.share({
        message: `${params.overview}\nCheck it out : ${homepage}`,
        title: "title" in params ? params.title : params.name,
      });
    } else {
      await Share.share({
        // ios일 경우
        url: homepage,
        title: "title" in params ? params.title : params.name,
      });
    }
  };

  const openYTLink = async (videoID: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoID}`;
    // await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };

  useEffect(() => {
    setOptions({
      title: "title" in params ? "Movie" : "TV Show",
    });
  }, []);
  useEffect(() => {
    // 헤더는 re-render 하지 않기때문에, data 값이 존재하거나, data 값이 더 로딩됬을 때, 버튼을 헤더에 삽입하는것
    if (data) {
      setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={shareMedia}>
            <Ionicons name="share-outline" color="white" size={24} />
          </TouchableOpacity>
        ),
      });
    }
  }, [data]);

  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImagePath(params.backdrop_path || "") }}
        />
        <LinearGradient
          colors={["transparent", BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>{"title" in params ? params.title : params.name}</Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos.results?.map((video) => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons name="logo-youtube" color="red" size={24} />
            <BtnText isDark={isDark}>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
