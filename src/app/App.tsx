import React, { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigator } from "./navigation/ui/RootNavigator";
import { initI18n } from "../shared/config/i18n/i18n";
import { useSettingsStore } from "../entities/Settings";

function App() {
  const [ready, setReady] = useState(false);
  const hasHydrated = useSettingsStore((s) => s.hasHydrated);

  useEffect(() => {
    initI18n().finally(() => setReady(true));
  }, []);

  if (!ready || !hasHydrated) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export { App };
