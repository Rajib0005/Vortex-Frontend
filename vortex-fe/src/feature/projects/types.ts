export interface Project {
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
