import { useState } from 'react';
import { useReactTable, getCoreRowModel, getExpandedRowModel } from '@tanstack/react-table';
import type { ExpandedState } from '@tanstack/react-table';
import { 
    CheckCircle2, 
    Circle, 
    CircleDashed, 
    CircleDot, 
    XCircle,
    ArrowDown,
    ArrowUp,
    Minus,
    Zap,
    MessageSquare,
    ChevronDown,
    ChevronRight,
    Plus
} from 'lucide-react';
import { TaskStatus, TaskPriority, TaskType } from '../types';
import type { TaskDto } from '../types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface TasksTableProps {
    tasks: TaskDto[];
    onTaskClick?: (task: TaskDto) => void;
}

// ----------------------------------------------------
// Icons & Styles Helpers
// ----------------------------------------------------

export const getStatusIcon = (status: TaskStatus, className = "h-4 w-4") => {
    switch (status) {
        case TaskStatus.Backlog:
            return <CircleDashed className={`${className} text-muted-foreground/60`} />;
        case TaskStatus.Todo:
            return <Circle className={`${className} text-muted-foreground`} />;
        case TaskStatus.InProgress:
            return <CircleDot className={`${className} text-amber-500`} />;
        case TaskStatus.Done:
            return <CheckCircle2 className={`${className} text-emerald-500`} />;
        case TaskStatus.Canceled:
            return <XCircle className={`${className} text-muted-foreground/40`} />;
        default:
            return <Circle className={className} />;
    }
};

export const getPriorityIcon = (priority: TaskPriority, className = "h-4 w-4") => {
    switch (priority) {
        case TaskPriority.Low:
            return <ArrowDown className={`${className} text-blue-400`} />;
        case TaskPriority.Medium:
            return <Minus className={`${className} text-amber-400`} />;
        case TaskPriority.High:
            return <ArrowUp className={`${className} text-orange-500`} />;
        case TaskPriority.Urgent:
            return <Zap className={`${className} text-red-500 fill-red-500`} />;
        default:
            return <Minus className={className} />;
    }
};

