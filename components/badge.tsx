import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { Text } from "./text";
import { Box } from "./box";

export interface BadgeProps {
  color: string;
  label: string;
}

export function Badge({ color, label }: BadgeProps) {
  const theme = useContext(ThemeContext);
  return (
    <Box bg={color} borderRadius={4} paddingX={2} paddingY={1}>
      <Text
        color={theme.colors.white}
        fontFamily={theme.font.medium}
        fontSize={14}
        style={{ textTransform: "uppercase" }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {label}
      </Text>
    </Box>
  );
}
