import React, { useEffect, useMemo } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/config";

type Props = {
  size: number;
  x: number;
  y: number;
  onPress: () => void;
};

export function AnimatedDot({ size, x, y, onPress }: Props) {
  const scale = useMemo(() => new Animated.Value(0), []);
  const opacity = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scale, opacity]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          left: x,
          top: y,
          transform: [{ scale }],
          opacity,
        },
      ]}
    >
      <Pressable style={StyleSheet.absoluteFill} onPress={onPress} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: COLORS.dot,
    elevation: 8,
    position: "absolute",
    shadowColor: COLORS.dot,
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
});
