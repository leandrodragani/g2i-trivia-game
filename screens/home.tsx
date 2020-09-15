import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import useSWR from "swr";
import { ScreenProps } from "navigation";
import { CategoryResponse } from "api";
import {
  Box,
  Text,
  Button,
  GameSettings,
  GameSettingsOption,
} from "components";

type HomeScreenProps = ScreenProps<"Home">;

export default function Home({ navigation }: HomeScreenProps) {
  const theme = useContext(ThemeContext);

  const { data: categories, error } = useSWR<CategoryResponse>(
    "/api_category.php"
  );
  const difficulty: GameSettingsOption[] = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const gameType: GameSettingsOption[] = [
    { id: "boolean", name: "True/False" },
    { id: "multiple", name: "Multiple" },
  ];

  const startQuiz = () => navigation.navigate("Quiz");

  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor={theme.colors.gray[900]}
    >
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
        Can you score 100% ?
      </Text>
      <Box marginY={40}>
        <GameSettings
          label="Category"
          title="Select category"
          value={null}
          defaultValue="All"
          options={categories?.trivia_categories as GameSettingsOption[]}
          onSelect={(selected) => console.log(selected)}
        />
        <GameSettings
          label="Difficulty"
          title="Select difficulty level"
          value={null}
          options={difficulty}
          defaultValue="Any"
          onSelect={(selected) => console.log(selected)}
        />
        <GameSettings
          label="Game type"
          title="Select game type"
          value={null}
          defaultValue="Any"
          options={gameType}
          onSelect={(selected) => console.log(selected)}
        />
      </Box>
      <Button
        backgroundColor={theme.colors.red[500]}
        label="Start"
        onPress={startQuiz}
      />
    </Box>
  );
}
