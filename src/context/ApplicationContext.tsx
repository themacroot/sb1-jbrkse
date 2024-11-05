import React, { createContext, useContext, useState, useEffect } from 'react';
import { Application } from '../types/application';
import { getApplications } from '../services/api';
import toast from 'react-hot-toast';

interface ApplicationContextType {
  applications: Application[];
  selectedAppId: string;
  setSelectedAppId: (id: string) => void;
  loading: boolean;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export function ApplicationProvider({ children }: { children: React.ReactNode }) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedAppId, setSelectedAppId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplications();
        setApplications(data);
        if (data.length > 0) {
          setSelectedAppId(data[0].id);
        }
      } catch (error) {
        toast.error('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <ApplicationContext.Provider value={{ applications, selectedAppId, setSelectedAppId, loading }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplication() {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplication must be used within an ApplicationProvider');
  }
  return context;
}