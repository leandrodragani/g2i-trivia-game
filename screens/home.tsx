import React, { useContext, useEffect } from "react";
import { StackActions } from "@react-navigation/native";
import { ThemeContext } from "styled-components/native";
import useSWR from "swr";
import { ScreenProps } from "navigation";
import { CategoryResponse } from "api";
import {
  Box,
  GameSettingsOption,
  Container,
  Text,
  Button,
  GameSettings,
} from "components";
import { useGameSettings, useToast } from "context";

type HomeScreenProps = ScreenProps<"Home">;

const difficultyLevels: GameSettingsOption[] = [
  { id: "easy", name: "Easy" },
  { id: "medium", name: "Medium" },
  { id: "hard", name: "Hard" },
];

const gameTypes: GameSettingsOption[] = [
  { id: "boolean", name: "True/False" },
  { id: "multiple", name: "Multiple" },
];

export default function Home({ navigation }: HomeScreenProps) {
  const { state, setSettings } = useGameSettings();
  const { showToast, ToastType } = useToast();
  const theme = useContext(ThemeContext);
  const { data: categories, error } = useSWR<CategoryResponse>(
    "/api_category.php",
    { shouldRetryOnError: false }
  );

  useEffect(() => {
    if (error) {
      showToast(
        ToastType.Error,
        "An error has ocurred when trying to fetch categories."
      );
    }
  }, [error]);

  const startQuiz = () => navigation.dispatch(StackActions.push("Quiz"));

  const handleGameSettings = (prop: string) => (
    selected: GameSettingsOption | null
  ) => {
    setSettings(prop, selected);
  };

  const { category, difficulty, gameType } = state;

  return (
    <Container>
      <Text
        fontSize={54}
        fontFamily={theme.font.bold}
        color={theme.colors.white}
      >
        trivia<Text color={theme.colors.red[500]}>game</Text>
      </Text>
      <Text
        marginTop={2}
        fontSize={24}
        fontFamily={theme.font.medium}
        color={theme.colors.gray[500]}
      >
        Can you score 100%?
      </Text>
      <Box marginY={40}>
        <GameSettings
          label="Category"
          title="Select category"
          value={category}
          defaultValue="All"
          options={categories?.trivia_categories as GameSettingsOption[]}
          onSelect={handleGameSettings("category")}
        />
        <GameSettings
          label="Difficulty"
          title="Select difficulty level"
          value={difficulty}
          options={difficultyLevels}
          defaultValue="Any"
          onSelect={handleGameSettings("difficulty")}
        />
        <GameSettings
          label="Game type"
          title="Select game type"
          value={gameType}
          defaultValue="Any"
          options={gameTypes}
          onSelect={handleGameSettings("gameType")}
        />
      </Box>
      <Button
        backgroundColor={theme.colors.red[500]}
        label="Start"
        onPress={startQuiz}
      />
    </Container>
  );
}
