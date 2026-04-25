import Balance from "@/components/balance";
import ScreenContainer from "@/components/screen-container";
import ThemedText from "@/components/themed-text";
import TokenList from "@/components/token-list";
import { Spacing } from "@/constants/theme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScreenContainer>
      <Balance />
      <View style={styles.box}>
        <Pressable
          style={styles.btnBox}
          onPress={() => {
            router.push("/send");
          }}>
          <View style={styles.btn}>
            <Image
              source={require("@/assets/images/icons/money-send.png")}
              style={styles.btnIcon}
              contentFit="contain"
            />
          </View>
          <ThemedText type="small">Send</ThemedText>
        </Pressable>
        <View style={styles.btnBox}>
          <LinearGradient
            colors={["#0061FF", "#6100FF"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.btn}>
            <SymbolView
              name={{
                ios: "plus",
                android: "add",
                web: "add",
              }}
              tintColor="#FFF"
              size={34}
            />
          </LinearGradient>
          <ThemedText type="small">Buy</ThemedText>
        </View>

        <View style={styles.btnBox}>
          <View style={styles.btn}>
            <Image
              source={require("@/assets/images/icons/money-recive.png")}
              style={styles.btnIcon}
              contentFit="contain"
            />
          </View>
          <ThemedText type="small">Receive</ThemedText>
        </View>
      </View>
      <View style={styles.tokens}>
        <TokenList />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.five,
    marginHorizontal: 20,
  },
  btnBox: {
    flexDirection: "column",
    alignItems: "center",
    gap: Spacing.two,
    justifyContent: "center",
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
});
