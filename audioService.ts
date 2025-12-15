import { AudioSource, KanaChar } from './types';

export class AudioService {
  private static instance: AudioService;
  private currentAudio: HTMLAudioElement | null = null;
  private currentPlayId: number = 0;

  private constructor() {}

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  public async play(kana: KanaChar, source: AudioSource, times: number = 1): Promise<void> {
    // Generate a new ID for this playback session
    const playId = ++this.currentPlayId;
    
    this.stop(); // Stop any currently playing audio

    const playOnce = () => {
      return new Promise<void>((resolve, reject) => {
        // If this session has been superseded, abort immediately
        if (this.currentPlayId !== playId) {
            reject(new DOMException('Interrupted', 'AbortError'));
            return;
        }

        if (source === 'microsoft') {
          // Web Speech API
          const utterance = new SpeechSynthesisUtterance(kana.char);
          utterance.lang = 'ja-JP';
          utterance.rate = 0.9;
          
          utterance.onend = () => resolve();
          utterance.onerror = (e) => {
              if (e.error === 'interrupted' || e.error === 'canceled') {
                  reject(new DOMException('Interrupted', 'AbortError'));
              } else {
                  reject(e);
              }
          };
          
          window.speechSynthesis.speak(utterance);
        } else {
          // HTML Audio
          let url = '';
          if (source === 'youdao') {
            url = `https://dict.youdao.com/dictvoice?audio=${kana.char}&le=jap`;
          } else if (source === 'riyutool') {
            url = `https://riyutool.com/50yintuceshi/${kana.riyutoolKey}.mp3`;
          } else if (source === 'google') {
            url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${kana.char}&tl=ja`;
          }

          if (!url) {
            reject('No URL generated');
            return;
          }

          const audio = new Audio(url);
          this.currentAudio = audio;
          
          audio.onended = () => resolve();
          audio.onerror = (e) => reject(e);
          
          const playPromise = audio.play();
          if (playPromise !== undefined) {
              playPromise.catch(e => {
                  // Handle browser auto-play policy or interruption errors
                  if (e.name === 'AbortError' || e.message?.includes('interrupted')) {
                      reject(new DOMException('Interrupted', 'AbortError'));
                  } else {
                      reject(e);
                  }
              });
          }
        }
      });
    };

    try {
      for (let i = 0; i < times; i++) {
        // Check if a new playback request has started
        if (this.currentPlayId !== playId) return;

        await playOnce();
        
        if (i < times - 1) {
          if (this.currentPlayId !== playId) return;
          await new Promise(r => setTimeout(r, 300)); // Pause between repeats
        }
      }
    } catch (error: any) {
      // Gracefully handle expected interruption errors
      if (error?.name === 'AbortError' || error?.message?.includes('interrupted')) {
        return;
      }
      console.error("Audio playback failed", error);
    }
  }

  public stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {
        // Ignore errors during stopping (e.g. if audio wasn't loaded fully)
      }
      this.currentAudio = null;
    }
    window.speechSynthesis.cancel();
  }
}