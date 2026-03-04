import { useQuery } from '@tanstack/react-query';
import { apiService } from '../../../lib/axios';
import { ProjectUrls } from './urls';
import type { Project } from '../types';
import type { BaseResponse } from '@/model/base.api.model';

export const useGetProjectsQuery = (userId: string) => {
    return useQuery<BaseResponse<Project[]>, Error>({
        queryKey: ['projects'],
        queryFn: () => {
            return apiService.get<Project[]>(ProjectUrls.getProject + `?userId=${userId}`);
        },
    });
};
