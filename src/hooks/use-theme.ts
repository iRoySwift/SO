import { Colors } from "@/constants/theme";
import { useColorScheme } from "./use-color-scheme";

export default function useTheme() {
  const scheme = useColorScheme();
  const theme = scheme === "unspecified" ? "light" : "dark";

  return Colors[theme];
}
