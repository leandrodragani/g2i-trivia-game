import React, { useContext, useState, useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { ThemeContext } from "styled-components/native";
import useSWR from "swr";
import { ScreenProps } from "navigation";
import { Box, Text, Button, AnswerCard, Container } from "components";
import { Result, Response } from "api";
import { AllHtmlEntities } from "html-entities";

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
        fontSize={20}
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
  const sanitize = (object: any) => {
    Object.keys(object).forEach((key) =>
      object[key] === undefined || object[key] === null
        ? delete object[key]
        : {}
    );
    return object;
  };

  const queryString = new URLSearchParams(sanitize(options)).toString();

  const { data } = useSWR<Response<Result>>(
    shouldFetch ? `/api.php?${queryString}` : null,
    {
      revalidateOnFocus: false,
    }
  );

  return { data };
}

export default function Quiz({ navigation, route }: QuizScreenProps) {
  const theme = useContext(ThemeContext);
  const {
    settings: { category, gameType, difficulty },
  } = route.params;

  const { data: results } = useResults(true, {
    category: category?.id,
    type: gameType?.id,
    difficulty: difficulty?.id,
    amount: 10,
  });

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();

        Alert.alert(
          "Exit game",
          "You will lose your progress, are you sure you want to leave ?",
          [
            { text: "Cancel", style: "cancel", onPress: () => {} },
            {
              text: "Leave",
              style: "destructive",
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }),
    [navigation]
  );

  const [userAnswers, setUserAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  if (!results) {
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
    console.log(userAnswers);
    if (currentIndex === results.results?.length - 1) {
      navigation.navigate("Results", {
        answers: userAnswers,
        results: results.results,
      });
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
      <Box>
        <Text
          fontSize={22}
          color={theme.colors.red[500]}
          marginBottom={16}
          fontFamily={theme.font.medium}
          textAlign="center"
        >
          {resultsCategory}
        </Text>
      </Box>
      <QuestionCard>{question}</QuestionCard>
      <Box marginY={24}>
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
      <Button
        backgroundColor={theme.colors.red[500]}
        label="Next"
        onPress={handleNext}
      />
    </Container>
  );
}
