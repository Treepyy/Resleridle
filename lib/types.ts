export type Character = {
  photo: string;
  fullPhoto: string;
  name: string;
  role: string;
  element: string;
  baseRarity: string;
  itemTrait1: string;
  itemTrait2: string;
  equipmentTrait: string;
  types: string[];
};

export type GameState = {
  mode: 'daily' | 'endless';
  guesses: Character[];
  solution: Character | null;
  gameOver: boolean;
  revealedCells: boolean[][];
  dailyStreak?: number;
  bestDailyStreak?: number;
  endlessStreak?: number;
  bestEndlessStreak?: number;
  lastPlayedDaily?: string;
};

export const attributes = ['photo', 'name', 'role', 'element', 'baseRarity', 'itemTrait1', 'itemTrait2', 'equipmentTrait', 'types'] as const;