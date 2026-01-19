import { useMutation } from '@tanstack/react-query';
import { apiService } from '../../../lib/axios';
import { AuthUrls } from './urls';
import type { LoginRequest, LoginResponse } from '../types';

export const useLoginMutation = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (credentials: LoginRequest) => {
      return apiService.post<LoginResponse>(AuthUrls.login, credentials);
    },
  });
};
