import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../../../lib/axios';
import { ProjectUrls } from './urls';
import type { Project, UpsertProjectModel } from '../model';
import type { BaseResponse } from '@/model/base.api.model';
import type { UserToInvite } from '@/feature/auth/types';

export const useGetProjectsQuery = (userId: string) => {
    return useQuery<BaseResponse<Project[]>, Error>({
        queryKey: ['projects'],
        queryFn: () => {
            return apiService.get<Project[]>(ProjectUrls.getProject + `?userId=${userId}`);
        },
    });
};

export const useGetUsersToInviteQuery = (projectId: string | null) => {
    return useQuery<BaseResponse<UserToInvite[]>, Error>({
        queryKey: ['users-to-invite', projectId],
        queryFn: () => {
            return apiService.get<UserToInvite[]>(ProjectUrls.getUsersToInvite, projectId ? { projectId } : undefined);
        },
    });
};

export const useUpsertProject = () => {
    const queryClient = useQueryClient();

    return useMutation<BaseResponse<string>, Error, UpsertProjectModel>({
        mutationFn: (model: UpsertProjectModel) => {
            return apiService.post<string>(ProjectUrls.upsertProject, model);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        }
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation<BaseResponse<string>, Error, string>({
        mutationFn: (projectId: string) => {
            return apiService.delete<string>(`${ProjectUrls.deleteProject}/${projectId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        }
    });
};
