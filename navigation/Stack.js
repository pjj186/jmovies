import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity } from "react-native";
import { YELLOW_COLOR } from "../colors";
import Detail from "../screens/Detail";
// 스택 생성
const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      animation: "flip",
      headerTintColor: YELLOW_COLOR,
      headerBackTitleVisible: false,
    }}
  >
    <NativeStack.Screen name="Detail" component={Detail} />
  </NativeStack.Navigator>
);

export default Stack;
