import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Difficulty } from "../types";

type SettingsState = {
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;

  /** Флаг, чтобы понимать, что persist уже восстановил данные из AsyncStorage */
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      difficulty: Difficulty.EASY,
      setDifficulty: (d) => set({ difficulty: d }),

      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: "app_settings",
      storage: createJSONStorage(() => AsyncStorage),

      // Когда zustand восстановит state из AsyncStorage — поставим флаг
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
