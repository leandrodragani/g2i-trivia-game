import React from "react";
import { render, waitFor } from "utils/test-utils";
import { RootStackNavigator } from "navigation";

test("show game settings with defaults values", async () => {
  const { getByText } = render(<RootStackNavigator />);

  await waitFor(() => {
    expect(getByText("Can you score 100%?")).toBeTruthy();
  });
});
