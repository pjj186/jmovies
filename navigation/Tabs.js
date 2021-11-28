import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { BLACK_COLOR, GREY_COLOR, YELLOW_COLOR } from "../colors";
import { Ionicons } from "@expo/vector-icons";

// 탭 생성
const Tab = createBottomTabNavigator();

const Tabs = () => {
  // useColorScheme : "dark"인지 "light"인지 colorScheme을 알려주는 Hook
  // useColorScheme은 "dark" 또는 "light"라는 문자열을 리턴하는데, 이를 이용하여 isDark 변수에 true / false 값이 저장되게함
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? BLACK_COLOR : "white",
      }}
      screenOptions={{
        unmountOnBlur: true, // 화면을 벗어나면 메모리에서 그 컴포넌트를 삭제해준다.
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? GREY_COLOR : GREY_COLOR,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : BLACK_COLOR,
        },
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 13,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            // focused : 현재 탭이 선택되었는지
            // color : 네비게이터 컬러 (따로 값을 안주면 screenOption에 적용된 컬러 혹은 디폴트 컬러)
            // size : 네비게이터 텍스트 사이즈 (따로 값을 안주면 screenOption에 적용된 컬러 혹은 디폴트 컬러)
            return (
              <Ionicons
                name={focused ? "film" : "film-outline"}
                color={color}
                size={size}
              />
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "tv" : "tv-outline"}
                color={color}
                size={size}
              />
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                color={color}
                size={size}
              />
            );
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default Tabs;
