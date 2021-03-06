import React, { memo, useContext } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "styled-components/native";
import { Box } from "./box";
import { Text } from "./text";

export interface MenuItemProps extends TouchableOpacityProps {
  name: string;
  onPress: () => void;
  selected?: boolean;
}

export const MenuItem = memo(({ name, selected, ...props }: MenuItemProps) => {
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
});
