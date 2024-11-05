import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { createUser } from '../services/api';
import toast from 'react-hot-toast';

export default function NewUserPage() {
  const navigate = useNavigate();

  const handleSubmit = async (userData: any) => {
    try {
      await createUser(userData);
      toast.success('User created successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create user');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Create New User</h1>
        <p className="mt-2 text-sm text-gray-700">
          Fill in the information below to create a new user account.
        </p>
      </div>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}