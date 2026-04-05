import AnimatedIcon from "@/components/animated-icon";
import HintRow from "@/components/hint-row";
import ScreenContainer from "@/components/screen-container";
import ThemedText from "@/components/themed-text";
import ThemedView from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import * as Device from "expo-device";
import { Platform, StyleSheet, View } from "react-native";

function getDevMenuHint() {
  if (Platform.OS === "web") {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";

  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  return (
    <ScreenContainer>
      <View style={styles.heroSection}>
        <AnimatedIcon />
        <ThemedText type="title" style={styles.title}>
          Welcome to&nbsp;Expo
        </ThemedText>
      </View>
      <ThemedText type="code" style={styles.code}>
        get started
      </ThemedText>
      <ThemedView type="backgroundElement" style={styles.stepContainer}>
        <HintRow
          title="Try editing"
          hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
        />
        <HintRow title="Dev tools" hint={getDevMenuHint()} />
      </ThemedView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
    alignSelf: "stretch",
  },
});
