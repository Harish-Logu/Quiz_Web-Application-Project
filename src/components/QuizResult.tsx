import React from 'react';
import { Trophy, Clock, Star, RotateCcw, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Question, Category } from '../types/quiz';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  answers: number[];
  questions: Question[];
  timePerQuestion: number[];
  categoryScores: { [key: string]: number };
  onRestart: (categoryId: string | null) => void;
  selectedCategory: string | null;
  categories: Category[];
}

export function QuizResult({
  score,
  totalQuestions,
  answers,
  questions,
  timePerQuestion,
  categoryScores,
  onRestart,
  selectedCategory,
  categories
}: QuizResultProps) {
  const averageTime = timePerQuestion.reduce((a, b) => a + b, 0) / timePerQuestion.length;
  const percentage = (score / (totalQuestions * 100)) * 100;
  const correctAnswers = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8"
    >
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
          <Trophy className="w-12 h-12 text-blue-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
        <p className="text-gray-600">
          {selectedCategory
            ? `Category: ${categories.find(c => c.id === selectedCategory)?.name}`
            : 'Full Quiz Results'}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Score</p>
          <p className="text-2xl font-bold text-gray-800">{score}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Avg. Time</p>
          <p className="text-2xl font-bold text-gray-800">{averageTime.toFixed(1)}s</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <BookOpen className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Correct</p>
          <p className="text-2xl font-bold text-gray-800">{correctAnswers}/{totalQuestions}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <Trophy className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Accuracy</p>
          <p className="text-2xl font-bold text-gray-800">{Math.round(percentage)}%</p>
        </div>
      </div>

      {!selectedCategory && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
          <div className="space-y-4">
            {categories.map((category) => {
              const categoryQuestions = questions.filter(q => q.category === category.id);
              const maxScore = categoryQuestions.reduce((sum, q) => sum + q.points, 0);
              const score = categoryScores[category.id] || 0;
              const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;

              return (
                <div key={category.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{category.icon} {category.name}</span>
                    <span className="text-sm">{score}/{maxScore} points</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-semibold mb-4">Question Review</h3>
        {questions.map((question, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              answers[index] === question.correctAnswer
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <p className="font-medium text-gray-800 mb-2">{question.question}</p>
            <p className="text-sm text-gray-600 mb-2">
              Your answer: {question.options[answers[index]]}
              {answers[index] !== question.correctAnswer && (
                <span className="block text-green-600">
                  Correct answer: {question.options[question.correctAnswer]}
                </span>
              )}
            </p>
            <p className="text-sm text-gray-600 italic">{question.explanation}</p>
          </div>
        ))}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => onRestart(selectedCategory)}
          className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Retry {selectedCategory ? 'Category' : 'Full Quiz'}</span>
        </button>
        {selectedCategory && (
          <button
            onClick={() => onRestart(null)}
            className="flex-1 flex items-center justify-center space-x-2 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            <span>Try Full Quiz</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}