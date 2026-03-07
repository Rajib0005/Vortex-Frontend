import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Hash, Tag, BarChart2, Calendar as CalendarIcon, Users, UserPlus2, Plus, X, ChevronsUpDown, Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Kbd } from "@/components/ui/kbd";
import type { UserToInvite } from "@/feature/auth/types";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useGetUsersToInviteQuery, useUpsertProject } from "../services/api";
import { cn } from "@/lib/utils";
import { ProjectPriority } from "../model";

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

const CATEGORIES = ["Development", "Design", "Marketing", "Research", "Sales", "Legal", "Operations"];

export function CreateProjectModal({ open, projectId, onOpenChange }: CreateProjectModalProps) {
    const { data: usersToInvite, isLoading } = useGetUsersToInviteQuery(null);
    const { mutate: createProject } = useUpsertProject();
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isSearching, setIsSearching] = React.useState(false);
    const [isDomainOpen, setIsDomainOpen] = React.useState(false);
    const [isPriorityOpen, setIsPriorityOpen] = React.useState(false);

    const form = useForm<ProjectFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectId: projectId || null,
            projectName: "",
            projectDescription: "",
            projectKey: "",
            isActive: true,
            priority: ProjectPriority.Medium,
            estimatedDeadline: new Date().toISOString(), // Default or Dec 31 logic
            domain: "Development",
            inviteUsers: [],
        }
    });

    const projectKeyVal = (useWatch({
        control: form.control,
        name: "projectKey",
    }) || "") as string;

    const selectedMembers = (useWatch({
        control: form.control,
        name: "inviteUsers",
    }) || []) as UserToInvite[];

    const filteredUsers = usersToInvite?.data?.filter(user =>
        (user.userEmail?.toLowerCase().includes(searchQuery.toLowerCase())) &&
        !selectedMembers.find(m => m.userId === user.userId)
    ) || [];

    const addMember = (user: UserToInvite) => {
        form.setValue("inviteUsers", [...selectedMembers, user]);
        setSearchQuery("");
        setIsSearching(false);
    };

    const removeMember = (userId: string) => {
        form.setValue("inviteUsers", selectedMembers.filter(m => m.userId !== userId), { shouldValidate: true, shouldDirty: true });
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            form.reset();
            setSearchQuery("");
        }
        onOpenChange(newOpen);
    };

    const onSubmit = (values: ProjectFormData) => {
        // Construct payload for BE
        console.log("Create Project Payload:", values);
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
                                                                                    form.setValue("domain", category);
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
                                                                                    form.setValue("priority", ProjectPriority[name as keyof typeof ProjectPriority]);
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

                                    <FormField
                                        control={form.control}
                                        name="inviteUsers"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase mb-4 after:content-['*'] after:ml-1 after:text-red-500 after:text-sm after:leading-none">
                                                    <UserPlus2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                                                    Invite Team Members
                                                </FormLabel>
                                                <Popover open={isSearching} onOpenChange={setIsSearching}>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn(
                                                                    "bg-secondary/30 border-border/40 h-12 px-5 text-base justify-between hover:bg-secondary/50 rounded-xl transition-all duration-200 border-dashed hover:border-solid hover:border-indigo-500/50",
                                                                    !field.value?.length && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {searchQuery || "Search by name or email..."}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="p-0 md:max-w-3xl w-(--radix-popover-trigger-width) bg-popover border-border overflow-hidden" align="start">
                                                        <Command shouldFilter={false}>
                                                            <CommandInput
                                                                placeholder="Search by name or email..."
                                                                value={searchQuery}
                                                                onValueChange={(val) => {
                                                                    setSearchQuery(val);
                                                                    setIsSearching(true);
                                                                }}
                                                                className="h-12 border-none focus:ring-0"
                                                            />
                                                            <CommandList>
                                                                {isLoading ? (
                                                                    <div className="p-4 text-center text-sm text-muted-foreground">Loading...</div>
                                                                ) : filteredUsers.length === 0 ? (
                                                                    <CommandEmpty>No users found.</CommandEmpty>
                                                                ) : (
                                                                    <CommandGroup>
                                                                        {filteredUsers.map((user) => (
                                                                            <CommandItem
                                                                                key={user.userId}
                                                                                onSelect={() => addMember(user)}
                                                                                className="flex items-center justify-between p-4 hover:bg-secondary/20 cursor-pointer transition-colors group"
                                                                            >
                                                                                <div className="flex items-center gap-4">
                                                                                    <Avatar className="h-10 w-10 border-2 border-border/20">
                                                                                        <AvatarImage src={`https://avatar.iran.liara.run/username?username=${user.userEmail}`} />
                                                                                        <AvatarFallback>{user.userEmail?.charAt(0)}</AvatarFallback>
                                                                                    </Avatar>
                                                                                    <div>
                                                                                        <div className="text-base font-bold">{user.userEmail.split('@')[0]}</div>
                                                                                        <div className="text-sm text-muted-foreground">{user.userEmail}</div>
                                                                                    </div>
                                                                                </div>
                                                                                <Plus className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600 dark:text-indigo-400" />
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                )}
                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>

                                                {selectedMembers.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 pt-3">
                                                        {selectedMembers.map((member) => (
                                                            <Badge
                                                                key={member.userId}
                                                                variant="secondary"
                                                                className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 px-3 py-1.5 gap-2 text-xs rounded-lg"
                                                            >
                                                                {member.userEmail}
                                                                <button
                                                                    className="hover:bg-indigo-500/20 p-0.5 rounded-full outline-none focus:ring-2 focus:ring-indigo-500/50"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                        removeMember(member.userId);
                                                                    }}
                                                                >
                                                                    <X className="h-3 w-3 cursor-pointer hover:text-indigo-100 transition-colors" />
                                                                </button>
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
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
