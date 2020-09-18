import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { render, RenderOptions } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import theme from "styles/theme";

interface WrappedProvidersProps {
  children: React.ReactNode;
}

const WrappedProviders = ({ children }: WrappedProvidersProps) => {
  return (
    <ThemeProvider {...{ theme }}>
      <NavigationContainer>{children}</NavigationContainer>
    </ThemeProvider>
  );
};

const customRender = (ui: React.ReactElement<any>, options?: RenderOptions) =>
  render(ui, { wrapper: WrappedProviders, ...options });

export * from "@testing-library/react-native";

export { customRender as render };
