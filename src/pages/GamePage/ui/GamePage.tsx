import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, LayoutChangeEvent } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { RootStackParamList } from "../../../app";
import { DIFFICULTY_PRESETS, useSettingsStore } from "../../../entities/Settings";
import { COLORS } from "../../../shared/config";
import { AnimatedDot } from "../../../entities/Game";
import LinearGradient from "react-native-linear-gradient";

type Dot = { id: string; x: number; y: number; expiresAt: number };

const ROUND_MS = 30_000;
const MAX_MISSES = 3;
const TICK_MS = 50;

export function GamePage() {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const difficulty = useSettingsStore((s) => s.difficulty);
  const preset = useMemo(() => DIFFICULTY_PRESETS[difficulty], [difficulty]);

  const [arena, setArena] = useState({ w: 0, h: 0 });
  const [dots, setDots] = useState<Dot[]>([]);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [streak, setStreak] = useState(0);
  const [multi, setMulti] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_MS);
  const [phase, setPhase] = useState<"play" | "end">("play");

  const startedAtRef = useRef<number>(0);
  const spawnTimer = useRef<ReturnType<typeof setInterval>>(null);
  const tickTimer = useRef<ReturnType<typeof setInterval>>(null);

  const clearTimers = () => {
    if (spawnTimer.current) clearInterval(spawnTimer.current);
    if (tickTimer.current) clearInterval(tickTimer.current);
    spawnTimer.current = null;
    tickTimer.current = null;
  };

  const reset = () => {
    clearTimers();
    startedAtRef.current = Date.now();
    setDots([]);
    setScore(0);
    setMisses(0);
    setStreak(0);
    setMulti(1);
    setTimeLeft(ROUND_MS);
    setPhase("play");
  };

  const endRound = () => {
    clearTimers();
    setPhase("end");
  };

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setArena({ w: width, h: height });
  };

  const spawnDot = () => {
    if (phase !== "play") return;
    if (arena.w === 0 || arena.h === 0) return;

    setDots((prev) => {
      if (prev.length >= preset.maxDots) return prev;

      const now = Date.now();
      const size = preset.dotSize;

      const maxX = Math.max(0, arena.w - size);
      const maxY = Math.max(0, arena.h - size);

      const x = Math.floor(Math.random() * (maxX + 1));
      const y = Math.floor(Math.random() * (maxY + 1));

      const id = `${now}_${Math.random().toString(16).slice(2)}`;
      return [...prev, { id, x, y, expiresAt: now + preset.lifeMs }];
    });
  };

  const hitDot = (id: string) => {
    if (phase !== "play") return;

    setDots((prev) => prev.filter((d) => d.id !== id));

    setStreak((prev) => {
      const next = prev + 1;
      const nextMult = calcMulti(next);

      setMulti(nextMult);
      setScore((s) => s + nextMult);

      return next;
    });
  };

  const calcMulti = (nextStreak: number) => {
    if (nextStreak >= 15) return 4;
    if (nextStreak >= 10) return 3;
    if (nextStreak >= 5) return 2;
    return 1;
  };

  const addMisses = (count: number) => {
    if (count <= 0) return;
    setMisses((m) => m + count);
    setStreak(0);
    setMulti(1);
  };

  // стартуем заново при заходе на экран или смене сложности
  useEffect(() => {
    reset();
    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  // запускаем таймеры когда известны размеры арены
  useEffect(() => {
    if (arena.w === 0 || arena.h === 0) return;
    if (phase !== "play") return;

    startedAtRef.current = Date.now();

    spawnTimer.current = setInterval(spawnDot, preset.spawnEveryMs);

    tickTimer.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startedAtRef.current;
      const left = Math.max(0, ROUND_MS - elapsed);
      setTimeLeft(left);

      setDots((prev) => {
        const alive = prev.filter((d) => d.expiresAt > now);
        const expired = prev.length - alive.length;
        if (expired > 0) addMisses(expired);
        return alive;
      });

      if (left === 0) endRound();
    }, TICK_MS);

    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arena.w, arena.h, phase, preset.spawnEveryMs, preset.lifeMs, preset.maxDots]);

  useEffect(() => {
    if (phase === "play" && misses >= MAX_MISSES) endRound();
  }, [misses, phase]);

  const seconds = Math.ceil(timeLeft / 1000);

  return (
    <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.hText}>
            {t("score")}: {score}
          </Text>
          <Text style={styles.subText}>
            {t("combo")}: x{multi} • {streak}
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.hText}>
            {t("misses")}: {misses}/{MAX_MISSES}
          </Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.hText}>
            {t("time")}: {seconds}s
          </Text>
        </View>
      </View>

      <LinearGradient
        colors={[COLORS.arenaTop, COLORS.arenaMid, COLORS.arenaBottom]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.arena}
        onLayout={onLayout}
      >
        <LinearGradient
          colors={[COLORS.vignetteTop, "transparent", COLORS.vignetteBottom]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        {dots.map((d) => (
          <AnimatedDot
            key={d.id}
            size={preset.dotSize}
            x={d.x}
            y={d.y}
            onPress={() => hitDot(d.id)}
          />
        ))}

        {phase === "end" && (
          <View style={styles.overlay}>
            <Text style={styles.endTitle}>{t("result")}</Text>
            <Text style={styles.endText}>
              {t("score")}: {score}
            </Text>

            <Pressable style={styles.button} onPress={reset}>
              <Text style={styles.buttonText}>{t("retry")}</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.secondary]}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.buttonText, styles.secondaryText]}>{t("back")}</Text>
            </Pressable>
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  arena: { flex: 1, position: "relative" },

  button: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    maxWidth: 320,
    paddingVertical: 14,
    width: "100%",
  },
  buttonText: { color: COLORS.background, fontSize: 16, fontWeight: "800" },

  endText: { color: COLORS.white, fontSize: 18 },

  endTitle: { color: COLORS.white, fontSize: 32, fontWeight: "900" },
  hText: { color: COLORS.white, fontWeight: "700" },
  header: {
    backgroundColor: COLORS.headerGlass,
    borderBottomColor: COLORS.headerBorder,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    backgroundColor: COLORS.overlayDark,
    gap: 12,
    justifyContent: "center",
    padding: 24,
  },

  root: { backgroundColor: COLORS.background, flex: 1 },
  secondary: { backgroundColor: COLORS.overlayLight },
  secondaryText: { color: COLORS.white },
  subText: { color: COLORS.subtitle, fontSize: 12, marginTop: 2 },
});
