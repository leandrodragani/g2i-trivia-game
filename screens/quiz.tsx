import React, { useContext, useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { ThemeContext } from "styled-components/native";
import useSWR from "swr";
import { ScreenProps } from "navigation";
import { Box, Text, Button, AnswerCard, Container } from "components";
import { Result, Response } from "api";
import { AllHtmlEntities } from "html-entities";
import { objectToQueryParams } from "utils/strings";
import { useBeforeLeave } from "utils/hooks";
import { CommonActions } from "@react-navigation/native";

type QuizScreenProps = ScreenProps<"Quiz">;

function QuestionCard({ children }: { children: string }) {
  const theme = useContext(ThemeContext);
  const entities = new AllHtmlEntities();

  return (
    <Box
      bg={theme.colors.gray[800]}
      width={theme.layout.width - 50}
      padding={16}
      borderRadius={8}
    >
      <Text
        color={theme.colors.white}
        fontSize={18}
        textAlign="center"
        fontFamily={theme.font.semibold}
        lineHeight="40px"
      >
        {entities.decode(children)}
      </Text>
    </Box>
  );
}

function useResults(shouldFetch: boolean, options: any) {
  const queryString = objectToQueryParams(options);

  const { data, isValidating } = useSWR<Response<Result>>(
    shouldFetch ? `/api.php?${queryString}` : null,
    {
      revalidateOnFocus: false,
    }
  );

  return { data, isValidating };
}

export default function Quiz({ navigation, route }: QuizScreenProps) {
  const theme = useContext(ThemeContext);
  const {
    settings: { category, gameType, difficulty },
  } = route.params;

  const { data: results, isValidating } = useResults(true, {
    category: category?.id,
    type: gameType?.id,
    difficulty: difficulty?.id,
    amount: 10,
  });
  const [isGameInProgress, setIsGameInProgress] = useState<boolean>(true);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useBeforeLeave(isGameInProgress, {
    title: "Exit game",
    message: "You will lose your progress, are you sure you want to leave?",
  });

  useEffect(() => {
    if (!isGameInProgress) {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [
          { name: "Home" },
          {
            name: "Results",
            params: {
              answers: userAnswers,
              results: results?.results,
            },
          },
        ],
      });
      navigation.dispatch(resetAction);
    }
  }, [isGameInProgress, navigation]);

  if (!results || isValidating) {
    return (
      <Container>
        <ActivityIndicator color={theme.colors.gray[500]} size="large" />
      </Container>
    );
  }

  const makeAnswer = (answer: string) => () => setCurrentAnswer(answer);

  const handleNext = () => {
    setUserAnswers({ ...userAnswers, [currentIndex]: currentAnswer });
    setCurrentAnswer("");
    if (currentIndex === results.results.length - 1) {
      setIsGameInProgress(false);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const {
    category: resultsCategory,
    question,
    correct_answer,
    incorrect_answers,
  } = results.results[currentIndex];

  const answers = [correct_answer, ...incorrect_answers];

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
          {resultsCategory}
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
