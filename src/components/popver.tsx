import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  LayoutRectangle,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import ThemedText from "./themed-text";

const CONTENT_WIDTH = 180;
const CONTENT_GAP = 8;
const TRIANGLE_SIZE = 8;
const TRIANGLE_INSET = 10; // 你现在 triangle 的 left

interface PopverProviderProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface Props {
  width?: number;
  gap?: number;
  value: string;
  children: ReactNode;
  placement?: PopverPlacement;
  align?: PopverAlign;
}
type PopverPlacement = "left" | "right" | "top" | "bottom";
type PopverAlign = "start" | "center" | "end";

type PopverState = {
  value: string;
  anchor: LayoutRectangle;
  options: {
    width: number;
    gap: number;
    placement: PopverPlacement;
    align: PopverAlign;
  };
} | null;
type PopverContextValue = {
  measureanchor: (
    anchorRef: React.RefObject<View | null>,
    onMeasure: (layout: LayoutRectangle) => void
  ) => void;
  show: (popver: NonNullable<PopverState>) => void;
  hide: () => void;
};
const PopverContext = createContext<PopverContextValue | null>(null);

type PopverMetrics = {
  anchorLeft: number;
  anchorTop: number;
  anchorWidth: number;
  anchorHeight: number;
  anchorCenterX: number;
  anchorCenterY: number;
  providerWidth: number;
  providerHeight: number;
  popverWidth: number;
  popverHeight: number;
  gap: number;
  maxLeft: number;
  maxTop: number;
};

type ResolvedPlacement = {
  placement: PopverPlacement;
  align: PopverAlign;
};

export const PopverProvider: React.FC<PopverProviderProps> = ({ children }) => {
  const [popver, setPopver] = useState<PopverState>(null);
  const providerRef = useRef<View>(null);
  const [provider, setProvider] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [contentHeight, setContentHeight] = useState(0);

  const measureanchor = useCallback(
    (
      anchorRef: React.RefObject<View | null>,
      onMeasure: (layout: LayoutRectangle) => void
    ) => {
      if (!providerRef.current || !anchorRef.current) return;

      providerRef.current?.measure(
        (_x1, _y1, _width1, _height1, hostPageX, hostPageY) => {
          anchorRef.current?.measure(
            (_x2, _y2, width, height, anchorPageX, anchorPageY) => {
              onMeasure({
                x: anchorPageX - hostPageX,
                y: anchorPageY - hostPageY,
                width,
                height,
              });
            }
          );
        }
      );
    },
    []
  );

  const show = useCallback((popver: PopverState) => {
    setPopver(popver);
  }, []);
  const hide = useCallback(() => {
    setPopver(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      measureanchor,
      show,
      hide,
    }),
    [measureanchor, show, hide]
  );

  const contentStyle =
    popver && getContentStyle(popver, provider, contentHeight);
  const triangleStyle =
    popver && getTriangleStyle(popver, provider, contentHeight);

  return (
    <PopverContext.Provider value={contextValue}>
      <View
        ref={providerRef}
        testID="PopverProvider"
        style={styles.provider}
        onLayout={event => {
          setProvider({
            x: event.nativeEvent.layout.x,
            y: event.nativeEvent.layout.y,
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.width,
          });
        }}>
        {children}
        {popver ? (
          <Pressable style={styles.backdrop} onPress={hide}>
            <Pressable onPress={e => e.stopPropagation()}>
              <View
                style={[styles.content, contentStyle]}
                onLayout={event => {
                  setContentHeight(event.nativeEvent.layout.height);
                }}>
                <View style={[styles.triangle, triangleStyle]} />
                <ThemedText style={styles.contentText}>
                  {popver.value}
                </ThemedText>
              </View>
            </Pressable>
          </Pressable>
        ) : null}
      </View>
    </PopverContext.Provider>
  );
};

