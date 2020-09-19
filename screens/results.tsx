import React, { useContext } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { ThemeContext } from "styled-components/native";
import { ScreenProps } from "navigation";
import { AnswerCard, Button, Container, Text, Box } from "components";
import { useModal, useResults } from "utils/hooks";
import { Ionicons } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
import { useGameSettings } from "context";

type ResultsScreenProps = ScreenProps<"Results">;

interface ResultItemProps {
  answers: string[];
  question: string;
  correct_answer: string;
  userAnswer: string;
}

function ResultItem({
  answers,
  question,
  correct_answer,
  userAnswer,
}: ResultItemProps) {
  const theme = useContext(ThemeContext);
  const { isVisible, toggle } = useModal();
  const {
    layout: { width },
    colors: { gray, green, red },
    font: { medium },
  } = theme;

  const isAnswerCorrect = correct_answer === userAnswer;

  return (
    <>
      <TouchableOpacity onPress={toggle}>
        <Box
          flexDirection="row"
          width={width - 50}
          bg={gray[800]}
          alignItems="center"
          justifyContent="space-between"
          borderRadius={8}
          padding={16}
          marginBottom={16}
        >
          <Ionicons
            name={`ios-${isAnswerCorrect ? "checkmark" : "close"}-circle`}
            size={20}
            color={isAnswerCorrect ? green[500] : red[500]}
            style={{ marginRight: 8 }}
          />
          <Text
            flexWrap="wrap"
            flex={1}
            color="white"
            fontSize={16}
            fontFamily={medium}
          >
            {question}
          </Text>
          <Ionicons
            name={`md-arrow-drop${isVisible ? "up" : "down"}`}
            size={20}
            color="white"
          />
        </Box>
      </TouchableOpacity>
      {isVisible
        ? answers.map((answer) => (
            <Box marginBottom={16} key={answer}>
              <AnswerCard
                {...{ answer }}
                selected={correct_answer === answer}
                error={userAnswer !== correct_answer && userAnswer === answer}
              />
            </Box>
          ))
        : null}
    </>
  );
}

export default function Results({ navigation, route }: ResultsScreenProps) {
  const theme = useContext(ThemeContext);
  const { clearSettings } = useGameSettings();
  const { results, questionsAmount } = useResults({ revalidateOnMount: false });
  const { answers: userAnswers } = route.params;
  const correctAnswersCount = results.filter(
    ({ correct_answer }, index) => userAnswers[index] === correct_answer
  ).length;

  const playAgain = () => {
    clearSettings();
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <Container>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text fontSize={30} color="white" fontFamily={theme.font.semibold}>
          Your score
        </Text>
        <Text fontSize={24} color="white">
          {correctAnswersCount} / {questionsAmount}
        </Text>
      </Box>
      <Box flex={2} marginBottom={24}>
        <FlatList
          data={results}
          keyExtractor={(item) => item.question}
          renderItem={({ item, index }) => (
            <ResultItem
              {...{ answers: item.answers }}
              question={item.question}
              userAnswer={userAnswers[index]}
              correct_answer={item.correct_answer}
            />
          )}
        />
      </Box>
      <Box marginBottom={24}>
        <Button
          backgroundColor={theme.colors.red[500]}
          label="Play again?"
          onPress={playAgain}
        />
      </Box>
    </Container>
  );
}
