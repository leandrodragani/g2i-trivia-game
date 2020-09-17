import React, { useContext } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { ThemeContext } from "styled-components/native";
import { BottomSheet } from "./bottom-sheet";
import { MenuItem } from "./menu-item";
import { Divider } from "./divider";
import { GameSettingsCard } from "./game-settings-card";
import { useModal } from "utils/hooks";

export interface GameSettingsOption {
  id: number | string;
  name: string;
}

export interface GameSettingsProps {
  label: string;
  value: GameSettingsOption | null;
  options: GameSettingsOption[];
  onSelect: (selected: GameSettingsOption | null) => void;
  title: string;
  defaultValue: string;
}

export function GameSettings({
  label,
  value,
  options,
  onSelect,
  title,
  defaultValue,
}: GameSettingsProps) {
  const modal = useModal();
  const theme = useContext(ThemeContext);

  const handleSelection = (selected: GameSettingsOption | null) => () => {
    onSelect(selected);
    modal.toggle();
  };

  return (
    <>
      <GameSettingsCard
        {...{ label, value: value ? value.name : defaultValue }}
        onPress={modal.toggle}
      />
      <BottomSheet
        {...{ title }}
        visible={modal.isVisible}
        onRequestClose={modal.toggle}
        onConfirm={modal.toggle}
      >
        <TouchableOpacity>
          <FlatList
            style={{ maxHeight: theme.layout.height / 3 }}
            data={options}
            ItemSeparatorComponent={Divider}
            ListHeaderComponent={
              <>
                <MenuItem
                  name={defaultValue}
                  onPress={handleSelection(null)}
                  selected={value === null}
                />
                <Divider />
              </>
            }
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MenuItem
                name={item.name}
                onPress={handleSelection(item)}
                selected={value?.id == item.id}
              />
            )}
          />
        </TouchableOpacity>
      </BottomSheet>
    </>
  );
}
