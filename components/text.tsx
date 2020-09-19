import styled from "styled-components/native";
import { TextProps as RNTextProps } from "react-native";
import * as SS from "styled-system";

export interface TextProps
  extends RNTextProps,
    SS.SpaceProps,
    SS.TypographyProps,
    SS.ColorProps,
    SS.FlexboxProps {}

export const Text = styled.Text<TextProps>`
  ${SS.space}
  ${SS.color}
  ${SS.typography}
  ${SS.flexbox}
`;
