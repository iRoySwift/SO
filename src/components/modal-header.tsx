import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ThemedText from "./themed-text";

interface Props {
  title: string;
  onNextPress?: () => void;
}
const ModalHeader: React.FC<Props> = props => {
  const { title, onNextPress } = props;
  const handleBackPress = () => {
    router.back();
  };
  const handleNextPress = () => {
    onNextPress?.();
  };
  return (
    <View style={styles.header}>
      <Pressable onPress={handleBackPress}>
        <SymbolView
          name={{
            ios: "chevron.backward",
            android: "arrow_back_ios",
            web: "arrow_back_ios",
          }}
          tintColor="#FFF"
          size={20}
        />
      </Pressable>
      <ThemedText themeColor="text">{title}</ThemedText>
      <Pressable onPress={handleNextPress}>
        <ThemedText themeColor="text">下一步</ThemedText>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
});

export default ModalHeader;
