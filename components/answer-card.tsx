import React, { useContext } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ThemeContext } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Box, Text } from "components";

export interface AnswerCardProps extends TouchableOpacityProps {
  answer: string;
  selected?: boolean;
}

export function AnswerCard({ answer, selected, ...props }: AnswerCardProps) {
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity {...props} activeOpacity={0.75}>
      <Box
        flexDirection="row"
        border={1}
        width={theme.layout.width - 50}
        borderColor={theme.colors.gray[800]}
        bg={selected ? theme.colors.gray[800] : undefined}
        alignItems="center"
        justifyContent="space-between"
        borderRadius={8}
        padding={16}
      >
        <Text
          color={selected ? theme.colors.white : theme.colors.gray[500]}
          fontFamily={theme.font.medium}
          fontSize={16}
        >
          {answer}
        </Text>
        {selected ? (
          <Ionicons
            name="ios-checkmark-circle"
            size={24}
            color={theme.colors.green[500]}
          />
        ) : null}
      </Box>
    </TouchableOpacity>
  );
}
