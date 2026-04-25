import { ThemeColor } from "@/constants/theme";
import useTheme from "@/hooks/use-theme";
import React from "react";
import { View, ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};
const ThemedView: React.FC<ThemedViewProps> = ({
  style,
  darkColor,
  lightColor,
  type,
  ...otherProps
}) => {
  const theme = useTheme();

  const backgroundColor = theme[type ?? "background"];
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
};
export default ThemedView;
