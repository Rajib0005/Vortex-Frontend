import type { UserToInvite } from "../auth/types";

export interface Project {
    projectId: string;
    title: string;
    description: string;
    projectKey: string;
    isAcvtive: boolean;
    startDate: string;
    numberOfTotalTasks: number;
    numberOfCompletedTasks: number;
    canDelete: boolean;
    canMark: boolean;
}

export interface UpsertProjectModel {
    projectId?: string | null;
    projectName: string;
    projectDescription?: string;
    projectKey: string;
    isActive: boolean;
    priority: ProjectPriority;
    estimatedDeadline?: string;
    domain?: string;
    inviteUsers: UserToInvite[];
}

export enum ProjectPriority {
    Low,
    Medium,
    High,
    Critical
}