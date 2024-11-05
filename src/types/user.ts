export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  applicationId: string;
  statistics: {
    lastLogin: string;
    totalLogins: number;
    activeTime: number;
  };
}

export interface Application {
  id: string;
  name: string;
}