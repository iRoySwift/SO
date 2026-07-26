import ThemedText from "@/components/themed-text";
import ThemedView from "@/components/themed-view";
import useTheme from "@/hooks/use-theme";
import { router, useLocalSearchParams } from "expo-router";
import { SymbolView } from "expo-symbols";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DEFAULT_EXPLORER_URL = "https://solscan.io";

function firstParam(value: string | string[] | undefined, fallback: string) {
  return Array.isArray(value) ? value[0] || fallback : value || fallback;
}

export default function Success() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    amount?: string | string[];
    symbol?: string | string[];
    explorerUrl?: string | string[];
  }>();

  const amount = firstParam(params.amount, "10");
  const symbol = firstParam(params.symbol, "SOL");
  const explorerUrl = firstParam(params.explorerUrl, DEFAULT_EXPLORER_URL);

  const handleDone = useCallback(() => {
    router.dismissTo("/");
  }, []);

  const handleViewOnExplorer = useCallback(async () => {
    if (!/^https?:\/\//i.test(explorerUrl)) return;
    await WebBrowser.openBrowserAsync(explorerUrl);
  }, [explorerUrl]);

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: Math.max(insets.bottom, 24),
        },
      ]}>
      <View style={styles.result}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: colors.backgroundSelected },
          ]}>
          <SymbolView
            name={{ ios: "checkmark", android: "check", web: "check" }}
            size={64}
            tintColor="#34C759"
            weight="bold"
          />
        </View>

        <ThemedText style={styles.title}>Successful!</ThemedText>
        <ThemedText
          themeColor="textSecondary"
          style={styles.description}>
          You successfully sent {amount} {symbol}. It will be deposited in the
          recipient wallet shortly
        </ThemedText>
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={handleDone}
          style={({ pressed }) => [
            styles.button,
            styles.doneButton,
            pressed && styles.buttonPressed,
          ]}>
          <ThemedText style={styles.doneButtonText}>Done</ThemedText>
        </Pressable>

        <Pressable
          accessibilityRole="link"
          onPress={handleViewOnExplorer}
          style={({ pressed }) => [
            styles.button,
            styles.explorerButton,
            pressed && styles.buttonPressed,
          ]}>
          <ThemedText style={styles.explorerButtonText}>
            View on explorer
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
  result: {
    flex: 1,
    alignItems: "center",
    paddingTop: "23%",
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "#34C759",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
  },
  title: {
    fontFamily: "Urbanist_500Medium",
    fontSize: 22,
    lineHeight: 28,
    textAlign: "center",
    marginBottom: 22,
  },
  description: {
    maxWidth: 460,
    fontFamily: "Urbanist_500Medium",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
  actions: {
    width: "100%",
    maxWidth: 580,
    alignSelf: "center",
    gap: 13,
  },
  button: {
    width: "100%",
    height: 49,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  doneButton: {
    backgroundColor: "#FF6B0A",
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
  },
  explorerButton: {
    backgroundColor: "#FFFFFF",
  },
  explorerButtonText: {
    color: "#080808",
    fontSize: 16,
    lineHeight: 22,
  },
  buttonPressed: {
    opacity: 0.78,
  },
});
