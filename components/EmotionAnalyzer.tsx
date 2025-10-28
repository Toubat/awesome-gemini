import React from 'react';
import Card from './Card';
import Loader from './Loader';
import EmotionResult from './EmotionResult';
import { blobToBase64 } from '../utils/audio';
import { analyzeEmotionFromAudio } from '../services/geminiService';
import { Emotion, EmotionAnalysis, EmotionResult as EmotionResultType } from '../types';

// Icons
const MicIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"></path></svg>
);
const StopIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"></path></svg>
);
const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"></path></svg>
);

const EmotionAnalyzer: React.FC = () => {
  const [isRecording, setIsRecording] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [result, setResult] = React.useState<EmotionResultType | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [audioURL, setAudioURL] = React.useState<string | null>(null);

  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const audioChunksRef = React.useRef<Blob[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);


  const processAnalysis = (analysis: EmotionAnalysis) => {
    const primaryEmotion = Object.keys(analysis).reduce((a, b) => 
        analysis[a as Emotion] > analysis[b as Emotion] ? a : b
    ) as Emotion;
    setResult({ primaryEmotion, analysis });
  };
  
  const handleAnalyze = async (audioBlob: Blob, mimeType: string) => {
    setAudioURL(URL.createObjectURL(audioBlob));
    setIsProcessing(true);
    setResult(null);
    setError(null);
    try {
      const base64Audio = await blobToBase64(audioBlob);
      const analysis = await analyzeEmotionFromAudio(base64Audio, mimeType);
      processAnalysis(analysis);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsProcessing(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      setError(null);
      setResult(null);
      setAudioURL(null);
      audioChunksRef.current = [];
      
      const options = { mimeType: 'audio/webm;codecs=opus' };
      const recorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = recorder;

      recorder.addEventListener('dataavailable', event => {
        audioChunksRef.current.push(event.data);
      });

      recorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: options.mimeType });
        handleAnalyze(audioBlob, options.mimeType);
        stream.getTracks().forEach(track => track.stop()); // Release microphone
      });

      recorder.start();
    } catch (err) {
      setError('Microphone access was denied. Please allow microphone access in your browser settings.');
      console.error('Error starting recording:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setError(null);
      setResult(null);
      handleAnalyze(file, file.type);
    }
    // Reset file input value to allow re-uploading the same file
    event.target.value = '';
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleReset = () => {
    setResult(null);
    setError(null);
    setAudioURL(null);
  };

  return (
    <Card>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
        {!isRecording ? (
            <button
                onClick={startRecording}
                disabled={isProcessing}
                className="flex items-center justify-center gap-3 w-full md:w-auto bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-600 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
                <MicIcon className="w-6 h-6" />
                Start Recording
            </button>
        ) : (
            <button
                onClick={stopRecording}
                className="flex items-center justify-center gap-3 w-full md:w-auto bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors animate-pulse"
            >
                <StopIcon className="w-6 h-6" />
                Stop Recording
            </button>
        )}
        <span className="text-slate-400">or</span>
        <input type="file" accept="audio/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        <button
          onClick={handleUploadClick}
          disabled={isProcessing || isRecording}
          className="flex items-center justify-center gap-3 w-full md:w-auto bg-slate-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          <UploadIcon className="w-6 h-6" />
          Upload an Audio File
        </button>
      </div>

      <div className="min-h-[20rem] flex items-center justify-center bg-slate-900/50 rounded-lg p-4">
        {isProcessing && <Loader />}
        {error && <div className="text-center text-red-400 p-4"><p className="font-bold">Error</p><p>{error}</p></div>}
        {result && !isProcessing && <EmotionResult result={result} />}
        {!isProcessing && !error && !result && (
            <div className="text-center text-slate-500">
                <MicIcon className="w-16 h-16 mx-auto mb-4" />
                <p>Record your voice or upload a file to begin analysis.</p>
            </div>
        )}
      </div>

      {audioURL && !isProcessing && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <h3 className="font-semibold">Your Audio:</h3>
          <audio controls src={audioURL} className="w-full max-w-md"></audio>
          <button onClick={handleReset} className="text-cyan-400 hover:text-cyan-300">Analyze another</button>
        </div>
      )}
    </Card>
  );
};

export default EmotionAnalyzer;
