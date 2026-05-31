import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {}
const Grabber: React.FC<Props> = () => {
  return (
    <>
      <View style={styles.grabberWrapper}>
        <View style={styles.grabber} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  grabberWrapper: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 14,
  },
  grabber: {
    width: 36,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#7A7F8C",
  },
});
export default Grabber;
