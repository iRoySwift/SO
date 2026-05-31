import Divider from "@/components/divider";
import Grabber from "@/components/grabber";
import ModalHeader from "@/components/modal-header";
import ThemedText from "@/components/themed-text";
import useTheme from "@/hooks/use-theme";
import { normalizeAmountInput } from "@/utils/common";
import { router, useLocalSearchParams } from "expo-router";
import { SymbolView } from "expo-symbols";
import React, { useCallback, useState } from "react";
import {
  Keyboard,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface Props {}

const Send: React.FC<Props> = () => {
  const [amount, setAmount] = useState("");
  const [amountWidth, setAmountWidth] = useState(24);
  const { address } = useLocalSearchParams<{ address: string }>();
  const amountFontSize = amount.length > 20 ? 20 : amount.length > 10 ? 30 : 40;
  const amountDisplayText = amount || "0";
  const theme = useTheme();

  const handlePress = useCallback(
    (str?: string) => {
      if (str || address) {
        router.push({ pathname: "/send", params: { address: str || address } });
      }
    },
    [address]
  );

  const handleChangeText = useCallback((text: string) => {
    setAmount(normalizeAmountInput(text));
  }, []);

  const handleAmountMeasure = useCallback((event: LayoutChangeEvent) => {
    setAmountWidth(Math.ceil(event.nativeEvent.layout.width));
  }, []);

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Grabber />
      <ModalHeader title="Send SOL" onNextPress={handlePress} />
      <View style={styles.addressWrap}>
        <View style={styles.toRight}>
          <ThemedText
            style={{ marginRight: 10 }}
            type="small"
            themeColor="text">
            To :
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {address}
          </ThemedText>
        </View>
      </View>
      <Divider spacing={10} />
      <View style={styles.centerPriceWrap}>
        <View style={styles.priceInfoWrap}>
          <View style={styles.priceInfo}>
            <Text
              style={[
                styles.amountMeasure,
                styles.amountValue,
                { fontSize: amountFontSize },
              ]}
              onLayout={handleAmountMeasure}>
              {amountDisplayText}
            </Text>
            <TextInput
              style={[
                styles.amountValue,
                { fontSize: amountFontSize, width: amountWidth },
              ]}
              placeholderTextColor="#7E8085"
              autoFocus
              keyboardType="decimal-pad"
              placeholder="0"
              value={amount}
              onChangeText={handleChangeText}
            />
            <ThemedText
              style={{ fontSize: amountFontSize }}
              type="title"
              themeColor="textSecondary">
              SOL
            </ThemedText>
          </View>
          <ThemedText type="xlarge" themeColor="textSecondary">
            ~$1323
          </ThemedText>
        </View>
        <View style={styles.priceInfoSwapBtn}>
          <SymbolView
            name={{
              ios: "arrow.up.arrow.down",
              android: "swap_vert",
              web: "swap_vert",
            }}
            tintColor="#FFF"
            size={16}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.remainingWrap}>
          <View>
            <ThemedText type="xsmall" themeColor="textSecondary">
              可用余额
            </ThemedText>
            <ThemedText type="xxsmall" themeColor="textSecondary">
              329.27SOL
            </ThemedText>
          </View>
          <Pressable>
            <ThemedText type="small" themeColor="primary">
              MAX
            </ThemedText>
          </Pressable>
        </View>
        <Divider spacing={10} />
        <Pressable
          style={{ ...styles.nextButton, backgroundColor: theme.primary }}>
          <ThemedText themeColor="text" style={styles.nextButtonText}>
            下一步
          </ThemedText>
        </Pressable>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addressWrap: {
    marginHorizontal: 20,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  centerPriceWrap: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    position: "relative",
  },
  priceInfoWrap: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  priceInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
    gap: 10,
  },
  amountValue: {
    fontSize: 40,
    color: "#FFF",
    minWidth: 24,
    // maxWidth: "80%",
    paddingHorizontal: 0,
    paddingVertical: 0,
    textAlign: "right",
  },
  amountMeasure: {
    position: "absolute",
    opacity: 0,
    zIndex: -1,
  },
  priceInfoSwapBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: "#404145",
    position: "absolute",
    right: 20,
  },
  footer: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  remainingWrap: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  nextButton: {
    height: 48,
    width: "80%",
    marginHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Send;
