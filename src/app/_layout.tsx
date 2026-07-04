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
    <ThemeProvider value={themedNavigationTheme}>
      {/* <PopverProvider> */}
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
      {/* </PopverProvider> */}
    </ThemeProvider>
  );
}
