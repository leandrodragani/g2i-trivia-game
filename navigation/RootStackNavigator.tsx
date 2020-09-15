import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "screens/home";
import Quiz from "screens/quiz";

export type RootStackParamList = {
  Home: undefined;
  Quiz: undefined;
};

const Stack = createStackNavigator();

export function RootStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Quiz" component={Quiz} />
    </Stack.Navigator>
  );
}
