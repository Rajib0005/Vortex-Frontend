import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Hash } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { useUpsertProject } from "../../services/api";
import { ProjectPropertiesGroup } from "./ProjectPropertiesGroup";
import { ProjectInviteMembers } from "./ProjectInviteMembers";
import { ProjectBasicInfo } from "./ProjectBasicInfo";
import { ProjectPriority } from "../../model";

interface CreateProjectModalProps {
    open: boolean;
    projectId?: string;
    onOpenChange: (open: boolean) => void;
}

const userToInviteSchema = z.object({
    userId: z.string(),
    userEmail: z.string().email(),
});

const formSchema = z.object({
    projectId: z.string().uuid().nullable(),
    projectName: z.string().min(1, "Project name is required"),
    projectDescription: z.string(),
    projectKey: z.string().min(1, "Key is required").max(4, "Max 4 chars"),
    isActive: z.boolean(),
    priority: z.nativeEnum(ProjectPriority),
    estimatedDeadline: z.string(),
    domain: z.string().min(1),
    inviteUsers: z.array(userToInviteSchema),
});

export type ProjectFormData = z.infer<typeof formSchema>;

export function CreateProjectModal({ open, projectId, onOpenChange }: CreateProjectModalProps) {
    const { mutate: createProject } = useUpsertProject();

    const form = useForm<ProjectFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectId: projectId || null,
            projectName: "",
            projectDescription: "",
            projectKey: "",
            isActive: true,
            priority: ProjectPriority.Medium,
            estimatedDeadline: new Date().toISOString(),
            domain: "Development",
            inviteUsers: [],
        }
    });

    const projectKeyVal = (useWatch({
        control: form.control,
        name: "projectKey",
    }) || "") as string;

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            form.reset();
        }
        onOpenChange(newOpen);
    };

    const onSubmit = (values: ProjectFormData) => {
        createProject({ ...values });
        handleOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="md:max-w-3xl bg-background border-border p-0 overflow-hidden gap-0 h-[75vh] flex flex-col">
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="p-8 space-y-8">
                        <DialogHeader className="flex-row items-center gap-2 space-y-0">
                            <div className="bg-indigo-500/10 dark:bg-indigo-500/20 p-1.5 rounded-md min-w-8 flex items-center justify-center h-8">
                                {projectKeyVal ? (
                                    <span className="text-[10px] font-black tracking-widest text-indigo-600 dark:text-indigo-400">{projectKeyVal.toUpperCase()}</span>
                                ) : (
                                    <Hash className="h-4 w-4 text-indigo-600 dark:text-indigo-400" strokeWidth={3} />
                                )}
                            </div>
                            <DialogTitle className="text-xs font-black tracking-[0.2em] text-muted-foreground uppercase">
                                {projectId ? "Edit Project" : "New Project"}
                            </DialogTitle>
                        </DialogHeader>

                        <Form {...form}>
                            <form id="create-project-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                                <div className="space-y-6">
                                    <ProjectBasicInfo />
                                    <ProjectPropertiesGroup />
                                    <ProjectInviteMembers />
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>

                <DialogFooter className="bg-background p-8 flex flex-col sm:flex-row items-center justify-between sm:justify-between border-t border-border/10 shrink-0">
                    <div className="flex items-center gap-3 text-[10px] font-black tracking-widest text-muted-foreground uppercase opacity-70">
                        <Kbd className="bg-secondary/50 border-border/40 py-1 px-2 text-xs">⌘</Kbd>
                        <Kbd className="bg-secondary/50 border-border/40 py-1 px-2 text-xs">ENTER</Kbd>
                        <span className="ml-1">To Create</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => handleOpenChange(false)}
                            className="text-xs font-black tracking-widest uppercase hover:bg-secondary/50 transition-colors"
                        >
                            Cancel
                        </Button>
                        <Button
                            form="create-project-form"
                            type="submit"
                            className="bg-indigo-500 text-white hover:bg-indigo-400 uppercase text-xs tracking-widest"
                        >
                            {projectId ? "Save Changes" : "Create Project"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
