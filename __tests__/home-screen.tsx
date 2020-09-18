import React from "react";
import { fireEvent, render, waitFor } from "utils/test-utils";
import { RootStackNavigator } from "navigation";

test("show game settings with defaults values", async () => {
  const { getByText, findByText } = render(<RootStackNavigator />);

  await waitFor(async () => {
    expect(getByText(/Can you score 100%/i)).toBeTruthy();
    const category = getByText("Category");
    fireEvent(category, "press");
    const header = await findByText("Select category");
    expect(header).toBeTruthy();
  });
});
