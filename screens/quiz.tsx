import React, { useContext, useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { ThemeContext } from "styled-components/native";
import { ScreenProps } from "navigation";
import {
  Box,
  Text,
  Button,
  AnswerCard,
  Container,
  QuestionCard,
} from "components";
import { useBeforeLeave, useResults } from "utils/hooks";
import { useGameSettings } from "context";

type QuizScreenProps = ScreenProps<"Quiz">;

interface QuizState {
  isGameInProgress: boolean;
  userAnswers: any;
  currentIndex: number;
}

const initialState: QuizState = {
  isGameInProgress: true,
  userAnswers: {},
  currentIndex: 0,
};

export default function Quiz({ navigation }: QuizScreenProps) {
  const theme = useContext(ThemeContext);
  const [state, setState] = useState<QuizState>(initialState);
  const { clearSettings } = useGameSettings();
  const { results, isValidating } = useResults();
  const noResults = results.length === 0;
  const { isGameInProgress, userAnswers, currentIndex } = state;

  useBeforeLeave(
    isGameInProgress,
    {
      title: "Exit game",
      message: "You will lose your progress, are you sure you want to leave?",
    },
    clearSettings
  );

  useEffect(() => {
    if (noResults && !isGameInProgress) {
      navigation.goBack();
      return;
    }

    if (!isGameInProgress) {
      navigation.navigate("Results", {
        answers: userAnswers,
      });
    }
  }, [isGameInProgress, navigation]);

  if (isValidating) {
    return (
      <Container>
        <ActivityIndicator color={theme.colors.gray[500]} size="large" />
      </Container>
    );
  }

  if (noResults) {
    const goBack = () => setState({ ...state, isGameInProgress: false });

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
            color={theme.colors.white}
            fontFamily={theme.font.semibold}
            textAlign="center"
          >
            There is no results for the game settings you selected.
          </Text>
          <Text
            fontSize={16}
            color={theme.colors.gray[500]}
            fontFamily={theme.font.regular}
            marginTop={3}
            textAlign="center"
          >
            Maybe change the settings and try again?
          </Text>
        </Box>
        <Button
          backgroundColor={theme.colors.red[500]}
          label="Change settings"
          onPress={goBack}
        />
      </Container>
    );
  }

  const makeAnswer = (answer: string) => () =>
    setState({
      ...state,
      userAnswers: { ...userAnswers, [currentIndex]: answer },
    });

  const handleNext = () => {
    if (currentIndex === results.length - 1) {
      setState({ ...state, isGameInProgress: false });
    } else {
      setState({ ...state, currentIndex: currentIndex + 1 });
    }
  };

  const { category, question, answers } = results[currentIndex];

  const currentAnswer = userAnswers[currentIndex];

  return (
    <Container>
      <Box marginY={24} alignItems="center" justifyContent="center">
        <Text
          fontSize={20}
          color={theme.colors.red[500]}
          marginBottom={16}
          fontFamily={theme.font.medium}
          textAlign="center"
        >
          {category}
        </Text>
        <QuestionCard>{question}</QuestionCard>
      </Box>
      <Box flex={1}>
        {answers.map((answer) => (
          <Box key={answer} marginBottom={16}>
            <AnswerCard
              {...{ answer }}
              onPress={makeAnswer(answer)}
              selected={currentAnswer === answer}
            />
          </Box>
        ))}
      </Box>
      <Box marginBottom={24}>
        <Button
          backgroundColor={theme.colors.red[500]}
          label="Next"
          onPress={handleNext}
          disabled={!currentAnswer}
        />
      </Box>
    </Container>
  );
}
