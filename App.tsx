import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Settings, PlayCircle, Volume2, CheckCircle2, XCircle, ChevronRight, RefreshCw, BarChart2 } from 'lucide-react';
import { kanaData } from './kanaData';
import { GameSettings, Question, GameStats, KanaChar, AudioSource, QuizMode } from './types';
import { AudioService } from './audioService';
import { SakuraIcon } from './components/SakuraIcon';

// --- Constants ---
const AUDIO_SOURCES: { value: AudioSource; label: string }[] = [
  { value: 'youdao', label: '有道 (Youdao) - Recommended' },
  { value: 'riyutool', label: 'Riyutool (Romanized)' },
  { value: 'microsoft', label: 'Microsoft Web Speech' },
  { value: 'google', label: 'Google Translate' },
];

const QUESTION_COUNTS = Array.from({ length: 19 }, (_, i) => (i + 1) * 10 + 10); // 20 to 200

// --- Utility Functions ---

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- Components ---

const Header: React.FC = () => (
  <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md shadow-sm border-b border-rose-100 py-3 px-4 flex items-center justify-center gap-3">
    <SakuraIcon className="w-8 h-8 text-rose-400 animate-spin-slow" />
    <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-wide font-['Zen_Maru_Gothic']">
      Litchiの五十音練習
    </h1>
  </header>
);