export const getTypeBadge = (type: TaskType) => {
    switch (type) {
        case TaskType.Epic:
            return <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20 text-[10px] font-bold tracking-wider px-1.5 py-0">EPIC</Badge>;
        case TaskType.Story:
            return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20 text-[10px] font-bold tracking-wider px-1.5 py-0">USER STORY</Badge>;
        case TaskType.Task:
            return <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/20 hover:bg-slate-500/20 text-[10px] font-bold tracking-wider px-1.5 py-0">TASK</Badge>;
        case TaskType.SubTask:
            return <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20 text-[10px] font-bold tracking-wider px-1.5 py-0">SUBTASK</Badge>;
        case TaskType.Bug:
            return <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20 text-[10px] font-bold tracking-wider px-1.5 py-0">BUG</Badge>;
        default:
            return null;
    }
};

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// ----------------------------------------------------
// VIEW 1: Issues View (Status Grouping Table)
// ----------------------------------------------------
export function IssuesView({ tasks, onTaskClick }: TasksTableProps) {
    const statuses = [
        { key: TaskStatus.Backlog, label: 'BACKLOG' },
        { key: TaskStatus.Todo, label: 'TODO' },
        { key: TaskStatus.InProgress, label: 'IN PROGRESS' },
        { key: TaskStatus.Done, label: 'DONE' },
        { key: TaskStatus.Canceled, label: 'CANCELED' }
    ];

    // Collapsed state for each status section
    const [collapsedSections, setCollapsedSections] = useState<Record<number, boolean>>({});

    const toggleSection = (status: number) => {
        setCollapsedSections(prev => ({ ...prev, [status]: !prev[status] }));
    };

    // Helper to compute subtask statistics for a task
    const getSubtaskStats = (taskId: string) => {
        const subtasks = tasks.filter(t => t.parentTaskId === taskId);
        const total = subtasks.length;
        const completed = subtasks.filter(t => t.status === TaskStatus.Done).length;
        return { total, completed };
    };

    return (
        <div className="w-full border border-border/40 rounded-xl bg-card/30 overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-12 px-6 py-3 border-b border-border/40 text-xs font-semibold tracking-wider text-muted-foreground uppercase bg-card/60">
                <div className="col-span-6">Name</div>
                <div className="col-span-3 text-center">Details</div>
                <div className="col-span-2 text-right">Due</div>
                <div className="col-span-1 text-right">Asgn</div>
            </div>

            {/* Status Groups */}
            <div className="divide-y divide-border/30">
                {statuses.map(statusGroup => {
                    // Get all parent tasks or tasks without active parents inside this status group
                    const groupTasks = tasks.filter(t => t.status === statusGroup.key && (!t.parentTaskId || !tasks.some(p => p.id === t.parentTaskId)));
                    const count = groupTasks.length;
                    const isCollapsed = collapsedSections[statusGroup.key];

                    return (
                        <div key={statusGroup.key} className="flex flex-col">
                            {/* Section Header */}
                            <div 
                                className="flex items-center justify-between px-6 py-3 bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer group"
                                onClick={() => toggleSection(statusGroup.key)}
                            >
                                <div className="flex items-center gap-2">
                                    <button className="text-muted-foreground/80 hover:text-foreground">
                                        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </button>
                                    <div className="flex items-center gap-1.5">
                                        {getStatusIcon(statusGroup.key, "h-4 w-4")}
                                        <span className="text-xs font-bold tracking-wider uppercase text-foreground/90">{statusGroup.label}</span>
                                        <span className="text-xs text-muted-foreground bg-secondary/80 px-1.5 py-0.5 rounded font-semibold">{count}</span>
                                    </div>
                                </div>
                                <Plus className="h-4 w-4 text-muted-foreground/0 group-hover:text-muted-foreground/60 hover:text-foreground transition-colors cursor-pointer" />
                            </div>

                            {/* Section Content (Tasks List) */}
                            {!isCollapsed && (
                                <div className="divide-y divide-border/20 bg-background/20">
                                    {count === 0 ? (
                                        <div className="px-12 py-4 text-xs text-muted-foreground/60 italic">No tasks in this status</div>
                                    ) : (
                                        groupTasks.map(task => {
                                            const { total: subTotal, completed: subCompleted } = getSubtaskStats(task.id);
                                            const hasSubtasks = subTotal > 0;
                                            const progressVal = hasSubtasks ? (subCompleted / subTotal) * 100 : 0;

                                            return (
                                                <div 
                                                    key={task.id} 
                                                    className="grid grid-cols-12 px-6 py-3.5 hover:bg-secondary/10 transition-colors items-center cursor-pointer group"
                                                    onClick={() => onTaskClick?.(task)}
                                                >
                                                    {/* Name Column */}
                                                    <div className="col-span-6 flex items-center gap-3">
                                                        {getPriorityIcon(task.priority, "h-4 w-4")}
                                                        <span className="text-xs font-medium text-muted-foreground/80 select-none min-w-[42px]">{task.taskKey}</span>
                                                        {getStatusIcon(task.status, "h-3.5 w-3.5")}
                                                        <span className={`text-sm font-medium truncate ${task.status === TaskStatus.Done ? 'line-through text-muted-foreground/70' : 'text-foreground/95'}`}>
                                                            {task.taskName}
                                                        </span>
                                                    </div>

                                                    {/* Details (Indicators) */}
                                                    <div className="col-span-3 flex items-center justify-center gap-4">
                                                        {/* Subtasks Progress */}
                                                        {hasSubtasks ? (
                                                            <div className="flex items-center gap-2 w-28">
                                                                <span className="text-[10px] font-bold text-muted-foreground min-w-[20px]">{subCompleted}/{subTotal}</span>
                                                                <Progress value={progressVal} className="h-1 bg-secondary/80 flex-1" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-28" />
                                                        )}

                                                        {/* Comment Count */}
                                                        {task.commentCount > 0 ? (
                                                            <div className="flex items-center gap-1 text-muted-foreground/75 hover:text-foreground transition-colors">
                                                                <MessageSquare className="h-3.5 w-3.5" />
                                                                <span className="text-xs font-semibold">{task.commentCount}</span>
                                                            </div>
                                                        ) : (
                                                            <div className="w-6" />
                                                        )}
                                                    </div>

                                                    {/* Due Date */}
                                                    <div className="col-span-2 text-right text-xs font-medium text-muted-foreground/80">
                                                        {task.dueDate ? formatDate(task.dueDate) : '-'}
                                                    </div>

                                                    {/* Assignee */}
                                                    <div className="col-span-1 flex justify-end">
                                                        {task.assignee ? (
                                                            <Avatar className="h-6 w-6 border border-border/40">
                                                                <AvatarImage src={task.assignee.avatarUrl} />
                                                                <AvatarFallback className="text-[10px] font-semibold bg-indigo-500/10 text-indigo-400">
                                                                    {task.assignee.name.slice(0, 2).toUpperCase()}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        ) : (
                                                            <div className="h-6 w-6 rounded-full border border-dashed border-border/60 flex items-center justify-center text-[10px] text-muted-foreground/50">
                                                                -
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ----------------------------------------------------
// VIEW 2: Hierarchy View (React TanStack Table View)
// ----------------------------------------------------
interface TaskRow {
    id: string;
    taskKey: string;
    taskName: string;
    taskType: TaskType;
    status: TaskStatus;
    priority: TaskPriority;
    subRows?: TaskRow[];
    originalTask: TaskDto;
}

interface HierarchyViewProps {
    tasks: TaskDto[];
    onTaskClick?: (task: TaskDto) => void;
    selectedStatuses: TaskStatus[];
    selectedPriorities: TaskPriority[];
    searchTerm: string;
}

export function HierarchyView({ 
    tasks, 
    onTaskClick,
    selectedStatuses,
    selectedPriorities,
    searchTerm
}: HierarchyViewProps) {
    const [expanded, setExpanded] = useState<ExpandedState>({});

    // 1. Client-side filtering check
    const matchesFilter = (task: TaskDto): boolean => {
        const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(task.status);
        const matchesPriority = selectedPriorities.length === 0 || selectedPriorities.includes(task.priority);
        
        let matchesSearch = true;
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            matchesSearch = 
                (task.taskName || '').toLowerCase().includes(term) ||
                task.taskKey.toLowerCase().includes(term) ||
                (task.description || '').toLowerCase().includes(term);
        }

        return matchesStatus && matchesPriority && matchesSearch;
    };

    // 2. Build tree structure from all tasks list to preserve structure.
    const buildTree = (allTasks: TaskDto[]): TaskRow[] => {
        const nodeMap: Record<string, TaskRow> = {};
        
        // Initialize nodes
        allTasks.forEach(task => {
            nodeMap[task.id] = {
                id: task.id,
                taskKey: task.taskKey,
                taskName: task.taskName || '',
                taskType: task.taskType,
                status: task.status,
                priority: task.priority,
                subRows: [],
                originalTask: task
            };
        });

        const rootNodes: TaskRow[] = [];

        allTasks.forEach(task => {
            const node = nodeMap[task.id];
            if (task.parentTaskId && nodeMap[task.parentTaskId]) {
                nodeMap[task.parentTaskId].subRows?.push(node);
            } else if (task.taskType === TaskType.Epic) {
                rootNodes.push(node);
            }
        });

        // Add orphaned Stories/Tasks that are top level as roots if they aren't Epics but have no parents
        allTasks.forEach(task => {
            const node = nodeMap[task.id];
            if (!task.parentTaskId && task.taskType !== TaskType.Epic) {
                if (!rootNodes.some(r => r.id === task.id)) {
                    rootNodes.push(node);
                }
            }
        });

        // Clean empty subRows arrays so getCanExpand works correctly in TanStack
        const cleanTree = (nodes: TaskRow[]) => {
            nodes.forEach(node => {
                if (node.subRows && node.subRows.length === 0) {
                    delete node.subRows;
                } else if (node.subRows) {
                    cleanTree(node.subRows);
                }
            });
        };
        cleanTree(rootNodes);

        return rootNodes;
    };

    const data = buildTree(tasks);

    // Pre-calculate matches and descendant matches using a safe, single-pass traversal
    const matchMap = new Map<string, { isMatch: boolean; isAnyDescendantMatch: boolean }>();
    const visited = new Set<string>();

    const computeMatchStatus = (node: TaskRow): boolean => {
        if (visited.has(node.id)) return false; // Loop prevention
        visited.add(node.id);

        const isMatch = matchesFilter(node.originalTask);
        let isAnyDescendantMatch = false;

        if (node.subRows) {
            node.subRows.forEach(child => {
                const childHasMatch = computeMatchStatus(child);
                if (childHasMatch) {
                    isAnyDescendantMatch = true;
                }
            });
        }

        matchMap.set(node.id, { isMatch, isAnyDescendantMatch });
        return isMatch || isAnyDescendantMatch;
    };

    data.forEach(root => computeMatchStatus(root));

    const table = useReactTable({
        data,
        columns: [], // Empty columns as we are building custom layout on top of row model
        state: {
            expanded,
        },
        onExpandedChange: setExpanded,
        getSubRows: row => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

    const rows = table.getRowModel().rows;
    const hasActiveFilters = selectedStatuses.length > 0 || selectedPriorities.length > 0 || searchTerm !== '';

    return (
        <div className="space-y-1 bg-card/15 border border-border/35 rounded-xl p-4 shadow-sm min-h-[300px] relative overflow-hidden">
            {rows.length === 0 ? (
                <div className="flex items-center justify-center h-48 text-muted-foreground italic">
                    No work items found in this project hierarchy
                </div>
            ) : (
                rows.map(row => {
                    const taskRow = row.original;
                    const hasChildren = row.getCanExpand();
                    const isExpanded = row.getIsExpanded();
                    const depth = row.depth;

                    // Determine filter status from pre-computed map
                    const status = matchMap.get(taskRow.id);
                    const isMatch = status?.isMatch || false;
                    const isParentOfMatch = status?.isAnyDescendantMatch || false;



                    return (
                        <div key={row.id} className="flex flex-col relative">
                            {/* Depth Connector Line */}
                            {depth > 0 && (
                                <div 
                                    className="absolute top-0 bottom-0 w-px bg-border/20"
                                    style={{ left: `${(depth - 1) * 24 + 22}px` }}
                                />
                            )}

                            {/* Node Row */}
                            <div 
                                className={`flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-secondary/15 transition-all cursor-pointer group ml-1 border-l-2 ${
                                    hasActiveFilters
                                        ? isMatch
                                            ? 'bg-indigo-500/10 border-indigo-500/70 font-semibold'
                                            : 'opacity-40 border-transparent'
                                        : 'border-transparent'
                                }`}
                                style={{ paddingLeft: `${depth * 24 + 12}px` }}
                                onClick={() => onTaskClick?.(taskRow.originalTask)}
                            >
                                {/* Expand/Collapse Trigger */}
                                <div className="w-5 h-5 flex items-center justify-center relative z-10">
                                    {hasChildren ? (
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                row.toggleExpanded();
                                            }} 
                                            className="text-muted-foreground/80 hover:text-foreground p-0.5 rounded hover:bg-secondary/50 transition-colors"
                                        >
                                            {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                                        </button>
                                    ) : depth > 0 ? (
                                        <div className="w-1.5 h-1.5 rounded-full bg-border/80" />
                                    ) : null}
                                </div>

                                {/* Task Type Badge */}
                                {getTypeBadge(taskRow.taskType)}

                                {/* Node Content */}
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <span className="text-xs font-semibold text-muted-foreground/60 select-none">{taskRow.taskKey}</span>
                                    <span className={`text-sm truncate group-hover:text-indigo-400 transition-colors ${
                                        hasActiveFilters && isMatch ? 'text-indigo-400 font-bold' : 'text-foreground/90 font-medium'
                                    }`}>
                                        {taskRow.taskName}
                                    </span>
                                </div>

                                {/* Quick Info */}
                                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {getStatusIcon(taskRow.status, "h-3.5 w-3.5")}
                                    {getPriorityIcon(taskRow.priority, "h-3.5 w-3.5")}
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

// ----------------------------------------------------
// VIEW 3: Issues Fallback Page (Eye Catchy Placeholder)
// ----------------------------------------------------
import { KanbanSquare } from 'lucide-react';

export function IssuesFallback() {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center p-8 bg-card/10 border border-dashed border-border/60 rounded-2xl max-w-lg mx-auto space-y-4 animate-in fade-in zoom-in-95 duration-500 mt-8">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 animate-pulse">
                <KanbanSquare className="h-8 w-8" />
            </div>
            <div className="space-y-1">
                <h3 className="text-xl font-bold text-foreground">Issues Board</h3>
                <p className="text-muted-foreground text-sm max-w-sm">
                    We're currently preparing the active issue list. Please navigate to the <strong className="text-indigo-400">Hierarchy</strong> tab to view project structures.
                </p>
            </div>
        </div>
    );
}
