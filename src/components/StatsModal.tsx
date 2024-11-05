import React from 'react';
import { User } from '../types/user';
import { X, Clock, UserCheck, Timer } from 'lucide-react';

interface StatsModalProps {
  user: User;
  onClose: () => void;
}

export function StatsModal({ user, onClose }: StatsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">User Statistics</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-indigo-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Last Login</p>
              <p className="text-base text-gray-900">{new Date(user.statistics.lastLogin).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center">
            <UserCheck className="h-5 w-5 text-indigo-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Total Logins</p>
              <p className="text-base text-gray-900">{user.statistics.totalLogins}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Timer className="h-5 w-5 text-indigo-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Active Time</p>
              <p className="text-base text-gray-900">{Math.round(user.statistics.activeTime / 3600)} hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}