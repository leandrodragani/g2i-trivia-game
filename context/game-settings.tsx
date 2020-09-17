import React from "react";
import { GameSettingsOption } from "components";
import { ActionMap } from "utils/context";

interface GameSettingsProviderProps {
  children: React.ReactNode;
}

type GameSettingsKey = "difficulty" | "gameType" | "category";

type GameSettingsState = {
  [key in GameSettingsKey]: GameSettingsOption | null;
};

enum ActionTypes {
  Set = "SET_SETTING",
  Clear = "CLEAR_SETTINGS",
}

type Payload = {
  [ActionTypes.Set]: {
    prop: string;
    value: GameSettingsOption | null;
  };
  [ActionTypes.Clear]: undefined;
};

type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

const initialState: GameSettingsState = {
  category: null,
  difficulty: null,
  gameType: null,
};

const GameSettingsContext = React.createContext<{
  state: GameSettingsState;
  dispatch: React.Dispatch<Actions>;
}>({ state: initialState, dispatch: () => null });

function reducer(state: GameSettingsState, action: Actions) {
  switch (action.type) {
    case ActionTypes.Set: {
      return { ...state, [action.payload.prop]: action.payload.value };
    }
    case ActionTypes.Clear: {
      return initialState;
    }
  }
}

export function GameSettingsProvider(props: GameSettingsProviderProps) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <GameSettingsContext.Provider value={{ state, dispatch }} {...props} />
  );
}

export function useGameSettings() {
  const context = React.useContext(GameSettingsContext);
  if (!context) {
    throw new Error(
      `useGameSettings must be used within a GameSettingsProvider`
    );
  }
  const { state, dispatch } = context;

  const setSettings = (prop: string, settings: GameSettingsOption | null) =>
    dispatch({ type: ActionTypes.Set, payload: { value: settings, prop } });

  const clearSettings = () => dispatch({ type: ActionTypes.Clear });

  return {
    state,
    dispatch,
    setSettings,
    clearSettings,
  };
}
