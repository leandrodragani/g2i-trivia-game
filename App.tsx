import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { SWRConfig } from "swr";
import { RootStackNavigator } from "navigation";
import { GameSettingsProvider, ToastProvider, ErrorBoundary } from "context";
import { useCachedResources } from "utils/hooks";
import { fetcher } from "utils/axios";
import theme from "styles/theme";

enableScreens();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <ThemeProvider {...{ theme }}>
      <ErrorBoundary>
        <SWRConfig
          value={{
            fetcher,
          }}
        >
          <SafeAreaProvider>
            <NavigationContainer>
              <ToastProvider>
                <GameSettingsProvider>
                  <RootStackNavigator />
                  <StatusBar style="light" />
                </GameSettingsProvider>
              </ToastProvider>
            </NavigationContainer>
          </SafeAreaProvider>
        </SWRConfig>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
