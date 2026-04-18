import { Fonts, ThemeColor } from "@/constants/theme";
import useTheme from "@/hooks/use-theme";
import React from "react";
import { Platform, StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  type?:
    | "default"
    | "title"
    | "small"
    | "smallBold"
    | "subtitle"
    | "link"
    | "linkPrimary"
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
        { color: theme[themeColor ?? "text"], fontFamily: "Urbanist_500Medium" },
        type === "default" && styles.default,
        type === "title" && styles.title,
        type === "small" && styles.small,
        type === "smallBold" && styles.smallBold,
        type === "subtitle" && styles.subtitle,
        type === "link" && styles.link,
        type === "linkPrimary" && styles.linkPrimary,
        type === "code" && styles.code,
        style,
      ]}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 20,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Urbanist_700Bold",
  },
  default: {
    fontSize: 19,
    lineHeight: 24,
  },
  title: {
    fontSize: 48,
    lineHeight: 52,
    fontFamily: "Urbanist_600SemiBold",
  },
  subtitle: {
    fontSize: 32,
    lineHeight: 44,
    fontFamily: "Urbanist_600SemiBold",
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: 14,
    color: "#3c87f7",
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});

export default ThemedText;
