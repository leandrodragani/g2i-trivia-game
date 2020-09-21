import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { ThemeContext } from "styled-components/native";
import { Text } from "./text";
import { Box } from "./box";
import { Badge } from "./badge";

export interface GameSettingsCardProps {
  label: string;
  value: string;
  onPress: () => void;
}

export function GameSettingsCard({
  label,
  value,
  onPress,
}: GameSettingsCardProps) {
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity {...{ onPress }}>
      <Box
        width={theme.layout.width - 50}
        bg={theme.colors.gray[800]}
        padding={20}
        borderRadius={8}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={20}
      >
        <Text color={theme.colors.white} fontSize={20}>
          {label}
        </Text>
        <Badge color={theme.colors.red[600]} label={value} />
      </Box>
    </TouchableOpacity>
  );
}
