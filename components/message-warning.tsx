import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Container } from "./container";
import { Box } from "./box";
import { Text } from "./text";
import { Button, ButtonProps } from "./button";

export interface MessageWarningProps {
  title: string;
  message?: string;
  buttonProps: ButtonProps;
}

export function MessageWarning({
  title,
  message,
  buttonProps,
}: MessageWarningProps) {
  const theme = useContext(ThemeContext);
  const {
    colors: { red, white, gray },
    font: { regular, semibold },
  } = theme;

  return (
    <Container>
      <Box
        paddingX={10}
        alignItems="center"
        justifyContent="center"
        marginY={4}
      >
        <Text
          fontSize={30}
          color={white}
          fontFamily={semibold}
          textAlign="center"
        >
          {title}
        </Text>
        <Text
          fontSize={16}
          color={gray[500]}
          fontFamily={regular}
          marginTop={3}
          textAlign="center"
        >
          {message}
        </Text>
      </Box>
      <Button backgroundColor={red[500]} {...buttonProps} />
    </Container>
  );
}
