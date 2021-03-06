import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "screens/home";
import Quiz from "screens/quiz";
import Results from "screens/results";
interface Answers {
  [key: number]: string;
}

export type RootStackParamList = {
  Home: undefined;
  Quiz: undefined;
  Results: {
    answers: Answers;
  };
};

const Stack = createStackNavigator();

export function RootStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="Results" component={Results} />
    </Stack.Navigator>
  );
}
