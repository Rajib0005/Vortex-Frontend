export enum TaskStatus {
    Backlog = 0,
    Todo = 1,
    InProgress = 2,
    Done = 3,
    Canceled = 4
}

export enum TaskPriority {
    Low = 0,
    Medium = 1,
    High = 2,
    Urgent = 3
}

export enum TaskType {
    Epic = 0,
    Story = 1,
    Task = 2,
    SubTask = 3,
    Bug = 4
}

export interface UserSummary {
    id: string;
    name: string;
    email?: string;
    avatarUrl?: string;
}

export interface TaskDto {
    id: string;
    taskKey: string;
    taskName: string;
    description?: string;
    level: string;
    taskType: TaskType;
    status: TaskStatus;
    priority: TaskPriority;
    resolution?: string;
    labels: string[];
    storyPoints?: number;
    originalEstimateMinutes?: number;
    remainingEstimateMinutes?: number;
    timeSpentMinutes?: number;
    projectId: string;
    parentTaskId?: string;
    assignee?: UserSummary;
    reporter?: UserSummary;
    startDate: string;
    dueDate?: string;
    completedAt?: string;
    createdAt: string;
    updatedAt: string;
    commentCount: number;
    attachmentCount: number;
}

export interface TaskFilterQuery {
    searchTerm?: string;
    statuses?: TaskStatus[];
    priorities?: TaskPriority[];
    taskTypes?: TaskType[];
    assigneeIds?: string[];
    reporterIds?: string[];
    labels?: string[];
    dueDateFrom?: string;
    dueDateTo?: string;
    startDateFrom?: string;
    startDateTo?: string;
    createdFrom?: string;
    createdTo?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortDesc?: boolean;
}

export interface PagedResult<T> {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
