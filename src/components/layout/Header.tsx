import React from 'react';
import { Sun, Moon, Menu, X, User, BookOpen, Award, ChevronDown } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Role } from '../../types/user';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);

  if (!isAuthenticated) {
    return (
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <ChessPieceIcon className="h-10 w-10 text-green-600 dark:text-green-400" />
            <h1 className="ml-2 text-xl font-bold text-gray-800 dark:text-white">ChessMaster Kids</h1>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>
    );
  }

  const getLevelBadge = () => {
    if (user?.role !== Role.STUDENT) return null;
    
    const levelColors = {
      'Pawn': 'bg-yellow-200 text-yellow-800',
      'Knight': 'bg-blue-200 text-blue-800',
      'Bishop': 'bg-purple-200 text-purple-800',
      'Queen': 'bg-pink-200 text-pink-800'
    };
    
    const level = (user as any).level;
    return (
      <span className={`ml-2 text-xs px-2 py-1 rounded-full ${levelColors[level as keyof typeof levelColors]}`}>
        {level}
      </span>
    );
  };

  const getRoleLabel = () => {
    const roleLabels = {
      [Role.STUDENT]: 'Student',
      [Role.PARENT]: 'Parent',
      [Role.COACH]: 'Coach',
      [Role.ADMIN]: 'Admin'
    };
    
    return (
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {roleLabels[user?.role || Role.STUDENT]}
      </span>
    );
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button 
              className="mr-2 md:hidden" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <ChessPieceIcon className="h-10 w-10 text-green-600 dark:text-green-400" />
            <h1 className="ml-2 text-xl font-bold text-gray-800 dark:text-white hidden md:block">ChessMaster Kids</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => window.navigateTo('dashboard')}
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Dashboard
            </button>
            
            <button 
              onClick={() => window.navigateTo('progress')}
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              My Progress
            </button>
            
            <button 
              onClick={() => window.navigateTo('assignments')}
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Assignments
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center text-green-800 dark:text-green-100">
                  {user?.name?.charAt(0) || <User size={20} />}
                </div>
                <div className="hidden md:block text-left">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800 dark:text-white">{user?.name}</span>
                    {getLevelBadge()}
                  </div>
                  {getRoleLabel()}
                </div>
                <ChevronDown size={16} className="hidden md:block" />
              </button>
              
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                  <button 
                    onClick={() => {
                      window.navigateTo('profile');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <User size={16} className="mr-2" />
                    My Profile
                  </button>
                  
                  <button 
                    onClick={() => {
                      logout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <nav className="flex flex-col space-y-4">
            <button 
              onClick={() => {
                window.navigateTo('dashboard');
                setIsMenuOpen(false);
              }}
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center"
            >
              <BookOpen size={18} className="mr-2" />
              Dashboard
            </button>
            
            <button 
              onClick={() => {
                window.navigateTo('progress');
                setIsMenuOpen(false);
              }}
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center"
            >
              <Award size={18} className="mr-2" />
              My Progress
            </button>
            
            <button 
              onClick={() => {
                window.navigateTo('assignments');
                setIsMenuOpen(false);
              }}
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Assignments
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

// Custom chess piece icon component
const ChessPieceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L8 6H16L12 2Z" fill="currentColor" />
    <path d="M12 6V10M12 10L9 13M12 10L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 17.5C8 16.1193 9.11929 15 10.5 15H13.5C14.8807 15 16 16.1193 16 17.5V18H8V17.5Z" fill="currentColor" />
    <path d="M5 21V19H19V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21Z" fill="currentColor" />
  </svg>
);

export default Header;