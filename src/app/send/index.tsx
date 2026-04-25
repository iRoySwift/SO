import Divider from "@/components/divider";
import Token from "@/components/token-list/token";
import { TAB_TYPE } from "@/components/token-list/type";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

interface Props {}
const Send: React.FC<Props> = () => {
  const [list] = useState({
    tokens: Array.from({ length: 20 }).map((_, i) => i),
    nfts: Array.from({ length: 5 }).map((_, i) => i),
  });
  const activeTab = TAB_TYPE.tokens;
  return (
    <View style={styles.container}>
      <View style={styles.grabberWrapper}>
        <View style={styles.grabber} />
      </View>
      <Animated.ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          {list[activeTab].map(i => (
            <View key={i}>
              <Token type={activeTab} isHideTrend />
              {i < list[activeTab].length - 1 && <Divider spacing={17} />}
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  grabberWrapper: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 14,
  },
  grabber: {
    width: 36,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#7A7F8C",
  },
  list: {
    paddingTop: 24,
  },
});

export default Send;
