import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, APP_NAME } from "../../../shared/config";

export function MenuPage() {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{APP_NAME}</Text>

      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Play</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.secondary]} onPress={() => {}}>
        <Text style={[styles.buttonText, styles.secondaryText]}>Leaderboard</Text>
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