const Popver: React.FC<Props> = ({
  width = CONTENT_WIDTH,
  gap = CONTENT_GAP,
  value,
  children,
  placement = "bottom",
  align = "start",
}) => {
  // const [visible, setVisible] = useState(false);
  const anchorRef = useRef<View>(null);
  // const [anchor, setanchor] = useState<LayoutRectangle>(null);

  const context = useContext(PopverContext);

  const open = () => {
    if (!context) return;
    context.measureanchor(anchorRef, anchor => {
      context.show({
        value,
        anchor,
        options: {
          width,
          gap,
          placement,
          align,
        },
      });
    });
  };

  return (
    <View testID="Popver" style={styles.container}>
      <Pressable
        ref={anchorRef}
        hitSlop={8}
        style={styles.anchor}
        onPress={event => {
          event.stopPropagation();
          open();
        }}>
        {children}
      </Pressable>
    </View>
  );
};

const getMetrics = (
  popver: NonNullable<PopverState>,
  provider: LayoutRectangle,
  contentHeight: number
): PopverMetrics => {
  const anchorLeft = popver.anchor.x;
  const anchorTop = popver.anchor.y;
  const anchorWidth = popver.anchor.width;
  const anchorHeight = popver.anchor.height;
  const providerWidth = provider.width;
  const providerHeight = provider.height;
  const popverWidth = popver.options.width;
  const popverHeight = contentHeight;
  const gap = popver.options.gap;

  return {
    anchorLeft,
    anchorTop,
    anchorWidth,
    anchorHeight,
    anchorCenterX: anchorLeft + anchorWidth / 2,
    anchorCenterY: anchorTop + anchorHeight / 2,
    providerWidth,
    providerHeight,
    popverWidth,
    popverHeight,
    gap,
    maxLeft: Math.max(0, providerWidth - popverWidth),
    maxTop: Math.max(0, providerHeight - popverHeight),
  };
};

const resolvePlacement = (
  popver: NonNullable<PopverState>,
  metrics: PopverMetrics
): ResolvedPlacement => {
  const { placement, align } = popver.options;
  const {
    anchorLeft,
    anchorTop,
    anchorWidth,
    anchorHeight,
    providerWidth,
    providerHeight,
    popverWidth,
    popverHeight,
    gap,
  } = metrics;

  const leftSpace = anchorLeft - gap;
  const rightSpace = providerWidth - (anchorLeft + anchorWidth) - gap;
  const topSpace = anchorTop - gap;
  const bottomSpace = providerHeight - (anchorTop + anchorHeight) - gap;
  const canPlaceLeft = leftSpace >= popverWidth + TRIANGLE_SIZE;
  const canPlaceRight = rightSpace >= popverWidth + TRIANGLE_SIZE;
  const canPlaceTop = topSpace >= popverHeight + TRIANGLE_SIZE;
  const canPlaceBottom = bottomSpace >= popverHeight + TRIANGLE_SIZE;

  if (placement === "left" && !canPlaceLeft && canPlaceRight) {
    return { placement: "right", align };
  }

  if (placement === "right" && !canPlaceRight && canPlaceLeft) {
    return { placement: "left", align };
  }

  if (placement === "top" && !canPlaceTop && canPlaceBottom) {
    return { placement: "bottom", align };
  }

  if (placement === "bottom" && !canPlaceBottom && canPlaceTop) {
    return { placement: "top", align };
  }

  return { placement, align };
};

