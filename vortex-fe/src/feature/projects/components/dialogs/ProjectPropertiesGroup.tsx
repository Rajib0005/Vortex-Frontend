import * as React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Tag, BarChart2, Calendar as CalendarIcon, Users, ChevronsUpDown, Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { ProjectPriority } from "../../model";
import type { ProjectFormData } from "./CreateProjectModal";

const CATEGORIES = ["Development", "Design", "Marketing", "Research", "Sales", "Legal", "Operations"];

export function ProjectPropertiesGroup() {
    const form = useFormContext<ProjectFormData>();
    const [isDomainOpen, setIsDomainOpen] = React.useState(false);
    const [isPriorityOpen, setIsPriorityOpen] = React.useState(false);

    const selectedMembers = (useWatch({
        control: form.control,
        name: "inviteUsers",
    }) || []);

    return (
        <div className="flex flex-wrap items-center gap-3 py-6 border-y border-border/10">
            {/* Category Selection */}
            <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <Popover open={isDomainOpen} onOpenChange={setIsDomainOpen}>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={isDomainOpen}
                                        className="bg-secondary/50 border-border hover:bg-secondary/70 text-xs gap-2 px-4 h-9 min-w-[140px] justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Tag className="h-3.5 w-3.5" />
                                            {field.value || "Select category"}
                                        </div>
                                        <ChevronsUpDown className="h-3.5 w-3.5 opacity-50 shrink-0" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0 bg-popover border-border">
                                <Command>
                                    <CommandInput placeholder="Search category..." className="h-8 text-xs" />
                                    <CommandList>
                                        <CommandEmpty className="text-xs p-2 text-center text-muted-foreground">No category found.</CommandEmpty>
                                        <CommandGroup>
                                            {CATEGORIES.map((category) => (
                                                <CommandItem
                                                    key={category}
                                                    value={category}
                                                    onSelect={() => {
                                                        form.setValue("domain", category, { shouldValidate: true, shouldDirty: true });
                                                        setIsDomainOpen(false);
                                                    }}
                                                    className="text-xs flex items-center gap-2"
                                                >
                                                    <Check
                                                        className={cn(
                                                            "h-3.5 w-3.5",
                                                            category === field.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {category}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </FormItem>
                )}
            />

            {/* Priority Selection */}
            <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <Popover open={isPriorityOpen} onOpenChange={setIsPriorityOpen}>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={isPriorityOpen}
                                        className="bg-secondary/50 border-border hover:bg-secondary/70 text-xs gap-2 px-4 h-9 min-w-[140px] justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <BarChart2 className="h-3.5 w-3.5" />
                                            {ProjectPriority[field.value] || "Select priority"}
                                        </div>
                                        <ChevronsUpDown className="h-3.5 w-3.5 opacity-50 shrink-0" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0 bg-popover border-border">
                                <Command>
                                    <CommandInput placeholder="Search priority..." className="h-8 text-xs" />
                                    <CommandList>
                                        <CommandEmpty className="text-xs p-2 text-center text-muted-foreground">No priority found.</CommandEmpty>
                                        <CommandGroup>
                                            {Object.keys(ProjectPriority).map((name) => (
                                                <CommandItem
                                                    key={name}
                                                    value={name}
                                                    onSelect={() => {
                                                        form.setValue("priority", ProjectPriority[name as keyof typeof ProjectPriority], { shouldValidate: true, shouldDirty: true });
                                                        setIsPriorityOpen(false);
                                                    }}
                                                    className="text-xs flex items-center gap-2"
                                                >
                                                    <Check
                                                        className={cn(
                                                            "h-3.5 w-3.5",
                                                            ProjectPriority[name as keyof typeof ProjectPriority] === field.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </FormItem>
                )}
            />

            {/* Deadline Selection */}
            <FormField
                control={form.control}
                name="estimatedDeadline"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className={cn(
                                            "bg-secondary/50 border-border/40 hover:bg-secondary/70 text-xs gap-2 px-4 h-9 min-w-[130px] justify-start",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="h-3.5 w-3.5" />
                                        {field.value ? format(new Date(field.value), "PP") : <span>Pick a date</span>}
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value ? new Date(field.value) : undefined}
                                    onSelect={(date) => field.onChange(date?.toISOString())}
                                />
                            </PopoverContent>
                        </Popover>
                    </FormItem>
                )}
            />
            <div className="h-6 w-px bg-border/20 mx-2 hidden sm:block" />
            <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-auto">
                <Users className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                {selectedMembers.length} Contributors
            </div>
        </div>
    );
}
