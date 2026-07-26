import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const THUMB_SIZE = 44;
const HORIZONTAL_INSET = 10;

interface Props {}
type ConfirmationStatus = "idle" | "confirming";

const Slider: React.FC<Props> = () => {
  const [trackWidth, setTrackWidth] = React.useState(0);
  const [status, setStatus] = React.useState<ConfirmationStatus>("idle");
  const gestureLocked = useSharedValue(false);
  const translateX = useSharedValue<number>(0);

  const onConfirm = async () => {
    setStatus("confirming");
    let signature = "5e3f1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s"; // Replace with actual signature from sendSol()
    router.replace({
      pathname: "/send/success",
      params: {
        amount: "10",
        symbol: "SOL",
        explorerUrl: `https://solscan.io/tx/${signature}`,
      },
    });
    // setIsSubmitting(true);
    // try {
    //   await sendSol();
    //   navigation.navigate("TransferSuccess");
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const maxTranslateX = Math.max(
    0,
    trackWidth - THUMB_SIZE - HORIZONTAL_INSET * 2
  );

  const clamp = (value: number, min: number, max: number) => {
    "worklet";
    return Math.min(Math.max(value, min), max);
  };

  const tap = Gesture.Pan()
    .onBegin(() => {})
    .onUpdate(event => {
      if (gestureLocked.value) {
        return;
      }
      translateX.value = clamp(event.translationX, 0, maxTranslateX);
    })
    .onEnd(() => {
      const confirmed = translateX.value >= maxTranslateX * 0.85;

      if (confirmed) {
        gestureLocked.value = true;
        translateX.value = withSpring(maxTranslateX);
        scheduleOnRN(onConfirm);
      } else {
        translateX.value = withSpring(0);
      }
    })
    .onFinalize(() => {});

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: gestureLocked.value ? "#202020" : "#404145",
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  return (
    <GestureHandlerRootView>
      <Animated.View
        style={[styles.track, trackStyle]}
        onLayout={e => {
          setTrackWidth(e.nativeEvent.layout.width);
        }}>
        <Text style={styles.label}>
          {status === "confirming" ? "Confirming" : "Slide to confirm"}
        </Text>

        <GestureDetector gesture={tap}>
          <Animated.View style={[styles.btnBg, animatedStyle]}>
            <SymbolView
              name={{
                ios: "chevron.right",
                android: "chevron_right",
                web: "chevron_right",
              }}
              tintColor="#FFF"
              size={16}
            />
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  track: {
    borderRadius: 24,
    borderColor: "#D5D7DB",
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 6,
  },
  btnBg: {
    backgroundColor: "#F97316",
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#FFF",
    fontSize: 16,
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    top: 16,
  },
});
export default Slider;
