import { useGetProjectsQuery } from "../services/api";
import { ProjectCard, CreateProjectCard } from "./ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";

export function ProjectsPage() {
    const { userId } = useAuth();
    const { data: response, isLoading, error } = useGetProjectsQuery(userId ?? '');

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <h2 className="text-2xl font-bold text-destructive">Error loading projects</h2>
                <p className="text-muted-foreground">{error.message}</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">Active Projects</h1>
                <p className="text-muted-foreground">Manage and track your high-level initiatives.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-[280px] w-full rounded-xl" />
                    ))
                ) : (
                    <>
                        {response?.data?.map((project, index) => (
                            <ProjectCard key={`${project.title}-${index}`} project={project} />
                        ))}
                        <CreateProjectCard />
                    </>
                )}
            </div>
        </div>
    );
}
