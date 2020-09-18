import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

interface AlertConfig {
  title: string;
  message: string;
}

export function useBeforeLeave(
  dependsOn: boolean,
  { title, message }: AlertConfig,
  callback?: () => void
) {
  const navigation = useNavigation();
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (!dependsOn) {
          return;
        }

        e.preventDefault();

        Alert.alert(title, message, [
          { text: "Cancel", style: "cancel", onPress: () => {} },
          {
            text: "Leave",
            style: "destructive",
            onPress: () => {
              if (callback) {
                callback();
              }
              navigation.dispatch(e.data.action);
            },
          },
        ]);
      }),

    [navigation, dependsOn]
  );
}
