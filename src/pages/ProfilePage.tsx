import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Role } from '../types/user';
import { ChevronLeft, User, Settings, Shield, LogOut } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'info' | 'settings' | 'preferences'>('info');
  
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
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-4xl font-bold mb-4 md:mb-0 md:mr-6">
              {user.name?.charAt(0) || <User size={36} />}
            </div>
            
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
              <p className="text-green-100">
                {getRoleLabel(user.role)}
                {user.role === Role.STUDENT && (
                  <span className="ml-2 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    Level: {(user as any).level || 'Pawn'}
                  </span>
                )}
              </p>
              <div className="mt-2 text-sm text-green-100">
                {user.email}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-4 px-4 text-center ${activeTab === 'info' ? 'border-b-2 border-green-500 text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <User size={18} className="inline-block mr-2" />
            My Info
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-4 px-4 text-center ${activeTab === 'settings' ? 'border-b-2 border-green-500 text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <Settings size={18} className="inline-block mr-2" />
            Account Settings
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`flex-1 py-4 px-4 text-center ${activeTab === 'preferences' ? 'border-b-2 border-green-500 text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <Shield size={18} className="inline-block mr-2" />
            Privacy & Preferences
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'info' && (
            <div>
              <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Account Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Full Name</label>
                      <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg text-gray-800 dark:text-white">
                        {user.name}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Email Address</label>
                      <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg text-gray-800 dark:text-white">
                        {user.email}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Account Type</label>
                      <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg text-gray-800 dark:text-white">
                        {getRoleLabel(user.role)}
                      </div>
                    </div>
                    
                    {user.role === Role.STUDENT && (
                      <>
                        <div>
                          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Age</label>
                          <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg text-gray-800 dark:text-white">
                            {(user as any).age || 'Not specified'} years old
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Current Level</label>
                          <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg text-gray-800 dark:text-white">
                            {(user as any).level || 'Pawn'} Level
                          </div>
                        </div>
                      </>
                    )}
                    
                    {user.role === Role.PARENT && (
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Linked Children</label>
                        <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg text-gray-800 dark:text-white">
                          {(user as any).children?.length || 0} children linked
                        </div>
                      </div>
                    )}
                    
                    {user.role === Role.COACH && (
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Students</label>
                        <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg text-gray-800 dark:text-white">
                          {(user as any).students?.length || 0} students assigned
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Account Stats</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Member Since</div>
                      <div className="font-medium text-gray-800 dark:text-white">January 15, 2023</div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Last Login</div>
                      <div className="font-medium text-gray-800 dark:text-white">Today, 3:45 PM</div>
                    </div>
                    
                    {user.role === Role.STUDENT && (
                      <>
                        <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Learning Time</div>
                          <div className="font-medium text-gray-800 dark:text-white">42 hours, 15 minutes</div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Completed Lessons</div>
                          <div className="font-medium text-gray-800 dark:text-white">24 lessons</div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Puzzles Solved</div>
                          <div className="font-medium text-gray-800 dark:text-white">87 puzzles</div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Badges Earned</div>
                          <div className="font-medium text-gray-800 dark:text-white">3 badges</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Password & Security</h3>
                  
                  <div className="space-y-4">
                    <button className="w-full flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 dark:hover:border-green-400 transition-colors">
                      <div className="flex items-center">
                        <div className="rounded-full w-10 h-10 bg-gray-100 dark:bg-gray-750 flex items-center justify-center text-gray-500 dark:text-gray-400 mr-3">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                            <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white">Change Password</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Last changed: 2 months ago</div>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    <button className="w-full flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 dark:hover:border-green-400 transition-colors">
                      <div className="flex items-center">
                        <div className="rounded-full w-10 h-10 bg-gray-100 dark:bg-gray-750 flex items-center justify-center text-gray-500 dark:text-gray-400 mr-3">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3L21 21M10.584 10.587C10.2087 10.962 10 11.462 10 12C10 13.105 10.895 14 12 14C12.538 14 13.038 13.791 13.413 13.416M9 5.6C9.925 5.221 10.907 5 12 5C15.314 5 18 7.686 18 11C18 12.093 17.779 13.075 17.4 14M3 15L5 13L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white">Two-Factor Authentication</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Not enabled</div>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    <button className="w-full flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 dark:hover:border-green-400 transition-colors">
                      <div className="flex items-center">
                        <div className="rounded-full w-10 h-10 bg-gray-100 dark:bg-gray-750 flex items-center justify-center text-gray-500 dark:text-gray-400 mr-3">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 5V3M12 21V19M5 12H3M21 12H19M18.364 18.364L16.95 16.95M18.364 5.636L16.95 7.05M5.636 5.636L7.05 7.05M5.636 18.364L7.05 16.95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white">Login History</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">View recent account activity</div>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Account Management</h3>
                  
                  <div className="space-y-4">
                    {user.role === Role.PARENT && (
                      <button className="w-full flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 dark:hover:border-green-400 transition-colors">
                        <div className="flex items-center">
                          <div className="rounded-full w-10 h-10 bg-gray-100 dark:bg-gray-750 flex items-center justify-center text-gray-500 dark:text-gray-400 mr-3">
                            <svg className="w-5 h-5\" viewBox="0 0 24 24\" fill="none\" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 4V20M20 12H4\" stroke="currentColor\" strokeWidth="2\" strokeLinecap="round\" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 dark:text-white">Add Child Account</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Link a new child profile</div>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    )}
                    
                    <button className="w-full flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-500 dark:hover:border-green-400 transition-colors">
                      <div className="flex items-center">
                        <div className="rounded-full w-10 h-10 bg-gray-100 dark:bg-gray-750 flex items-center justify-center text-gray-500 dark:text-gray-400 mr-3">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 17L15 17M12 17L12 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15.25 9C15.25 9.19036 15.1712 9.38068 15.0284 9.5236L12.5 12.0572L9.97159 9.5236C9.82876 9.38068 9.75 9.19036 9.75 9C9.75 8.58579 10.0858 8.25 10.5 8.25H14.5C14.9142 8.25 15.25 8.58579 15.25 9Z" fill="currentColor"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white">Download My Data</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Get a copy of your personal data</div>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    <button 
                      onClick={logout}
                      className="w-full flex justify-between items-center p-4 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="rounded-full w-10 h-10 bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 dark:text-red-400 mr-3">
                          <LogOut size={20} />
                        </div>
                        <div>
                          <div className="font-medium text-red-600 dark:text-red-400">Log Out</div>
                          <div className="text-sm text-red-500 dark:text-red-300">Sign out of your account</div>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'preferences' && (
            <div>
              <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Privacy & Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Notifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">Email Notifications</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Receive updates about your account</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">Assignment Reminders</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Get notified about upcoming deadlines</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">Progress Reports</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Weekly updates on learning progress</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Accessibility</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">Dyslexia-Friendly Font</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Use a more readable font for all text</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">High Contrast Mode</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Increase contrast for better visibility</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">Text-to-Speech</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Enable reading lessons aloud</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Privacy Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">Data Collection</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Allow anonymous usage data collection</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    
                    {user.role === Role.STUDENT && (
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white">Share Progress with Coach</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Allow coach to view detailed performance</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    )}
                    
                    {user.role === Role.PARENT && (
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white">Child Account Visibility</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Share child's progress with assigned coach</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to get a user-friendly role label
const getRoleLabel = (role: Role): string => {
  switch (role) {
    case Role.STUDENT:
      return 'Student Account';
    case Role.PARENT:
      return 'Parent Account';
    case Role.COACH:
      return 'Coach Account';
    case Role.ADMIN:
      return 'Administrator';
    default:
      return 'User';
  }
};

export default ProfilePage;