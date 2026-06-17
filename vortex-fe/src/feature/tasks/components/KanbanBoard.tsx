import { KanbanSquare, MessageSquare, Calendar } from 'lucide-react';
import { TaskStatus, TaskPriority, TaskType } from '../types';
import type { TaskDto } from '../types';
import { getStatusIcon, getPriorityIcon, getTypeBadge } from './TasksTable';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface KanbanBoardProps {
    tasks: TaskDto[];
    onTaskClick?: (task: TaskDto) => void;
}

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export function KanbanBoard({ tasks, onTaskClick }: KanbanBoardProps) {
    const columns = [
        { key: TaskStatus.Backlog, label: 'Backlog', color: 'border-t-muted-foreground/45' },
        { key: TaskStatus.Todo, label: 'To Do', color: 'border-t-muted-foreground/80' },
        { key: TaskStatus.InProgress, label: 'In Progress', color: 'border-t-amber-500' },
        { key: TaskStatus.Done, label: 'Done', color: 'border-t-emerald-500' },
        { key: TaskStatus.Canceled, label: 'Canceled', color: 'border-t-muted-foreground/20' }
    ];

    return (
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x select-none min-h-[60vh]">
            {columns.map(col => {
                const colTasks = tasks.filter(t => t.status === col.key);
                const count = colTasks.length;

                return (
                    <div 
                        key={col.key} 
                        className="flex-1 min-w-[280px] max-w-[340px] bg-secondary/10 border border-border/30 rounded-2xl p-4 flex flex-col gap-3 h-[calc(100vh-280px)] min-h-[450px]"
                    >
                        {/* Column Header */}
                        <div className="flex items-center justify-between pb-2 border-b border-border/20">
                            <div className="flex items-center gap-2">
                                {getStatusIcon(col.key, "h-4 w-4")}
                                <span className="text-sm font-bold text-foreground/90 tracking-wide">{col.label}</span>
                                <span className="text-xs text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded-full font-bold">
                                    {count}
                                </span>
                            </div>
                        </div>

                        {/* Column Cards Container */}
                        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1.5 scrollbar-thin">
                            {count === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground/40 italic text-xs">
                                    No issues
                                </div>
                            ) : (
                                colTasks.map(task => (
                                    <div
                                        key={task.id}
                                        onClick={() => onTaskClick?.(task)}
                                        className={`bg-card/70 border border-border/40 hover:border-indigo-500/50 hover:bg-card hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 cursor-pointer rounded-xl p-3.5 space-y-3 flex flex-col relative overflow-hidden group border-t-2 ${col.color}`}
                                    >
                                        {/* Top Card Section: Key, Type Badge */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-muted-foreground tracking-wider group-hover:text-indigo-400 transition-colors">
                                                {task.taskKey}
                                            </span>
                                            {getTypeBadge(task.taskType)}
                                        </div>

                                        {/* Task Title */}
                                        <h4 className="text-xs font-semibold text-foreground/90 leading-relaxed line-clamp-2">
                                            {task.taskName}
                                        </h4>

                                        {/* Bottom Card Section: Priority, Due Date, Assignee */}
                                        <div className="flex items-center justify-between pt-1.5 border-t border-border/20">
                                            <div className="flex items-center gap-3">
                                                {getPriorityIcon(task.priority, "h-3.5 w-3.5")}
                                                {task.dueDate && (
                                                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-semibold">
                                                        <Calendar className="h-3 w-3" />
                                                        <span>{formatDate(task.dueDate)}</span>
                                                    </div>
                                                )}
                                                {task.commentCount > 0 && (
                                                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-semibold">
                                                        <MessageSquare className="h-3 w-3" />
                                                        <span>{task.commentCount}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Assignee Avatar */}
                                            {task.assignee ? (
                                                <Avatar className="h-5.5 w-5.5 border border-border/40">
                                                    <AvatarImage src={task.assignee.avatarUrl} />
                                                    <AvatarFallback className="text-[8px] font-bold bg-indigo-500/10 text-indigo-400">
                                                        {task.assignee.name.slice(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                            ) : (
                                                <div className="h-5.5 w-5.5 rounded-full border border-dashed border-border/60 flex items-center justify-center text-[8px] text-muted-foreground/40 font-bold">
                                                    -
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
