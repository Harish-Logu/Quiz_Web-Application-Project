import { motion } from 'framer-motion';
import { Brain, Timer, Award, BookOpen } from 'lucide-react';
import type { Category } from '../types/quiz';

interface QuizStartProps {
  title: string;
  description: string;
  categories: Category[];
  onStart: (categoryId: string | null) => void;
}

export function QuizStart({ title, description, categories, onStart }: QuizStartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8"
    >
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
          <Brain className="w-12 h-12 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <Timer className="w-8 h-8 text-blue-500" />
          <div>
            <h3 className="font-semibold text-gray-800">Timed Questions</h3>
            <p className="text-sm text-gray-600">30 seconds per question</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <Award className="w-8 h-8 text-yellow-400" />
          <div>
            <h3 className="font-semibold text-gray-800">Score Points</h3>
            <p className="text-sm text-gray-600">Earn points for correct answers</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BookOpen className="w-6 h-6 mr-2" />
          Select a Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStart(category.id)}
              className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-center"
            >
              <span className="text-2xl mb-2 block">{category.icon}</span>
              <span className="font-medium text-gray-800">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onStart(null)}
        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Start Full Quiz
      </button>
    </motion.div>
  );
}