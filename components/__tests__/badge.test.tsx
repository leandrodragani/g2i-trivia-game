import React from "react";
import { render } from "utils/test-utils";
import { Badge } from "../badge";

test("must show correctly", async () => {
  const { toJSON, findByText } = render(<Badge label="Badge" color="red" />);
  expect(findByText("Badge")).toBeTruthy();
  expect(toJSON).toMatchSnapshot();
});
