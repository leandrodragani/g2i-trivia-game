import React from "react";
import { render } from "utils/test-utils";
import { AnswerCard } from "../answer-card";

test("must show selected icon", async () => {
  const { toJSON, findByText, findByTestId } = render(
    <AnswerCard answer="Answer" selected />
  );

  const icon = findByTestId("selectedIcon");
  expect(icon).toBeTruthy();
  expect(findByText("Answer")).toBeTruthy();
  expect(toJSON).toMatchSnapshot();
});

test("must show error icon when answer is incorrect", async () => {
  const { findByTestId } = render(<AnswerCard answer="Answer" error />);

  const icon = findByTestId("errorIcon");
  expect(icon).toBeTruthy();
});
