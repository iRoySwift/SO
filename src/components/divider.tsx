import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface Props {
  color?: string;
  thickness?: number;
  spacing?: number;
  style?: ViewStyle;
}

const Divider: React.FC<Props> = ({
  color = "#212436",
  thickness = StyleSheet.hairlineWidth,
  spacing = 0,
  style,
}) => {
  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: color,
          height: thickness,
          marginVertical: spacing,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    width: "100%",
  },
});

export default Divider;
