import React, { useEffect, useRef, useCallback, useContext } from "react";
import { ThemeContext } from "styled-components";
import { Animated, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Box } from "./box";
import { Text } from "./text";

const fadeDuration = 300;

export enum ToastType {
  Info = "INFO",
  Error = "ERROR",
  Success = "SUCCESS",
}

export type ToastConfigType = {
  type: ToastType;
  message: string;
  duration: number;
} | null;

export interface ToastProps {
  toastConfig: ToastConfigType | null;
  hideToast: () => void;
}

export function Toast({ toastConfig, hideToast }: ToastProps) {
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  const theme = useContext(ThemeContext);
  const {
    colors: { green, gray, red, white },
    font: { medium },
    layout: { width },
    shadows,
    statusBarHeight,
  } = theme;

  const fadeIn = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: fadeDuration,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const fadeOut = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: fadeDuration,
      useNativeDriver: true,
    }).start(() => {
      hideToast();
    });
  }, [opacity, hideToast]);

  useEffect(() => {
    if (!toastConfig) {
      return;
    }

    fadeIn();
    const timer = setTimeout(fadeOut, toastConfig.duration);

    return () => clearTimeout(timer);
  }, [toastConfig, fadeIn, fadeOut]);

  if (!toastConfig) {
    return null;
  }

  const { type, message } = toastConfig;

  let backgroundColor;
  let icon;

  switch (type) {
    case ToastType.Info:
      backgroundColor = gray[500];
      icon = "ios-information-circle";
      break;
    case ToastType.Error:
      backgroundColor = red[500];
      icon = "ios-close-circle";
      break;
    case ToastType.Success:
      backgroundColor = green[500];
      icon = "ios-checkmark-circle";
      break;
  }

  return (
    <Animated.View
      style={[styles.container, { top: insets.top + statusBarHeight, opacity }]}
    >
      <Box
        bg={backgroundColor}
        alignSelf="center"
        borderRadius={8}
        padding={16}
        maxWidth={width - 30}
        flexDirection="row"
        alignItems="center"
        boxShadow={shadows[3]}
      >
        <Ionicons name={icon} size={20} color={white} />
        <Text color={white} fontSize={16} fontFamily={medium} marginLeft={3}>
          {message}
        </Text>
      </Box>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    position: "absolute",
    marginHorizontal: 20,
  },
});
