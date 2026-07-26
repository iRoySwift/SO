import useTheme from "@/hooks/use-theme";
import {
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
  useFonts,
} from "@expo-google-fonts/urbanist";
import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = useTheme();

  const [loaded, error] = useFonts({
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
  });

  if (!loaded && !error) {
    return null;
  }
  const navigationTheme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  const themedNavigationTheme = {
    ...navigationTheme,
    colors: {
      ...navigationTheme.colors,
      background: colors.background,
      card: colors.background,
    },
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={themedNavigationTheme}>
        {/* <PopverProvider> */}
        <Stack
          screenOptions={{
            headerShown: false,
            headerShadowVisible: false,
          }}>
          <Stack.Screen name="(drawer)" />
          <Stack.Screen
            name="history"
            options={{
              presentation: "transparentModal",
              headerShown: false,
              animation: "slide_from_bottom",
              contentStyle: { backgroundColor: "transparent" },
            }}
          />
          <Stack.Screen
            name="send"
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
        </Stack>
        {/* </PopverProvider> */}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
