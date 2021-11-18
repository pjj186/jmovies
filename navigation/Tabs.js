import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: "tomato",
      },
      tabBarActiveTintColor: "red",
      tabBarInactiveTintColor: "purple",
    }}
  >
    <Tab.Screen
      name="Movies"
      component={Movies}
      options={{
        headerTitleStyle: {
          color: "tomato",
        },
        headerRight: () => (
          <View>
            <Text>Hello</Text>
          </View>
        ),
      }}
    ></Tab.Screen>
    <Tab.Screen name="Tv" component={Tv}></Tab.Screen>
    <Tab.Screen name="Search" component={Search}></Tab.Screen>
  </Tab.Navigator>
);

export default Tabs;
