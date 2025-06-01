import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (userType: string) => {
    setIsLoading(true);
    let demoEmail = '';
    
    switch (userType) {
      case 'student':
        demoEmail = 'student@example.com';
        break;
      case 'parent':
        demoEmail = 'parent@example.com';
        break;
      case 'coach':
        demoEmail = 'coach@example.com';
        break;
      case 'admin':
        demoEmail = 'admin@example.com';
        break;
    }
    
    try {
      await login(demoEmail, 'demo123');
    } catch (err) {
      setError('Failed to log in with demo account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <ChessLogo className="h-16 w-16 mx-auto text-green-600 dark:text-green-400" />
            <h1 className="mt-4 text-3xl font-bold text-gray-800 dark:text-white">ChessMaster Kids</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Learning chess has never been more fun!</p>
          </div>
          
          {error && (
            <div className="mb-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-2\" viewBox="0 0 24 24">
                  <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4\" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          
          <div className="mt-8">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">Demo accounts for testing:</p>
            <div className="grid grid-cols-2 gap-3">
              <DemoButton label="Student" onClick={() => handleDemoLogin('student')} disabled={isLoading} />
              <DemoButton label="Parent" onClick={() => handleDemoLogin('parent')} disabled={isLoading} />
              <DemoButton label="Coach" onClick={() => handleDemoLogin('coach')} disabled={isLoading} />
              <DemoButton label="Admin" onClick={() => handleDemoLogin('admin')} disabled={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DemoButton: React.FC<{ label: string; onClick: () => void; disabled: boolean }> = ({ 
  label, onClick, disabled 
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="py-2 px-3 bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/50 rounded-lg text-sm font-medium transition-colors duration-200"
  >
    {label}
  </button>
);

const ChessLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L8 6H16L12 2Z" fill="currentColor" />
    <path d="M12 6V10M12 10L9 13M12 10L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 17.5C8 16.1193 9.11929 15 10.5 15H13.5C14.8807 15 16 16.1193 16 17.5V18H8V17.5Z" fill="currentColor" />
    <path d="M5 21V19H19V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21Z" fill="currentColor" />
  </svg>
);

export default LoginPage;