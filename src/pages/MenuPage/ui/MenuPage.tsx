import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../shared/config";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../app";

import { useTranslation } from "react-i18next";
import { useMenuMusic } from "../lib/hooks";

export function MenuPage() {
  const { t } = useTranslation();

  const isFocused = useIsFocused();

  useMenuMusic(isFocused);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{t("appName")}</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate("Game")}>
        <Text style={styles.buttonText}>{t("play")}</Text>
      </Pressable>
      <Pressable style={[styles.button, styles.secondary]} onPress={() => {}}>
        <Text style={[styles.buttonText, styles.secondaryText]}>{t("leaderboard")}</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.secondary]}
        onPress={() => navigation.navigate("Settings")}
      >
        <Text style={[styles.buttonText, styles.secondaryText]}>{t("settingsTitle")}</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.secondary]}
        onPress={() => navigation.navigate("Rules")}
      >
        <Text style={[styles.buttonText, styles.secondaryText]}>{t("rules")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    maxWidth: 320,
    paddingVertical: 14,
    width: "100%",
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: "700",
  },
  root: {
    alignItems: "center",
    backgroundColor: COLORS.background,
    flex: 1,
    gap: 12,
    justifyContent: "center",
    padding: 24,
  },
  secondary: {
    backgroundColor: COLORS.backgroundSecondary,
  },
  secondaryText: {
    color: COLORS.white,
  },
  title: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 16,
  },
});
