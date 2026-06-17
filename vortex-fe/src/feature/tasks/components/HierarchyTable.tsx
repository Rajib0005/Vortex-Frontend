import { useState, useEffect, useMemo } from 'react';
import { useReactTable, getCoreRowModel, getExpandedRowModel, flexRender } from '@tanstack/react-table';
import type { ExpandedState, ColumnDef } from '@tanstack/react-table';
import { 
    ChevronDown, 
    ChevronRight,
    MessageSquare,
    Calendar
} from 'lucide-react';
import { TaskStatus, TaskPriority, TaskType } from '../types';
import type { TaskDto } from '../types';
import { getStatusIcon, getPriorityIcon, getTypeBadge } from './TasksTable';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface HierarchyTableProps {
    tasks: TaskDto[];
    onTaskClick?: (task: TaskDto) => void;
    selectedStatuses: TaskStatus[];
    selectedPriorities: TaskPriority[];
    searchTerm: string;
}

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

const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export function HierarchyTable({ 
    tasks, 
    onTaskClick,
    selectedStatuses,
    selectedPriorities,
    searchTerm
}: HierarchyTableProps) {
    const [expanded, setExpanded] = useState<ExpandedState>({});

    // Expand all nodes initially once tasks are loaded
    useEffect(() => {
        if (tasks.length > 0 && Object.keys(expanded).length === 0) {
            const initial: Record<string, boolean> = {};
            tasks.forEach(t => {
                initial[t.id] = true;
            });
            setExpanded(initial);
        }
    }, [tasks, expanded]);

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
    const data = useMemo(() => {
        const nodeMap: Record<string, TaskRow> = {};
        
        tasks.forEach(task => {
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

        tasks.forEach(task => {
            const node = nodeMap[task.id];
            if (task.parentTaskId && nodeMap[task.parentTaskId]) {
                nodeMap[task.parentTaskId].subRows?.push(node);
            } else if (task.taskType === TaskType.Epic) {
                rootNodes.push(node);
            }
        });

        // Add orphaned Stories/Tasks that are top level as roots if they aren't Epics
        tasks.forEach(task => {
            const node = nodeMap[task.id];
            if ((!task.parentTaskId || !nodeMap[task.parentTaskId]) && task.taskType !== TaskType.Epic) {
                if (!rootNodes.some(r => r.id === task.id)) {
                    rootNodes.push(node);
                }
            }
        });

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
    }, [tasks]);

    const hasActiveFilters = selectedStatuses.length > 0 || selectedPriorities.length > 0 || searchTerm !== '';

    // Pre-calculate matches and prune tree
    const { filteredData, matchMap } = useMemo(() => {
        const matchMap = new Map<string, { isMatch: boolean; isAnyDescendantMatch: boolean }>();
        const visited = new Set<string>();

        const computeMatchStatus = (node: TaskRow): boolean => {
            if (visited.has(node.id)) return false;
            visited.add(node.id);

            const isMatch = matchesFilter(node.originalTask);
            let isAnyDescendantMatch = false;

            if (node.subRows) {
                node.subRows.forEach(child => {
                    if (computeMatchStatus(child)) {
                        isAnyDescendantMatch = true;
                    }
                });
            }

            matchMap.set(node.id, { isMatch, isAnyDescendantMatch });
            return isMatch || isAnyDescendantMatch;
        };

        data.forEach(root => computeMatchStatus(root));

        if (!hasActiveFilters) {
            return { filteredData: data, matchMap };
        }

        // Deep clone and prune
        const pruneTree = (nodes: TaskRow[]): TaskRow[] => {
            const result: TaskRow[] = [];
            for (const node of nodes) {
                const matchInfo = matchMap.get(node.id);
                if (matchInfo?.isMatch || matchInfo?.isAnyDescendantMatch) {
                    const clonedNode = { ...node };
                    if (clonedNode.subRows) {
                        clonedNode.subRows = pruneTree(clonedNode.subRows);
                    }
                    result.push(clonedNode);
                }
            }
            return result;
        };

        return { filteredData: pruneTree(data), matchMap };
    }, [data, hasActiveFilters, selectedStatuses, selectedPriorities, searchTerm]);

    // Define table columns
    const columns: ColumnDef<TaskRow>[] = [
        {
            accessorKey: 'taskName',
            header: 'Name',
            cell: ({ row, getValue }) => {
                const taskRow = row.original;
                const hasChildren = row.getCanExpand();
                const isExpanded = row.getIsExpanded();
                const depth = row.depth;

                return (
                    <div 
                        className="flex items-center gap-2"
                        style={{ paddingLeft: `${depth * 24}px` }}
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
                        <span className="text-xs font-semibold text-muted-foreground/60 select-none min-w-[42px]">
                            {taskRow.taskKey}
                        </span>
                        <span className="truncate">
                            {getValue<string>()}
                        </span>
                    </div>
                );
            }
        },
        {
            accessorKey: 'taskType',
            header: 'Type',
            cell: ({ getValue }) => getTypeBadge(getValue<TaskType>())
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ getValue }) => {
                const status = getValue<TaskStatus>();
                const statusNames = {
                    [TaskStatus.Backlog]: 'Backlog',
                    [TaskStatus.Todo]: 'To Do',
                    [TaskStatus.InProgress]: 'In Progress',
                    [TaskStatus.Done]: 'Done',
                    [TaskStatus.Canceled]: 'Canceled'
                };
                return (
                    <div className="flex items-center gap-2">
                        {getStatusIcon(status, "h-3.5 w-3.5")}
                        <span className="text-xs font-medium text-muted-foreground">{statusNames[status]}</span>
                    </div>
                );
            }
        },
        {
            accessorKey: 'priority',
            header: 'Priority',
            cell: ({ getValue }) => {
                const priority = getValue<TaskPriority>();
                const priorityNames = {
                    [TaskPriority.Low]: 'Low',
                    [TaskPriority.Medium]: 'Medium',
                    [TaskPriority.High]: 'High',
                    [TaskPriority.Urgent]: 'Urgent'
                };
                return (
                    <div className="flex items-center gap-2">
                        {getPriorityIcon(priority, "h-3.5 w-3.5")}
                        <span className="text-xs font-medium text-muted-foreground">{priorityNames[priority]}</span>
                    </div>
                );
            }
        },
        {
            accessorKey: 'originalTask.dueDate',
            header: 'Due Date',
            cell: ({ row }) => {
                const dueDate = row.original.originalTask.dueDate;
                return (
                    <span className="text-xs font-medium text-muted-foreground">
                        {dueDate ? formatDate(dueDate) : '-'}
                    </span>
                );
            }
        },
        {
            accessorKey: 'originalTask.assignee',
            header: 'Assignee',
            cell: ({ row }) => {
                const assignee = row.original.originalTask.assignee;
                return assignee ? (
                    <div className="flex items-center gap-2">
                        <Avatar className="h-5.5 w-5.5 border border-border/40">
                            <AvatarImage src={assignee.avatarUrl} />
                            <AvatarFallback className="text-[8px] font-bold bg-indigo-500/10 text-indigo-400">
                                {assignee.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-muted-foreground truncate max-w-[80px]">
                            {assignee.name}
                        </span>
                    </div>
                ) : (
                    <span className="text-xs text-muted-foreground/40 font-medium">-</span>
                );
            }
        }
    ];

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            expanded,
        },
        onExpandedChange: setExpanded,
        getSubRows: row => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

    const rows = table.getRowModel().rows;

    return (
        <div className="w-full border border-border/40 rounded-xl bg-card/30 overflow-hidden shadow-sm">
            <table className="w-full border-collapse text-left">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className="border-b border-border/40 bg-card/60">
                            {headerGroup.headers.map(header => (
                                <th 
                                    key={header.id} 
                                    className="px-6 py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                                    style={{ width: header.column.id === 'taskName' ? '45%' : undefined }}
                                >
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-border/20 bg-background/10">
                    {rows.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-12 text-center text-sm text-muted-foreground/60 italic">
                                No work items found in this project hierarchy
                            </td>
                        </tr>
                    ) : (
                        rows.map(row => {
                            const taskRow = row.original;
                            const isMatch = matchMap.get(taskRow.id)?.isMatch || false;

                            return (
                                <tr 
                                    key={row.id} 
                                    onClick={() => onTaskClick?.(taskRow.originalTask)}
                                    className={`hover:bg-secondary/10 transition-colors items-center cursor-pointer group border-l-2 ${
                                        hasActiveFilters
                                            ? isMatch
                                                ? 'bg-indigo-500/10 border-l-indigo-500 font-semibold'
                                                : 'opacity-40 border-l-transparent'
                                            : 'border-l-transparent'
                                    }`}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-6 py-3 text-sm text-foreground/95 max-w-[200px] truncate">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}
