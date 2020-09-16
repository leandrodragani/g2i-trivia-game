import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { Box } from "./box";

export interface ContainerProps {
  children: React.ReactNode;
}
export function Container({ children }: ContainerProps) {
  const theme = useContext(ThemeContext);
  
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      bg={theme.colors.gray[900]}
    >
      {children}
    </Box>
  );
}
