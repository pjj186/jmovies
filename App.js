import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { Text, Image } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    // 로딩하고 싶은 코드들을 담는곳
    await Font.loadAsync(Ionicons.font);
    await Asset.loadAsync(require("./my_profile.jpeg"));
    await Image.prefetch(
      "https://t1.daumcdn.net/cfile/tistory/24457C4F58663DD011"
    );
  };
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return <Text>We are done loading</Text>;
}
