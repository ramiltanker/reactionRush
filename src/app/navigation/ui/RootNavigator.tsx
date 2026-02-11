import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomePage } from "../../../pages/WelcomePage";
import { RootStackParamList } from "../types";
import { MenuPage } from "../../../pages/MenuPage";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomePage} />
      <Stack.Screen name="Menu" component={MenuPage} />
    </Stack.Navigator>
  );
}
