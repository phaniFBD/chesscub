import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types/user';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Create a default value for the context
const defaultAuthContext: AuthContextType = {
  user: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
  isLoading: true
};

// Export the context so it can be imported directly
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Mock data for demo purposes
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Alex Student',
    email: 'student@example.com',
    role: Role.STUDENT,
    age: 9,
    avatarUrl: '/assets/avatars/student.png',
    level: 'Pawn',
    progress: {
      tactics: 65,
      strategy: 42,
      endgames: 30,
      overall: 46
    }
  },
  {
    id: '2',
    name: 'Parent User',
    email: 'parent@example.com',
    role: Role.PARENT,
    children: ['1']
  },
  {
    id: '3',
    name: 'Coach Smith',
    email: 'coach@example.com',
    role: Role.COACH,
    students: ['1']
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@example.com',
    role: Role.ADMIN
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(u => u.email === email);
        
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem('user', JSON.stringify(foundUser));
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};