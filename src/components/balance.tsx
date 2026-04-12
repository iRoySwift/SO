import React from "react";
import { StyleSheet, View } from "react-native";
import ThemedText from "./themed-text";

interface Props {}
const Balance: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Current Wallet Balance</ThemedText>
      <ThemedText style={styles.balance}>$ 5,323.00</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 30,
    marginBottom: 35,
  },
  title: {
    fontSize: 14,
    fontWeight: "semibold",
  },
  balance: {
    fontSize: 40,
    fontWeight: "bold",
  },
});

export default Balance;
