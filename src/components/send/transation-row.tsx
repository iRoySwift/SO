import { SymbolView } from "expo-symbols";
import React from "react";
import { StyleSheet, View } from "react-native";
import Popver from "../popver";
import ThemedText from "../themed-text";

interface Props {
  label: string;
  value: string;
  desc?: string;
}
const TransationRow: React.FC<Props> = ({ label, value, desc }) => {
  return (
    <View
      style={[styles.transationRow, desc?.length ? styles.activeRow : null]}>
      <View style={styles.line}>
        <ThemedText type="small" themeColor="textSecondary">
          {label}
        </ThemedText>
        {desc?.length ? (
          <Popver placement="left" value={desc}>
            <SymbolView
              name={{
                ios: "info.circle",
                android: "info",
                web: "info",
              }}
              tintColor="#FFF"
              size={12}
            />
          </Popver>
        ) : null}
      </View>
      <ThemedText type="small" themeColor="textSecondary">
        {value}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  transationRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  activeRow: {
    position: "relative",
    zIndex: 10,
    elevation: 1,
  },
  line: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
export default TransationRow;
