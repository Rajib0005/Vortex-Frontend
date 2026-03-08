import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { TriangleAlert } from "lucide-react";
import { useDeleteProject } from "../../services/api";
import type { Project } from "../../model";

interface DeleteProjectDialogProps {
    project: Project;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeleteProjectDialog({ project, open, onOpenChange }: DeleteProjectDialogProps) {
    const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

    const handleDelete = () => {
        deleteProject(project.projectId, {
            onSuccess: () => {
                onOpenChange(false);
            }
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="z-100">
                <AlertDialogHeader>
                    <AlertDialogTitle icon={<TriangleAlert className="h-5 w-5 text-destructive" />}>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the project
                        <span className="font-semibold text-foreground"> {project.title} </span>
                        and remove its data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => { e.preventDefault(); handleDelete(); }}
                        className="bg-destructive/10 text-destructive hover:bg-destructive/20 border border-transparent hover:border-destructive/20 shadow-none font-semibold transition-colors"
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete Project"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
