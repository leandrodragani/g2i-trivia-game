import React from "react";
import { TouchableOpacityProps } from "react-native";
import styled, { css } from "styled-components/native";
import * as SS from "styled-system";

const StyledTouchableOpacity = styled.TouchableOpacity<SS.FlexboxProps>`
  border-radius: 4px;
  height: 36px;
  align-items: center;
  justify-content: center;
  padding-horizontal: 16px;
  padding-vertical: 8px;
  ${SS.backgroundColor}
  ${SS.color}
  ${SS.flexbox}
  ${SS.border}
  ${SS.space}
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
    `}
`;

const StyledText = styled.Text<SS.ColorProps>`
  text-transform: uppercase;
  font-family: ${(props) => props.theme.font.semibold};
  font-size: 14px;
  letter-spacing: 0.5px;
  ${SS.color}
`;

export interface ButtonProps
  extends TouchableOpacityProps,
    SS.BackgroundColorProps,
    SS.BorderProps,
    SS.ColorProps,
    SS.FlexboxProps,
    SS.SpaceProps {
  label?: string;
  textColor?: string;
  IconComponent?: React.ReactNode;
}

export function Button({
  label,
  IconComponent,
  textColor = "white",
  ...props
}: ButtonProps) {
  return (
    <StyledTouchableOpacity
      flexDirection={IconComponent ? "row" : undefined}
      activeOpacity={0.75}
      {...props}
    >
      {IconComponent}
      <StyledText color={textColor}>{label}</StyledText>
    </StyledTouchableOpacity>
  );
}
