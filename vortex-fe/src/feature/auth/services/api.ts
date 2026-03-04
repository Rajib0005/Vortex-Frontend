import { useMutation, useQuery } from '@tanstack/react-query';
import { apiService } from '../../../lib/axios';
import { AuthUrls } from './urls';
import type { LoginRequest, UserDetails } from '../types';
import type { BaseResponse } from '@/model/base.api.model';

export const useLoginMutation = () => {
  return useMutation<BaseResponse<string>, Error, LoginRequest>({
    mutationFn: (credentials: LoginRequest) => {
      return apiService.post<string>(AuthUrls.login, credentials);
    }
  });
};

export const useMeQuery = (options = {}) => {
  return useQuery<BaseResponse<UserDetails>, Error>({
    queryKey: ['me'],
    queryFn: () => {
      return apiService.get<UserDetails>(AuthUrls.me);
    },
    ...options
  });
};
