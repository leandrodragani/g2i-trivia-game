import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { ThemeContext } from "styled-components/native";
import { Box } from "./box";

export interface ContainerProps {
  children: React.ReactNode;
}

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.gray[900]};
`;

export function Container({ children }: ContainerProps) {
  const theme = useContext(ThemeContext);

  return (
    <StyledSafeAreaView>
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        bg={theme.colors.gray[900]}
      >
        {children}
      </Box>
    </StyledSafeAreaView>
  );
}
