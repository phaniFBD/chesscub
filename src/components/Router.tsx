import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import LearningModulePage from '../pages/LearningModulePage';
import ProfilePage from '../pages/ProfilePage';
import ProgressPage from '../pages/ProgressPage';
import AssignmentsPage from '../pages/AssignmentsPage';
import { Role } from '../types/user';

type Route = 'login' | 'dashboard' | 'module' | 'profile' | 'progress' | 'assignments';

const Router: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [currentRoute, setCurrentRoute] = useState<Route>('login');
  const [moduleId, setModuleId] = useState<string | null>(null);

  useEffect(() => {
    // Listen for route changes via a custom event
    const handleRouteChange = (event: CustomEvent) => {
      const { route, params } = event.detail;
      setCurrentRoute(route);
      if (params?.moduleId) {
        setModuleId(params.moduleId);
      }
    };

    window.addEventListener('routeChange' as any, handleRouteChange as any);
    
    return () => {
      window.removeEventListener('routeChange' as any, handleRouteChange as any);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentRoute('dashboard');
    } else if (!isLoading) {
      setCurrentRoute('login');
    }
  }, [isAuthenticated, isLoading]);

  // Helper function to navigate between routes
  window.navigateTo = (route: Route, params?: any) => {
    const event = new CustomEvent('routeChange', { 
      detail: { route, params } 
    });
    window.dispatchEvent(event);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-bounce bg-green-500 dark:bg-green-600 p-2 w-16 h-16 ring-1 ring-green-300 dark:ring-green-500 shadow-lg rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-white\" fill="none\" stroke="currentColor\" viewBox="0 0 24 24\" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth="2\" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  switch (currentRoute) {
    case 'dashboard':
      return <Dashboard />;
    case 'module':
      return <LearningModulePage moduleId={moduleId || ''} />;
    case 'profile':
      return <ProfilePage />;
    case 'progress':
      return <ProgressPage />;
    case 'assignments':
      return <AssignmentsPage />;
    default:
      return <Dashboard />;
  }
};

// Define the navigateTo function globally
declare global {
  interface Window {
    navigateTo: (route: Route, params?: any) => void;
  }
}

export default Router;