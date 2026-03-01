import React from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { RootStackParamList } from "../../../app";
import { LanguageSwitch } from "../../../features/LanguageSwitch";
import { COLORS } from "../../../shared/config";
import { DifficultySwitch } from "../../../features/DifficultySwitch";

export function SettingsPage() {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
      <Text style={styles.title}>{t("settingsTitle")}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>{t("language")}</Text>
        <LanguageSwitch />
      </View>

      <View style={[styles.card, styles.cardSpacing]}>
        <Text style={styles.label}>{t("difficulty")}</Text>
        <DifficultySwitch />
      </View>

      <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{t("back")}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    marginTop: 16,
    paddingVertical: 14,
  },
  backText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: "700",
  },
  card: {
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
  },
  cardSpacing: {
    marginTop: 12,
  },
  label: {
    color: COLORS.subtitle,
    fontSize: 14,
    marginBottom: 10,
  },
  root: {
    backgroundColor: COLORS.background,
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 16,
  },
});
