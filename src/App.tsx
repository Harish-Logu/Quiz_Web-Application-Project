import React, { useState, useEffect, useMemo } from 'react';
import { QuizCard } from './components/QuizCard';
import { QuizResult } from './components/QuizResult';
import { QuizStart } from './components/QuizStart';
import type { QuizData, QuizState, Category } from './types/quiz';

const QUESTION_TIMEOUT = 30; // seconds

// Enhanced quiz data with categories
const quizCategories: Category[] = [
  { id: 'frontend', name: 'Frontend Development', icon: '🎨' },
  { id: 'backend', name: 'Backend Development', icon: '⚙️' },
  { id: 'database', name: 'Databases', icon: '💾' },
  { id: 'devops', name: 'DevOps', icon: '🚀' }
];

const sampleQuizData: QuizData = {
  title: "Full-Stack Development Quiz",
  description: "Test your knowledge across the entire web development stack",
  categories: quizCategories,
  questions: [
    {
      id: 1,
      category: 'frontend',
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Hybrid Text Management Language"
      ],
      correctAnswer: 0,
      points: 100,
      explanation: "HTML (Hyper Text Markup Language) is the standard markup language for documents designed to be displayed in a web browser."
    },
    {
      id: 2,
      category: 'frontend',
      question: "Which of these is NOT a JavaScript framework?",
      options: [
        "React",
        "Angular",
        "Django",
        "Vue"
      ],
      correctAnswer: 2,
      points: 100,
      explanation: "Django is a Python web framework, while React, Angular, and Vue are JavaScript frameworks."
    },
    {
      id: 3,
      category: 'frontend',
      question: "What is the purpose of CSS?",
      options: [
        "To handle server-side logic",
        "To style and layout web pages",
        "To manage databases",
        "To handle user authentication"
      ],
      correctAnswer: 1,
      points: 100,
      explanation: "CSS (Cascading Style Sheets) is used to style and layout web pages."
    },
    {
      id: 4,
      category: 'backend',
      question: "Which of these is a Node.js web framework?",
      options: [
        "Express",
        "Laravel",
        "Django",
        "Ruby on Rails"
      ],
      correctAnswer: 0,
      points: 150,
      explanation: "Express is a minimal and flexible Node.js web application framework."
    },
    {
      id: 5,
      category: 'backend',
      question: "What is REST in RESTful API?",
      options: [
        "Remote Execution State Transfer",
        "Representational State Transfer",
        "Resource Estate Status Transfer",
        "Remote Estate Service Transfer"
      ],
      correctAnswer: 1,
      points: 150,
      explanation: "REST stands for Representational State Transfer, an architectural style for distributed systems."
    },
    {
      id: 6,
      category: 'database',
      question: "Which of these is NOT a NoSQL database?",
      options: [
        "MongoDB",
        "PostgreSQL",
        "Cassandra",
        "Redis"
      ],
      correctAnswer: 1,
      points: 150,
      explanation: "PostgreSQL is a relational (SQL) database, while the others are NoSQL databases."
    },
    {
      id: 7,
      category: 'database',
      question: "What is an index in a database?",
      options: [
        "A backup of the database",
        "A data structure that improves query speed",
        "A primary key constraint",
        "A foreign key relationship"
      ],
      correctAnswer: 1,
      points: 150,
      explanation: "An index is a data structure that improves the speed of data retrieval operations in a database."
    },
    {
      id: 8,
      category: 'devops',
      question: "What is Docker primarily used for?",
      options: [
        "Database management",
        "Frontend development",
        "Container virtualization",
        "Network security"
      ],
      correctAnswer: 2,
      points: 200,
      explanation: "Docker is a platform used for containerization, allowing applications to run in isolated environments."
    },
    {
      id: 9,
      category: 'devops',
      question: "What is CI/CD?",
      options: [
        "Code Integration/Code Deployment",
        "Continuous Integration/Continuous Deployment",
        "Computer Interface/Computer Development",
        "Continuous Interface/Continuous Development"
      ],
      correctAnswer: 1,
      points: 200,
      explanation: "CI/CD stands for Continuous Integration and Continuous Deployment, practices that enable frequent and reliable software delivery."
    },
    {
      id: 10,
      category: 'frontend',
      question: "What is the Virtual DOM?",
      options: [
        "A direct copy of the browser's DOM",
        "A lightweight copy of the DOM for performance optimization",
        "A virtual reality interface",
        "A browser extension"
      ],
      correctAnswer: 1,
      points: 150,
      explanation: "The Virtual DOM is a lightweight copy of the actual DOM used by frameworks like React to optimize rendering performance."
    }
  ]
};

