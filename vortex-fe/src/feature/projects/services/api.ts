import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../../../lib/axios';
import { urls } from '@/url';
import type { Project, UpsertProjectModel } from '../model';
import type { BaseResponse } from '@/model/base.api.model';
import type { UserToInvite } from '@/feature/auth/types';

export const useGetProjectsQuery = (userId: string | undefined) => {
    return useQuery<BaseResponse<Project[]>, Error>({
        queryKey: ['projects', 'list', userId],
        enabled: !!userId,
        queryFn: () => {
            return apiService.get<Project[]>(urls.project.getProject, { userId });
        },
    });
};

export const useGetUsersToInviteQuery = (projectId: string | null | undefined) => {
    return useQuery<BaseResponse<UserToInvite[]>, Error>({
        queryKey: ['users-to-invite', projectId],
        queryFn: () => {
            return apiService.get<UserToInvite[]>(urls.project.getUsersToInvite, projectId ? { projectId } : {});
        },
    });
};

export const useGetProjectDetailsForEditQuery = (projectId: string | null) => {
    return useQuery<BaseResponse<UpsertProjectModel>, Error>({
        queryKey: ['projects', 'project-for-edit', projectId],
        enabled: !!projectId,
        queryFn: () => {
            return apiService.get<UpsertProjectModel>(urls.project.getProjectDetailsForUpdate, { projectId });
        },
    });
};

export const useUpsertProject = () => {
    const queryClient = useQueryClient();

    return useMutation<BaseResponse<string>, Error, UpsertProjectModel>({
        mutationFn: (model: UpsertProjectModel) => {
            return apiService.post<string>(urls.project.upsertProject, model);
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
            return apiService.delete<string>(`${urls.project.deleteProject}/${projectId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        }
    });
};
