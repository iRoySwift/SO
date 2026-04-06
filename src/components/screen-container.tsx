import Header from "@/components/header";
import {
  BottomTabInset,
  HeaderHeight,
  MaxContentWidth,
  TopTabInset,
} from "@/constants/theme";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Bg from "./bg";
import ThemedView from "./themed-view";

type ScreenContainerProps = {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollViewContentContainerStyle?: StyleProp<ViewStyle>;
  isShowHeader?: boolean;
};

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  contentContainerStyle,
  scrollViewContentContainerStyle,
  isShowHeader = true,
}) => {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <ThemedView type="background" style={styles.container}>
      <Bg />
      {isShowHeader && (
        <Header
          scrollY={scrollY}
          headerStyle={{
            paddingTop: insets.top + TopTabInset,
            position: "absolute",
            zIndex: 10,
          }}
        />
      )}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          scrollViewContentContainerStyle,
        ]}
        scrollEventThrottle={16}
        onScroll={onScroll}>
        <View
          style={[
            styles.content,
            {
              paddingTop: HeaderHeight + insets.top + TopTabInset,
              paddingBottom: insets.bottom + BottomTabInset,
            },
            contentContainerStyle,
          ]}>
          {children}
        </View>
      </Animated.ScrollView>
    </ThemedView>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    paddingHorizontal: 22,
  },
});
