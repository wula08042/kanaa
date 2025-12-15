export type KanaType = 'hiragana' | 'katakana';
export type KanaCategory = 'seion' | 'dakuon' | 'yoon'; // 'dakuon' includes handakuon here for simplicity
export type QuizMode = 'audio-to-kana' | 'kana-to-audio';
export type AudioSource = 'youdao' | 'riyutool' | 'microsoft' | 'google';

export interface KanaChar {
  id: string;
  char: string; // The character itself
  romaji: string; // Standard hepburn
  riyutoolKey: string; // Specific key for the mp3 file
  type: KanaType;
  category: KanaCategory;
  origin: string; // Kanji origin
}

export interface GameSettings {
  questionCount: number;
  kanaType: 'hiragana' | 'katakana' | 'mixed';
  category: 'seion' | 'dakuon' | 'yoon' | 'all';
  audioSource: AudioSource;
}

export interface Question {
  target: KanaChar;
  options: KanaChar[]; // 5 options
}

export interface GameStats {
  total: number;
  correct: number;
  wrongHistory: Record<string, number>; // key: KanaChar.id, value: error count
}
