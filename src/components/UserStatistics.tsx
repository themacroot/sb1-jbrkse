import React from 'react';
import { X } from 'lucide-react';
import { User } from '../types/user';

interface UserStatisticsProps {
  user: User;
  onClose: () => void;
}

export default function UserStatistics({ user, onClose }: UserStatisticsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">User Statistics</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Account Created</p>
              <p className="text-lg font-medium text-gray-900">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Status</p>
              <p className={`text-lg font-medium ${
                user.status === 'active' ? 'text-green-600' : 'text-red-600'
              }`}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-lg font-medium text-gray-900">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">User ID</p>
              <p className="text-lg font-medium text-gray-900">
                {user.id.slice(0, 8)}...
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Contact Information</p>
            <div className="mt-2">
              <p className="text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}