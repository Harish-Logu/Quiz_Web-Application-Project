import React from 'react';
import { motion } from 'framer-motion';
import { Timer, Award, Star } from 'lucide-react';
import type { Question } from '../types/quiz';

interface QuizCardProps {
  question: Question;
  totalQuestions: number;
  currentQuestion: number;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  streak: number;
  timeLeft: number;
  category: string;
}

export function QuizCard({
  question,
  totalQuestions,
  currentQuestion,
  selectedAnswer,
  onSelectAnswer,
  streak,
  timeLeft,
  category
}: QuizCardProps) {
  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">Streak: {streak}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Timer className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">{timeLeft}s</span>
            </div>
          </div>
          <div className="text-sm font-medium text-gray-500">
            Question {currentQuestion} of {totalQuestions}
          </div>
        </div>

        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {category}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-6">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectAnswer(index)}
              className={`w-full p-4 text-left rounded-lg transition-colors ${
                selectedAnswer === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
            </motion.button>
          ))}
        </div>

        <div className="mt-6 flex items-center space-x-2 text-sm text-gray-500">
          <Award className="w-4 h-4" />
          <span>Points: {question.points}</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}