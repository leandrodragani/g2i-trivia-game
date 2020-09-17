import React from "react";
import { ThemeProvider } from "styled-components/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { StatusBar } from "expo-status-bar";
import { SWRConfig } from "swr";
import { useCachedResources } from "utils/hooks";
import { fetcher } from "utils/axios";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackNavigator } from "navigation";
import theme from "styles/theme";
enableScreens();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <ThemeProvider {...{ theme }}>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStackNavigator />
            <StatusBar style="light" />
          </NavigationContainer>
        </SafeAreaProvider>
      </SWRConfig>
    </ThemeProvider>
  );
}
