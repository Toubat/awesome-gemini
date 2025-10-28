import React from 'react';
import { Emotion, EmotionResult as EmotionResultType } from '../types';

const emotionDisplayConfig: Record<Emotion, { emoji: string; color: string }> = {
    happy: { emoji: '😄', color: 'bg-yellow-400' },
    sad: { emoji: '😢', color: 'bg-blue-500' },
    angry: { emoji: '😠', color: 'bg-red-500' },
    surprised: { emoji: '😲', color: 'bg-purple-500' },
    fearful: { emoji: '😨', color: 'bg-green-500' },
    disgusted: { emoji: '🤢', color: 'bg-lime-600' },
    neutral: { emoji: '😐', color: 'bg-slate-500' },
};

const EmotionResult: React.FC<{ result: EmotionResultType }> = ({ result }) => {
  const { primaryEmotion, analysis } = result;
  
  const sortedEmotions = Object.entries(analysis)
    .sort(([, a], [, b]) => b - a) as [Emotion, number][];

  return (
    <div className="space-y-6">
      <div className="text-center p-6 bg-slate-700/50 rounded-lg">
        <h2 className="text-xl font-semibold text-slate-300 mb-2">Primary Emotion Detected</h2>
        <div className="flex items-center justify-center gap-4">
            <span className="text-6xl">{emotionDisplayConfig[primaryEmotion].emoji}</span>
            <p className="text-4xl font-bold capitalize text-cyan-400">{primaryEmotion}</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-slate-300 mb-3">Detailed Analysis</h3>
        <div className="space-y-3">
          {sortedEmotions.map(([emotion, score]) => (
            <div key={emotion} className="flex items-center gap-3">
              <span className="w-28 capitalize text-right text-slate-400">{emotion}</span>
              <div className="w-full bg-slate-700 rounded-full h-6">
                <div
                  className={`${emotionDisplayConfig[emotion].color} h-6 rounded-full text-xs font-medium text-black flex items-center justify-end pr-2`}
                  style={{ width: `${Math.max(score * 100, 5)}%` }} // min width to show text
                >
                  {(score * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmotionResult;
