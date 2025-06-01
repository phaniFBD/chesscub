import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Role } from '../../types/user';
import { Users, BookOpen, BarChart2, Calendar } from 'lucide-react';

const CoachDashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (user?.role !== Role.COACH) return null;
  
  return (
    <div className="container mx-auto px-4 py-6">
      <section className="mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Coach Dashboard</h1>
          <p className="text-purple-100 mb-4">Manage your students and assignments</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <StatCard icon={<Users size={20} />} title="Total Students" value="12" />
            <StatCard icon={<BookOpen size={20} />} title="Active Courses" value="4" />
            <StatCard icon={<BarChart2 size={20} />} title="Avg. Performance" value="72%" />
            <StatCard icon={<Calendar size={20} />} title="Pending Assignments" value="7" />
          </div>
        </div>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Your Students</h2>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="px-3 py-1.5 pl-8 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <svg className="absolute left-2.5 top-2 w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <select className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option>All Levels</option>
                  <option>Pawn</option>
                  <option>Knight</option>
                  <option>Bishop</option>
                  <option>Queen</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Level</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Progress</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Active</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { id: 1, name: "Alex Student", age: 9, level: "Pawn", progress: 46, lastActive: "Today" },
                    { id: 2, name: "Emma Johnson", age: 7, level: "Pawn", progress: 32, lastActive: "Yesterday" },
                    { id: 3, name: "Noah Williams", age: 11, level: "Knight", progress: 68, lastActive: "2 days ago" },
                    { id: 4, name: "Sophia Davis", age: 10, level: "Knight", progress: 75, lastActive: "Today" },
                    { id: 5, name: "Oliver Brown", age: 14, level: "Bishop", progress: 82, lastActive: "Today" },
                  ].map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center mr-3">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 dark:text-white">{student.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Age: {student.age}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.level === 'Pawn' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                            : student.level === 'Knight'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                        }`}>
                          {student.level}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2 w-24">
                            <div className={`h-2 rounded-full ${
                              student.progress < 40 ? 'bg-yellow-500' : 
                              student.progress < 70 ? 'bg-blue-500' : 'bg-green-500'
                            }`} style={{ width: `${student.progress}%` }}></div>
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {student.lastActive}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 mr-3">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing 5 of 12 students
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Previous
                </button>
                <button className="px-3 py-1 rounded-md bg-purple-600 text-white hover:bg-purple-700">
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Upcoming Assignments</h2>
            
            <div className="space-y-4">
              {[
                { title: "Knight Fork Tactics", dueDate: "Tomorrow", students: 5 },
                { title: "Basic Checkmate Patterns", dueDate: "In 3 days", students: 8 },
                { title: "Pawn Structure Analysis", dueDate: "Next week", students: 4 }
              ].map((assignment, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:border-purple-500 transition-colors">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-800 dark:text-white">{assignment.title}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Due: {assignment.dueDate}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Assigned to {assignment.students} students</p>
                  <div className="flex justify-end mt-2">
                    <button className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium">
                      Edit Assignment
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full py-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-500 dark:hover:border-purple-400 transition-colors mt-4">
              Create New Assignment
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Teaching Resources</h2>
            
            <div className="space-y-3">
              {[
                { title: "Effective Chess Teaching Strategies", type: "Guide" },
                { title: "Student Engagement Techniques", type: "Video" },
                { title: "Assessment Tools & Rubrics", type: "Template" }
              ].map((resource, idx) => (
                <button key={idx} className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors text-left">
                  <span className="text-sm font-medium text-gray-800 dark:text-white">{resource.title}</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                    {resource.type}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({ 
  icon, title, value 
}) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
    <div className="flex items-center">
      <div className="mr-3 text-white">{icon}</div>
      <div>
        <div className="text-sm text-purple-100">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  </div>
);

export default CoachDashboard;