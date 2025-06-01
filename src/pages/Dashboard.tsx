import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Role } from '../types/user';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import ParentDashboard from '../components/dashboard/ParentDashboard';
import CoachDashboard from '../components/dashboard/CoachDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case Role.STUDENT:
      return <StudentDashboard />;
    case Role.PARENT:
      return <ParentDashboard />;
    case Role.COACH:
      return <CoachDashboard />;
    case Role.ADMIN:
      return <AdminDashboard />;
    default:
      return <div>Unknown role</div>;
  }
};

export default Dashboard;