import styled from "styled-components/native";
import { ViewProps } from "react-native";
import * as SS from "styled-system";

export interface BoxProps
  extends ViewProps,
    SS.SpaceProps,
    SS.PositionProps,
    SS.FlexboxProps,
    SS.ColorProps,
    SS.BorderProps,
    SS.LayoutProps,
    SS.ShadowProps {}

export const Box = styled.View<BoxProps>`
  ${SS.space}
  ${SS.color}
  ${SS.flexbox}
  ${SS.position}
  ${SS.border}
  ${SS.layout}
  ${SS.shadow}
`;
