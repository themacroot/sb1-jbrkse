import React from 'react';
import { Application } from '../types/application';
import { AppWindow } from 'lucide-react';

interface ApplicationSelectorProps {
  applications: Application[];
  selectedAppId: string;
  onSelect: (appId: string) => void;
}

export default function ApplicationSelector({ applications, selectedAppId, onSelect }: ApplicationSelectorProps) {
  return (
    <div className="flex items-center space-x-3">
      <AppWindow className="h-5 w-5 text-indigo-600" />
      <select
        value={selectedAppId}
        onChange={(e) => onSelect(e.target.value)}
        className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="">Select Application</option>
        {applications.map((app) => (
          <option key={app.id} value={app.id}>
            {app.name}
          </option>
        ))}
      </select>
    </div>
  );
}