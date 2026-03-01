import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LANGUAGE_KEY = "app_lang";

const resources = {
  en: {
    translation: {
      appName: "Reaction Rush",
      play: "Play",
      settings: "Settings",
      language: "Language",
      leaderboard: "Leaderboard",
      rules: "Rules",
      rulesTitle: "Game Rules",
      rule1: "Wait for the screen to turn green.",
      rule2: "As soon as it turns green — tap as fast as you can.",
      rule3: "Your reaction time will be measured in milliseconds.",
      rule4: "If you tap too early — you lose the round.",
      back: "Back",
      settingsTitle: "Settings",
      difficulty: "Difficulty",
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
      score: "Score",
      result: "Result",
      retry: "Retry",
      misses: "Misses",
      time: "Time",
      russian: "Russian",
      english: "English",
      combo: "Combo",
    },
  },
  ru: {
    translation: {
      appName: "Reaction Rush",
      play: "Играть",
      settings: "Настройки",
      language: "Язык",
      rules: "Правила",
      rulesTitle: "Правила игры",
      leaderboard: "Таблица лидеров",
      rule1: "Дождитесь, пока экран станет зелёным.",
      rule2: "Как только он станет зелёным — нажмите как можно быстрее.",
      rule3: "Ваша реакция измеряется в миллисекундах.",
      rule4: "Если нажмёте слишком рано — раунд проигран.",
      settingsTitle: "Настройки",
      difficulty: "Сложность",
      easy: "Легкий",
      medium: "Средний",
      hard: "Сложный",
      score: "Счет",
      result: "Результат",
      misses: "Промахи",
      time: "Время",
      retry: "Попробовать еще",
      russian: "Русский",
      english: "Английский",
      back: "Назад",
      combo: "Комбо",
    },
  },
} as const;

export async function initI18n() {
  const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
  const lng = saved === "ru" || saved === "en" ? saved : "en";

  await i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: "en",
    compatibilityJSON: "v4",
    interpolation: { escapeValue: false },
  });

  return i18n;
}

export async function setAppLanguage(lng: "ru" | "en") {
  await AsyncStorage.setItem(LANGUAGE_KEY, lng);
  await i18n.changeLanguage(lng);
}

export default i18n;
