import React from "react";
import { render } from "utils/test-utils";
import { AnswerCard } from "../answer-card";

test("get selected when i click it", () => {
  const { getByText, findByText } = render(
    <AnswerCard answer="Hi i'm an answer" />
  );

  expect(getByText("Hi i'm an answer")).toBeTruthy();
});
