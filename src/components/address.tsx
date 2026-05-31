import { SymbolView } from "expo-symbols";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ThemedText from "./themed-text";

interface Props {
  name: string;
  address: string;
  onPress?: (address: string) => void;
}
const Address: React.FC<Props> = ({ name, address, onPress }) => {
  return (
    <Pressable onPress={() => onPress?.(address)}>
      <View style={styles.container}>
        <View style={styles.avatar}>
          <SymbolView
            name={{
              ios: "person",
              android: "account_circle",
              web: "account_circle",
            }}
            tintColor="#FFF"
            size={16}
          />
        </View>
        <View style={{ marginLeft: 12 }}>
          <ThemedText type="small" themeColor="text">
            {name}
          </ThemedText>
          <ThemedText type="xsmall" themeColor="textSecondary">
            {address}
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: "#2A2A2A",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Address;