export default function App() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIMEOUT);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    isComplete: false,
    streak: 0,
    timePerQuestion: [],
    categoryScores: {}
  });

  // Memoize filtered questions based on selected category
  const filteredQuestions = useMemo(() => {
    if (!quizData || !selectedCategory) return quizData?.questions;
    return quizData.questions.filter(q => q.category === selectedCategory);
  }, [quizData, selectedCategory]);

  useEffect(() => {
    // Simulate API fetch with sample data
    const loadQuiz = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Reduced loading time
        setQuizData(sampleQuizData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load quiz. Please try again.');
        setLoading(false);
      }
    };
    loadQuiz();
  }, []);

  useEffect(() => {
    if (!quizData || quizState.isComplete || !filteredQuestions) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswerSubmit(-1);
          return QUESTION_TIMEOUT;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizData, quizState.currentQuestionIndex, quizState.isComplete, filteredQuestions]);

  const handleStart = (categoryId: string | null = null) => {
    setSelectedCategory(categoryId);
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      isComplete: false,
      streak: 0,
      timePerQuestion: [],
      categoryScores: {}
    });
    setTimeLeft(QUESTION_TIMEOUT);
  };

  const handleAnswerSubmit = (selectedAnswer: number) => {
    if (!quizData || !filteredQuestions) return;

    const currentQuestion = filteredQuestions[quizState.currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const timeSpent = QUESTION_TIMEOUT - timeLeft;

    setQuizState((prev) => {
      const newState = {
        ...prev,
        answers: [...prev.answers, selectedAnswer],
        timePerQuestion: [...prev.timePerQuestion, timeSpent],
        categoryScores: {
          ...prev.categoryScores,
          [currentQuestion.category]: (prev.categoryScores[currentQuestion.category] || 0) + 
            (isCorrect ? currentQuestion.points : 0)
        }
      };

      if (isCorrect) {
        newState.score += currentQuestion.points;
        newState.streak += 1;
      } else {
        newState.streak = 0;
      }

      if (prev.currentQuestionIndex + 1 >= filteredQuestions.length) {
        newState.isComplete = true;
      } else {
        newState.currentQuestionIndex += 1;
      }

      return newState;
    });

    setTimeLeft(QUESTION_TIMEOUT);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!quizData) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {!quizState.currentQuestionIndex && !quizState.isComplete ? (
        <QuizStart
          title={quizData.title}
          description={quizData.description}
          categories={quizData.categories}
          onStart={handleStart}
        />
      ) : quizState.isComplete ? (
        <QuizResult
          score={quizState.score}
          totalQuestions={filteredQuestions?.length || 0}
          answers={quizState.answers}
          questions={filteredQuestions || []}
          timePerQuestion={quizState.timePerQuestion}
          categoryScores={quizState.categoryScores}
          onRestart={handleStart}
          selectedCategory={selectedCategory}
          categories={quizData.categories}
        />
      ) : (
        <QuizCard
          question={filteredQuestions![quizState.currentQuestionIndex]}
          totalQuestions={filteredQuestions?.length || 0}
          currentQuestion={quizState.currentQuestionIndex + 1}
          selectedAnswer={null}
          onSelectAnswer={handleAnswerSubmit}
          streak={quizState.streak}
          timeLeft={timeLeft}
          category={quizCategories.find(c => c.id === selectedCategory)?.name || 'All Categories'}
        />
      )}
    </div>
  );
}