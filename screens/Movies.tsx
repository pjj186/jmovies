import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => (
  <Btn
    // 서로 다른 Navigator 사이를 이동할때는 navigate("스크린이름") 방식으로 하면 작동하지 않는다.
    // navigate("navigator이름"(Root.js에 명시되있음), {screen: "스크린 이름"}) 이런식으로 해야한다.
    onPress={() => navigate("Stack", { screen: "Three" })}
  >
    <Title>Movie</Title>
  </Btn>
);

export default Movies;
