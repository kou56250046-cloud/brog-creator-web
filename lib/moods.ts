export type MoodKey =
  | "deep-blue"
  | "twilight"
  | "forest"
  | "ember"
  | "stone"
  | "sakura"
  | "indigo"
  | "void";

export type MoodConfig = {
  label: string;
  gradient: string;
  textColor: string;
};

export const MOODS: Record<MoodKey, MoodConfig> = {
  "deep-blue": {
    label: "深海",
    gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    textColor: "#b8d4e8",
  },
  twilight: {
    label: "黄昏",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
    textColor: "#c9a96e",
  },
  forest: {
    label: "森",
    gradient: "linear-gradient(135deg, #0f2017 0%, #1a3a20 50%, #2d5a27 100%)",
    textColor: "#8fbc8f",
  },
  ember: {
    label: "残り火",
    gradient: "linear-gradient(135deg, #1a0a00 0%, #3d1a00 50%, #6b2d00 100%)",
    textColor: "#e8a87c",
  },
  stone: {
    label: "石",
    gradient: "linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 50%, #3a3a3c 100%)",
    textColor: "#aeaeb2",
  },
  sakura: {
    label: "桜",
    gradient: "linear-gradient(135deg, #1a0a12 0%, #3d1a2a 50%, #5c2840 100%)",
    textColor: "#f4a7b9",
  },
  indigo: {
    label: "藍",
    gradient: "linear-gradient(135deg, #0d0d1a 0%, #1a1a38 50%, #2d2d6b 100%)",
    textColor: "#a8a8ff",
  },
  void: {
    label: "虚無",
    gradient: "linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #141414 100%)",
    textColor: "#606060",
  },
};

export function getMoodConfig(mood: string | undefined): MoodConfig | null {
  if (!mood) return null;
  return MOODS[mood as MoodKey] ?? null;
}
