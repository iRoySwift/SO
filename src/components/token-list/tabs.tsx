import { Spacing } from "@/constants/theme";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "../themed-text";

interface Props {
  activeTab: "tokens" | "nfts";
  setActiveTab: (tab: "tokens" | "nfts") => void;
}
const Tabs: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const handleTabPress = (tab: "tokens" | "nfts") => {
    setActiveTab(tab);
  };
  return (
    <View style={styles.tabs}>
      <TouchableOpacity
        style={[styles.tab, activeTab === "tokens" && styles.active]}
        onPress={() => handleTabPress("tokens")}
        disabled={activeTab === "tokens"}>
        <ThemedText
          style={[styles.text, activeTab === "tokens" && styles.activeText]}>
          Tokens
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === "nfts" && styles.active]}
        onPress={() => handleTabPress("nfts")}
        disabled={activeTab === "nfts"}>
        <ThemedText
          style={[styles.text, activeTab === "nfts" && styles.activeText]}>
          NFTs
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  tabs: {
    height: 47,
    backgroundColor: "#212436",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.one,
  },
  tab: {
    height: 39,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  active: {
    backgroundColor: "#3B3F58",
  },
  text: {
    color: "#7C7D82",
  },
  activeText: {
    color: "#E9E9E9",
  },
});
export default Tabs;
