import React, { useContext } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "styled-components/native";
import { Box, Text } from "components";

export interface MenuItemProps extends TouchableOpacityProps {
  name: string;
  onPress: () => void;
  selected?: boolean;
}

export function MenuItem({ name, selected, ...props }: MenuItemProps) {
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity {...props}>
      <Box
        paddingY={3}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text
          color={theme.colors.gray[500]}
          fontSize={16}
          fontFamily={theme.font.medium}
        >
          {name}
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
