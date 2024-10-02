import APIClient from '@/services/api-client';
import { useQuery } from '@tanstack/react-query';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const apiClient = new APIClient('/auth/validate-token');

const validateToken = async (token: string): Promise<User> => {
  const response = await apiClient.post<{ token: string }, User>({ token });
  return response;
};

export const useValidateToken = (token: string | null) => {
  return useQuery<User, Error>({
    queryKey: ['validateToken', token],
    queryFn: () => validateToken(token!),
    enabled: !!token,
    retry: false,
    staleTime: Infinity,
    onError: (error) => {
      console.error('Token validation failed:', error);
      localStorage.removeItem('accessToken');
    },
  });
};