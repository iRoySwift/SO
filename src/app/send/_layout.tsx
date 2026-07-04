import { Stack } from "expo-router";

export default function SendLayout() {
  return (
    // <PopverProvider>
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    />
    // </PopverProvider>
  );
}
