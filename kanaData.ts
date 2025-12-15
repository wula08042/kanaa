import { KanaChar } from './types';

// Helper to generate IDs
const id = (char: string) => `kana_${char}`;

// Detailed Data Source
// Origins based on etymology of Kana
const rawData: Omit<KanaChar, 'id'>[] = [
  // --- Seion Hiragana ---
  { char: 'あ', romaji: 'a', riyutoolKey: 'a', type: 'hiragana', category: 'seion', origin: '安' },
  { char: 'い', romaji: 'i', riyutoolKey: 'i', type: 'hiragana', category: 'seion', origin: '以' },
  { char: 'う', romaji: 'u', riyutoolKey: 'u', type: 'hiragana', category: 'seion', origin: '宇' },
  { char: 'え', romaji: 'e', riyutoolKey: 'e', type: 'hiragana', category: 'seion', origin: '衣' },
  { char: 'お', romaji: 'o', riyutoolKey: 'o', type: 'hiragana', category: 'seion', origin: '於' },
  
  { char: 'か', romaji: 'ka', riyutoolKey: 'ka', type: 'hiragana', category: 'seion', origin: '加' },
  { char: 'き', romaji: 'ki', riyutoolKey: 'ki', type: 'hiragana', category: 'seion', origin: '幾' },
  { char: 'く', romaji: 'ku', riyutoolKey: 'ku', type: 'hiragana', category: 'seion', origin: '久' },
  { char: 'け', romaji: 'ke', riyutoolKey: 'ke', type: 'hiragana', category: 'seion', origin: '計' },
  { char: 'こ', romaji: 'ko', riyutoolKey: 'ko', type: 'hiragana', category: 'seion', origin: '己' },

  { char: 'さ', romaji: 'sa', riyutoolKey: 'sa', type: 'hiragana', category: 'seion', origin: '左' },
  { char: 'し', romaji: 'shi', riyutoolKey: 'si', type: 'hiragana', category: 'seion', origin: '之' },
  { char: 'す', romaji: 'su', riyutoolKey: 'su', type: 'hiragana', category: 'seion', origin: '寸' },
  { char: 'せ', romaji: 'se', riyutoolKey: 'se', type: 'hiragana', category: 'seion', origin: '世' },
  { char: 'そ', romaji: 'so', riyutoolKey: 'so', type: 'hiragana', category: 'seion', origin: '曽' },

  { char: 'た', romaji: 'ta', riyutoolKey: 'ta', type: 'hiragana', category: 'seion', origin: '太' },
  { char: 'ち', romaji: 'chi', riyutoolKey: 'ti', type: 'hiragana', category: 'seion', origin: '知' },
  { char: 'つ', romaji: 'tsu', riyutoolKey: 'tu', type: 'hiragana', category: 'seion', origin: '川' },
  { char: 'て', romaji: 'te', riyutoolKey: 'te', type: 'hiragana', category: 'seion', origin: '天' },
  { char: 'と', romaji: 'to', riyutoolKey: 'to', type: 'hiragana', category: 'seion', origin: '止' },

  { char: 'な', romaji: 'na', riyutoolKey: 'na', type: 'hiragana', category: 'seion', origin: '奈' },
  { char: 'に', romaji: 'ni', riyutoolKey: 'ni', type: 'hiragana', category: 'seion', origin: '仁' },
  { char: 'ぬ', romaji: 'nu', riyutoolKey: 'nu', type: 'hiragana', category: 'seion', origin: '奴' },
  { char: 'ね', romaji: 'ne', riyutoolKey: 'ne', type: 'hiragana', category: 'seion', origin: '祢' },
  { char: 'の', romaji: 'no', riyutoolKey: 'no', type: 'hiragana', category: 'seion', origin: '乃' },

  { char: 'は', romaji: 'ha', riyutoolKey: 'ha', type: 'hiragana', category: 'seion', origin: '波' },
  { char: 'ひ', romaji: 'hi', riyutoolKey: 'hi', type: 'hiragana', category: 'seion', origin: '比' },
  { char: 'ふ', romaji: 'fu', riyutoolKey: 'hu', type: 'hiragana', category: 'seion', origin: '不' },
  { char: 'へ', romaji: 'he', riyutoolKey: 'he', type: 'hiragana', category: 'seion', origin: '部' },
  { char: 'ほ', romaji: 'ho', riyutoolKey: 'ho', type: 'hiragana', category: 'seion', origin: '保' },

  { char: 'ま', romaji: 'ma', riyutoolKey: 'ma', type: 'hiragana', category: 'seion', origin: '末' },
  { char: 'み', romaji: 'mi', riyutoolKey: 'mi', type: 'hiragana', category: 'seion', origin: '美' },
  { char: 'む', romaji: 'mu', riyutoolKey: 'mu', type: 'hiragana', category: 'seion', origin: '武' },
  { char: 'め', romaji: 'me', riyutoolKey: 'me', type: 'hiragana', category: 'seion', origin: '女' },
  { char: 'も', romaji: 'mo', riyutoolKey: 'mo', type: 'hiragana', category: 'seion', origin: '毛' },

  { char: 'や', romaji: 'ya', riyutoolKey: 'ya', type: 'hiragana', category: 'seion', origin: '也' },
  { char: 'ゆ', romaji: 'yu', riyutoolKey: 'yu', type: 'hiragana', category: 'seion', origin: '由' },
  { char: 'よ', romaji: 'yo', riyutoolKey: 'yo', type: 'hiragana', category: 'seion', origin: '与' },

  { char: 'ら', romaji: 'ra', riyutoolKey: 'ra', type: 'hiragana', category: 'seion', origin: '良' },
  { char: 'り', romaji: 'ri', riyutoolKey: 'ri', type: 'hiragana', category: 'seion', origin: '利' },
  { char: 'る', romaji: 'ru', riyutoolKey: 'ru', type: 'hiragana', category: 'seion', origin: '留' },
  { char: 'れ', romaji: 're', riyutoolKey: 're', type: 'hiragana', category: 'seion', origin: '礼' },
  { char: 'ろ', romaji: 'ro', riyutoolKey: 'ro', type: 'hiragana', category: 'seion', origin: '呂' },

  { char: 'わ', romaji: 'wa', riyutoolKey: 'wa', type: 'hiragana', category: 'seion', origin: '和' },
  { char: 'を', romaji: 'wo', riyutoolKey: 'o', type: 'hiragana', category: 'seion', origin: '遠' },
  { char: 'ん', romaji: 'n', riyutoolKey: 'n', type: 'hiragana', category: 'seion', origin: '无' },

  // --- Seion Katakana ---
  { char: 'ア', romaji: 'a', riyutoolKey: 'a', type: 'katakana', category: 'seion', origin: '阿' },
  { char: 'イ', romaji: 'i', riyutoolKey: 'i', type: 'katakana', category: 'seion', origin: '伊' },
  { char: 'ウ', romaji: 'u', riyutoolKey: 'u', type: 'katakana', category: 'seion', origin: '宇' },
  { char: 'エ', romaji: 'e', riyutoolKey: 'e', type: 'katakana', category: 'seion', origin: '江' },
  { char: 'オ', romaji: 'o', riyutoolKey: 'o', type: 'katakana', category: 'seion', origin: '於' },

  { char: 'カ', romaji: 'ka', riyutoolKey: 'ka', type: 'katakana', category: 'seion', origin: '加' },
  { char: 'キ', romaji: 'ki', riyutoolKey: 'ki', type: 'katakana', category: 'seion', origin: '幾' },
  { char: 'ク', romaji: 'ku', riyutoolKey: 'ku', type: 'katakana', category: 'seion', origin: '久' },
  { char: 'ケ', romaji: 'ke', riyutoolKey: 'ke', type: 'katakana', category: 'seion', origin: '介' },
  { char: 'コ', romaji: 'ko', riyutoolKey: 'ko', type: 'katakana', category: 'seion', origin: '己' },

  { char: 'サ', romaji: 'sa', riyutoolKey: 'sa', type: 'katakana', category: 'seion', origin: '散' },
  { char: 'シ', romaji: 'shi', riyutoolKey: 'si', type: 'katakana', category: 'seion', origin: '之' },
  { char: 'ス', romaji: 'su', riyutoolKey: 'su', type: 'katakana', category: 'seion', origin: '須' },
  { char: 'セ', romaji: 'se', riyutoolKey: 'se', type: 'katakana', category: 'seion', origin: '世' },
  { char: 'ソ', romaji: 'so', riyutoolKey: 'so', type: 'katakana', category: 'seion', origin: '曽' },

  { char: 'タ', romaji: 'ta', riyutoolKey: 'ta', type: 'katakana', category: 'seion', origin: '多' },
  { char: 'チ', romaji: 'chi', riyutoolKey: 'ti', type: 'katakana', category: 'seion', origin: '千' },
  { char: 'ツ', romaji: 'tsu', riyutoolKey: 'tu', type: 'katakana', category: 'seion', origin: '川' },
  { char: 'テ', romaji: 'te', riyutoolKey: 'te', type: 'katakana', category: 'seion', origin: '天' },
  { char: 'ト', romaji: 'to', riyutoolKey: 'to', type: 'katakana', category: 'seion', origin: '止' },

  { char: 'ナ', romaji: 'na', riyutoolKey: 'na', type: 'katakana', category: 'seion', origin: '奈' },
  { char: 'ニ', romaji: 'ni', riyutoolKey: 'ni', type: 'katakana', category: 'seion', origin: '仁' },
  { char: 'ヌ', romaji: 'nu', riyutoolKey: 'nu', type: 'katakana', category: 'seion', origin: '奴' },
  { char: 'ネ', romaji: 'ne', riyutoolKey: 'ne', type: 'katakana', category: 'seion', origin: '祢' },
  { char: 'ノ', romaji: 'no', riyutoolKey: 'no', type: 'katakana', category: 'seion', origin: '乃' },

  { char: 'ハ', romaji: 'ha', riyutoolKey: 'ha', type: 'katakana', category: 'seion', origin: '八' },
  { char: 'ヒ', romaji: 'hi', riyutoolKey: 'hi', type: 'katakana', category: 'seion', origin: '比' },
  { char: 'フ', romaji: 'fu', riyutoolKey: 'hu', type: 'katakana', category: 'seion', origin: '不' },
  { char: 'ヘ', romaji: 'he', riyutoolKey: 'he', type: 'katakana', category: 'seion', origin: '部' },
  { char: 'ホ', romaji: 'ho', riyutoolKey: 'ho', type: 'katakana', category: 'seion', origin: '保' },

  { char: 'マ', romaji: 'ma', riyutoolKey: 'ma', type: 'katakana', category: 'seion', origin: '末' },
  { char: 'ミ', romaji: 'mi', riyutoolKey: 'mi', type: 'katakana', category: 'seion', origin: '三' },
  { char: 'ム', romaji: 'mu', riyutoolKey: 'mu', type: 'katakana', category: 'seion', origin: '牟' },
  { char: 'メ', romaji: 'me', riyutoolKey: 'me', type: 'katakana', category: 'seion', origin: '女' },
  { char: 'モ', romaji: 'mo', riyutoolKey: 'mo', type: 'katakana', category: 'seion', origin: '毛' },

  { char: 'ヤ', romaji: 'ya', riyutoolKey: 'ya', type: 'katakana', category: 'seion', origin: '也' },
  { char: 'ユ', romaji: 'yu', riyutoolKey: 'yu', type: 'katakana', category: 'seion', origin: '由' },
  { char: 'ヨ', romaji: 'yo', riyutoolKey: 'yo', type: 'katakana', category: 'seion', origin: '与' },

  { char: 'ラ', romaji: 'ra', riyutoolKey: 'ra', type: 'katakana', category: 'seion', origin: '良' },
  { char: 'リ', romaji: 'ri', riyutoolKey: 'ri', type: 'katakana', category: 'seion', origin: '利' },
  { char: 'ル', romaji: 'ru', riyutoolKey: 'ru', type: 'katakana', category: 'seion', origin: '流' },
  { char: 'レ', romaji: 're', riyutoolKey: 're', type: 'katakana', category: 'seion', origin: '礼' },
  { char: 'ロ', romaji: 'ro', riyutoolKey: 'ro', type: 'katakana', category: 'seion', origin: '呂' },

  { char: 'ワ', romaji: 'wa', riyutoolKey: 'wa', type: 'katakana', category: 'seion', origin: '和' },
  { char: 'ヲ', romaji: 'wo', riyutoolKey: 'o', type: 'katakana', category: 'seion', origin: '乎' },
  { char: 'ン', romaji: 'n', riyutoolKey: 'n', type: 'katakana', category: 'seion', origin: '尔' },

  // --- Dakuon / Handakuon (Merged into 'dakuon' for filter simplicity) Hiragana ---
  { char: 'が', romaji: 'ga', riyutoolKey: 'ga', type: 'hiragana', category: 'dakuon', origin: '加' },
  { char: 'ぎ', romaji: 'gi', riyutoolKey: 'gi', type: 'hiragana', category: 'dakuon', origin: '幾' },
  { char: 'ぐ', romaji: 'gu', riyutoolKey: 'gu', type: 'hiragana', category: 'dakuon', origin: '久' },
  { char: 'げ', romaji: 'ge', riyutoolKey: 'ge', type: 'hiragana', category: 'dakuon', origin: '計' },
  { char: 'ご', romaji: 'go', riyutoolKey: 'go', type: 'hiragana', category: 'dakuon', origin: '己' },

  { char: 'ざ', romaji: 'za', riyutoolKey: 'za', type: 'hiragana', category: 'dakuon', origin: '左' },
  { char: 'じ', romaji: 'ji', riyutoolKey: 'zi', type: 'hiragana', category: 'dakuon', origin: '之' },
  { char: 'ず', romaji: 'zu', riyutoolKey: 'zu', type: 'hiragana', category: 'dakuon', origin: '寸' },
  { char: 'ぜ', romaji: 'ze', riyutoolKey: 'ze', type: 'hiragana', category: 'dakuon', origin: '世' },
  { char: 'ぞ', romaji: 'zo', riyutoolKey: 'zo', type: 'hiragana', category: 'dakuon', origin: '曽' },

  { char: 'だ', romaji: 'da', riyutoolKey: 'da', type: 'hiragana', category: 'dakuon', origin: '太' },
  { char: 'ぢ', romaji: 'ji', riyutoolKey: 'di', type: 'hiragana', category: 'dakuon', origin: '知' },
  { char: 'づ', romaji: 'zu', riyutoolKey: 'du', type: 'hiragana', category: 'dakuon', origin: '川' },
  { char: 'で', romaji: 'de', riyutoolKey: 'de', type: 'hiragana', category: 'dakuon', origin: '天' },
  { char: 'ど', romaji: 'do', riyutoolKey: 'do', type: 'hiragana', category: 'dakuon', origin: '止' },

  { char: 'ば', romaji: 'ba', riyutoolKey: 'ba', type: 'hiragana', category: 'dakuon', origin: '波' },
  { char: 'び', romaji: 'bi', riyutoolKey: 'bi', type: 'hiragana', category: 'dakuon', origin: '比' },
  { char: 'ぶ', romaji: 'bu', riyutoolKey: 'bu', type: 'hiragana', category: 'dakuon', origin: '不' },
  { char: 'べ', romaji: 'be', riyutoolKey: 'be', type: 'hiragana', category: 'dakuon', origin: '部' },
  { char: 'ぼ', romaji: 'bo', riyutoolKey: 'bo', type: 'hiragana', category: 'dakuon', origin: '保' },

  { char: 'ぱ', romaji: 'pa', riyutoolKey: 'pa', type: 'hiragana', category: 'dakuon', origin: '波' },
  { char: 'ぴ', romaji: 'pi', riyutoolKey: 'pi', type: 'hiragana', category: 'dakuon', origin: '比' },
  { char: 'ぷ', romaji: 'pu', riyutoolKey: 'pu', type: 'hiragana', category: 'dakuon', origin: '不' },
  { char: 'ぺ', romaji: 'pe', riyutoolKey: 'pe', type: 'hiragana', category: 'dakuon', origin: '部' },
  { char: 'ぽ', romaji: 'po', riyutoolKey: 'po', type: 'hiragana', category: 'dakuon', origin: '保' },

    // --- Dakuon / Handakuon Katakana ---
  { char: 'ガ', romaji: 'ga', riyutoolKey: 'ga', type: 'katakana', category: 'dakuon', origin: '加' },
  { char: 'ギ', romaji: 'gi', riyutoolKey: 'gi', type: 'katakana', category: 'dakuon', origin: '幾' },
  { char: 'グ', romaji: 'gu', riyutoolKey: 'gu', type: 'katakana', category: 'dakuon', origin: '久' },
  { char: 'ゲ', romaji: 'ge', riyutoolKey: 'ge', type: 'katakana', category: 'dakuon', origin: '介' },
  { char: 'ゴ', romaji: 'go', riyutoolKey: 'go', type: 'katakana', category: 'dakuon', origin: '己' },

  { char: 'ザ', romaji: 'za', riyutoolKey: 'za', type: 'katakana', category: 'dakuon', origin: '散' },
  { char: 'ジ', romaji: 'ji', riyutoolKey: 'zi', type: 'katakana', category: 'dakuon', origin: '之' },
  { char: 'ズ', romaji: 'zu', riyutoolKey: 'zu', type: 'katakana', category: 'dakuon', origin: '須' },
  { char: 'ゼ', romaji: 'ze', riyutoolKey: 'ze', type: 'katakana', category: 'dakuon', origin: '世' },
  { char: 'ゾ', romaji: 'zo', riyutoolKey: 'zo', type: 'katakana', category: 'dakuon', origin: '曽' },

  { char: 'ダ', romaji: 'da', riyutoolKey: 'da', type: 'katakana', category: 'dakuon', origin: '多' },
  { char: 'ヂ', romaji: 'ji', riyutoolKey: 'di', type: 'katakana', category: 'dakuon', origin: '千' },
  { char: 'ヅ', romaji: 'zu', riyutoolKey: 'du', type: 'katakana', category: 'dakuon', origin: '川' },
  { char: 'デ', romaji: 'de', riyutoolKey: 'de', type: 'katakana', category: 'dakuon', origin: '天' },
  { char: 'ド', romaji: 'do', riyutoolKey: 'do', type: 'katakana', category: 'dakuon', origin: '止' },

  { char: 'バ', romaji: 'ba', riyutoolKey: 'ba', type: 'katakana', category: 'dakuon', origin: '八' },
  { char: 'ビ', romaji: 'bi', riyutoolKey: 'bi', type: 'katakana', category: 'dakuon', origin: '比' },
  { char: 'ブ', romaji: 'bu', riyutoolKey: 'bu', type: 'katakana', category: 'dakuon', origin: '不' },
  { char: 'ベ', romaji: 'be', riyutoolKey: 'be', type: 'katakana', category: 'dakuon', origin: '部' },
  { char: 'ボ', romaji: 'bo', riyutoolKey: 'bo', type: 'katakana', category: 'dakuon', origin: '保' },

  { char: 'パ', romaji: 'pa', riyutoolKey: 'pa', type: 'katakana', category: 'dakuon', origin: '八' },
  { char: 'ピ', romaji: 'pi', riyutoolKey: 'pi', type: 'katakana', category: 'dakuon', origin: '比' },
  { char: 'プ', romaji: 'pu', riyutoolKey: 'pu', type: 'katakana', category: 'dakuon', origin: '不' },
  { char: 'ペ', romaji: 'pe', riyutoolKey: 'pe', type: 'katakana', category: 'dakuon', origin: '部' },
  { char: 'ポ', romaji: 'po', riyutoolKey: 'po', type: 'katakana', category: 'dakuon', origin: '保' },

  // --- Yoon (Contracted Sounds) Hiragana (Partial list for example, can be expanded) ---
  { char: 'きゃ', romaji: 'kya', riyutoolKey: 'kya', type: 'hiragana', category: 'yoon', origin: '加也' },
  { char: 'きゅ', romaji: 'kyu', riyutoolKey: 'kyu', type: 'hiragana', category: 'yoon', origin: '加由' },
  { char: 'きょ', romaji: 'kyo', riyutoolKey: 'kyo', type: 'hiragana', category: 'yoon', origin: '加与' },
  { char: 'しゃ', romaji: 'sha', riyutoolKey: 'sya', type: 'hiragana', category: 'yoon', origin: '之也' },
  { char: 'しゅ', romaji: 'shu', riyutoolKey: 'syu', type: 'hiragana', category: 'yoon', origin: '之由' },
  { char: 'しょ', romaji: 'sho', riyutoolKey: 'syo', type: 'hiragana', category: 'yoon', origin: '之与' },
  { char: 'ちゃ', romaji: 'cha', riyutoolKey: 'tya', type: 'hiragana', category: 'yoon', origin: '知也' },
  { char: 'ちゅ', romaji: 'chu', riyutoolKey: 'cyu', type: 'hiragana', category: 'yoon', origin: '知由' },
  { char: 'ちょ', romaji: 'cho', riyutoolKey: 'tyo', type: 'hiragana', category: 'yoon', origin: '知与' },

    // --- Yoon Katakana ---
  { char: 'キャ', romaji: 'kya', riyutoolKey: 'kya', type: 'katakana', category: 'yoon', origin: '加也' },
  { char: 'キュ', romaji: 'kyu', riyutoolKey: 'kyu', type: 'katakana', category: 'yoon', origin: '加由' },
  { char: 'キョ', romaji: 'kyo', riyutoolKey: 'kyo', type: 'katakana', category: 'yoon', origin: '加与' },
  { char: 'シャ', romaji: 'sha', riyutoolKey: 'sya', type: 'katakana', category: 'yoon', origin: '之也' },
  { char: 'シュ', romaji: 'shu', riyutoolKey: 'syu', type: 'katakana', category: 'yoon', origin: '之由' },
  { char: 'ショ', romaji: 'sho', riyutoolKey: 'syo', type: 'katakana', category: 'yoon', origin: '之与' },
];

export const kanaData: KanaChar[] = rawData.map(d => ({ ...d, id: id(d.char) }));
