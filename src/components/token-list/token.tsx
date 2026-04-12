import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import ThemedText from "../themed-text";

interface Props {}
const Token: React.FC<Props> = () => {
  return (
    <View style={styles.item}>
      <View style={styles.left}>
        <Image
          style={styles.image}
          source={require("@/assets/images/home/solana.png")}
        />
        <View style={{ marginLeft: 12 }}>
          <ThemedText>SOL</ThemedText>
          <ThemedText themeColor="textSecondary" type="small">
            Solana
          </ThemedText>
        </View>
      </View>
      <View style={styles.middle}></View>
      <View style={styles.right}>
        <ThemedText>2.345</ThemedText>
        <ThemedText type="small">≈$2345.00</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 45,
    height: 45,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  middle: {},
  right: {},
});

export default Token;