const HomeScreen: React.FC<{ 
  settings: GameSettings; 
  setSettings: React.Dispatch<React.SetStateAction<GameSettings>>; 
  onStart: (mode: QuizMode) => void;
}> = ({ settings, setSettings, onStart }) => {
  const testAudio = () => {
    // Test with 'a' (あ)
    const sample = kanaData.find(k => k.romaji === 'a' && k.type === 'hiragana');
    if (sample) {
      AudioService.getInstance().play(sample, settings.audioSource, 2);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in flex flex-col justify-center min-h-[80vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        
        {/* Left Column: Intro & Actions (Desktop: Order 1) */}
        <div className="space-y-8 order-2 md:order-1">
          <div className="space-y-4 text-center md:text-left">
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight font-['Zen_Maru_Gothic']">
               <span className="text-rose-500">五十音</span>を<br/>
               マスターしよう
             </h2>
             <p className="text-gray-500 text-lg md:text-xl">
               Start your journey into Japanese with our comprehensive Kana practice tool.
             </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
            <button 
              onClick={() => onStart('audio-to-kana')}
              className="py-5 px-6 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transform transition-all flex items-center justify-center gap-3 font-bold text-lg"
            >
              <div className="bg-white/20 p-2 rounded-full"><Volume2 className="w-6 h-6" /></div>
              <div className="text-left">
                <div className="text-xs opacity-90">Listen & Select</div>
                <div>発音 ➡ 五十音</div>
              </div>
            </button>
            <button 
              onClick={() => onStart('kana-to-audio')}
              className="py-5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transform transition-all flex items-center justify-center gap-3 font-bold text-lg"
            >
              <div className="bg-white/20 p-2 rounded-full"><span className="text-xl font-serif">あ</span></div>
              <div className="text-left">
                <div className="text-xs opacity-90">Read & Select</div>
                <div>五十音 ➡ 発音</div>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Settings Card (Desktop: Order 2) */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-rose-100 relative order-1 md:order-2">
          <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-md rotate-12">
            Customize!
          </div>
          
          <h3 className="text-xl font-bold text-gray-700 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
            <Settings className="text-rose-400" /> 
            設定 (Settings)
          </h3>
          
          <div className="space-y-6">
            {/* Audio Source */}
            <div className="relative z-50">
              <label className="block text-sm font-medium text-gray-700 mb-2">音声ソース (Audio Source)</label>
              <div className="flex gap-2">
                <select 
                  className="block w-full rounded-xl border-gray-300 bg-gray-50 p-3 text-sm focus:border-rose-500 focus:ring-rose-500 shadow-sm transition-shadow hover:bg-white"
                  value={settings.audioSource}
                  onChange={(e) => setSettings({ ...settings, audioSource: e.target.value as AudioSource })}
                >
                  {AUDIO_SOURCES.map(src => (
                    <option key={src.value} value={src.value}>{src.label}</option>
                  ))}
                </select>
                <button 
                  onClick={testAudio}
                  className="px-4 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 transition-colors flex items-center justify-center"
                  title="Test Audio"
                >
                  <Volume2 size={20} />
                </button>
              </div>
            </div>

            {/* Question Count */}
            <div className="relative z-40">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">問題数 (Count)</label>
                <span className="text-sm font-bold text-rose-500 bg-rose-50 px-2 rounded-md">{settings.questionCount}</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="200" 
                step="10"
                value={settings.questionCount}
                onChange={(e) => setSettings({ ...settings, questionCount: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>20</span>
                <span>200</span>
              </div>
            </div>

            {/* Kana Type */}
            <div className="relative z-30">
              <label className="block text-sm font-medium text-gray-700 mb-2">文字 (Script)</label>
              <div className="grid grid-cols-3 gap-2">
                {(['hiragana', 'katakana', 'mixed'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setSettings({ ...settings, kanaType: type })}
                    className={`py-2 px-1 rounded-xl text-sm font-medium transition-all border-2 ${
                      settings.kanaType === type 
                        ? 'bg-rose-50 border-rose-400 text-rose-600' 
                        : 'bg-white border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-200'
                    }`}
                  >
                    {type === 'hiragana' ? 'あ Hiragana' : type === 'katakana' ? 'ア Katakana' : 'Mix'}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="relative z-20">
              <label className="block text-sm font-medium text-gray-700 mb-2">種類 (Category)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['seion', 'dakuon', 'yoon', 'all'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSettings({ ...settings, category: cat })}
                    className={`py-2 px-1 rounded-xl text-xs sm:text-sm font-medium transition-all border-2 ${
                      settings.category === cat 
                        ? 'bg-indigo-50 border-indigo-400 text-indigo-600' 
                        : 'bg-white border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-200'
                    }`}
                  >
                    {cat === 'seion' ? '清音' : 
                     cat === 'dakuon' ? '濁音' : 
                     cat === 'yoon' ? '拗音' : 'All'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuizScreen: React.FC<{
  mode: QuizMode;
  settings: GameSettings;
  onFinish: (stats: GameStats) => void;
  onExit: () => void;
}> = ({ mode, settings, onFinish, onExit }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState<GameStats>({ total: 0, correct: 0, wrongHistory: {} });
  const [selectedOption, setSelectedOption] = useState<KanaChar | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize Game
  useEffect(() => {
    // Filter Data
    let pool = kanaData.filter(k => {
      // Level 1: Script
      if (settings.kanaType !== 'mixed' && k.type !== settings.kanaType) return false;
      // Level 2: Category
      if (settings.category !== 'all' && k.category !== settings.category) return false;
      return true;
    });

    // Ensure we have enough data (fallback to all if filter is too strict/broken)
    if (pool.length < 5) pool = kanaData;

    const gameQuestions: Question[] = [];
    const count = Math.min(settings.questionCount, pool.length); // Don't exceed pool size
    
    // Pick unique targets
    const targets = shuffleArray(pool).slice(0, count);

    targets.forEach(target => {
      // Pick 4 distractors from the SAME filtered pool
      const others = pool.filter(k => k.id !== target.id);
      const distractors = shuffleArray(others).slice(0, 4);
      const options = shuffleArray([target, ...distractors]);
      gameQuestions.push({ target, options });
    });

    setQuestions(gameQuestions);
    setLoading(false);
  }, [settings]);

  // Audio Auto-play for current question
  useEffect(() => {
    if (!loading && questions[currentIndex] && !isAnswered) {
      // Play twice
      AudioService.getInstance().play(questions[currentIndex].target, settings.audioSource, 2);
    }
  }, [currentIndex, loading, questions, isAnswered, settings.audioSource]);

  const handleSelect = (option: KanaChar) => {
    if (isAnswered && mode === 'audio-to-kana') return; // Lock if answered in mode 1
    setSelectedOption(option);
    
    // For mode 2, play sound on selection
    if (mode === 'kana-to-audio') {
      AudioService.getInstance().play(option, settings.audioSource, 1);
    } else {
        // Mode 1: Immediate confirmation
        confirmAnswer(option);
    }
  };

  const confirmAnswer = (chosen: KanaChar) => {
    setIsAnswered(true);
    const correct = questions[currentIndex].target;
    const isCorrect = chosen.id === correct.id;

    setStats(prev => ({
      ...prev,
      total: prev.total + 1,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      wrongHistory: isCorrect ? prev.wrongHistory : {
        ...prev.wrongHistory,
        [correct.id]: (prev.wrongHistory[correct.id] || 0) + 1
      }
    }));
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      onFinish(stats);
    }
  };

  if (loading || questions.length === 0) return <div className="flex justify-center p-10 min-h-screen items-center"><RefreshCw className="animate-spin text-rose-500 w-10 h-10" /></div>;

  const currentQ = questions[currentIndex];
  const isCorrect = selectedOption?.id === currentQ.target.id;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 flex flex-col min-h-[calc(100vh-80px)]">
      {/* Top Bar: Progress & Exit */}
      <div className="w-full max-w-4xl mx-auto mb-6 md:mb-12">
        <div className="flex justify-between items-end mb-2">
            <span className="text-2xl font-bold text-gray-300 font-mono">
                {(currentIndex + 1).toString().padStart(2, '0')}
                <span className="text-sm text-gray-300 mx-1">/</span>
                <span className="text-sm text-gray-300">{questions.length}</span>
            </span>
            <button onClick={onExit} className="text-sm text-gray-400 hover:text-red-500 transition-colors px-3 py-1 rounded hover:bg-red-50">Exit</button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden">
            <div 
            className="bg-gradient-to-r from-rose-400 to-rose-500 h-full rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20">
        
        {/* Question Area - Left on Desktop */}
        <div className="flex-1 flex flex-col items-center justify-center w-full lg:w-auto lg:items-end">
            {mode === 'audio-to-kana' ? (
                // Mode 1: Big Audio Button
                <button 
                  onClick={() => AudioService.getInstance().play(currentQ.target, settings.audioSource, 1)}
                  className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex flex-col items-center justify-center transition-all active:scale-95 shadow-2xl border-8 border-white ring-4 ring-indigo-50 group"
                >
                   <Volume2 className="w-16 h-16 md:w-24 md:h-24 mb-2 group-hover:scale-110 transition-transform" />
                   <span className="font-bold text-xl md:text-2xl opacity-50 group-hover:opacity-100 transition-opacity">Play</span>
                </button>
            ) : (
                // Mode 2: Big Kana
                <div className="text-center lg:text-right">
                    <div className={`text-[120px] md:text-[180px] leading-none font-bold transition-all duration-300 filter drop-shadow-lg ${
                        isAnswered 
                            ? (isCorrect ? 'text-emerald-500' : 'text-rose-500') 
                            : 'text-gray-800'
                    }`}>
                        {currentQ.target.char}
                    </div>
                    {/* Only show romaji result after answer */}
                    <div className={`text-3xl md:text-4xl font-medium text-gray-600 h-10 transition-opacity ${isAnswered ? 'opacity-100' : 'opacity-0'}`}>
                        {isAnswered ? currentQ.target.romaji : ''}
                    </div>
                    
                    <div className="text-gray-400 mt-4 text-base font-serif border-t-2 border-gray-100 pt-2 inline-block">
                        Origin: <span className="text-gray-600 font-bold">{currentQ.target.origin}</span>
                    </div>
                </div>
            )}
        </div>

        {/* Options Area - Right on Desktop */}
        <div className="flex-1 w-full max-w-3xl">
            <div className={`grid grid-cols-5 gap-3 md:gap-6 ${mode === 'audio-to-kana' ? '' : 'lg:w-full'}`}>
                {currentQ.options.map((opt) => {
                    const isSelected = selectedOption?.id === opt.id;
                    const isTarget = opt.id === currentQ.target.id;
                    
                    let btnClass = "relative flex flex-col items-center justify-center rounded-2xl border-b-4 transition-all duration-200 aspect-square lg:aspect-[4/3] ";
                    
                    if (mode === 'audio-to-kana') {
                         // Mode 1 logic
                        if (isAnswered) {
                            if (isTarget) btnClass += "bg-emerald-100 border-emerald-500 text-emerald-800 shadow-none translate-y-1 "; // Correct
                            else if (isSelected && !isTarget) btnClass += "bg-rose-100 border-rose-500 text-rose-800 opacity-60 shadow-none translate-y-1 "; // Wrong
                            else btnClass += "bg-white border-gray-200 text-gray-300 opacity-40 shadow-none "; // Others
                        } else {
                            btnClass += "bg-white border-gray-200 hover:border-rose-300 hover:bg-rose-50 shadow-md hover:-translate-y-1 cursor-pointer active:translate-y-0 active:shadow-none ";
                        }

                        return (
                            <button 
                                key={opt.id} 
                                disabled={isAnswered}
                                onClick={() => handleSelect(opt)}
                                className={btnClass}
                            >
                                <span className="text-3xl md:text-5xl font-bold mb-1">{opt.char}</span>
                                {isAnswered && (
                                    <div className="absolute bottom-1 md:bottom-2 flex flex-col items-center text-[10px] md:text-xs font-medium animate-fade-in w-full">
                                        <span>{opt.romaji}</span>
                                        <span className="opacity-70 scale-90">{opt.origin}</span>
                                    </div>
                                )}
                            </button>
                        );
                    } else {
                        // Mode 2 logic (Kana -> Select Audio)
                        if (isAnswered) {
                             if (isTarget) btnClass += "bg-emerald-100 border-emerald-500 text-emerald-700 shadow-none translate-y-1 ";
                             else if (isSelected && !isTarget) btnClass += "bg-rose-100 border-rose-500 text-rose-700 opacity-60 shadow-none translate-y-1 ";
                             else btnClass += "bg-white border-gray-200 text-gray-300 opacity-40 shadow-none ";
                        } else {
                            btnClass += isSelected 
                                ? "bg-indigo-100 border-indigo-500 text-indigo-700 translate-y-1 shadow-inner " 
                                : "bg-white border-gray-200 text-gray-600 hover:bg-indigo-50 hover:border-indigo-300 shadow-md hover:-translate-y-1 ";
                        }

                        return (
                            <button
                                key={opt.id}
                                disabled={isAnswered}
                                onClick={() => handleSelect(opt)}
                                className={btnClass}
                            >
                                <Volume2 className={`w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2 ${isAnswered && isTarget ? 'text-emerald-600' : 'inherit'}`} />
                                {isAnswered && (
                                    <div className="absolute bottom-1 md:bottom-2 flex flex-col items-center text-[10px] md:text-xs font-medium animate-fade-in w-full leading-tight">
                                        <span className="text-sm font-bold">{opt.char}</span>
                                        <span>{opt.romaji}</span>
                                    </div>
                                )}
                            </button>
                        );
                    }
                })}
            </div>

            {/* Action Area for Mode 2 */}
            {mode === 'kana-to-audio' && !isAnswered && (
                <div className="flex justify-center mt-8 h-14">
                    {selectedOption && (
                        <button 
                            onClick={() => selectedOption && confirmAnswer(selectedOption)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all active:scale-95 flex items-center gap-3 text-lg animate-fade-in"
                        >
                            確認 (Confirm) <CheckCircle2 size={24} />
                        </button>
                    )}
                </div>
            )}

            {/* Next Button */}
            {isAnswered && (
                 <div className="flex justify-center mt-8 h-14">
                    <button 
                    onClick={nextQuestion}
                    className="bg-rose-500 hover:bg-rose-600 text-white px-12 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all active:scale-95 flex items-center gap-3 text-lg animate-bounce-in"
                    >
                    次へ (Next) <ChevronRight size={24} />
                    </button>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

const SummaryScreen: React.FC<{
  stats: GameStats;
  onHome: () => void;
}> = ({ stats, onHome }) => {
  const percentage = Math.round((stats.correct / stats.total) * 100) || 0;
  
  // Calculate top 10 wrong
  const topErrors = Object.entries(stats.wrongHistory)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 10)
    .map(([id, count]) => {
        const char = kanaData.find(k => k.id === id);
        return { char, count };
    });

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
        
        <div className="text-center mb-12">
             <div className="inline-block p-4 rounded-full bg-white shadow-lg mb-6">
                 {percentage >= 80 ? <CheckCircle2 className="w-16 h-16 text-emerald-500" /> : <BarChart2 className="w-16 h-16 text-rose-500" />}
             </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">結果発表 (Result)</h2>
            <div className={`text-8xl font-bold tracking-tighter my-4 ${percentage >= 80 ? 'text-emerald-500' : percentage >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>
                {percentage}<span className="text-4xl align-top">%</span>
            </div>
            <p className="text-xl text-gray-500">Correct: <span className="font-bold text-gray-800">{stats.correct}</span> / {stats.total}</p>
        </div>

        {topErrors.length > 0 && (
            <div className="w-full bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-rose-100 mb-10">
                <h3 className="flex items-center gap-3 text-xl font-bold text-rose-500 mb-6 pb-4 border-b border-rose-50">
                    <XCircle size={24} /> 苦手な文字 (Needs Practice)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topErrors.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-rose-50/50 p-3 rounded-xl border border-rose-100">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-bold w-10 text-center text-gray-800">{item.char?.char}</span>
                                <div className="text-sm text-gray-500 flex flex-col">
                                    <span className="font-bold text-gray-700 text-base">{item.char?.romaji}</span>
                                    <span className="text-xs">Origin: {item.char?.origin}</span>
                                </div>
                            </div>
                            <span className="bg-white text-rose-500 font-bold px-3 py-1 rounded-lg shadow-sm text-sm">x{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}

        <button 
            onClick={onHome}
            className="px-12 py-4 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-900 hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-3 font-bold text-lg"
        >
            <RefreshCw size={24} /> ホームに戻る (Back to Home)
        </button>
    </div>
  );
};

const App: React.FC = () => {
  const [screen, setScreen] = useState<'home' | 'quiz' | 'summary'>('home');
  const [quizMode, setQuizMode] = useState<QuizMode>('audio-to-kana');
  const [settings, setSettings] = useState<GameSettings>({
    questionCount: 20,
    kanaType: 'hiragana',
    category: 'all',
    audioSource: 'youdao'
  });
  const [lastStats, setLastStats] = useState<GameStats>({ total: 0, correct: 0, wrongHistory: {} });

  const startQuiz = (mode: QuizMode) => {
    setQuizMode(mode);
    setScreen('quiz');
  };

  const finishQuiz = (stats: GameStats) => {
    setLastStats(stats);
    setScreen('summary');
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-[#fdfcf8] selection:bg-rose-200">
      <Header />
      <main className="container mx-auto pb-8">
        {screen === 'home' && (
          <HomeScreen settings={settings} setSettings={setSettings} onStart={startQuiz} />
        )}
        {screen === 'quiz' && (
          <QuizScreen 
            mode={quizMode} 
            settings={settings} 
            onFinish={finishQuiz} 
            onExit={() => setScreen('home')} 
          />
        )}
        {screen === 'summary' && (
          <SummaryScreen stats={lastStats} onHome={() => setScreen('home')} />
        )}
      </main>
      
      {/* Footer / Copyright */}
      <footer className="text-center py-6 text-gray-400 text-sm opacity-50 hover:opacity-100 transition-opacity">
        <p>&copy; 2024 Litchiの五十音練習</p>
      </footer>
      
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-in {
            0% { opacity: 0; transform: scale(0.9); }
            50% { opacity: 1; transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-bounce-in { animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-spin-slow { animation: spin 10s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default App;