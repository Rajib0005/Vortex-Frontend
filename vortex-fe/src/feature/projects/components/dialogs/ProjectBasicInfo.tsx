import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import type { ProjectFormData } from "./CreateProjectModal";

export function ProjectBasicInfo() {
    const form = useFormContext<ProjectFormData>();

    return (
        <div className="space-y-4">
            <div className="flex gap-3 items-start">
                <FormField
                    control={form.control}
                    name="projectKey"
                    render={({ field }) => (
                        <FormItem className="w-28 shrink-0">
                            <FormLabel className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase mb-2 after:content-['*'] after:ml-1 after:text-red-500 after:text-sm after:leading-none">
                                Key
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 font-black text-sm">#</span>
                                    <Input
                                        {...field}
                                        value={field.value || ""}
                                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                        maxLength={4}
                                        placeholder="KEY"
                                        className="text-xl font-bold bg-secondary/30 border-border/40 pl-7 pr-3 focus-visible:ring-1 focus-visible:ring-indigo-500/50 placeholder:text-muted-foreground/40 text-indigo-600 dark:text-indigo-400 uppercase tracking-widest"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase mb-2 after:content-['*'] after:ml-1 after:text-red-500 after:text-sm after:leading-none">
                                Project Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    value={field.value || ""}
                                    placeholder="Project Name"
                                    className="text-xl font-semibold bg-secondary/30 border-border/40 px-4 focus-visible:ring-1 focus-visible:ring-indigo-500/50 placeholder:text-muted-foreground/40"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase mb-2 block">
                            Description
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                {...field}
                                value={field.value || ""}
                                placeholder="Project description and goals..."
                                aria-describedby="project"
                                className="bg-secondary/30 border-border/40 px-4 py-4 focus-visible:ring-1 focus-visible:ring-indigo-500/50 placeholder:text-muted-foreground/40 resize-none min-h-[120px] text-base text-muted-foreground leading-relaxed"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
