import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Calendar, CheckCircle2, LayersPlus } from "lucide-react";
import type { Project } from "../model";
import React from "react";
import { CreateProjectModal } from "./CreateProjectModal";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const progress = project.numberOfTotalTasks > 0
        ? (project.numberOfCompletedTasks / project.numberOfTotalTasks) * 100
        : 0;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
    };

    return (
        <Card className="group group-hover:text-indigo-400 bg-card border border-border/60 rounded-xl px-4 py-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col gap-2 relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
                <div className="flex items-center gap-2">
                    <div className="w-18 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                        <span className=" text-indigo-300 font-bold text-sm">{project.projectKey.toUpperCase()}</span>
                    </div>
                    <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-5 w-5" />
                </button>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-6 pt-4">
                <p className="text-muted-foreground line-clamp-2 text-sm">
                    {project.description}
                </p>

                <div className="space-y-3 mt-auto">
                    <div className="flex justify-between items-center text-xs font-semibold tracking-wider">
                        <span className="text-muted-foreground uppercase">Progress</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-1.5 bg-secondary/50" />
                </div>

                <div className="flex items-center justify-between border-t border-border/50 pt-4">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <Avatar key={i} className="h-7 w-7 border-2 border-background">
                                <AvatarImage src={`https://avatar.iran.liara.run/public/${i + 10}`} />
                                <AvatarFallback>{String.fromCharCode(64 + i)}</AvatarFallback>
                            </Avatar>
                        ))}
                        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-secondary text-[10px] font-medium">
                            +2
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-300" />
                            <span>{project.numberOfCompletedTasks}/{project.numberOfTotalTasks}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{formatDate(project.startDate)}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function CreateProjectCard() {
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
    const toggleModal = () => setIsCreateModalOpen(!isCreateModalOpen);
    return (
        <>
            <Card className="bg-transparent border-dashed border-2 border-border/50 hover:border-primary/50 transition-colors group cursor-pointer h-full min-h-[250px] flex flex-col items-center justify-center gap-4">
                <div
                    className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                    onClick={toggleModal}
                >
                    <LayersPlus className="h-6 w-6 group-hover:text-indigo-400 transition-colors" />
                </div>
                <div className="text-center">
                    <h3 className="font-bold text-lg">Create new project</h3>
                    <p className="text-muted-foreground text-sm">Start a new initiative for your team</p>
                </div>
            </Card>
            <CreateProjectModal open={isCreateModalOpen} onOpenChange={toggleModal} />
        </>
    );
}
