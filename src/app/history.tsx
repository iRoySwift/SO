import Grabber from "@/components/grabber";
import ThemedText from "@/components/themed-text";
import ThemedView from "@/components/themed-view";
import useTheme from "@/hooks/use-theme";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import React from "react";
import { Dimensions, Pressable, SectionList, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SCREEN_HEIGHT = Dimensions.get("window").height;

type HistoryItem = {
  id: string;
  type: "swap" | "interaction" | "failed" | "received";
  title: string;
  subtitle: string;
  received?: string;
  sent?: string;
  token?: string;
};

const HISTORY: { title: string; data: HistoryItem[] }[] = [
  {
    title: "Jul 18, 2026",
    data: [
      {
        id: "1",
        type: "swap",
        title: "已兑换",
        subtitle: "Jupiter",
        received: "+2,039.63001 SUI",
        sent: "-19.89774 rkuSOL",
        token: "S",
      },
      {
        id: "2",
        type: "swap",
        title: "已兑换",
        subtitle: "未知",
        received: "+19.89774 rkuSOL",
        sent: "-19.50627 roxrkuSOL",
        token: "R",
      },
      {
        id: "3",
        type: "interaction",
        title: "应用互动",
        subtitle: "未知",
      },
    ],
  },
  {
    title: "Jul 12, 2026",
    data: [
      {
        id: "4",
        type: "swap",
        title: "已兑换",
        subtitle: "未知",
        received: "+8,526.98584 ARX",
        sent: "-20.05546 rkuSOL",
        token: "A",
      },
      {
        id: "5",
        type: "failed",
        title: "应用互动失败",
        subtitle: "未知",
      },
      {
        id: "6",
        type: "failed",
        title: "应用互动失败",
        subtitle: "未知",
      },
      {
        id: "7",
        type: "received",
        title: "已接收",
        subtitle: "从 puiR...A91o",
        received: "+20.05546 rkuSOL",
      },
      {
        id: "8",
        type: "interaction",
        title: "应用互动",
        subtitle: "未知",
      },
    ],
  },
];

function ActivityIcon({ item }: { item: HistoryItem }) {
  if (item.type === "interaction" || item.type === "failed") {
    const failed = item.type === "failed";
    return (
      <View
        style={[
          styles.statusIcon,
          { backgroundColor: failed ? "#FF0038" : "#00DF57" },
        ]}>
        <SymbolView
          name={{
            ios: failed ? "xmark" : "checkmark",
            android: failed ? "close" : "check",
            web: failed ? "close" : "check",
          }}
          tintColor={failed ? "#FFFFFF" : "#050505"}
          size={32}
          weight="medium"
        />
      </View>
    );
  }

  return (
    <View style={styles.tokenIconWrap}>
      <View style={styles.primaryTokenIcon}>
        <SymbolView
          name={{ ios: "bolt.fill", android: "bolt", web: "bolt" }}
          tintColor="#A8FF22"
          size={28}
        />
      </View>
      {item.type === "swap" ? (
        <View style={styles.secondaryTokenIcon}>
          <ThemedText style={styles.tokenLetter}>{item.token}</ThemedText>
        </View>
      ) : (
        <View style={styles.receiveBadge}>
          <SymbolView
            name={{ ios: "arrow.down", android: "arrow_downward", web: "arrow_downward" }}
            tintColor="#17171C"
            size={13}
            weight="bold"
          />
        </View>
      )}
    </View>
  );
}

function HistoryRow({ item }: { item: HistoryItem }) {
  const colors = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: colors.backgroundElement },
        pressed && styles.pressed,
      ]}>
      <ActivityIcon item={item} />
      <View style={styles.details}>
        <ThemedText style={styles.rowTitle}>{item.title}</ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.subtitle}>
          {item.subtitle}
        </ThemedText>
      </View>
      {(item.received || item.sent) && (
        <View style={styles.amounts}>
          {item.received && (
            <ThemedText style={styles.received}>{item.received}</ThemedText>
          )}
          {item.sent && <ThemedText style={styles.sent}>{item.sent}</ThemedText>}
        </View>
      )}
    </Pressable>
  );
}

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(0);

  const dismiss = () => router.back();
  const dragGesture = Gesture.Pan()
    .activeOffsetY(8)
    .failOffsetX([-24, 24])
    .onUpdate(event => {
      translateY.value = Math.max(0, event.translationY);
    })
    .onEnd(event => {
      const shouldDismiss = event.translationY > 120 || event.velocityY > 900;

      if (shouldDismiss) {
        translateY.value = withTiming(
          SCREEN_HEIGHT,
          { duration: 220 },
          finished => {
            if (finished) runOnJS(dismiss)();
          }
        );
        return;
      }

      translateY.value = withSpring(0, { damping: 22, stiffness: 240 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
        <GestureDetector gesture={dragGesture}>
          <View collapsable={false}>
            <Grabber />
            <View style={styles.header}>
              <Pressable
                accessibilityLabel="返回"
                accessibilityRole="button"
                onPress={() => router.back()}
                style={({ pressed }) => [
                  styles.backButton,
                  pressed && styles.pressed,
                ]}>
                <SymbolView
                  name={{
                    ios: "chevron.backward",
                    android: "arrow_back_ios_new",
                    web: "arrow_back_ios_new",
                  }}
                  tintColor="#FFFFFF"
                  size={24}
                  weight="medium"
                />
              </Pressable>
              <ThemedText style={styles.headerTitle}>历史记录</ThemedText>
            </View>
          </View>
        </GestureDetector>

        <SectionList
          sections={HISTORY}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <HistoryRow item={item} />}
          renderSectionHeader={({ section }) => (
            <ThemedView style={styles.sectionHeader}>
              <ThemedText themeColor="textSecondary" style={styles.date}>
                {section.title}
              </ThemedText>
            </ThemedView>
          )}
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 24) }}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
        />
      </ThemedView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 54,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#191919",
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#202020",
  },
  headerTitle: { fontSize: 23, lineHeight: 30 },
  sectionHeader: { paddingHorizontal: 24, paddingTop: 18, paddingBottom: 12 },
  date: { fontSize: 18, lineHeight: 24 },
  row: {
    minHeight: 86,
    marginHorizontal: 24,
    marginBottom: 10,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  statusIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
  },
  tokenIconWrap: { width: 66, height: 58, justifyContent: "center" },
  primaryTokenIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#020304",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryTokenIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: "#212225",
    backgroundColor: "#6550FF",
    alignItems: "center",
    justifyContent: "center",
  },
  tokenLetter: { color: "#FFFFFF", fontSize: 16 },
  receiveBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#A994FF",
    alignItems: "center",
    justifyContent: "center",
  },
  details: { flexShrink: 0, marginLeft: 10 },
  rowTitle: { fontSize: 18, lineHeight: 24 },
  subtitle: { fontSize: 15, lineHeight: 22 },
  amounts: { flex: 1, alignItems: "flex-end", marginLeft: 8 },
  received: { color: "#00E65C", fontSize: 17, lineHeight: 24, textAlign: "right" },
  sent: { fontSize: 16, lineHeight: 23, textAlign: "right" },
  pressed: { opacity: 0.72 },
});
