import React from "react";
import * as Updates from "expo-updates";
import { MessageWarning } from "components/message-warning";

export class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  restartApp = async () => await Updates.reloadAsync();

  render() {
    if (this.state.hasError) {
      return (
        <MessageWarning
          title="Oops, something went wrong"
          message="An error has ocurred in the application."
          buttonProps={{ label: "Try again", onPress: this.restartApp }}
        />
      );
    }
    return this.props.children;
  }
}
