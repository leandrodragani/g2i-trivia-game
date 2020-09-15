import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import useSWR from "swr";
import { ScreenProps } from "navigation";
import { Box, Text, Button, AnswerCard } from "components";

type QuizScreenProps = ScreenProps<"Quiz">;

function QuestionCard() {
  const theme = useContext(ThemeContext);
  return (
    <Box
      bg={theme.colors.gray[800]}
      width={theme.layout.width - 50}
      padding={16}
      borderRadius={8}
    >
      <Text
        color={theme.colors.white}
        fontSize={24}
        textAlign="center"
        fontFamily={theme.font.semibold}
      >
        El abc
      </Text>
    </Box>
  );
}


export default function Quiz({ navigation }: QuizScreenProps) {
  const theme = useContext(ThemeContext);
  // const { data } = useSWR<>("/api.php?amount=10&difficulty=hard&type=boolean");
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      bg={theme.colors.gray[900]}
    >
      <QuestionCard />
      <AnswerCard answer="quiroz es un pelotudo" />
      <Button
        backgroundColor={theme.colors.red[500]}
        label="Next"
        onPress={() => {}}
      />
    </Box>
  );
}
