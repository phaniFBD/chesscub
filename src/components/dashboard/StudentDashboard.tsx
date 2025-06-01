import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Role } from '../../types/user';
import { BookOpen, Award, Clock, TrendingUp, CheckCircle2 } from 'lucide-react';
import ProgressRadialChart from '../ui/ProgressRadialChart';

// Mock data
import { modules } from '../../data/mockData';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (user?.role !== Role.STUDENT) return null;
  const student = user;

  return (
    <div className="container mx-auto px-4 py-6">
      <section className="mb-8">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {student.name}!</h1>
              <p className="text-green-100 mb-4">Continue your chess journey today.</p>
              <div className="flex items-center mb-4">
                <button 
                  onClick={() => window.navigateTo('module', { moduleId: 'current' })}
                  className="bg-white text-green-700 hover:bg-green-100 px-5 py-2 rounded-lg font-medium transition-colors shadow-md"
                >
                  Continue Learning
                </button>
                <div className="ml-4 bg-white/20 rounded-lg px-3 py-1 flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm">Last session: Yesterday</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-64">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Your Progress</h3>
                  <button onClick={() => window.navigateTo('progress')} className="text-sm underline">View Details</button>
                </div>
                <div className="flex justify-between items-center">
                  <ProgressRadialChart percentage={student.progress.overall} size={80} />
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-300 mr-2"></div>
                      <span className="text-sm">Tactics: {student.progress.tactics}%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
                      <span className="text-sm">Strategy: {student.progress.strategy}%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-300 mr-2"></div>
                      <span className="text-sm">Endgames: {student.progress.endgames}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
              <BookOpen size={20} className="mr-2 text-green-600 dark:text-green-400" />
              Your Learning Journey
            </h2>
            
            <div className="space-y-6">
              {modules.filter(m => m.level === student.level).map((module) => (
                <div key={module.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-500 dark:hover:border-green-400 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white mb-1">{module.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{module.description}</p>
                      
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                        <span className="flex items-center">
                          <BookOpen size={14} className="mr-1" />
                          {module.lessons.length} Lessons
                        </span>
                        <span className="flex items-center">
                          <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 14L12 10L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {module.puzzles.length} Puzzles
                        </span>
                        <span className="flex items-center">
                          <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {module.quizzes.length} Quizzes
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mb-2">
                        {module.category.charAt(0).toUpperCase() + module.category.slice(1)}
                      </span>
                      
                      <button 
                        onClick={() => window.navigateTo('module', { moduleId: module.id })}
                        className="text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium"
                      >
                        Continue →
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>Progress: 35%</span>
                      <span>5/14 completed</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:border-green-500 dark:hover:border-green-400 transition-colors">
                Explore more learning modules...
              </button>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
              <Award size={20} className="mr-2 text-green-600 dark:text-green-400" />
              Your Achievements
            </h2>
            
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((badge) => (
                <div key={badge} className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${badge <= 3 ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300' : 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500'}`}>
                    {badge <= 3 ? (
                      <CheckCircle2 size={24} />
                    ) : (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs text-center text-gray-600 dark:text-gray-400">
                    {badge <= 3 ? 'Badge ' + badge : 'Locked'}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full text-center text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium">
                View All Achievements
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
              <TrendingUp size={20} className="mr-2 text-green-600 dark:text-green-400" />
              Study Streak
            </h2>
            
            <div className="flex justify-between mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">7</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Day Streak</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 dark:text-white">42</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Minutes Today</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 dark:text-blue-400">14</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Puzzles Solved</div>
              </div>
            </div>
            
            <div className="flex justify-between">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{day}</div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i < 7 ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300' : 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500'}`}>
                    {i < 7 ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <span>·</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;