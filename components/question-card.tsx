import { useContext } from "react";
import { AllHtmlEntities } from "html-entities";
import { ThemeContext } from "styled-components/native";
import { Box } from "./box";
import { Text } from "./text";

export interface QuestionCardProps {
  children: string;
}

export function QuestionCard({ children }: QuestionCardProps) {
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
