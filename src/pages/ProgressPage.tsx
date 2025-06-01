import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Role } from '../types/user';
import { ChevronLeft, BarChart2, Award, TrendingUp, Target } from 'lucide-react';
import ProgressRadialChart from '../components/ui/ProgressRadialChart';

const ProgressPage: React.FC = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  
  if (!user) return null;
  
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
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">Your Progress</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center mb-4 sm:mb-0">
                  <BarChart2 size={20} className="mr-2 text-green-600 dark:text-green-400" />
                  Skill Matrix
                </h2>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setTimeRange('week')}
                    className={`px-3 py-1.5 text-sm rounded-lg ${timeRange === 'week' ? 'bg-green-600 text-white' : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'}`}
                  >
                    Week
                  </button>
                  <button 
                    onClick={() => setTimeRange('month')}
                    className={`px-3 py-1.5 text-sm rounded-lg ${timeRange === 'month' ? 'bg-green-600 text-white' : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'}`}
                  >
                    Month
                  </button>
                  <button 
                    onClick={() => setTimeRange('year')}
                    className={`px-3 py-1.5 text-sm rounded-lg ${timeRange === 'year' ? 'bg-green-600 text-white' : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'}`}
                  >
                    Year
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Tactics", value: 65, color: "#F59E0B" },
                  { label: "Strategy", value: 42, color: "#3B82F6" },
                  { label: "Endgames", value: 30, color: "#8B5CF6" },
                  { label: "Openings", value: 53, color: "#10B981" }
                ].map((skill) => (
                  <div key={skill.label} className="flex flex-col items-center">
                    <ProgressRadialChart 
                      percentage={skill.value} 
                      size={80} 
                      color={skill.color} 
                    />
                    <div className="mt-2 text-center">
                      <div className="font-medium text-gray-800 dark:text-white">{skill.label}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Level {Math.floor(skill.value / 20) + 1}/5</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-750 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <BarChart2 size={40} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">Progress Chart Placeholder</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    This would show a time-series chart of progress across all skill areas
                  </p>
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-start">
                <div className="text-yellow-500 dark:text-yellow-400 mr-3 mt-0.5">
                  <Target size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-yellow-800 dark:text-yellow-300">Areas for Improvement</h3>
                  <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-200 space-y-1">
                    <li>• Endgame technique needs practice - focus on rook endgames</li>
                    <li>• Work on recognizing pin tactics</li>
                    <li>• Spend more time studying pawn structures</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
              <TrendingUp size={20} className="mr-2 text-green-600 dark:text-green-400" />
              Learning Activity
            </h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-800 dark:text-white">Weekly Activity</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">Last 4 weeks</span>
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 28 }).map((_, idx) => {
                  const activityLevel = Math.floor(Math.random() * 4); // 0-3
                  return (
                    <div 
                      key={idx} 
                      className={`aspect-square rounded-sm ${
                        activityLevel === 0 
                          ? 'bg-gray-200 dark:bg-gray-700' 
                          : activityLevel === 1 
                          ? 'bg-green-200 dark:bg-green-900/30' 
                          : activityLevel === 2 
                          ? 'bg-green-300 dark:bg-green-800/50' 
                          : 'bg-green-500 dark:bg-green-600'
                      }`}
                      title={`${activityLevel * 15} minutes of activity`}
                    ></div>
                  );
                })}
              </div>
              <div className="flex justify-end mt-1">
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
                  <span>None</span>
                  <div className="w-3 h-3 bg-green-200 dark:bg-green-900/30 rounded-sm"></div>
                  <span>Low</span>
                  <div className="w-3 h-3 bg-green-300 dark:bg-green-800/50 rounded-sm"></div>
                  <span>Medium</span>
                  <div className="w-3 h-3 bg-green-500 dark:bg-green-600 rounded-sm"></div>
                  <span>High</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white mb-4">Recent Completions</h3>
              
              <div className="space-y-4">
                {[
                  { type: 'Lesson', title: 'Knight Fork Tactics', date: '2 days ago', score: '100%' },
                  { type: 'Puzzle', title: 'Pin Practice Set', date: '3 days ago', score: '85%' },
                  { type: 'Quiz', title: 'Pawn Structure Basics', date: '5 days ago', score: '92%' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className={`rounded-full h-10 w-10 flex items-center justify-center mr-3 ${
                      item.type === 'Lesson' 
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300' 
                        : item.type === 'Puzzle'
                        ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300'
                        : 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300'
                    }`}>
                      {item.type === 'Lesson' 
                        ? <BookOpen size={16} />
                        : item.type === 'Puzzle'
                        ? <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 14L12 10L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        : <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                      }
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white">{item.title}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{item.type} • Completed {item.date}</div>
                        </div>
                        <div className="text-green-600 dark:text-green-400 font-medium">{item.score}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
              <Award size={20} className="mr-2 text-green-600 dark:text-green-400" />
              Achievements
            </h2>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((badge) => (
                <div key={badge} className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${badge <= 3 ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300' : 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500'}`}>
                    {badge <= 3 ? (
                      <Award size={24} />
                    ) : (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15L8.5 17L9.5 13L6.5 10.5L10.5 10L12 6.5L13.5 10L17.5 10.5L14.5 13L15.5 17L12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-xs text-center text-gray-600 dark:text-gray-400">
                    {badge <= 3 ? 'Badge ' + badge : 'Locked'}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <div className="flex items-start">
                  <div className="rounded-full h-10 w-10 bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300 flex items-center justify-center mr-3">
                    <Award size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">Pawn Power</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Completed all basic pawn lessons</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Earned 2 weeks ago</div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <div className="flex items-start">
                  <div className="rounded-full h-10 w-10 bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300 flex items-center justify-center mr-3">
                    <Award size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">Tactics Apprentice</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Solved 10 fork puzzles successfully</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Earned 3 weeks ago</div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <div className="flex items-start">
                  <div className="rounded-full h-10 w-10 bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300 flex items-center justify-center mr-3">
                    <Award size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">Consistency Champion</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Logged in for 7 days in a row</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Earned 5 days ago</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <button className="w-full text-center text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium">
                View All Achievements
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Learning Goals</h2>
            
            <div className="space-y-4">
              {[
                { title: "Complete Knight Level", progress: 70, target: "September 15" },
                { title: "Solve 50 Puzzles", progress: 34, target: "End of month" },
                { title: "Master Basic Checkmates", progress: 50, target: "October 1" }
              ].map((goal, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-gray-800 dark:text-white">{goal.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Target: {goal.target}</div>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                    {goal.progress}% complete
                  </div>
                </div>
              ))}
              
              <button className="w-full py-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:border-green-500 dark:hover:border-green-400 transition-colors">
                Add New Goal
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProgressPage;