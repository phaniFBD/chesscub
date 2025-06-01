import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Role } from '../types/user';
import { ChevronLeft, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const AssignmentsPage: React.FC = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  
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
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
          Assignments
        </h1>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-sm rounded-lg ${filter === 'all' ? 'bg-green-600 text-white' : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 text-sm rounded-lg ${filter === 'pending' ? 'bg-green-600 text-white' : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 text-sm rounded-lg ${filter === 'completed' ? 'bg-green-600 text-white' : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'}`}
          >
            Completed
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="space-y-6">
                {[
                  { 
                    id: 1, 
                    title: "Knight Fork Tactics", 
                    description: "Practice identifying and executing knight forks in various positions.",
                    dueDate: "Tomorrow, 8:00 PM",
                    status: "pending",
                    progress: 0,
                    type: "puzzles",
                    items: 8,
                    points: 10,
                    difficulty: "Intermediate"
                  },
                  { 
                    id: 2, 
                    title: "Basic Checkmate Patterns", 
                    description: "Review and practice the fundamental checkmate patterns with queen, rooks, and minor pieces.",
                    dueDate: "Friday, 8:00 PM",
                    status: "pending",
                    progress: 25,
                    type: "mixed",
                    items: 5,
                    points: 15,
                    difficulty: "Beginner"
                  },
                  { 
                    id: 3, 
                    title: "Pin and Skewer Tactics", 
                    description: "Complete the set of puzzles focused on pins and skewers.",
                    dueDate: "Last week",
                    status: "completed",
                    progress: 100,
                    type: "puzzles",
                    items: 10,
                    points: 12,
                    score: 92
                  },
                  { 
                    id: 4, 
                    title: "Pawn Structure Quiz", 
                    description: "Test your knowledge on basic pawn structures and their strategic implications.",
                    dueDate: "2 weeks ago",
                    status: "completed",
                    progress: 100,
                    type: "quiz",
                    items: 15,
                    points: 20,
                    score: 85
                  }
                ]
                .filter(assignment => filter === 'all' || filter === assignment.status)
                .map((assignment) => (
                  <div 
                    key={assignment.id} 
                    className={`border rounded-lg overflow-hidden ${
                      assignment.status === 'completed' 
                        ? 'border-green-200 dark:border-green-800' 
                        : assignment.dueDate.includes('Tomorrow') 
                        ? 'border-yellow-200 dark:border-yellow-800' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className={`p-4 ${
                      assignment.status === 'completed' 
                        ? 'bg-green-50 dark:bg-green-900/20' 
                        : assignment.dueDate.includes('Tomorrow') 
                        ? 'bg-yellow-50 dark:bg-yellow-900/20' 
                        : 'bg-white dark:bg-gray-800'
                    }`}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium text-gray-800 dark:text-white">{assignment.title}</h3>
                            {assignment.status === 'completed' && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                <CheckCircle size={12} className="mr-1" />
                                Completed
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{assignment.description}</p>
                        </div>
                        
                        <div className="mt-3 md:mt-0 md:ml-4 flex items-center">
                          {assignment.status === 'pending' ? (
                            <div className={`flex items-center text-sm ${
                              assignment.dueDate.includes('Tomorrow') 
                                ? 'text-yellow-600 dark:text-yellow-400' 
                                : 'text-gray-600 dark:text-gray-300'
                            }`}>
                              <Clock size={16} className="mr-1" />
                              Due: {assignment.dueDate}
                            </div>
                          ) : (
                            <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                              <CheckCircle size={16} className="mr-1" />
                              Score: {assignment.score}%
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {assignment.status === 'pending' && (
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${assignment.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <span>Progress: {assignment.progress}%</span>
                            <span>{assignment.progress > 0 ? `${Math.round(assignment.progress * assignment.items / 100)}/${assignment.items} complete` : 'Not started'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="flex flex-wrap gap-2 mb-3 sm:mb-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                          {capitalize(assignment.type)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                          {assignment.items} items
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                          {assignment.difficulty}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {assignment.points} points
                        </span>
                      </div>
                      
                      {assignment.status === 'pending' && (
                        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                          {assignment.progress > 0 ? 'Continue' : 'Start Assignment'}
                        </button>
                      )}
                      
                      {assignment.status === 'completed' && (
                        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          View Results
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Assignment Summary</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
                <div className="flex items-center">
                  <div className="mr-3 rounded-full w-10 h-10 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">Pending</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Assignments to complete</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">2</div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
                <div className="flex items-center">
                  <div className="mr-3 rounded-full w-10 h-10 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300 flex items-center justify-center">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">Completed</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Assignments finished</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">2</div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-center">
                  <div className="mr-3 rounded-full w-10 h-10 bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300 flex items-center justify-center">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-yellow-800 dark:text-yellow-300">Due Soon</div>
                    <div className="text-sm text-yellow-700 dark:text-yellow-200">Within 24 hours</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-yellow-800 dark:text-yellow-300">1</div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-800 dark:text-white mb-2">Performance Stats</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">Average Score</span>
                    <span className="font-medium text-gray-800 dark:text-white">88.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">On-Time Completion</span>
                    <span className="font-medium text-gray-800 dark:text-white">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">Total Points Earned</span>
                    <span className="font-medium text-gray-800 dark:text-white">32/32</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {user.role === Role.STUDENT && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Need Help?</h2>
              
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left">
                  <div className="mr-3 rounded-full w-8 h-8 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 flex items-center justify-center">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 10H8.01M12 10H12.01M16 10H16.01M9 16H5C3.89543 16 3 15.1046 3 14V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H15L12 19L9 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">Ask Coach a Question</span>
                </button>
                
                <button className="w-full flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left">
                  <div className="mr-3 rounded-full w-8 h-8 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 flex items-center justify-center">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12H15M12 9V15M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">Request Additional Help</span>
                </button>
                
                <button className="w-full flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left">
                  <div className="mr-3 rounded-full w-8 h-8 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 flex items-center justify-center">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">Request Deadline Extension</span>
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

// Helper function to capitalize first letter
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default AssignmentsPage;