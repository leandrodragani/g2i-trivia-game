import { StyleSheet, ViewProps } from "react-native";
import styled from "styled-components/native";
import * as SS from "styled-system";

export interface DividerProps extends ViewProps, SS.SpaceProps {
  color?: string;
}

export const Divider = styled.View<DividerProps>`
  align-self: stretch;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: ${({ color, theme }) => color ?? theme.colors.gray[500]};
  opacity: 0.25;
  ${SS.space}
`;
