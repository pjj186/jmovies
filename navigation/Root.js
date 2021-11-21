import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stack";

const Nav = createNativeStackNavigator();

// 두개의 Navigator를 렌더링 하는 하나의 Navigator

const Root = () => (
  <Nav.Navigator
    screenOptions={{
      presentation: "modal",
      headerShown: false,
    }}
  >
    <Nav.Screen name="Tabs" component={Tabs}></Nav.Screen>
    <Nav.Screen name="Stack" component={Stack}></Nav.Screen>
  </Nav.Navigator>
);

export default Root;
