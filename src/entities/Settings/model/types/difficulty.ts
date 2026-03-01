export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export interface DifficultyPreset {
  spawnEveryMs: number;
  lifeMs: number;
  dotSize: number;
  maxDots: number;
}
