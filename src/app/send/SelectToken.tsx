import ThemedText from "@/components/themed-text";
import React from "react";
import { View } from "react-native";

interface Props {}
const Send: React.FC<Props> = () => {
  return (
    <View>
      <ThemedText>Send</ThemedText>
    </View>
  );
};
export default Send;
