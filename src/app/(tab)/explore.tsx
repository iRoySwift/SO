import ScreenContainer from "@/components/screen-container";
import ThemedText from "@/components/themed-text";
import React from "react";
import { StyleSheet } from "react-native";

interface Props {}
const Explore: React.FC<Props> = () => {
  return (
    <ScreenContainer contentContainerStyle={styles.container}>
      <ThemedText type="title">Explore</ThemedText>
    </ScreenContainer>
  );
};
export default Explore;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});
