import Divider from "@/components/divider";
import Grabber from "@/components/grabber";
import Token from "@/components/token-list/token";
import { TAB_TYPE } from "@/components/token-list/type";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {}
const SelectToken: React.FC<Props> = () => {
  const insets = useSafeAreaInsets();
  const [list] = useState({
    tokens: Array.from({ length: 20 }).map((_, i) => i),
    nfts: Array.from({ length: 5 }).map((_, i) => i),
  });
  const activeTab = TAB_TYPE.tokens;
  const handlePress = () => {
    router.push("/send");
  };
  return (
    <View style={styles.container}>
      <Grabber />
      <TextInput
        style={styles.input}
        placeholder="Search Token"
        placeholderTextColor={"#fff"}
      />
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom }]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          {list[activeTab].map(i => (
            <Pressable key={i} onPress={handlePress}>
              <View>
                <Token type={activeTab} isHideTrend />
                {i < list[activeTab].length - 1 && <Divider spacing={17} />}
              </View>
            </Pressable>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  input: {
    paddingVertical: 10,
  },
  scrollView: {
    flex: 1,
  },
  list: {},
});

export default SelectToken;
