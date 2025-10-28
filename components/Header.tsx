import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-700">
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">
          Speech Emotion Recognition
        </h1>
        <p className="mt-2 text-lg text-slate-400">
          Analyze emotions from your voice with Gemini
        </p>
      </div>
    </header>
  );
};

export default Header;
