import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Role } from '../../types/user';
import { Users, BookOpen, Award, Bell } from 'lucide-react';

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (user?.role !== Role.PARENT) return null;
  
  return (
    <div className="container mx-auto px-4 py-6">
      <section className="mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome, {user.name}</h1>
          <p className="text-blue-100 mb-4">Monitor your child's chess learning journey</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <StatCard icon={<Users size={20} />} title="Children" value="1" />
            <StatCard icon={<BookOpen size={20} />} title="Active Courses" value="2" />
            <StatCard icon={<Award size={20} />} title="Achievements" value="5" />
          </div>
        </div>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Children's Progress</h2>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <div className="flex items-start">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 flex items-center justify-center mr-4">
                  A
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">Alex Student</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Age: 9 • Level: Pawn</p>
                    </div>
                    
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Active
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-300">Overall Progress</span>
                        <span className="font-medium text-gray-800 dark:text-white">46%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '46%' }}></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <ProgressCategory label="Tactics" value={65} color="yellow" />
                      <ProgressCategory label="Strategy" value={42} color="blue" />
                      <ProgressCategory label="Endgames" value={30} color="purple" />
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <div className="text-sm">
                      <div className="font-medium text-gray-800 dark:text-white">Recent Activity</div>
                      <p className="text-gray-500 dark:text-gray-400">Last active: Today, 3:24 PM</p>
                      <p className="text-gray-500 dark:text-gray-400">Completed: 5 puzzles, 1 lesson</p>
                    </div>
                    
                    <button className="self-end px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full py-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 dark:hover:border-blue-400 transition-colors mt-4">
              Add another child
            </button>
          </div>
        </section>
        
        <section className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
              <Bell size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
              Recent Notifications
            </h2>
            
            <div className="space-y-4">
              {[
                { title: "Weekly Progress Report", time: "Today", desc: "Alex has completed 7 days of continuous practice!" },
                { title: "New Achievement Unlocked", time: "Yesterday", desc: "Alex earned the 'Pawn Power' badge for completing basic pawn lessons." },
                { title: "Assignment Complete", time: "2 days ago", desc: "Alex finished the tactics puzzle assignment with 85% accuracy." }
              ].map((notification, idx) => (
                <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-800 dark:text-white">{notification.title}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.desc}</p>
                </div>
              ))}
            </div>
            
            <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium mt-4">
              View All Notifications
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Parent Resources</h2>
            
            <div className="space-y-3">
              {[
                { title: "How to Support Your Child's Chess Journey", icon: "📖" },
                { title: "Understanding Progress Reports", icon: "📊" },
                { title: "Chess Benefits for Cognitive Development", icon: "🧠" }
              ].map((resource, idx) => (
                <button key={idx} className="w-full flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left">
                  <span className="text-2xl mr-3">{resource.icon}</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">{resource.title}</span>
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
        <div className="text-sm text-blue-100">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  </div>
);

const ProgressCategory: React.FC<{ label: string; value: number; color: string }> = ({ 
  label, value, color 
}) => {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    purple: "bg-purple-500"
  };
  
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        <span className="font-medium text-gray-700 dark:text-gray-300">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
        <div className={`${colorClasses[color as keyof typeof colorClasses]} h-1.5 rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
};

export default ParentDashboard;