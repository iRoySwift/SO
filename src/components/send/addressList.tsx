import Address from "@/components/address";
import ThemedText from "@/components/themed-text";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface Props {
  title: string;
  action?: string;
  list: {
    id: string;
    name: string;
    address: string;
  }[];
  onPress?: (address: string) => void;
}
const AddressList: React.FC<Props> = ({ title, action, list, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="small" themeColor="text">
          {title}
        </ThemedText>
        {action && (
          <Pressable>
            <ThemedText type="small" themeColor="primary">
              {action}
            </ThemedText>
          </Pressable>
        )}
      </View>
      <View style={styles.list}>
        {list.map(i => (
          <Address
            key={i.id}
            name={i.name}
            address={i.address}
            onPress={onPress}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  list: {
    marginTop: 16,
    gap: 12,
  },
});
export default AddressList;
