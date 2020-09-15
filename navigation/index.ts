import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { RootStackParamList } from "./RootStackNavigator";

export * from "./RootStackNavigator";

type GenericRouteProp<
  K extends ParamListBase,
  T extends keyof ParamListBase
> = RouteProp<K, T>;

type GenericNavigationProp<
  K extends ParamListBase,
  T extends keyof ParamListBase
> = NavigationProp<K, T>;

type GenericScreenProps<
  K extends ParamListBase,
  T extends keyof ParamListBase
> = {
  route: GenericRouteProp<K, T>;
  navigation: GenericNavigationProp<K, T>;
};

export type ScreenProps<T extends keyof ParamListBase> = GenericScreenProps<
  RootStackParamList,
  T
>;
