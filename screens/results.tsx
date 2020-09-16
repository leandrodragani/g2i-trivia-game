import React, { useContext } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { ThemeContext } from "styled-components/native";
import { ScreenProps } from "navigation";
import { AnswerCard, Button, Container, Text, Box } from "components";
import { AllHtmlEntities } from "html-entities";
import { useModal } from "utils/hooks";
import { Ionicons } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";

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
  const entities = new AllHtmlEntities();
  const { isVisible, toggle } = useModal();

  return (
    <>
      <TouchableOpacity onPress={toggle}>
        <Box
          flexDirection="row"
          width={theme.layout.width - 50}
          bg={theme.colors.gray[800]}
          alignItems="center"
          justifyContent="space-between"
          borderRadius={8}
          padding={16}
          marginBottom={16}
        >
          <Text color="white" fontSize={16} fontFamily={theme.font.medium}>
            {entities.decode(question)}
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
  const { answers: userAnswers, results } = route.params;
  const correctAnswers = results.filter(
    ({ correct_answer }, index) => userAnswers[index] === correct_answer
  ).length;

  const playAgain = () => navigation.dispatch(StackActions.popToTop());

  return (
    <Container>
      <Box flex={0.25} alignItems="center" justifyContent="center">
        <Text fontSize={30} color="white" fontFamily={theme.font.semibold}>
          Your score
        </Text>
        <Text fontSize={24} color="white">
          {correctAnswers} / 10
        </Text>
      </Box>
      <Box flex={0.5}>
        <FlatList
          data={results}
          renderItem={({ item, index }) => {
            const answers = [item.correct_answer, ...item.incorrect_answers];
            return (
              <ResultItem
                key={item.question}
                {...{ answers }}
                question={item.question}
                userAnswer={userAnswers[index]}
                correct_answer={item.correct_answer}
              />
            );
          }}
        />
      </Box>
      <Box marginTop={24}>
        <Button
          backgroundColor={theme.colors.red[500]}
          label="Play again?"
          onPress={playAgain}
        />
      </Box>
    </Container>
  );
}
