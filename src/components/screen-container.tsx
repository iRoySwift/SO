import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import React from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Bg from "./bg";
import ThemedView from "./themed-view";

type ScreenContainerProps = {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollViewContentContainerStyle?: StyleProp<ViewStyle>;
};

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  contentContainerStyle,
  scrollViewContentContainerStyle,
}) => {
  return (
    <ThemedView type="background" style={styles.container}>
      <Bg />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            scrollViewContentContainerStyle,
          ]}>
          <View style={[styles.content, contentContainerStyle]}>
            {children}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    gap: Spacing.three,
  },
});
