import { User } from '../types/user';
import { Application } from '../types/application';

const API_BASE_URL = 'https://api.example.com';

// Application APIs
export async function getApplications(): Promise<Application[]> {
  // Implement actual API call
  return [];
}

// User APIs - now scoped by applicationId
export async function getUsers(applicationId: string): Promise<User[]> {
  // Implement actual API call with applicationId
  return [];
}

export async function getUser(applicationId: string, userId: string): Promise<User | null> {
  // Implement actual API call
  return null;
}

export async function createUser(applicationId: string, userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  // Implement actual API call
  return {} as User;
}

export async function updateUser(applicationId: string, userId: string, userData: Partial<User>): Promise<User> {
  // Implement actual API call
  return {} as User;
}

export async function deactivateUser(applicationId: string, userId: string): Promise<void> {
  // Implement actual API call
}