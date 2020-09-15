import { Dimensions, Platform } from "react-native";
import Constants from "expo-constants";

const { width, height } = Dimensions.get("window");

const gray = {
  100: "#F7FAFC",
  200: "#EDF2F7",
  300: "#E2E8F0",
  400: "#CBD5E0",
  500: "#A0AEC0",
  600: "#718096",
  700: "#4A5568",
  800: "#2D3748",
  900: "#1A202C",
};

const red = {
  100: "#FFF5F5",
  200: "#FED7D7",
  300: "#FEB2B2",
  400: "#FC8181",
  500: "#F56565",
  600: "#E53E3E",
  700: "#C53030",
  800: "#9B2C2C",
  900: "#742A2A",
};

const green = {
  100: "#F0FFF4",
  200: "#C6F6D5",
  300: "#9AE6B4",
  400: "#68D391",
  500: "#48BB78",
  600: "#38A169",
  700: "#2F855A",
  800: "#276749",
  900: "#22543D",
};

const fontStyle = {
  bold: "inter-bold",
  semibold: "inter-semibold",
  medium: "inter-medium",
  regular: "inter-regular",
};

const layout = {
  width,
  height,
  isSmallDevice: width < 375,
};

const shadows = {
  1: "1px 2px 6px rgba(0, 0, 0, 0.2)",
  2: "1px 4px 17px rgba(0, 0, 0, 0.2)",
  3: "1px 10px 35px rgba(0, 0, 0, 0.2)",
};

const theme = {
  colors: {
    black: "#000000",
    white: "#FFFFFF",
    gray,
    red,
    green
  },
  layout: {
    ...layout,
  },
  shadows: {
    ...shadows,
  },
  font: {
    ...fontStyle,
  },
  platform: Platform.OS,
  statusBarHeight: Constants.statusBarHeight,
};

export default theme;
