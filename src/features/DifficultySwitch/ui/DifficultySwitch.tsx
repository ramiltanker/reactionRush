import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Difficulty, DIFFICULTY_OPTIONS, useSettingsStore } from "../../../entities/Settings";
import { COLORS } from "../../../shared/config";

interface OptionProps {
  active: boolean;
  label: string;
  onPress: () => void;
}

function Option({ active, label, onPress }: OptionProps) {
  return (
    <Pressable style={[styles.btn, active ? styles.active : styles.inactive]} onPress={onPress}>
      <Text style={[styles.text, active ? styles.textActive : styles.textInactive]}>{label}</Text>
    </Pressable>
  );
}

export function DifficultySwitch() {
  const { t } = useTranslation();
  const difficulty = useSettingsStore((s) => s.difficulty);
  const setDifficulty = useSettingsStore((s) => s.setDifficulty);

  const set = (d: Difficulty) => {
    return () => {
      if (d === difficulty) return;
      setDifficulty(d);
    };
  };

  return (
    <View style={styles.row}>
      {DIFFICULTY_OPTIONS.map((level) => (
        <Option key={level} active={difficulty === level} label={t(level)} onPress={set(level)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  active: { backgroundColor: COLORS.white },
  btn: { alignItems: "center", borderRadius: 12, flex: 1, paddingVertical: 12 },
  inactive: { backgroundColor: COLORS.overlayLight },
  row: { flexDirection: "row", gap: 10 },
  text: { fontSize: 14, fontWeight: "700" },
  textActive: { color: COLORS.background },
  textInactive: { color: COLORS.white },
});
