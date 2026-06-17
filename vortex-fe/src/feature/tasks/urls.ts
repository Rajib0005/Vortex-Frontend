export const TaskUrls = {
    getFilteredTasks: (projectId: string) => `api/Task/${projectId}/tasks`,
    createTask: 'create-task',
    updateTask: (taskId: string) => `api/Task/${taskId}/update-task`,
    deleteTask: (taskId: string) => `api/Task/${taskId}/delete-task`,
    getTaskDetails: (taskId: string) => `api/Task/${taskId}/task-details`,
    assignTask: (taskId: string, assigneeId: string) => `api/Task/${taskId}/assign/${assigneeId}`,
} as const;
