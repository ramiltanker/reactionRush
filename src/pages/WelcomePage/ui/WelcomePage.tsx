import React, { useEffect, useMemo, useState } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

import logoImage from "../../../shared/assets/logo.png";
import { COLORS, APP_NAME } from "../../../shared/config";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../app";

export function WelcomePage() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const devOpacity = useMemo(() => new Animated.Value(0), []);
  const titleOpacity = useMemo(() => new Animated.Value(0), []);
  const titleScale = useMemo(() => new Animated.Value(0.98), []);

  const [phase, setPhase] = useState<"dev" | "title">("dev");

  useEffect(() => {
    const run = Animated.sequence([
      Animated.timing(devOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.delay(800),
      Animated.timing(devOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),

      Animated.delay(150),
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(titleScale, { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),
      Animated.delay(800),
    ]);

    run.start(() => navigation.replace("Menu"));

    const timer = setTimeout(() => setPhase("title"), 700 + 800 + 500 + 150);
    return () => {
      run.stop();
      clearTimeout(timer);
    };
  }, [devOpacity, titleOpacity, titleScale, navigation]);

  return (
    <View style={styles.root}>
      {phase === "dev" ? (
        <Animated.View style={[styles.center, { opacity: devOpacity }]}>
          <Text style={styles.devText}>Ramil&amp;Armen</Text>
        </Animated.View>
      ) : (
        <Animated.View
          style={[styles.center, { opacity: titleOpacity, transform: [{ scale: titleScale }] }]}
        >
          <Image source={logoImage} style={[styles.logo, styles.logoGlow]} resizeMode="contain" />
          <Text style={styles.title}>{APP_NAME}</Text>
          <Text style={styles.subtitle}>Tap fast. Beat your record.</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center", width: "100%" },
  devText: { color: COLORS.white, fontSize: 34, fontWeight: "700", letterSpacing: 0.5 },
  logo: {
    height: 350,
    marginBottom: "-20%",
    width: 350,
  },
  logoGlow: {
    shadowColor: COLORS.logoGlow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
  root: {
    alignItems: "center",
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  subtitle: { color: COLORS.subtitle, fontSize: 14, marginTop: 6 },
  title: { color: COLORS.white, fontSize: 34, fontWeight: "800" },
});
