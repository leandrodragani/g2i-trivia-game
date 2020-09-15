import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { Modal, ModalProps, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, Text } from "components";

export interface BottomSheetProps extends ModalProps {
  title: string;
  onConfirm: () => void;
  children: React.ReactNode;
}

export function BottomSheet({
  title,
  children,
  onRequestClose,
  onConfirm,
  ...props
}: BottomSheetProps) {
  const theme = useContext(ThemeContext);
  return (
    <Modal
      animationType="fade"
      onRequestClose={onRequestClose}
      transparent
      {...props}
    >
      <Box flex={1} justifyContent="flex-end" bg="rgba(1, 1, 1, 0.35)">
        <Box
          position="relative"
          justifyContent="space-evenly"
          bg={theme.colors.gray[800]}
          padding={24}
          borderTopLeftRadius={25}
          borderTopRightRadius={25}
          boxShadow={theme.shadows[3]}
        >
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              fontSize={24}
              fontFamily={theme.font.semibold}
              color={theme.colors.gray[400]}
            >
              {title}
            </Text>
            <TouchableOpacity onPress={onRequestClose}>
              <Ionicons
                name="ios-close-circle-outline"
                size={24}
                color={theme.colors.gray[500]}
              />
            </TouchableOpacity>
          </Box>
          <Box>{children}</Box>
        </Box>
      </Box>
    </Modal>
  );
}
