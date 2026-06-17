import { useQuery } from '@tanstack/react-query';
import { apiService } from '../../../lib/axios';
import type { TaskDto, TaskFilterQuery, PagedResult } from '../types';
import type { BaseResponse } from '@/model/base.api.model';
import { TaskUrls } from '../urls';

const buildQueryParams = (filter: TaskFilterQuery) => {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') return;
        
        // Capitalize first letter for .NET ModelBinder (e.g. status -> Statuses)
        let bindingKey = key.charAt(0).toUpperCase() + key.slice(1);
        if (bindingKey === 'Statuses') bindingKey = 'Statuses';
        if (bindingKey === 'Priorities') bindingKey = 'Priorities';
        if (bindingKey === 'TaskTypes') bindingKey = 'TaskTypes';
        if (bindingKey === 'AssigneeIds') bindingKey = 'AssigneeIds';
        if (bindingKey === 'ReporterIds') bindingKey = 'ReporterIds';

        if (Array.isArray(value)) {
            value.forEach(val => {
                params.append(bindingKey, val.toString());
            });
        } else {
            params.append(bindingKey, value.toString());
        }
    });
    return params.toString();
};

export const useGetFilteredTasksQuery = (projectId: string | undefined, filter: TaskFilterQuery) => {
    const queryString = buildQueryParams(filter);
    return useQuery<BaseResponse<PagedResult<TaskDto>>, Error>({
        queryKey: ['tasks', 'filtered', projectId, filter],
        enabled: !!projectId,
        queryFn: async () => {
            const url = `${TaskUrls.getFilteredTasks(projectId)}?${queryString}`;
            return apiService.get<PagedResult<TaskDto>>(url);
        },
    });
};
