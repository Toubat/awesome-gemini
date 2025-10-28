
import React, { useState } from 'react';
import { quizQuestions } from '../constants';
import { QuizQuestion } from '../types';
import Card from './Card';

const BookIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);


const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question: QuizQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswer = (optionIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
    if (question.options[optionIndex].isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };
  
  const getButtonClass = (index: number) => {
    if (!showExplanation) {
      return "bg-slate-200 hover:bg-sky-200";
    }
    if (question.options[index].isCorrect) {
      return "bg-green-500 text-white";
    }
    if (index === selectedAnswer && !question.options[index].isCorrect) {
      return "bg-red-500 text-white";
    }
    return "bg-slate-200 opacity-50";
  };

  return (
    <Card title="Knowledge Check" icon={<BookIcon />}>
      {isFinished ? (
        <div className="text-center">
          <h3 className="text-xl font-bold">Quiz Complete!</h3>
          <p className="text-lg my-4">You scored {score} out of {quizQuestions.length}</p>
          <button
            onClick={handleRestart}
            className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-700 transition-colors"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <p className="text-lg mb-4 text-center">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </p>
          <p className="text-2xl font-semibold text-center mb-6 h-16">
            {question.sentence.split('___').map((part, i) => (
              <React.Fragment key={i}>
                {part}
                {i < question.sentence.split('___').length - 1 && (
                  <span className="inline-block w-20 border-b-2 border-slate-400 mx-2"></span>
                )}
              </React.Fragment>
            ))}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showExplanation}
                className={`p-4 rounded-lg text-lg font-bold transition-all ${getButtonClass(index)}`}
              >
                {option.text}
              </button>
            ))}
          </div>
          {showExplanation && (
            <div className="mt-6 p-4 bg-sky-50 border-l-4 border-sky-400 rounded-r-lg">
              <p className="font-semibold text-sky-800">{question.explanation}</p>
            </div>
          )}
          <button
            onClick={handleNext}
            disabled={!showExplanation}
            className="mt-6 w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </Card>
  );
};

export default Quiz;
