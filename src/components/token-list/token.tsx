import Trend from "@/assets/images/icons/trend";
import PriceTrendChart from "@/components/price-trend-chart";
import useTheme from "@/hooks/use-theme";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import ThemedText from "../themed-text";
import { TAB_TYPE, TabType } from "./type";

interface Props {
  type: TabType;
  isHideTrend?: boolean;
}
const Token: React.FC<Props> = ({ type, isHideTrend }) => {
  const colors = useTheme();
  const chartData =
    type === TAB_TYPE.tokens
      ? [18, 17, 26, 30, 30, 19, 19]
      : [12, 13, 16, 19, 17, 14, 11];

  return (
    <View style={styles.item}>
      <View style={styles.left}>
        {type === TAB_TYPE.tokens ? (
          <Image
            style={[styles.image, styles.token]}
            source={require("@/assets/images/home/solana.png")}
          />
        ) : (
          <Image
            style={[styles.image, styles.nft]}
            source={require("@/assets/images/home/nft.png")}
          />
        )}
        <View style={{ marginLeft: 12 }}>
          <ThemedText>SOL {type}</ThemedText>
          <ThemedText themeColor="textSecondary" type="xsmall">
            Solana
          </ThemedText>
        </View>
      </View>
      {isHideTrend ? null : (
        <>
          <View style={styles.middle}>
            {type === TAB_TYPE.tokens ? (
              <PriceTrendChart data={chartData} color={colors.textPositive} />
            ) : null}
          </View>
          <View style={styles.right}>
            <>
              <View style={styles.price}>
                {type === TAB_TYPE.tokens ? (
                  <ThemedText themeColor="text" type="small">
                    $
                  </ThemedText>
                ) : (
                  <Image
                    style={styles.symbol}
                    source={require("@/assets/images/icons/solana.svg")}
                  />
                )}
                <ThemedText themeColor="text" type="small">
                  2.345
                </ThemedText>
              </View>
              <View style={styles.price}>
                <Trend color={colors.textPositive} />
                <ThemedText themeColor="textPositive" type="xsmall">
                  $ 2345.00
                </ThemedText>
              </View>
            </>
          </View>
        </>
      )}
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
  token: {
    borderRadius: "100%",
  },
  nft: {
    borderRadius: 6,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    alignItems: "flex-end",
    gap: 4,
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  middle: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 12,
  },
  symbol: {
    width: 12,
    height: 12,
  },
});

export default Token;
