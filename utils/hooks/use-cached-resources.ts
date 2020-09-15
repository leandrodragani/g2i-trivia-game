import React from "react";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

export function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [fontsLoaded] = useFonts({
    "inter-bold": require("assets/fonts/Inter-Bold.ttf"),
    "inter-semibold": require("assets/fonts/Inter-SemiBold.ttf"),
    "inter-medium": require("assets/fonts/Inter-Medium.ttf"),
    "inter-regular": require("assets/fonts/Inter-Regular.ttf"),
    ...Ionicons.font,
  });

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete && fontsLoaded;
}
