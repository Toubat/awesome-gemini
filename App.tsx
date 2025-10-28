import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import EmotionAnalyzer from './components/EmotionAnalyzer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
            <EmotionAnalyzer />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
