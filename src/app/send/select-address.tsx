import Divider from "@/components/divider";
import Grabber from "@/components/grabber";
import ModalHeader from "@/components/modal-header";
import AddressList from "@/components/send/addressList";
import ThemedText from "@/components/themed-text";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import React, { useCallback, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {}

const ADDRESS_LIST = Array.from({ length: 20 }).map((_, i) => ({
  id: i + "",
  name: `Address ${i + 1}`,
  address: `0x${(i + 1).toString(16).padStart(8, "0")}`,
}));

const SelectAddress: React.FC<Props> = () => {
  const insets = useSafeAreaInsets();
  const [address, setAddress] = useState("");

  const handlePress = useCallback(
    (str?: string) => {
      if (str || address) {
        router.push({ pathname: "/send/input-amount", params: { address: str || address } });
      }
    },
    [address]
  );

  return (
    <View testID="SelectAddress" style={styles.container}>
      <Grabber />
      <ModalHeader title="Send SOL" onNextPress={handlePress} />
      <View style={styles.inputArea}>
        <View style={styles.toRight}>
          <ThemedText
            style={{ marginRight: 10 }}
            type="small"
            themeColor="text">
            To :
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Entry Address"
            placeholderTextColor="#7E8085"
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <View>
          <SymbolView
            name={{
              ios: "qrcode.viewfinder",
              android: "qr_code_scanner",
              web: "qr_code_scanner",
            }}
            tintColor="#FFF"
            size={16}
          />
        </View>
      </View>
      <Divider spacing={10} />
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={[{ paddingBottom: insets.bottom }]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <AddressList
          title="Recent Addresses"
          action="View all"
          list={ADDRESS_LIST.slice(0, 5)}
          onPress={handlePress}
        />
        <Divider spacing={10} />
        <AddressList
          title="My saved address"
          list={ADDRESS_LIST}
          onPress={handlePress}
        />
      </Animated.ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputArea: {
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
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    fontSize: 12,
    paddingVertical: 10,
    color: "#FFF",
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
    marginTop: 16,
  },
});

export default SelectAddress;
