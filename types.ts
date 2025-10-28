export type Emotion = 'happy' | 'sad' | 'angry' | 'neutral' | 'surprised' | 'fearful' | 'disgusted';

export type EmotionAnalysis = Record<Emotion, number>;

export interface EmotionResult {
  primaryEmotion: Emotion;
  analysis: EmotionAnalysis;
}

// FIX: Added UseCase interface for ser/estar usage examples.
export interface UseCase {
  rule: string;
  acronym: string;
  explanation: string;
  example: string;
  translation: string;
}

// FIX: Added QuizQuestion interface for the quiz data structure.
export interface QuizQuestion {
  sentence: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}
