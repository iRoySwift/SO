import ThemedText from "@/components/themed-text";
import { BottomTabInset, TopTabInset } from "@/constants/theme";
import useTheme from "@/hooks/use-theme";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Drawer,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "expo-router/drawer";
import { SymbolView } from "expo-symbols";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DrawerLayout() {
  const colors = useTheme();

  return (
    <Drawer
      drawerContent={props => <AccountDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        overlayColor: "rgba(0, 0, 0, 0.45)",
        drawerStyle: {
          width: 300,
          backgroundColor: colors.background,
        },
        drawerLabelStyle: {
          color: "#fff",
          fontSize: 16,
          fontWeight: "600",
        },
        drawerItemStyle: {
          marginHorizontal: 0,
          borderRadius: 12,
          backgroundColor: "#212436",
        },
        drawerActiveTintColor: "#0AFF96",
        drawerInactiveTintColor: "#A0A0A0",
        drawerActiveBackgroundColor: "#2E3135",
        drawerInactiveBackgroundColor: "transparent",
        sceneStyle: {
          backgroundColor: "red",
        },
      }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          title: "Home",
        }}
      />
    </Drawer>
  );
}

function AccountDrawerContent(props: any) {
  const colors = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.drawerContent,
        {
          paddingTop: insets.top + TopTabInset,
          paddingBottom: insets.bottom + BottomTabInset,
        },
      ]}>
      <View style={styles.accountHeader}>
        <LinearGradient
          colors={["#0AFF96", "#00E0FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatarBorder}>
          <View style={styles.avatar} />
        </LinearGradient>
        <View style={styles.accountText}>
          <ThemedText type="large">Account_1</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Wallet menu
          </ThemedText>
        </View>
      </View>
      {/* 默认 drawerLabel 列表 */}
      <View style={styles.menu}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="History"
          onPress={() => router.push("/history")}
          labelStyle={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "600",
          }}
          style={{
            marginHorizontal: 0,
            borderRadius: 12,
            backgroundColor: "#212436",
          }}
          activeTintColor="#0AFF96"
          inactiveTintColor="#A0A0A0"
          activeBackgroundColor="#2E3135"
          inactiveBackgroundColor="transparent"
          icon={({ color, size }) => (
            <SymbolView
              name={{
                ios: "clock.arrow.circlepath",
                android: "history",
                web: "history",
              }}
              tintColor={color}
              size={size}
            />
          )}
        />
      </View>
      <View
        style={[styles.section, { borderTopColor: colors.backgroundElement }]}>
        <ThemedText type="small">Settings</ThemedText>
        <ThemedText type="small">Security</ThemedText>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingHorizontal: 22,
    justifyContent: "space-between",
  },
  accountHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 18,
  },
  avatarBorder: {
    padding: 1,
    borderRadius: 25,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0F111E",
  },
  accountText: {
    gap: 2,
  },
  menu: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    gap: 12,
  },
  section: {
    gap: 18,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 22,
  },
});
