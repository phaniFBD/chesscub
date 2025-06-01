import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Role } from '../../types/user';
import { Users, BookOpen, Server, Settings, BarChart2, Activity } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (user?.role !== Role.ADMIN) return null;
  
  return (
    <div className="container mx-auto px-4 py-6">
      <section className="mb-8">
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-300 mb-4">Platform management and analytics</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
            <StatCard icon={<Users size={20} />} title="Total Users" value="254" trend="+12%" />
            <StatCard icon={<BookOpen size={20} />} title="Courses" value="18" trend="+2%" />
            <StatCard icon={<BarChart2 size={20} />} title="Avg. Engagement" value="62%" trend="+5%" />
            <StatCard icon={<Activity size={20} />} title="Daily Active" value="87" trend="+8%" />
            <StatCard icon={<Server size={20} />} title="Server Load" value="42%" trend="-3%" />
            <StatCard icon={<Settings size={20} />} title="Config Status" value="Stable" trend="" />
          </div>
        </div>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="border-b border-gray-200 dark:border-gray-700 p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Platform Analytics</h2>
                
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white">
                    Last 7 Days
                  </button>
                  <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-white">
                    Last 30 Days
                  </button>
                  <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-white">
                    All Time
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-700 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <BarChart2 size={40} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">Analytics Chart Placeholder</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Students", value: "189", change: "+8%" },
                  { label: "Total Parents", value: "42", change: "+5%" },
                  { label: "Total Coaches", value: "16", change: "+2%" },
                  { label: "Admins", value: "7", change: "0%" }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                    <div className="flex items-end justify-between mt-1">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</div>
                      <div className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : stat.change === '0%' ? 'text-gray-500 dark:text-gray-400' : 'text-red-600 dark:text-red-400'}`}>
                        {stat.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md mt-6 p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Content Management</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Module</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Level</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Content Items</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { id: 1, name: "Basic Tactics", level: "Pawn", items: 12, status: "Published" },
                    { id: 2, name: "Pawn Structures", level: "Pawn", items: 8, status: "Published" },
                    { id: 3, name: "Knight Forks", level: "Knight", items: 15, status: "Published" },
                    { id: 4, name: "Discovered Attacks", level: "Knight", items: 10, status: "Draft" },
                    { id: 5, name: "Bishop Pairs", level: "Bishop", items: 7, status: "Review" },
                  ].map((module) => (
                    <tr key={module.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">
                        {module.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {module.level}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {module.items} items
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          module.status === 'Published' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                            : module.status === 'Draft'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}>
                          {module.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Quick Actions</h2>
            
            <div className="space-y-3">
              {[
                { title: "Create New Module", icon: <BookOpen size={18} /> },
                { title: "Add New User", icon: <Users size={18} /> },
                { title: "Update System Settings", icon: <Settings size={18} /> },
                { title: "View System Logs", icon: <Server size={18} /> }
              ].map((action, idx) => (
                <button key={idx} className="w-full flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                  <span className="mr-3 text-gray-700 dark:text-gray-300">{action.icon}</span>
                  <span className="text-sm font-medium text-gray-800 dark:text-white">{action.title}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">System Status</h2>
            
            <div className="space-y-4">
              {[
                { name: "API Server", status: "Operational", uptime: "99.9%" },
                { name: "Database", status: "Operational", uptime: "99.8%" },
                { name: "Storage", status: "Operational", uptime: "100%" },
                { name: "Chess Engine", status: "Operational", uptime: "99.7%" }
              ].map((service, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">{service.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Uptime: {service.uptime}</div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    {service.status}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full text-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
                View Detailed System Status
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Recent Activity</h2>
            
            <div className="space-y-4">
              {[
                { action: "New student registered", time: "10 minutes ago", user: "Emily Parker" },
                { action: "Module content updated", time: "2 hours ago", user: "Coach Smith" },
                { action: "System backup completed", time: "5 hours ago", user: "System" },
                { action: "New parent account linked", time: "Yesterday", user: "Michael Johnson" }
              ].map((activity, idx) => (
                <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0">
                  <div className="flex justify-between">
                    <div className="font-medium text-gray-800 dark:text-white">{activity.action}</div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">By: {activity.user}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; trend?: string }> = ({ 
  icon, title, value, trend 
}) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
    <div className="flex items-center mb-2">
      <div className="mr-3 text-white">{icon}</div>
      <div className="text-sm text-gray-300">{title}</div>
    </div>
    <div className="flex items-end justify-between">
      <div className="text-2xl font-bold text-white">{value}</div>
      {trend && (
        <div className={`text-xs ${trend.startsWith('+') ? 'text-green-400' : trend === '' ? 'text-gray-400' : 'text-red-400'}`}>
          {trend}
        </div>
      )}
    </div>
  </div>
);

export default AdminDashboard;