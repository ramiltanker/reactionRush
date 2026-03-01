import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import i18n, { setAppLanguage } from "../../../shared/config/i18n/i18n";
import { COLORS } from "../../../shared/config";

type Lang = "ru" | "en";

type OptionProps = {
  active: boolean;
  label: string;
  onPress: () => void;
};

function Option({ active, label, onPress }: OptionProps) {
  return (
    <Pressable style={[styles.langBtn, active ? styles.active : styles.inactive]} onPress={onPress}>
      <Text style={[styles.langText, active ? styles.activeText : styles.inactiveText]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function LanguageSwitch() {
  const { t } = useTranslation();
  const [lang, setLang] = useState<Lang>((i18n.language as Lang) || "en");

  useEffect(() => {
    const onChange = (lng: string) => setLang(lng === "ru" ? "ru" : "en");
    i18n.on("languageChanged", onChange);
    return () => i18n.off("languageChanged", onChange);
  }, []);

  const changeLang = async (next: Lang) => {
    if (next === lang) return;
    await setAppLanguage(next);
    setLang(next);
  };

  return (
    <View style={styles.row}>
      <Option active={lang === "ru"} label={t("russian")} onPress={() => changeLang("ru")} />
      <Option active={lang === "en"} label={t("english")} onPress={() => changeLang("en")} />
    </View>
  );
}

const styles = StyleSheet.create({
  active: { backgroundColor: COLORS.white },
  activeText: { color: COLORS.background },
  inactive: { backgroundColor: COLORS.overlayLight },
  inactiveText: { color: COLORS.white },
  langBtn: {
    alignItems: "center",
    borderRadius: 12,
    flex: 1,
    paddingVertical: 12,
  },
  langText: { fontSize: 14, fontWeight: "700" },
  row: { flexDirection: "row", gap: 10 },
});
