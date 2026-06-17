import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
    Plus, 
    Search, 
    X, 
    ChevronRight,
    LayoutDashboard,
    Inbox,
    Disc
} from 'lucide-react';
import { useGetProjectsQuery } from '@/feature/projects/services/api';
import { useGetFilteredTasksQuery } from '../services/api';
import { TaskStatus, TaskPriority } from '../types';
import { IssuesFallback } from './TasksTable';
import { KanbanBoard } from './KanbanBoard';
import { HierarchyTable } from './HierarchyTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { ComingSoon } from '@/components/shared/ComingSoon';

type TabType = 'issues' | 'hierarchy' | 'dashboard' | 'views' | 'overview';

export function TasksPage() {
    const { userId } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const projectId = searchParams.get('projectId') || '';

    // Active View Tab
    const [activeTab, setActiveTab] = useState<TabType>('issues');

    // Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatuses, setSelectedStatuses] = useState<TaskStatus[]>([]);
    const [selectedPriorities, setSelectedPriorities] = useState<TaskPriority[]>([]);

    // Get project information
    const { data: projectsResponse, isLoading: isProjectsLoading } = useGetProjectsQuery(userId ?? '');
    const activeProject = projectsResponse?.data?.find(p => p.projectId === projectId);

    // Fetch filtered tasks for Issues Tab
    const { data: issuesResponse, isLoading: isIssuesLoading, error: issuesError } = useGetFilteredTasksQuery(
        projectId,
        {
            searchTerm,
            statuses: selectedStatuses.length > 0 ? selectedStatuses : undefined,
            priorities: selectedPriorities.length > 0 ? selectedPriorities : undefined,
            pageSize: 100
        }
    );

    // Fetch ALL tasks for Hierarchy Tab
    const { data: hierarchyResponse, isLoading: isHierarchyLoading, error: hierarchyError } = useGetFilteredTasksQuery(
        projectId,
        {
            pageSize: 10000
        }
    );

    const issuesTasks = issuesResponse?.data?.items || [];
    const hierarchyTasks = hierarchyResponse?.data?.items || [];

    const isTasksLoading = activeTab === 'issues' ? isIssuesLoading : isHierarchyLoading;
    const error = activeTab === 'issues' ? issuesError : hierarchyError;

    // Filter toggles handlers
    const toggleStatusFilter = (status: TaskStatus) => {
        setSelectedStatuses(prev => 
            prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
        );
    };

    const togglePriorityFilter = (priority: TaskPriority) => {
        setSelectedPriorities(prev => 
            prev.includes(priority) ? prev.filter(p => p !== priority) : [...prev, priority]
        );
    };

    const clearFilters = () => {
        setSelectedStatuses([]);
        setSelectedPriorities([]);
        setSearchTerm('');
    };

    const hasActiveFilters = selectedStatuses.length > 0 || selectedPriorities.length > 0 || searchTerm !== '';

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <h2 className="text-2xl font-bold text-destructive">Error loading tasks</h2>
                <p className="text-muted-foreground">{error.message}</p>
            </div>
        );
    }

    const tabs = [
        { key: 'issues', label: 'Issues' },
        { key: 'hierarchy', label: 'Hierarchy' },
        { key: 'dashboard', label: 'Dashboard' },
        { key: 'views', label: 'Views' },
        { key: 'overview', label: 'Overview' }
    ] as const;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Top Header / Breadcrumbs & Action Button */}
            <div className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground font-semibold">
                    <button 
                        onClick={() => navigate('/projects')}
                        className="hover:text-foreground transition-colors"
                    >
                        Projects
                    </button>
                    <ChevronRight className="h-4 w-4" />
                    {isProjectsLoading ? (
                        <Skeleton className="h-5 w-24 rounded" />
                    ) : (
                        <span className="text-foreground font-bold">{activeProject?.title || 'Project'}</span>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 font-bold shadow-md shadow-indigo-600/10 flex items-center gap-1.5 transition-all text-xs">
                        <Plus className="h-4 w-4" />
                        NEW ISSUE
                    </Button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-border/40">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2 text-sm font-semibold tracking-wide border-b-2 -mb-[2px] transition-all relative ${
                            activeTab === tab.key 
                                ? 'border-indigo-500 text-indigo-400 font-bold' 
                                : 'border-transparent text-muted-foreground hover:text-foreground/90'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Filter Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-1.5 px-4 bg-card/10 border border-border/30 rounded-xl">
                <div className="flex flex-wrap items-center gap-6">
                    {/* Status Pill Filters */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Status:</span>
                        <div className="flex flex-wrap items-center gap-1.5">
                            {(Object.entries({
                                [TaskStatus.Backlog]: 'Backlog',
                                [TaskStatus.Todo]: 'Todo',
                                [TaskStatus.InProgress]: 'In-Progress',
                                [TaskStatus.Done]: 'Done',
                                [TaskStatus.Canceled]: 'Canceled'
                            }) as [unknown, string][]).map(([key, label]) => {
                                const status = Number(key) as TaskStatus;
                                const isSelected = selectedStatuses.includes(status);
                                return (
                                    <button
                                        key={status}
                                        onClick={() => toggleStatusFilter(status)}
                                        className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-all ${
                                            isSelected 
                                                ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30 font-bold' 
                                                : 'bg-secondary/35 text-muted-foreground hover:text-foreground border-border/40'
                                        }`}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Priority Pill Filters */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Priority:</span>
                        <div className="flex flex-wrap items-center gap-1.5">
                            {(Object.entries({
                                [TaskPriority.Low]: 'Low',
                                [TaskPriority.Medium]: 'Medium',
                                [TaskPriority.High]: 'High',
                                [TaskPriority.Urgent]: 'Urgent'
                            }) as [unknown, string][]).map(([key, label]) => {
                                const priority = Number(key) as TaskPriority;
                                const isSelected = selectedPriorities.includes(priority);
                                return (
                                    <button
                                        key={priority}
                                        onClick={() => togglePriorityFilter(priority)}
                                        className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-all ${
                                            isSelected 
                                                ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30 font-bold' 
                                                : 'bg-secondary/35 text-muted-foreground hover:text-foreground border-border/40'
                                        }`}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Clear Filters Button */}
                    {hasActiveFilters && (
                        <button 
                            onClick={clearFilters}
                            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 select-none transition-colors border border-indigo-500/20 px-2 py-1 rounded-md bg-indigo-500/5"
                        >
                            <X className="h-3.5 w-3.5" />
                            CLEAR FILTERS
                        </button>
                    )}
                </div>

                {/* Free Text Search Filter */}
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/80 pointer-events-none" />
                    <Input
                        placeholder="Filter..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-8 h-9 bg-secondary/25 border-border/40 text-sm focus-visible:ring-1 focus-visible:ring-indigo-500"
                    />
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm('')} 
                            className="absolute right-2.5 top-2.5 text-muted-foreground/80 hover:text-foreground"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Content Display based on active tab */}
            <div className="relative">
                {isTasksLoading ? (
                    <div className="space-y-3">
                        <Skeleton className="h-10 w-full rounded-xl" />
                        <Skeleton className="h-24 w-full rounded-xl" />
                        <Skeleton className="h-24 w-full rounded-xl" />
                    </div>
                ) : (
                    <>
                        {activeTab === 'issues' && (
                            issuesTasks.length === 0 ? (
                                <IssuesFallback />
                            ) : (
                                <KanbanBoard tasks={issuesTasks} />
                            )
                        )}
                        {activeTab === 'hierarchy' && (
                            <HierarchyTable 
                                tasks={hierarchyTasks} 
                                selectedStatuses={selectedStatuses}
                                selectedPriorities={selectedPriorities}
                                searchTerm={searchTerm}
                            />
                        )}
                        {activeTab === 'dashboard' && (
                            <ComingSoon title="Project Dashboard" icon={LayoutDashboard} />
                        )}
                        {activeTab === 'views' && (
                            <ComingSoon title="Custom Views" icon={Disc} />
                        )}
                        {activeTab === 'overview' && (
                            <ComingSoon title="Project Overview" icon={Inbox} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
