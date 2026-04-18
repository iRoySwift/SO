import Trend from "@/assets/images/icons/trend";
import useTheme from "@/hooks/use-theme";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import ThemedText from "../themed-text";

interface Props {
  type: string;
}
const Token: React.FC<Props> = ({ type }) => {
  const colors = useTheme();
  return (
    <View style={styles.item}>
      <View style={styles.left}>
        {type === "token" ? (
          <Image
            style={styles.image}
            source={require("@/assets/images/home/solana.png")}
          />
        ) : (
          <Image
            style={styles.image}
            source={require("@/assets/images/home/nft.png")}
          />
        )}
        <View style={{ marginLeft: 12 }}>
          <ThemedText>SOL</ThemedText>
          <ThemedText themeColor="textSecondary" type="small">
            Solana
          </ThemedText>
        </View>
      </View>
      <View style={styles.middle}></View>
      <View style={styles.right}>
        <>
          <View style={styles.price}>
            {type === "token" ? (
              <ThemedText>$</ThemedText>
            ) : (
              <Image
                style={styles.symbol}
                source={require("@/assets/images/icons/solana.svg")}
              />
            )}
            <ThemedText>2.345</ThemedText>
          </View>
          <View style={styles.price}>
            <Trend color={colors.textPositive} />
            <ThemedText themeColor="textPositive" type="small">
              $ 2345.00
            </ThemedText>
          </View>
        </>
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
  price: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  symbol: {
    width: 12,
    height: 12,
  },
});

export default Token;
