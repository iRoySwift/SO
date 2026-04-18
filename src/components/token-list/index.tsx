import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import Divider from "../divider";
import Tabs from "./tabs";
import Token from "./token";

interface Props {}
const TokenList: React.FC<Props> = () => {
  const [activeTab, setActiveTab] = useState<"tokens" | "nfts">("tokens");
  const [list, setList] = useState({
    tokens: Array.from({ length: 20 }).map((_, i) => i),
    nfts: Array.from({ length: 5 }).map((_, i) => i),
  });
  const arr = Array.from({ length: 20 }).map((_, i) => i);

  return (
    <View style={styles.container}>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Animated.ScrollView>
        <View style={styles.list}>
          {list[activeTab].map(i => (
            <View key={i}>
              <Token type="nft" />
              {i < list[activeTab].length - 1 && <Divider spacing={17} />}
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  list: {
    paddingTop: 24,
  },
});
export default TokenList;
