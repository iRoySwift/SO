import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";

interface Props {}
const Bg: React.FC<Props> = () => {
  const { width } = useWindowDimensions();

  return (
    <View pointerEvents="none" style={styles.container}>
      <Image
        style={[styles.image, { width }]}
        source={require("@/assets/images/home/bg.png")}
        contentFit="contain"
        contentPosition="top center"
      />
    </View>
  );
};
export default Bg;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    inset: 0,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    aspectRatio: 375 / 452,
  },
});
