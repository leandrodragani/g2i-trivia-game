import React, { memo, useContext } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ThemeContext } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "./text";
import { Box } from "./box";
import { AllHtmlEntities } from "html-entities";

export interface AnswerCardProps extends TouchableOpacityProps {
  answer: string;
  selected?: boolean;
  error?: boolean;
}

export const AnswerCard = memo(
  ({ answer, selected, error, ...props }: AnswerCardProps) => {
    const theme = useContext(ThemeContext);
    const entities = new AllHtmlEntities();
    const {
      colors: { red, green, gray, white },
      layout: { width },
      font: { medium },
    } = theme;

    return (
      <TouchableOpacity {...props} activeOpacity={0.75}>
        <Box
          flexDirection="row"
          border={1}
          width={width - 50}
          borderColor={gray[800]}
          bg={selected ? gray[800] : undefined}
          alignItems="center"
          justifyContent="space-between"
          borderRadius={8}
          padding={16}
        >
          <Text
            color={selected ? white : gray[500]}
            fontFamily={medium}
            fontSize={16}
          >
            {entities.decode(answer)}
          </Text>
          {selected ? (
            <Ionicons
              name="ios-checkmark-circle"
              size={20}
              color={green[500]}
            />
          ) : error ? (
            <Ionicons name="ios-close-circle" size={20} color={red[500]} />
          ) : null}
        </Box>
      </TouchableOpacity>
    );
  }
);