const getContentStyle = (
  popver: NonNullable<PopverState>,
  provider: LayoutRectangle,
  contentHeight: number
) => {
  const metrics = getMetrics(popver, provider, contentHeight);
  const { placement, align } = resolvePlacement(popver, metrics);
  const {
    anchorLeft,
    anchorTop,
    anchorWidth,
    anchorHeight,
    anchorCenterX,
    anchorCenterY,
    popverWidth,
    popverHeight,
    gap,
    maxLeft,
    maxTop,
  } = metrics;

  const horizontalTop = clamp(anchorCenterY - popverHeight / 2, 0, maxTop);
  const horizontalLeft = {
    left: anchorLeft - popverWidth - TRIANGLE_SIZE - gap,
    right: anchorLeft + anchorWidth + TRIANGLE_SIZE + gap,
  };
  const verticalLeft = {
    start: clamp(anchorCenterX - (TRIANGLE_INSET + TRIANGLE_SIZE), 0, maxLeft),
    center: clamp(anchorCenterX - popverWidth / 2, 0, maxLeft),
    end: clamp(
      anchorCenterX - popverWidth + (TRIANGLE_INSET + TRIANGLE_SIZE),
      0,
      maxLeft
    ),
  };
  const verticalTop = {
    top: anchorTop - popverHeight - gap,
    bottom: anchorTop + anchorHeight + gap,
  };

  if (placement === "left" || placement === "right") {
    return {
      left: clamp(horizontalLeft[placement], 0, maxLeft),
      top: horizontalTop,
      width: popverWidth,
    };
  }

  return {
    left: verticalLeft[align],
    top: clamp(verticalTop[placement], 0, maxTop),
    width: popverWidth,
  };
};

const getTriangleStyle = (
  popver: NonNullable<PopverState>,
  provider: LayoutRectangle,
  contentHeight: number
) => {
  const metrics = getMetrics(popver, provider, contentHeight);
  const { placement, align } = resolvePlacement(popver, metrics);
  const { popverWidth } = metrics;

  const triangleOverlap = 1;
  const triangleOffset = -TRIANGLE_SIZE + triangleOverlap;
  const horizontalTriangleTop = contentHeight / 2 - TRIANGLE_SIZE;
  const verticalTriangleOffset = {
    start: TRIANGLE_INSET,
    center: popverWidth / 2 - TRIANGLE_SIZE,
    end: TRIANGLE_INSET,
  };

  if (placement === "left" || placement === "right") {
    if (placement === "left") {
      return {
        right: triangleOffset,
        top: horizontalTriangleTop,
        borderTopWidth: TRIANGLE_SIZE,
        borderBottomWidth: TRIANGLE_SIZE,
        borderLeftWidth: TRIANGLE_SIZE,
        borderRightWidth: 0,
        borderLeftColor: "#fff",
        borderRightColor: "transparent",
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
      };
    }

    return {
      left: triangleOffset,
      top: horizontalTriangleTop,
      borderTopWidth: TRIANGLE_SIZE,
      borderBottomWidth: TRIANGLE_SIZE,
      borderLeftWidth: 0,
      borderRightWidth: TRIANGLE_SIZE,
      borderLeftColor: "transparent",
      borderRightColor: "#fff",
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
    };
  }

  if (placement === "top") {
    return {
      bottom: triangleOffset,
      ...(align === "end"
        ? { right: verticalTriangleOffset.end }
        : { left: verticalTriangleOffset[align] }),
      borderTopWidth: TRIANGLE_SIZE,
      borderLeftWidth: TRIANGLE_SIZE,
      borderRightWidth: TRIANGLE_SIZE,
      borderBottomWidth: 0,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderTopColor: "#fff",
      borderBottomColor: "transparent",
    };
  }

  return {
    top: triangleOffset,
    ...(align === "end"
      ? { right: verticalTriangleOffset.end }
      : { left: verticalTriangleOffset[align] }),
    borderTopWidth: 0,
    borderBottomWidth: TRIANGLE_SIZE,
    borderLeftWidth: TRIANGLE_SIZE,
    borderRightWidth: TRIANGLE_SIZE,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    borderBottomColor: "#fff",
  };
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const styles = StyleSheet.create({
  provider: {
    position: "relative",
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    zIndex: 100,
  },
  container: {
    position: "relative",
  },
  anchor: {
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    position: "absolute",
    zIndex: 99,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  triangle: {
    position: "absolute",
    width: 0,
    height: 0,
  },
  contentText: {
    color: "#111",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
export default Popver;
