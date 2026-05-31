import { Fonts, ThemeColor } from "@/constants/theme";
import useTheme from "@/hooks/use-theme";
import React from "react";
import { Platform, StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  type?:
    | "default"
    | "title"
    | "subtitle"
    | "xxsmall"
    | "xsmall"
    | "small"
    | "large"
    | "xlarge"
    | "xxlarge"
    | "code";
  themeColor?: ThemeColor;
};
const ThemedText: React.FC<ThemedTextProps> = ({
  type,
  themeColor,
  style,
  ...otherProps
}) => {
  const theme = useTheme();

  return (
    <Text
      style={[
        {
          color: theme[themeColor ?? "text"],
          fontFamily: "Urbanist_600SemiBold",
        },
        type === "default" && styles.default,
        type === "title" && styles.title,
        type === "subtitle" && styles.subtitle,
        type === "xxsmall" && styles.xxsmall,
        type === "xsmall" && styles.xsmall,
        type === "small" && styles.small,
        type === "large" && styles.large,
        type === "xlarge" && styles.xlarge,
        type === "xxlarge" && styles.xxlarge,
        type === "code" && styles.code,
        style,
      ]}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  xxsmall: {
    fontSize: 10,
    lineHeight: 14,
    fontFamily: "Urbanist_500Medium",
  },
  xsmall: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "Urbanist_500Medium",
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  large: {
    fontSize: 18,
    lineHeight: 28,
  },
  xlarge: {
    fontSize: 20,
    lineHeight: 28,
  },
  xxlarge: {
    fontSize: 24,
    lineHeight: 32,
  },
  title: {
    fontSize: 40,
    lineHeight: 48,
  },
  subtitle: {
    fontSize: 32,
    lineHeight: 44,
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});

export default ThemedText;
