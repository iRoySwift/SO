import Balance from "@/components/balance";
import ScreenContainer from "@/components/screen-container";
import ThemedText from "@/components/themed-text";
import TokenList from "@/components/token-list";
import { Spacing } from "@/constants/theme";
import * as Device from "expo-device";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
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
      <Balance />
      <View style={styles.btnBox}>
        <View style={styles.btn}>
          <Image
            source={require("@/assets/images/icons/money-send.png")}
            style={styles.btnIcon}
            contentFit="contain"
          />
        </View>
        <LinearGradient
          colors={["#0061FF", "#6100FF"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.btn}>
          <Image
            source={require("@/assets/images/icons/money-plus.png")}
            style={styles.btnIcon}
            contentFit="contain"
          />
        </LinearGradient>
        <View style={styles.btn}>
          <Image
            source={require("@/assets/images/icons/money-recive.png")}
            style={styles.btnIcon}
            contentFit="contain"
          />
        </View>
      </View>
      <View style={styles.tokens}>
        <TokenList />
      </View>
      {/* <ThemedText type="code" style={styles.code}>
        get started
      </ThemedText>
      <ThemedView type="backgroundElement" style={styles.stepContainer}>
        <HintRow
          title="Try editing"
          hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
        />
        <HintRow title="Dev tools" hint={getDevMenuHint()} />
      </ThemedView> */}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  btnBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.five,
    marginHorizontal: 20,
  },
  btn: {
    width: 76,
    height: 76,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A3547",
    borderRadius: 38,
  },
  btnIcon: {
    width: 34,
    height: 34,
  },
  tokens: {
    marginTop: 34,
    gap: 20,
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
