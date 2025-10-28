
import React, { useState, useCallback } from 'react';
import { generateExplanation } from '../services/geminiService';
import Card from './Card';
import 'react'; // Importing React to satisfy TSX compiler

// Helper function to render markdown
const renderMarkdown = (text: string) => {
    // Basic markdown to HTML conversion
    const html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code class="bg-slate-200 text-slate-800 px-1 py-0.5 rounded">$1</code>')
        .replace(/\n/g, '<br />');
    return { __html: html };
};

const WandIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
);


const ExplanationGenerator: React.FC = () => {
  const [sentence, setSentence] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = useCallback(async () => {
    if (!sentence.trim()) {
      setError('Please enter a sentence.');
      return;
    }
    setIsLoading(true);
    setError('');
    setExplanation('');

    try {
      const result = await generateExplanation(sentence);
      setExplanation(result);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [sentence]);

  return (
    <Card title="AI Explanation Generator" icon={<WandIcon />}>
      <p>
        Enter a Spanish sentence with 'ser' or 'estar' (or leave it blank for the AI to guess!), and let Gemini explain the grammar.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <input
          type="text"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          placeholder="e.g., El café está frío."
          className="flex-grow p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
          disabled={isLoading}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors disabled:bg-slate-400"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              Generating...
            </div>
          ) : 'Explain'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      
      {explanation && (
        <div className="mt-6 p-4 bg-slate-50 border rounded-lg prose prose-slate max-w-none">
          <div dangerouslySetInnerHTML={renderMarkdown(explanation)} />
        </div>
      )}
    </Card>
  );
};

export default ExplanationGenerator;
