import ThemedText from "@/components/themed-text";
import useTheme from "@/hooks/use-theme";
import CommunityBottomSheet, {
  BottomSheetView,
} from "@expo/ui/community/bottom-sheet";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Grabber from "../grabber";
import Popver, { PopverProvider } from "../popver";
import TransationRow from "./transation-row";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export interface BottomSheetModalRef {
  open: (index?: number) => void;
  close: () => void;
}
const SendTransactionSheet = forwardRef<BottomSheetModalRef>((props, ref) => {
  const sheetRef = useRef<CommunityBottomSheet>(null);
  const colors = useTheme();

  useImperativeHandle(ref, () => ({
    open: (index = 0) => sheetRef.current?.snapToIndex(index),
    close: () => sheetRef.current?.close(),
  }));

  return (
    <CommunityBottomSheet
      ref={sheetRef}
      snapPoints={["70%"]}
      index={-1}
      onChange={index => {
        console.log("onChange", index);
      }}
      onClose={() => {
        sheetRef.current?.close();
        console.log("closed");
      }}
      style={styles.sheetContainer}
      handleComponent={null}
      backgroundStyle={{ backgroundColor: colors.background }}
      enablePanDownToClose>
      <BottomSheetView style={styles.container}>
        <PopverProvider>
          <Grabber />
          <View style={styles.contentContainer}>
            <View style={styles.priceInfoWrap}>
              <View
                style={{
                  // width: "100%",
                  // justifyContent: "flex-end",
                  flexDirection: "row",
                }}>
                <Popver
                  placement="top"
                  align="end"
                  value={"You are sending network fee est. about 2 minutes"}>
                  <ThemedText type="small" themeColor="textSecondary">
                    You are sending
                  </ThemedText>
                </Popver>
              </View>
              <View style={styles.priceInfo}>
                <Text style={styles.amountValue}>0</Text>
                <ThemedText
                  style={{ fontSize: 40 }}
                  type="title"
                  themeColor="textSecondary">
                  SOL
                </ThemedText>
              </View>
              <ThemedText type="xlarge" themeColor="textSecondary">
                ~$1323
              </ThemedText>
            </View>
            <View style={styles.transationInfoWrap}>
              <TransationRow label="Recipient" value="XOhhsu...euHcPj" />
              <TransationRow label="Send time" value="est. about 2 minutes" />
              <TransationRow
                label="Network fee"
                desc="network fee est. about 2 minutes"
                value="0.005 SOL"
              />
              <TransationRow label="Total" value="10.005 SOL" />
            </View>
          </View>
        </PopverProvider>
      </BottomSheetView>
    </CommunityBottomSheet>
  );
});
SendTransactionSheet.displayName = "SendTransactionSheet";

const styles = StyleSheet.create({
  sheetContainer: {
    // 强行覆盖可能存在的默认左右 margin
    left: 0,
    right: 0,
    width: SCREEN_WIDTH,
  },
  container: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    width: "100%", // 确保内部子代币列表/表单等组件能吃到 100% 的宽度
    flex: 1,
    padding: 24,
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
    marginTop: 10,
  },
  amountValue: {
    fontSize: 40,
    color: "#FFF",
    textAlign: "right",
  },
  transationInfoWrap: {
    borderColor: "#404145",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 20,
  },
  transationRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default SendTransactionSheet;
