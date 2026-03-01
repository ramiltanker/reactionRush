import { Difficulty, DifficultyPreset } from "../../model/types";

export const DIFFICULTY_PRESETS: Record<Difficulty, DifficultyPreset> = {
  easy: { spawnEveryMs: 900, lifeMs: 1400, dotSize: 72, maxDots: 1 },
  medium: { spawnEveryMs: 650, lifeMs: 1000, dotSize: 62, maxDots: 2 },
  hard: { spawnEveryMs: 480, lifeMs: 750, dotSize: 54, maxDots: 3 },
};
