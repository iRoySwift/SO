import { Spacing } from "@/constants/theme";
import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import ThemedText from "./themed-text";
import ThemedView from "./themed-view";

interface Props {
  title?: string;
  hint?: ReactNode;
}
const HintRow: React.FC<Props> = ({
  title = "Try editing",
  hint = "app/index.tsx",
}) => {
  return (
    <View style={styles.stepRow}>
      <ThemedText>{title}</ThemedText>
      <ThemedView type="backgroundSelected" style={[styles.codeSnippet]}>
        <ThemedText themeColor="textSecondary">{hint}</ThemedText>
      </ThemedView>
    </View>
  );
};
const styles = StyleSheet.create({
  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  codeSnippet: {
    borderRadius: Spacing.two,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
});
export default HintRow;
