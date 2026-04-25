import { AnimatedSplashOverlay } from "@/components/animated-icon";
import useTheme from "@/hooks/use-theme";
import {
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
  useFonts,
} from "@expo-google-fonts/urbanist";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = useTheme();

  const [loaded, error] = useFonts({
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

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
    <ThemeProvider value={themedNavigationTheme}>
      <AnimatedSplashOverlay />
      <Stack
        screenOptions={{
          headerShown: false,
          headerShadowVisible: false,
        }}>
        <Stack.Screen name="(tab)" />
        <Stack.Screen
          name="send"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
