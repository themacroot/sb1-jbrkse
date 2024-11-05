import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { getUser, updateUser } from '../services/api';
import { User } from '../types/user';
import toast from 'react-hot-toast';

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (id) {
          const data = await getUser(id);
          setUser(data);
        }
      } catch (error) {
        toast.error('Failed to fetch user');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleSubmit = async (userData: Partial<User>) => {
    try {
      if (id) {
        await updateUser(id, userData);
        toast.success('User updated successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Edit User</h1>
        <p className="mt-2 text-sm text-gray-700">
          Update the user's information below.
        </p>
      </div>
      <UserForm onSubmit={handleSubmit} initialData={user} isEdit />
    </div>
  );
}