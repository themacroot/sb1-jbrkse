import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Users, UserPlus, LayoutDashboard } from 'lucide-react';
import { useApplication } from '../context/ApplicationContext';
import ApplicationSelector from './ApplicationSelector';

export default function Layout() {
  const location = useLocation();
  const { applications, selectedAppId, setSelectedAppId, loading } = useApplication();

  const isActive = (path: string) => location.pathname === path;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <LayoutDashboard className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Super Admin</span>
              </div>
              <div className="ml-6">
                <ApplicationSelector
                  applications={applications}
                  selectedAppId={selectedAppId}
                  onSelect={setSelectedAppId}
                />
              </div>
            </div>
            {selectedAppId && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className={`${
                    isActive('/') 
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </Link>
                <Link
                  to="/new"
                  className={`${
                    isActive('/new')
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  New User
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {selectedAppId ? (
          <Outlet />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Please select an application to continue</h3>
          </div>
        )}
      </main>
    </div>
  );
}