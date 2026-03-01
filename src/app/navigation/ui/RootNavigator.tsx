import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomePage } from "../../../pages/WelcomePage";
import { RootStackParamList } from "../types";
import { MenuPage } from "../../../pages/MenuPage";
import { RulesPage } from "../../../pages/RulesPage";
import { SettingsPage } from "../../../pages/SettingsPage";
import { GamePage } from "../../../pages/GamePage";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomePage} />
      <Stack.Screen name="Menu" component={MenuPage} />
      <Stack.Screen name="Settings" component={SettingsPage} />
      <Stack.Screen name="Rules" component={RulesPage} />
      <Stack.Screen name="Game" component={GamePage} />
    </Stack.Navigator>
  );
}
