import React from "react";
import { TouchableOpacity, Text } from "react-native";

const Movies = ({ navigation: { navigate } }) => (
  <TouchableOpacity
    // 서로 다른 Navigator 사이를 이동할때는 navigate("스크린이름") 방식으로 하면 작동하지 않는다.
    // navigate("navigator name", {screen: "스크린 이름"}) 이런식으로 해야한다.
    onPress={() => navigate("Stack", { screen: "Three" })}
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  >
    <Text>Movie</Text>
  </TouchableOpacity>
);

export default Movies;
