import React, { useState } from 'react';
import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';
import { StatsModal } from './components/StatsModal';
import { ApplicationSelector } from './components/ApplicationSelector';
import { User, Application } from './types/user';
import { UserPlus } from 'lucide-react';

// Simulated API calls - replace with actual API endpoints
const mockApplications: Application[] = [
  { id: '1', name: 'Application 1' },
  { id: '2', name: 'Application 2' },
];

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    applicationId: '1',
    statistics: {
      lastLogin: '2024-03-15T10:30:00Z',
      totalLogins: 150,
      activeTime: 360000,
    },
  },
  // Add more mock users as needed
];

export default function App() {
  const [selectedAppId, setSelectedAppId] = useState('');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const handleUserSubmit = (userData: Partial<User>) => {
    if (editingUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...user, ...userData } : user
      ));
    } else {
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        ...userData as any,
        status: 'active',
        applicationId: selectedAppId,
        statistics: {
          lastLogin: new Date().toISOString(),
          totalLogins: 0,
          activeTime: 0,
        },
      };
      setUsers([...users, newUser]);
    }
    setShowForm(false);
    setEditingUser(undefined);
  };

  const handleDeactivate = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
    ));
  };

  const filteredUsers = selectedAppId
    ? users.filter(user => user.applicationId === selectedAppId)
    : users;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6 flex justify-between items-center">
            <ApplicationSelector
              applications={mockApplications}
              selectedAppId={selectedAppId}
              onSelect={setSelectedAppId}
            />
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </button>
          </div>

          {showForm && (
            <div className="mb-6">
              <UserForm
                user={editingUser}
                onSubmit={handleUserSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingUser(undefined);
                }}
              />
            </div>
          )}

          <UserList
            users={filteredUsers}
            onEdit={(user) => {
              setEditingUser(user);
              setShowForm(true);
            }}
            onDeactivate={handleDeactivate}
            onShowStats={setSelectedUser}
          />

          {selectedUser && (
            <StatsModal
              user={selectedUser}
              onClose={() => setSelectedUser(undefined)}
            />
          )}
        </div>
      </div>
    </div>
  );
}