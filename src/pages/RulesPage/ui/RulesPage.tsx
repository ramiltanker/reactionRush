import React from "react";
import { Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../app";
import { COLORS } from "../../../shared/config";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

export function RulesPage() {
  const { t } = useTranslation();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.content} contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.title}>{t("rulesTitle")}</Text>
        <Text style={styles.text}>1. {t("rule1")}</Text>
        <Text style={styles.text}>2. {t("rule2")}</Text>
        <Text style={styles.text}>3. {t("rule3")}</Text>
        <Text style={styles.text}>4. {t("rule4")}</Text>
      </ScrollView>
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>{t("back")}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingVertical: 14,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: "700",
  },
  content: {
    paddingBottom: 40,
  },
  root: {
    backgroundColor: COLORS.background,
    flex: 1,
    paddingHorizontal: 24,
  },
  text: {
    color: COLORS.subtitle,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 16,
  },
});
