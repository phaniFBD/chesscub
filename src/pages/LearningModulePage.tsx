import React, { useState } from 'react';
import { ChevronLeft, Info, Award, BookOpen, CheckCircle } from 'lucide-react';
import { Module } from '../types/curriculum';

// Mock data
import { modules } from '../data/mockData';

interface LearningModulePageProps {
  moduleId: string;
}

const LearningModulePage: React.FC<LearningModulePageProps> = ({ moduleId }) => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'puzzles' | 'quizzes'>('lessons');
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  
  // Find the module by ID (for a real app, this would come from an API)
  const module = modules.find(m => m.id === moduleId) || modules[0];
  
  if (!module) {
    return <div>Module not found</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <button 
          onClick={() => window.navigateTo('dashboard')}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Dashboard
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className={`bg-gradient-to-r ${getCategoryGradient(module.category)} p-6 text-white`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm">
                  {module.level} Level • {capitalize(module.category)}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{module.title}</h1>
              <p className="text-white/80 mb-4 max-w-2xl">{module.description}</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center">
                <div className="mr-4">
                  <img 
                    src={module.badge.imageUrl || "https://via.placeholder.com/60?text=Badge"}
                    alt={module.badge.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <div className="text-sm text-white/80">Complete to earn</div>
                  <div className="font-bold">{module.badge.name} Badge</div>
                  <div className="text-xs text-white/60 mt-1">{module.badge.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`pb-4 px-4 flex items-center ${activeTab === 'lessons' ? 'border-b-2 border-green-500 text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
            >
              <BookOpen size={18} className="mr-2" />
              Lessons ({module.lessons.length})
            </button>
            <button
              onClick={() => setActiveTab('puzzles')}
              className={`pb-4 px-4 flex items-center ${activeTab === 'puzzles' ? 'border-b-2 border-green-500 text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
            >
              <svg className="w-4.5 h-4.5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 14L12 10L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Puzzles ({module.puzzles.length})
            </button>
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`pb-4 px-4 flex items-center ${activeTab === 'quizzes' ? 'border-b-2 border-green-500 text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
            >
              <svg className="w-4.5 h-4.5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Quizzes ({module.quizzes.length})
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 order-2 md:order-1">
              <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 dark:text-white mb-4">Content List</h3>
                
                <div className="space-y-2">
                  {activeTab === 'lessons' && module.lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveItemIndex(index)}
                      className={`w-full flex items-center p-3 rounded-lg text-left ${
                        activeItemIndex === index 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 border border-current">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{lesson.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{lesson.durationMinutes} min</div>
                      </div>
                      {index < 2 && (
                        <CheckCircle size={16} className="ml-auto text-green-600 dark:text-green-400" />
                      )}
                    </button>
                  ))}
                  
                  {activeTab === 'puzzles' && module.puzzles.map((puzzle, index) => (
                    <button
                      key={puzzle.id}
                      onClick={() => setActiveItemIndex(index)}
                      className={`w-full flex items-center p-3 rounded-lg text-left ${
                        activeItemIndex === index 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${getDifficultyColor(puzzle.difficulty)}`}>
                        {puzzle.difficulty}
                      </div>
                      <div className="font-medium">{puzzle.title}</div>
                      {index < 1 && (
                        <CheckCircle size={16} className="ml-auto text-green-600 dark:text-green-400" />
                      )}
                    </button>
                  ))}
                  
                  {activeTab === 'quizzes' && module.quizzes.map((quiz, index) => (
                    <button
                      key={quiz.id}
                      onClick={() => setActiveItemIndex(index)}
                      className={`w-full flex items-center p-3 rounded-lg text-left ${
                        activeItemIndex === index 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div>
                        <div className="font-medium">{quiz.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{quiz.questions.length} questions • {quiz.timeLimit} min</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 order-1 md:order-2">
              {activeTab === 'lessons' && module.lessons[activeItemIndex] && (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  {module.lessons[activeItemIndex].videoUrl ? (
                    <div className="aspect-video bg-gray-900 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <svg className="w-12 h-12 mx-auto mb-2\" viewBox="0 0 24 24\" fill="none\" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="2"/>
                          <path d="M15.5 12L10 15V9L15.5 12Z\" fill="currentColor"/>
                        </svg>
                        <p>Video Lesson (Placeholder)</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                        {module.lessons[activeItemIndex].title}
                      </h2>
                      
                      <div className="prose dark:prose-invert max-w-none">
                        <p>
                          This is a placeholder for the lesson content. In a real application, 
                          this would contain rich text, images, and interactive elements explaining
                          the chess concept in detail.
                        </p>
                        <p>
                          Chess lessons would typically include:
                        </p>
                        <ul>
                          <li>Explanatory text with proper formatting</li>
                          <li>Diagrams and illustrations of chess positions</li>
                          <li>Interactive chess boards to explore concepts</li>
                          <li>Examples from famous games</li>
                          <li>Practice positions to try</li>
                        </ul>
                        <p>
                          This content would be tailored to the appropriate age group and skill level.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-750 flex justify-between items-center">
                    <button 
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50"
                      disabled={activeItemIndex === 0}
                      onClick={() => setActiveItemIndex(prev => Math.max(0, prev - 1))}
                    >
                      Previous
                    </button>
                    
                    <button 
                      className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => {
                        if (activeItemIndex < module.lessons.length - 1) {
                          setActiveItemIndex(prev => prev + 1);
                        } else {
                          // Last item, would normally mark as complete
                          window.navigateTo('dashboard');
                        }
                      }}
                    >
                      {activeItemIndex < module.lessons.length - 1 ? 'Next Lesson' : 'Mark Complete'}
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'puzzles' && module.puzzles[activeItemIndex] && (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-750 flex items-center justify-center">
                    <div className="text-center p-6">
                      <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                        {module.puzzles[activeItemIndex].title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {module.puzzles[activeItemIndex].description}
                      </p>
                      
                      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Chess position (FEN):</div>
                        <div className="font-mono text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto">
                          {module.puzzles[activeItemIndex].fen}
                        </div>
                        <div className="mt-4 text-center text-gray-400">
                          <svg className="w-16 h-16 mx-auto mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="20" height="20" x="2" y="2" rx="2" stroke="currentColor" strokeWidth="2"/>
                            <path d="M7 7H7.01M12 7H12.01M17 7H17.01M7 12H7.01M12 12H12.01M17 12H17.01M7 17H7.01M12 17H12.01M17 17H17.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <p>Interactive chess board would be displayed here</p>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Difficulty:</strong> {module.puzzles[activeItemIndex].difficulty}/5 • 
                        <strong> Type:</strong> {capitalize(module.puzzles[activeItemIndex].type)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-750 flex justify-between items-center">
                    <button 
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50"
                      disabled={activeItemIndex === 0}
                      onClick={() => setActiveItemIndex(prev => Math.max(0, prev - 1))}
                    >
                      Previous
                    </button>
                    
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 rounded-lg border border-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                        Hint
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white">
                        Submit Answer
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'quizzes' && module.quizzes[activeItemIndex] && (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">
                          {module.quizzes[activeItemIndex].title}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {module.quizzes[activeItemIndex].questions.length} questions • {module.quizzes[activeItemIndex].timeLimit} minute time limit
                        </p>
                      </div>
                      
                      <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                        Time Left: {module.quizzes[activeItemIndex].timeLimit}:00
                      </div>
                    </div>
                    
                    {module.quizzes[activeItemIndex].questions.length > 0 && (
                      <div className="mb-6">
                        <div className="font-medium text-gray-800 dark:text-white mb-2">
                          Question 1 of {module.quizzes[activeItemIndex].questions.length}
                        </div>
                        <div className="text-lg text-gray-800 dark:text-white mb-4">
                          {module.quizzes[activeItemIndex].questions[0].text}
                        </div>
                        
                        {module.quizzes[activeItemIndex].questions[0].imageUrl && (
                          <div className="mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-center">
                            <div className="text-gray-400">
                              [Question image would be displayed here]
                            </div>
                          </div>
                        )}
                        
                        <div className="space-y-3">
                          {module.quizzes[activeItemIndex].questions[0].options.map((option, idx) => (
                            <label key={idx} className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer">
                              <input
                                type="radio"
                                name="question"
                                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <span className="ml-3 text-gray-700 dark:text-gray-300">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-750 flex justify-between items-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Question 1 of {module.quizzes[activeItemIndex].questions.length}
                    </div>
                    
                    <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white">
                      Next Question
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const getCategoryGradient = (category: string) => {
  switch (category) {
    case 'tactics':
      return 'from-yellow-500 to-orange-500';
    case 'strategy':
      return 'from-blue-500 to-indigo-500';
    case 'endgames':
      return 'from-purple-500 to-pink-500';
    case 'openings':
      return 'from-green-500 to-teal-500';
    default:
      return 'from-gray-500 to-gray-700';
  }
};

const getDifficultyColor = (difficulty: number) => {
  switch (difficulty) {
    case 1:
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 2:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 3:
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 4:
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    case 5:
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

export default LearningModulePage;