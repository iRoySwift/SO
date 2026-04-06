import { HeaderHeight } from "@/constants/theme";
import useTheme from "@/hooks/use-theme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import ThemedText from "./themed-text";

type Props = {
  children?: React.ReactNode;
  headerStyle?: StyleProp<ViewStyle>;
  scrollY?: SharedValue<number>;
};
const Header: React.FC<Props> = ({ headerStyle, children, scrollY }) => {
  const theme = useTheme();

  const bgStyle = useAnimatedStyle(() => {
    if (scrollY === undefined) return {};
    return {
      backgroundColor: theme.background,
      opacity: interpolate(
        scrollY.value,
        [0, 40, 120],
        [0, 0.2, 0.9],
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <View style={[styles.container, headerStyle]}>
      <Animated.View style={[StyleSheet.absoluteFill, bgStyle]}></Animated.View>
      <View style={[styles.header]}>
        <View style={styles.left}>
          <LinearGradient
            colors={["#0AFF96", "#00E0FF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.border}>
            <View style={styles.avatar} />
          </LinearGradient>
          <ThemedText style={styles.name} type="small" themeColor="text">
            Account_1
          </ThemedText>
        </View>
        <View style={styles.center}>{children}</View>
        <View style={styles.right}>
          <Image
            style={styles.image}
            source={require("@/assets/images/icons/bell.png")}
          />
          <View style={styles.notification}>
            <ThemedText type="small" themeColor="text">
              5
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: HeaderHeight,
  },
  left: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  border: {
    padding: 1,
    borderRadius: 18,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0F111E",
  },
  name: {
    marginLeft: 10,
  },
  center: {},
  right: {},
  image: {
    width: 32,
    height: 32,
  },
  icon: {},
  notification: {
    position: "absolute",
    top: -2,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FF4747",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Header;
